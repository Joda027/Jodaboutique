# Notifications push — guide d'installation

Les clientes peuvent s'abonner aux notifications (suivi de commande + annonces).
Trois étapes sont nécessaires, à faire **une seule fois**.

## 1. Créer les tables dans Supabase

Dans **Supabase → SQL Editor**, exécutez :

```sql
create table if not exists push_subscribers (
  id text primary key,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  order_id text,
  customer text,
  created_at timestamptz not null default now()
);

create table if not exists announcements (
  id text primary key,
  ts bigint not null,
  title text not null,
  body text not null,
  sent_by uuid references team_members(id) on delete set null,
  recipients integer not null default 0
);

alter table push_subscribers enable row level security;
alter table announcements enable row level security;

create policy "public can subscribe" on push_subscribers for insert with check (true);
create policy "public can update own subscription" on push_subscribers for update using (true) with check (true);
create policy "public can unsubscribe" on push_subscribers for delete using (true);
create policy "team can view subscribers" on push_subscribers for select using (is_team_member());

create policy "team can view announcements" on announcements for select using (is_team_member());
create policy "admin can insert announcements" on announcements for insert with check (is_admin());
```

## 2. Générer les clés VAPID

Sur votre ordinateur, dans un terminal :

```bash
npx web-push generate-vapid-keys
```

Vous obtenez deux clés : **Public Key** et **Private Key**.

Collez la **clé publique** dans `script.js`, à la ligne :

```js
const VAPID_PUBLIC_KEY = '';   // <-- collez la clé publique ici
```

Tant que cette valeur est vide, le bouton d'abonnement reste masqué et le site
fonctionne normalement (aucune erreur).

## 3. Déployer la fonction d'envoi

Toujours depuis votre ordinateur, à la racine du projet :

```bash
npx supabase login
npx supabase link --project-ref sfkxhelutkoqinmfceyc

npx supabase secrets set \
  VAPID_PUBLIC_KEY="votre_cle_publique" \
  VAPID_PRIVATE_KEY="votre_cle_privee" \
  VAPID_SUBJECT="mailto:dos.olawale@gmail.com"

npx supabase functions deploy send-push
```

## Utilisation

- **Clientes** : au moment de la commande, une case « Me prévenir du suivi de ma
  commande et des promotions » est cochée par défaut. Elles peuvent aussi
  s'abonner à tout moment via le menu **Nous contacter → Recevoir les nouveautés**.
- **Suivi de commande** : la notification part automatiquement quand l'équipe
  prend en charge une commande, puis quand elle la marque traitée.
- **Annonces** : dans **Espace équipe → Réglages → Notifications aux clientes**,
  saisissez un titre et un message, puis envoyez à toutes les abonnées.

## Remarques

- Sur iPhone, les notifications ne fonctionnent que si la cliente a ajouté le
  site à son écran d'accueil (limitation d'Apple, pas du site).
- Les abonnements devenus invalides sont supprimés automatiquement à l'envoi.

---

# Alertes équipe — nouvelle commande / annulation

Pour être prévenue vous-même (site + email) dès qu'une commande arrive ou est
annulée, sans avoir à garder l'onglet ouvert.

## 1. Ce qui marche déjà, sans rien configurer

- Dans **Espace équipe**, l'onglet **Commandes** affiche un badge rouge avec
  le nombre de commandes nouvelles, et le titre de l'onglet du navigateur
  affiche `(N)` tant qu'il y a des commandes à traiter.
- Si l'exécution SQL ci-dessous (`alter publication supabase_realtime add
  table orders`) a fonctionné, ce badge se met à jour **instantanément**,
  sans recharger la page, dès qu'une commande arrive ou est annulée pendant
  que vous êtes sur le site.
- Ceci est déjà inclus dans `supabase/schema.sql` : si vous avez ré-exécuté
  tout le fichier, c'est fait. Sinon, exécutez juste :

```sql
create table if not exists team_push_subscribers (
  id text primary key,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  team_member_id uuid references team_members(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table orders add column if not exists notified_new boolean not null default false;
alter table orders add column if not exists notified_cancel boolean not null default false;
alter table team_push_subscribers enable row level security;
create policy "team can view own subscription" on team_push_subscribers for select using (team_member_id = current_team_id());
create policy "team can insert own subscription" on team_push_subscribers for insert with check (team_member_id = current_team_id());
create policy "team can update own subscription" on team_push_subscribers for update using (team_member_id = current_team_id()) with check (team_member_id = current_team_id());
create policy "team can delete own subscription" on team_push_subscribers for delete using (team_member_id = current_team_id());

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table orders;
  end if;
end $$;
```

## 2. Notifications push sur votre téléphone/ordinateur (recommandé)

Réutilise les clés VAPID déjà configurées pour les clientes (voir plus haut).
Depuis votre ordinateur, à la racine du projet :

```bash
npx supabase functions deploy notify-team
```

Puis, dans **Espace équipe**, chaque membre qui veut être alerté clique sur
le bouton **🔔 Alertes commandes** en haut à droite (une fois par appareil).
Vous recevrez alors une notification à chaque nouvelle commande et à chaque
annulation, même onglet fermé — comme sur votre téléphone.

## 3. Notification par email (facultatif)

Nécessite un compte gratuit sur [resend.com](https://resend.com) (100
emails/jour gratuits, largement suffisant).

1. Créez un compte sur resend.com, récupérez une **clé API**.
2. Depuis votre ordinateur :

```bash
npx supabase secrets set \
  RESEND_API_KEY="votre_cle_resend" \
  NOTIFY_EMAIL="dos.olawale@gmail.com"
npx supabase functions deploy notify-team
```

Tant que `RESEND_API_KEY` n'est pas défini, l'envoi d'email est simplement
ignoré — le push et le badge continuent de fonctionner normalement.

## Remarque sur la sécurité

`notify-team` n'exige pas d'être connectée (contrairement à `send-push`),
car une cliente qui vient de commander n'a pas de session équipe. Elle ne
peut cependant déclencher chaque alerte qu'une seule fois par commande
(numéro de commande imprévisible + drapeau `notified_new`/`notified_cancel`
en base) : rejouer l'appel ne renvoie rien de plus.
