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
