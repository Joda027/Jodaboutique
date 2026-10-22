-- ============================================================
-- Joda Boutique — avis de clientes + photo de partage du site
-- Supabase > SQL Editor > New query : collez ce fichier puis Run. Sans risque si exécuté plusieurs fois.
-- ============================================================

-- Photo affichée quand le lien du site est partagé (WhatsApp, Facebook…).
alter table settings add column if not exists share_image text;

-- Avis de clientes affichés sur la boutique (ajoutés par l'admin, avec l'accord de la cliente).
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer text not null,
  message text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  photo text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table reviews enable row level security;

drop policy if exists "public can view published reviews" on reviews;
create policy "public can view published reviews" on reviews for select using (published or is_admin());
drop policy if exists "admin manages reviews" on reviews;
create policy "admin manages reviews" on reviews for all using (is_admin()) with check (is_admin());
