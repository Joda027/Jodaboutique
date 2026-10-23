-- ============================================================
-- Joda Boutique — pixels Facebook/TikTok, Google Analytics/Ads, vidéo YouTube, fil Facebook
-- Supabase > SQL Editor > New query : collez ce fichier puis Run. Sans risque si exécuté plusieurs fois.
-- ============================================================

-- Mesure d'audience, publicité et contenus intégrés (Réglages > Mesure & publicité).
-- Chargés sur la boutique seulement après l'accord de la visiteuse (bandeau cookies).
alter table settings add column if not exists fb_pixel_id text;      -- pixel Facebook (Meta)
alter table settings add column if not exists tiktok_pixel_id text;  -- pixel TikTok
alter table settings add column if not exists ga_id text;            -- Google Analytics 4 (G-XXXXXXX)
alter table settings add column if not exists gads_id text;          -- Google Ads (AW-XXXXXXXXX)
alter table settings add column if not exists gads_label text;       -- libellé de conversion Google Ads (achat)
alter table settings add column if not exists youtube_url text;      -- vidéo YouTube affichée sur la boutique
alter table settings add column if not exists fb_feed boolean default false; -- fil de la page Facebook
