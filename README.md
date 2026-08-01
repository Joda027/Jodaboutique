# Joda Boutique

Site e-commerce pour Joda Boutique (bijoux & accessoires, Conakry) : boutique publique + espace équipe (administratrice + assistantes), gestion des produits, suivi des commandes, statistiques de ventes et finances. Backend sur Supabase (base de données + authentification).

## 1. Ce que fait le site

- **Boutique publique** : catalogue, panier, commande avec nom / téléphone / adresse de livraison, récap envoyé sur WhatsApp.
- **Espace équipe**, avec deux rôles :
  - **Administratrice** : contrôle total — approuve/refuse/modifie/supprime n'importe quel produit, voit et attribue toutes les commandes (donc sait quelle assistante a traité quelle vente), crée/désactive/réinitialise les comptes assistantes, voit les statistiques globales, les finances (dépenses, commissions, résultat net) et le journal d'activité.
  - **Assistante** : propose des produits (publiés après validation de l'admin), prend en charge des commandes, voit ses propres statistiques et sa commission (10 % des ventes qu'elle a traitées), gère son profil (nom, mot de passe).
- **Sécurité réelle** : chaque membre de l'équipe se connecte avec un vrai compte (email + mot de passe) via Supabase Auth. Les droits de chacun (qui peut voir/modifier quoi) sont appliqués **au niveau de la base de données** (Row Level Security), pas seulement dans l'interface — donc même quelqu'un de malintentionné qui inspecterait le site ne pourrait pas usurper un rôle ou modifier des données auxquelles il n'a pas droit.

> Remarque : la version précédente de ce fichier stockait les codes d'équipe en clair dans une table ouverte à tout le monde (n'importe quel visiteur pouvait les lire et les modifier via l'API). Cette version corrige ce problème en repartant sur une vraie authentification Supabase et des tables sécurisées.

## 2. Mise en place de la base Supabase

### 2.1. Créer le projet
Si ce n'est pas déjà fait, créez un projet sur [supabase.com](https://supabase.com). Notez son URL et sa clé publique (`anon`/`publishable`), visibles dans **Project Settings > API**.

Le site est déjà configuré pour le projet `https://yohamnvnvasybwwanfsl.supabase.co`. Si vous utilisez un autre projet, mettez à jour `SUPABASE_URL` et `SUPABASE_KEY` au début du `<script>` dans `index.html`.

### 2.2. Créer les tables et la sécurité
Dans le Dashboard Supabase : **SQL Editor > New query**, collez tout le contenu de [`supabase/schema.sql`](supabase/schema.sql), puis **Run**. Cela crée :
- les tables `profiles`, `products`, `orders`, `kv_store` ;
- une fonction `place_order()` qui enregistre les commandes de façon sûre (vérifie le stock, recalcule le total à partir des vrais prix en base — jamais depuis le navigateur du client) ;
- toutes les règles de sécurité (RLS) qui définissent qui peut voir/modifier quoi.

### 2.3. Créer le tout premier compte administratrice
La création de compte se fait ensuite depuis le site (voir plus bas) — mais il faut un premier admin pour démarrer :

1. Dashboard Supabase > **Authentication > Users > Add user** : créez un utilisateur avec l'email et le mot de passe de l'administratrice, cochez « Auto confirm user ».
2. Copiez son **User UID**.
3. Toujours dans **SQL Editor**, exécutez (en remplaçant les valeurs) :
   ```sql
   insert into profiles (id, name, role, active)
   values ('COLLEZ-LE-USER-UID-ICI', 'Administratrice principale', 'admin', true);
   ```
4. Vous pouvez maintenant vous connecter sur le site, onglet **Espace équipe**, avec cet email/mot de passe.

### 2.4. Déployer les fonctions Edge (création de comptes assistantes)
La création et la réinitialisation de mot de passe des assistantes se font via deux petites fonctions serveur (elles seules ont le droit de créer un compte, avec vérification que la demande vient bien de l'admin). Il faut les déployer une fois avec la [CLI Supabase](https://supabase.com/docs/guides/cli) :

```bash
npm install -g supabase
supabase login
supabase link --project-ref yohamnvnvasybwwanfsl   # remplacez par votre project ref si différent

supabase functions deploy create-assistant
supabase functions deploy reset-assistant-password
```

Ces fonctions utilisent automatiquement les variables `SUPABASE_URL`, `SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` fournies par Supabase — rien à configurer manuellement.

Une fois déployé, l'administratrice peut créer une assistante depuis l'onglet **Équipe** du site (nom, email, mot de passe), puis lui transmettre ces identifiants.

## 3. Héberger le site

Ce site est un simple fichier HTML statique (`index.html`) — aucune compilation nécessaire. Supabase héberge la base de données et l'authentification, mais pas le site lui-même : il vous faut un hébergeur de fichiers statiques, par exemple :
- [Netlify](https://netlify.com) ou [Vercel](https://vercel.com) : glissez-déposez le dossier, ou connectez ce dépôt GitHub — déploiement automatique à chaque mise à jour.
- GitHub Pages, Cloudflare Pages, ou tout hébergement web classique.

Il n'y a rien d'autre à configurer côté hébergement : le fichier appelle directement Supabase depuis le navigateur du client.

## 4. Après la mise en ligne

Dans l'onglet **Réglages** (admin) :
- Renseignez le numéro WhatsApp de la boutique (format international sans le `+`, ex. `224620000000`) pour activer le bouton de contact et la confirmation de commande.

Dans l'onglet **Produits**, ajoutez votre premier catalogue de bijoux (photo, nom, catégorie, prix en GNF, stock).

## 5. Limites connues / pistes d'évolution

- **Paiement** : le site collecte les informations client (nom, téléphone, adresse) pour un paiement à la livraison ; aucune passerelle de paiement en ligne n'est intégrée.
- **Assistante virtuelle par chat / rapports IA générés automatiquement** : présents dans une version antérieure de ce fichier, ils appelaient l'API Claude directement depuis le navigateur sans clé — ce qui ne fonctionne pas de façon sécurisée en dehors d'un environnement de démonstration. Ils ont été retirés. Si vous souhaitez les réactiver, il faudrait passer par une fonction Edge Supabase supplémentaire qui garde votre clé API côté serveur (comme pour `create-assistant`) — je peux la construire si vous le souhaitez.
- **Photos produits** : stockées en base64 directement dans la base (comme avant), simple mais pas idéal à grande échelle ; migrer vers Supabase Storage serait une amélioration future si le catalogue grossit beaucoup.
