-- ============================================================
-- Joda Boutique — cumul des ventes par assistante (conservé après réinitialisation)
-- Supabase > SQL Editor > New query : collez ce fichier puis Run. Sans risque si exécuté plusieurs fois.
-- ============================================================

-- Ventes traitées archivées par assistante : { "<team_member id>": {"count": n, "sales": montant} }
alter table sales_archive add column if not exists by_assistant jsonb not null default '{}'::jsonb;

-- Cumul archivé de l'assistante connectée (la table sales_archive n'est lisible que par l'admin).
create or replace function my_archived_sales()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(by_assistant -> (current_team_id()::text), '{}'::jsonb) from sales_archive where id = true;
$$;
grant execute on function my_archived_sales() to authenticated;

