-- ============================================================================
-- Joda Boutique — schéma Supabase (tables + sécurité RLS)
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query > coller > Run
-- ============================================================================

-- Extension nécessaire pour uuid
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1) PROFILES — un profil par membre de l'équipe (admin ou assistante)
--    Lié 1-1 à un compte Supabase Auth (auth.users). Les mots de passe
--    et emails sont gérés par Supabase Auth, jamais stockés ici.
-- ----------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('admin','assistant')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2) PRODUCTS — le catalogue
-- ----------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Autre',
  price numeric not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image text,
  added_by uuid not null references profiles(id),
  approved boolean not null default false,
  rejected boolean not null default false,
  reject_reason text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3) ORDERS — les commandes / ventes
--    items est un instantané figé (nom + prix au moment de la commande),
--    reconstruit côté serveur pour ne jamais faire confiance au client.
-- ----------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text,
  address text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  original_total numeric,
  status text not null default 'nouvelle' check (status in ('nouvelle','en cours','traitée')),
  claimed_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4) KV_STORE — petites données annexes (réglages, "j'aime", fréquentation,
--    dépenses, journal d'activité, archive de ventes). Une ligne = une clé.
-- ----------------------------------------------------------------------------
create table if not exists kv_store (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- FONCTIONS UTILITAIRES
-- ============================================================================

-- Vrai si l'utilisateur courant est une administratrice active.
-- SECURITY DEFINER : évite les boucles de RLS quand une policy l'appelle.
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin' and active is not false
  );
$$;
grant execute on function is_admin() to anon, authenticated;

-- Empêche une assistante de s'auto-promouvoir admin ou de se réactiver seule.
create or replace function prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() then
    if new.role is distinct from old.role or new.active is distinct from old.active then
      raise exception 'Modification non autorisée.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_privilege on profiles;
create trigger trg_profiles_privilege
  before update on profiles
  for each row execute function prevent_profile_privilege_escalation();

-- Place une commande de façon sûre et atomique :
-- vérifie stock/dispo, calcule le total à partir des VRAIS prix en base
-- (jamais depuis le navigateur du client), décrémente le stock, insère la commande.
create or replace function place_order(
  p_customer_name text,
  p_phone text,
  p_address text,
  p_items jsonb
) returns orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product products%rowtype;
  v_qty integer;
  v_total numeric := 0;
  v_items_out jsonb := '[]'::jsonb;
  v_order orders%rowtype;
begin
  if p_customer_name is null or length(trim(p_customer_name)) = 0 then
    raise exception 'Le nom du client est requis.';
  end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Le panier est vide.';
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := coalesce((v_item->>'qty')::int, 0);
    if v_qty <= 0 then
      raise exception 'Quantité invalide.';
    end if;

    select * into v_product from products
      where id = (v_item->>'id')::uuid
      for update;

    if not found or v_product.approved is not true then
      raise exception 'Article indisponible.';
    end if;
    if v_product.stock < v_qty then
      raise exception 'Stock insuffisant pour : %', v_product.name;
    end if;

    update products set stock = stock - v_qty where id = v_product.id;

    v_total := v_total + (v_product.price * v_qty);
    v_items_out := v_items_out || jsonb_build_array(
      jsonb_build_object('id', v_product.id, 'name', v_product.name, 'price', v_product.price, 'qty', v_qty)
    );
  end loop;

  insert into orders (customer_name, phone, address, items, total, status)
  values (trim(p_customer_name), nullif(trim(coalesce(p_phone,'')),''), nullif(trim(coalesce(p_address,'')),''), v_items_out, v_total, 'nouvelle')
  returning * into v_order;

  return v_order;
end;
$$;

grant execute on function place_order(text, text, text, jsonb) to anon, authenticated;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table kv_store enable row level security;

-- ---------- PROFILES ----------
-- Toute personne connectée (équipe) peut lire la liste de l'équipe.
drop policy if exists profiles_select on profiles;
create policy profiles_select on profiles
  for select to authenticated using (true);

-- Chacun peut modifier son propre nom ; l'admin peut tout modifier.
-- Le trigger ci-dessus bloque le changement de rôle/statut par une non-admin.
drop policy if exists profiles_update on profiles;
create policy profiles_update on profiles
  for update to authenticated
  using (id = auth.uid() or is_admin())
  with check (id = auth.uid() or is_admin());

-- Pas de policy insert/delete pour authenticated/anon : la création d'un
-- profil ne se fait que via la fonction Edge (clé service_role), après
-- vérification que l'appelant est bien une administratrice.

-- ---------- PRODUCTS ----------
-- Public : voit les produits approuvés. Équipe connectée : voit tout.
drop policy if exists products_select on products;
create policy products_select on products
  for select to public
  using (approved = true or auth.role() = 'authenticated');

-- Une personne de l'équipe propose un produit en son nom ; seule l'admin
-- peut l'insérer déjà approuvé.
drop policy if exists products_insert on products;
create policy products_insert on products
  for insert to authenticated
  with check (added_by = auth.uid() and (is_admin() or approved = false));

-- L'admin peut tout modifier/supprimer.
drop policy if exists products_update_admin on products;
create policy products_update_admin on products
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists products_delete_admin on products;
create policy products_delete_admin on products
  for delete to authenticated using (is_admin());

-- Une assistante ne peut modifier/retirer que SES pièces tant qu'elles ne
-- sont pas encore publiées (en attente ou refusées) — pas moyen de
-- s'auto-approuver, ni de toucher au catalogue déjà publié.
drop policy if exists products_update_own_pending on products;
create policy products_update_own_pending on products
  for update to authenticated
  using (added_by = auth.uid() and approved = false)
  with check (added_by = auth.uid() and approved = false);

drop policy if exists products_delete_own_pending on products;
create policy products_delete_own_pending on products
  for delete to authenticated
  using (added_by = auth.uid() and approved = false);

-- ---------- ORDERS ----------
-- Pas de policy INSERT : les commandes ne se créent que via place_order()
-- (SECURITY DEFINER), qui vérifie stock/prix côté serveur.

-- L'admin voit tout ; une assistante voit les commandes libres + les siennes.
drop policy if exists orders_select on orders;
create policy orders_select on orders
  for select to authenticated
  using (is_admin() or claimed_by is null or claimed_by = auth.uid());

drop policy if exists orders_update_admin on orders;
create policy orders_update_admin on orders
  for update to authenticated using (is_admin()) with check (is_admin());

-- Une assistante peut prendre en charge une commande libre, ou modifier
-- celles qu'elle a déjà prises (tant qu'elles ne sont pas "traitée").
drop policy if exists orders_update_own on orders;
create policy orders_update_own on orders
  for update to authenticated
  using ((claimed_by is null or claimed_by = auth.uid()) and status <> 'traitée')
  with check (claimed_by = auth.uid());

drop policy if exists orders_delete_admin on orders;
create policy orders_delete_admin on orders
  for delete to authenticated using (is_admin());

-- ---------- KV_STORE ----------
-- Lecture publique limitée aux réglages (numéro WhatsApp) et aux "j'aime".
drop policy if exists kv_public_select on kv_store;
create policy kv_public_select on kv_store
  for select to public
  using (key in ('joda_settings','joda_likes'));

-- Écriture publique limitée aux compteurs sans enjeu (j'aime, fréquentation).
drop policy if exists kv_public_insert on kv_store;
create policy kv_public_insert on kv_store
  for insert to public
  with check (key in ('joda_likes','joda_traffic'));

drop policy if exists kv_public_update on kv_store;
create policy kv_public_update on kv_store
  for update to public
  using (key in ('joda_likes','joda_traffic'))
  with check (key in ('joda_likes','joda_traffic'));

-- L'équipe connectée a accès complet (réglages, dépenses, journal, archive...).
drop policy if exists kv_staff_select on kv_store;
create policy kv_staff_select on kv_store
  for select to authenticated using (true);

drop policy if exists kv_staff_insert on kv_store;
create policy kv_staff_insert on kv_store
  for insert to authenticated with check (true);

drop policy if exists kv_staff_update on kv_store;
create policy kv_staff_update on kv_store
  for update to authenticated using (true) with check (true);

-- ============================================================================
-- Fin du schéma. Voir README.md pour la suite (créer l'admin, déployer les
-- fonctions Edge, configurer la clé publique dans index.html).
-- ============================================================================
