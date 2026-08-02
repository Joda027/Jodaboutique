-- ============================================================
-- Joda Boutique — schéma Supabase sécurisé
-- À exécuter une seule fois dans Supabase : SQL Editor > New query > Run
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1. TABLES
-- ------------------------------------------------------------

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('admin','assistant')),
  created_at timestamptz not null default now()
);

create table if not exists team_invites (
  email text primary key,
  name text not null,
  role text not null check (role in ('admin','assistant')),
  created_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  name text not null,
  cat text not null,
  price numeric not null,
  stock integer not null default 0,
  image text,
  added_by uuid references team_members(id) on delete set null,
  approved boolean not null default false,
  rejected boolean not null default false,
  reject_reason text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  ts bigint not null,
  customer text not null,
  phone text,
  items jsonb not null,
  total numeric not null,
  original_total numeric,
  status text not null default 'nouvelle' check (status in ('nouvelle','en cours','traitée','annulée')),
  claimed_by uuid references team_members(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists likes (
  product_id text primary key references products(id) on delete cascade,
  count integer not null default 0
);

create table if not exists traffic (
  week_key text primary key,
  visits integer not null default 0,
  clicks integer not null default 0
);

create table if not exists expenses (
  id text primary key,
  ts bigint not null,
  label text not null,
  amount numeric not null,
  type text not null,
  created_by uuid references team_members(id) on delete set null
);

create table if not exists offline_sales (
  id text primary key,
  ts bigint not null,
  label text not null,
  amount numeric not null,
  created_by uuid references team_members(id) on delete set null
);

create table if not exists activity_log (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  actor text not null,
  action text not null
);

create table if not exists settings (
  id boolean primary key default true check (id),
  whatsapp text default '',
  phone text default '',
  facebook text default '',
  promo_active boolean default false,
  promo_percent numeric default 0,
  promo_ends_at timestamptz,
  categories jsonb default '[]'::jsonb
);
insert into settings (id, whatsapp) values (true, '') on conflict (id) do nothing;

create table if not exists sales_archive (
  id boolean primary key default true check (id),
  count integer not null default 0,
  revenue numeric not null default 0,
  by_product jsonb not null default '{}'::jsonb
);
insert into sales_archive (id) values (true) on conflict (id) do nothing;

-- Abonnés aux notifications push (navigateur)
create table if not exists push_subscribers (
  id text primary key,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  order_id text,          -- rattache l'abonnement à une commande, si souscrit au checkout
  customer text,
  created_at timestamptz not null default now()
);

-- Annonces envoyées aux abonnés (promotions, nouveautés…)
create table if not exists announcements (
  id text primary key,
  ts bigint not null,
  title text not null,
  body text not null,
  sent_by uuid references team_members(id) on delete set null,
  recipients integer not null default 0
);

-- ------------------------------------------------------------
-- 2. FONCTIONS D'AIDE (SECURITY DEFINER pour éviter la récursion RLS)
-- ------------------------------------------------------------

create or replace function is_team_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from team_members where auth_user_id = auth.uid());
$$;

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from team_members where auth_user_id = auth.uid() and role = 'admin');
$$;

create or replace function current_team_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from team_members where auth_user_id = auth.uid();
$$;

-- ------------------------------------------------------------
-- 3. PROVISIONNEMENT AUTOMATIQUE DES COMPTES INVITÉS
-- Quand quelqu'un crée un compte (signUp) avec un email présent
-- dans team_invites, on lui crée automatiquement son accès équipe.
-- ------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  inv record;
begin
  select * into inv from team_invites where lower(email) = lower(new.email) limit 1;
  if inv.email is not null then
    insert into team_members (auth_user_id, name, role) values (new.id, inv.name, inv.role);
    delete from team_invites where lower(email) = lower(inv.email);
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function prevent_role_self_escalation()
returns trigger language plpgsql as $$
begin
  if new.role <> old.role and not is_admin() then
    raise exception 'Seule une administratrice peut changer les rôles.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_escalation on team_members;
create trigger trg_prevent_role_escalation
  before update on team_members
  for each row execute function prevent_role_self_escalation();

-- ------------------------------------------------------------
-- 4. FONCTIONS MÉTIER (RPC) — écritures publiques sécurisées
-- ------------------------------------------------------------

create or replace function place_order(
  p_customer text,
  p_phone text,
  p_items jsonb  -- [{"id": "...", "qty": 2}, ...]
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product products%rowtype;
  v_total numeric := 0;
  v_order_items jsonb := '[]'::jsonb;
  v_order_id text := 'o' || (floor(extract(epoch from now())*1000))::bigint::text || floor(random()*1000)::text;
  v_ts bigint := (floor(extract(epoch from now())*1000))::bigint;
  v_qty integer;
  v_unit_price numeric;
  v_promo_active boolean := false;
  v_promo_percent numeric := 0;
  v_promo_ends_at timestamptz;
begin
  if p_customer is null or length(trim(p_customer)) = 0 then
    raise exception 'Nom du client requis';
  end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Le panier est vide';
  end if;

  select coalesce(promo_active,false), coalesce(promo_percent,0), promo_ends_at
    into v_promo_active, v_promo_percent, v_promo_ends_at
    from settings where id = true;

  if v_promo_ends_at is not null and v_promo_ends_at <= now() then
    v_promo_active := false;
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item->>'qty')::integer;
    if v_qty is null or v_qty <= 0 then
      raise exception 'Quantité invalide';
    end if;

    update products
      set stock = stock - v_qty
      where id = (v_item->>'id') and approved = true and stock >= v_qty
      returning * into v_product;

    if not found then
      raise exception 'Stock insuffisant pour un des articles';
    end if;

    v_unit_price := v_product.price;
    if v_promo_active and v_promo_percent > 0 then
      v_unit_price := round(v_product.price * (1 - v_promo_percent/100.0));
    end if;

    v_total := v_total + (v_unit_price * v_qty);
    v_order_items := v_order_items || jsonb_build_object(
      'id', v_product.id, 'name', v_product.name, 'price', v_unit_price, 'qty', v_qty
    );
  end loop;

  insert into orders (id, ts, customer, phone, items, total, status)
  values (v_order_id, v_ts, trim(p_customer), p_phone, v_order_items, v_total, 'nouvelle');

  insert into activity_log (actor, action)
  values ('Cliente : ' || trim(p_customer), 'a passé une commande de ' || v_total || ' GNF');

  return jsonb_build_object('id', v_order_id, 'ts', v_ts, 'total', v_total, 'items', v_order_items);
end;
$$;
grant execute on function place_order(text, text, jsonb) to anon, authenticated;

create or replace function like_product(p_product_id text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into likes (product_id, count) values (p_product_id, 1)
    on conflict (product_id) do update set count = likes.count + 1
    returning count into v_count;
  return v_count;
end;
$$;
grant execute on function like_product(text) to anon, authenticated;

create or replace function track_visit(p_week text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into traffic(week_key, visits, clicks) values (p_week, 1, 0)
    on conflict (week_key) do update set visits = traffic.visits + 1;
end;
$$;
grant execute on function track_visit(text) to anon, authenticated;

create or replace function track_click(p_week text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into traffic(week_key, visits, clicks) values (p_week, 0, 1)
    on conflict (week_key) do update set clicks = traffic.clicks + 1;
end;
$$;
grant execute on function track_click(text) to anon, authenticated;

-- ------------------------------------------------------------
-- 5. ROW LEVEL SECURITY
-- ------------------------------------------------------------

alter table team_members enable row level security;
alter table team_invites enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table likes enable row level security;
alter table traffic enable row level security;
alter table expenses enable row level security;
alter table offline_sales enable row level security;
alter table activity_log enable row level security;
alter table settings enable row level security;
alter table sales_archive enable row level security;
alter table push_subscribers enable row level security;
alter table announcements enable row level security;

-- team_members
create policy "team can view team" on team_members for select using (is_team_member());
create policy "admin can update team" on team_members for update using (is_admin()) with check (is_admin());
create policy "self can update own row" on team_members for update using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());
create policy "admin can delete team" on team_members for delete using (is_admin());

-- team_invites (gérées uniquement par l'admin ; le trigger de signup bypass RLS)
create policy "admin manages invites" on team_invites for all using (is_admin()) with check (is_admin());

-- products
create policy "public can view approved products" on products for select using (approved = true OR is_team_member());
create policy "team can insert own products" on products for insert with check (is_team_member() AND added_by = current_team_id());
create policy "team can update own or admin any" on products for update using (is_admin() OR added_by = current_team_id()) with check (is_admin() OR added_by = current_team_id());
create policy "team can delete own or admin any" on products for delete using (is_admin() OR added_by = current_team_id());

-- orders (l'insertion publique passe uniquement par place_order())
create policy "team can select orders" on orders for select using (is_team_member());
create policy "team can update orders" on orders for update
  using (is_admin() OR claimed_by = current_team_id() OR (status = 'nouvelle' AND claimed_by is null))
  with check (is_admin() OR claimed_by = current_team_id());
create policy "admin can delete orders" on orders for delete using (is_admin());

-- likes (l'écriture passe uniquement par like_product())
create policy "public can view likes" on likes for select using (true);

-- traffic (aucun accès direct en écriture ; lecture réservée à l'équipe)
create policy "team can view traffic" on traffic for select using (is_team_member());

-- expenses (réservé à l'admin)
create policy "admin manages expenses" on expenses for all using (is_admin()) with check (is_admin());

-- offline_sales (réservé à l'admin)
create policy "admin manages offline sales" on offline_sales for all using (is_admin()) with check (is_admin());

-- activity_log
create policy "team can insert activity" on activity_log for insert with check (is_team_member());
create policy "admin can view activity" on activity_log for select using (is_admin());

-- settings (numéro WhatsApp visible publiquement, modifiable par l'admin)
create policy "public can view settings" on settings for select using (true);
create policy "admin can update settings" on settings for update using (is_admin()) with check (is_admin());

-- sales_archive
create policy "admin can view archive" on sales_archive for select using (is_admin());
create policy "admin can update archive" on sales_archive for update using (is_admin()) with check (is_admin());

-- push_subscribers : le public peut s'abonner / se désabonner par son endpoint,
-- mais ne peut jamais lire la liste (seule l'équipe la consulte).
create policy "public can subscribe" on push_subscribers for insert with check (true);
create policy "public can update own subscription" on push_subscribers for update using (true) with check (true);
create policy "public can unsubscribe" on push_subscribers for delete using (true);
create policy "team can view subscribers" on push_subscribers for select using (is_team_member());

-- announcements (historique des envois, réservé à l'équipe)
create policy "team can view announcements" on announcements for select using (is_team_member());
create policy "admin can insert announcements" on announcements for insert with check (is_admin());

-- ------------------------------------------------------------
-- 6. PREMIÈRE ADMINISTRATRICE
-- Remplacez l'email ci-dessous par votre vrai email avant d'exécuter,
-- puis créez votre compte depuis le site (onglet "Première connexion").
-- ------------------------------------------------------------

insert into team_invites (email, name, role)
values ('dos.olawale@gmail.com', 'Administratrice principale', 'admin')
on conflict (email) do nothing;
