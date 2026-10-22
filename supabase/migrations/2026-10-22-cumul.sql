-- ============================================================
-- Joda Boutique — cumul des ventes par assistante (conservé après réinitialisation)
-- Supabase > SQL Editor > New query : collez ce fichier puis Run. Sans risque si exécuté plusieurs fois.
-- ============================================================

-- Ventes traitées archivées par assistante : { "<team_member id>": {"count": n, "sales": montant} }
alter table sales_archive add column if not exists by_assistant jsonb not null default '{}'::jsonb;

