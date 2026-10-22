# Activer le paiement en ligne Orange Money

Le site est prêt : la cliente choisit **« Payer en ligne »**, est envoyée sur la page sécurisée
Orange Money, valide sur son téléphone, puis revient sur le site où le paiement est confirmé.
La commande passe automatiquement à **« payé ✓ »** dans l'Espace équipe.

Tant que les étapes ci-dessous ne sont pas faites, l'option reste cachée et rien ne change pour les clientes.

## 1. Obtenir un compte marchand Orange Money Web Payment

Demandez à Orange Guinée (ou à son agrégateur) l'accès à l'API **Orange Money Web Payment**.
Ils vous remettent (sur le portail développeur Orange) :

- l'**Authorization header** de votre application (une longue suite de caractères) ;
- votre **merchant key** (clé marchand) ;
- le **chemin de l'API pour la Guinée** (du type `orange-money-webpay/xx/v1`) ;
- la **devise** à utiliser (`GNF` en production ; `OUV` dans l'environnement de test).

## 2. Récupérer la clé « service_role » de Supabase

Supabase → Project Settings → API → **service_role** (secret). Elle permet au serveur de
marquer une commande comme payée. Ne la mettez jamais dans le site lui-même.

## 3. Ajouter les variables sur Netlify

Netlify → votre site → Site configuration → **Environment variables** → Add a variable :

| Nom | Valeur |
|---|---|
| `OM_AUTH_HEADER` | l'Authorization header Orange (sans le mot `Basic`) |
| `OM_MERCHANT_KEY` | la merchant key |
| `OM_API_PATH` | le chemin donné par Orange (test : `orange-money-webpay/dev/v1`) |
| `OM_CURRENCY` | `GNF` (ou `OUV` pour tester) |
| `SUPABASE_SERVICE_ROLE_KEY` | la clé service_role de Supabase |
| `OM_TOKEN_URL` | *facultatif* — seulement si Orange vous indique une autre adresse que `https://api.orange.com/oauth/v3/token` |

Puis **Deploys → Trigger deploy** pour que les variables soient prises en compte.

## 4. Mettre la base de données à jour (une seule fois)

Supabase → SQL Editor → New query → collez `supabase/migrations/2026-10-22-paiement.sql` → **Run**.

## 5. Activer l'option

Espace équipe → **Réglages** → cochez **« Proposer le paiement en ligne Orange Money »** → Enregistrer.

Faites d'abord un essai avec un petit montant (ou en environnement de test Orange) avant de l'annoncer.

## Comment ça marche (technique)

- `netlify/functions/pay-start.js` : crée la demande de paiement chez Orange. Le montant est
  recalculé depuis la commande enregistrée (articles + livraison), jamais depuis le navigateur.
- `netlify/functions/pay-notify.js` : reçoit la notification d'Orange, puis **redemande à Orange**
  l'état réel du paiement avant de marquer la commande payée.
- `netlify/functions/pay-status.js` : utilisé par la page de retour pour afficher
  « Paiement confirmé » / « non abouti ».
