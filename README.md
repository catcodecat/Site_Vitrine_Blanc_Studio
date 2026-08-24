# Blanc Studio

Blanc Studio est un site vitrine professionnel pour un studio de visualisation 3D, concepts IA et design d'intérieur. Le projet présente les services, le portfolio, le processus de travail, une page de contact et un espace administrateur pour suivre les demandes entrantes.

Le projet a été préparé pour une présentation Studi avec une architecture claire, un frontend React, un backend Express, des tests smoke/API et une configuration de production pour un déploiement statique Netlify.

## Production

- Site public: https://blanc-studio.netlify.app
- Repository GitHub: https://github.com/catcodecat/Site_Vitrine_Blanc_Studio

Le déploiement Netlify sert le frontend React/Vite. Les routes SPA sont gérées par `public/_redirects`.

L'API Express fonctionne en local ou via une infrastructure Node/Docker séparée. Sur Netlify, le site reste accessible mais les endpoints `/api/*` ne disposent pas d'un serveur persistant. Le frontend gère ce cas avec un message clair indiquant que l'API n'est pas disponible sur le déploiement statique.

## Technologies

- React 18
- Vite
- React Router
- JavaScript
- CSS
- Node.js
- Express
- JSONL pour le stockage des messages
- Docker / Docker Compose
- Nginx pour servir la version de production Docker
- Tests smoke/API avec Node.js

## Structure du projet

```text
src/
  components/        Composants réutilisables
  data/              Données de contenu en JSON
  pages/             Pages React Router
  styles/            Styles globaux
server/
  server.js          API Express
public/
  images/            Assets publics
  robots.txt         Robots SEO
  sitemap.xml        Sitemap production
  _redirects         Règles Netlify SPA
tests/
  smoke.mjs          Tests smoke/API
docs/                Documentation projet
```

Les dossiers locaux `docs-*`, `Captures-*` et certains PDF peuvent être conservés localement comme matériels de présentation Studi. Ils ne sont pas nécessaires au fonctionnement du site et sont exclus du contexte de build Docker via `.dockerignore`.

## Frontend

Le frontend est une application React/Vite avec React Router.

Routes principales:

- `/`
- `/a-propos`
- `/services`
- `/portfolio`
- `/portfolio/:projectId`
- `/processus`
- `/contact`
- `/admin`
- `/mentions-legales`

Le composant `Seo` met à jour les titres, méta descriptions, Open Graph, Twitter Card, canonical et robots par page. Les pages `/admin` et 404 sont en `noindex, nofollow`.

## Backend

Le backend est une API Express dans `server/server.js`.

Il gère:

- la vérification de santé;
- l'envoi du formulaire de contact;
- la validation backend;
- un honeypot anti-spam;
- un rate limiting séparé par type de route;
- le stockage des messages dans `data/messages.jsonl`;
- l'authentification administrateur par token de session;
- les endpoints administrateur pour lister, lire et mettre à jour les messages.

## Contact Form

La page `/contact` permet d'envoyer une demande projet.

Champs:

- nom;
- email;
- téléphone;
- type de projet;
- budget approximatif;
- message;
- acceptation de la politique de confidentialité.

Validation frontend:

- champs obligatoires;
- email valide;
- consentement obligatoire;
- `aria-invalid`;
- `aria-describedby`;
- message d'erreur lisible.

Validation backend:

- email valide;
- message non vide;
- limite de taille;
- nettoyage des caractères dangereux;
- honeypot;
- rate limiting.

La validation serveur ne fait pas confiance à la validation navigateur: les deux couches sont indépendantes.

## Admin Dashboard

L'espace administrateur est disponible sur:

```text
/admin
```

Il permet de:

- charger les messages entrants;
- filtrer par statut;
- consulter une demande;
- changer le statut;
- ajouter un commentaire administrateur.

Statuts:

- `new` / Nouveau;
- `read` / Lu;
- `processed` / Traité;
- `replied` / Réponse envoyée.

La page elle-même n'est pas protégée côté client, et c'est volontaire: aucune donnée n'y est présente tant que l'API n'a pas validé un token. Masquer une route dans le frontend ne protège de personne, puisque le JavaScript est de toute façon dans le navigateur du visiteur. La protection réelle est côté serveur, via la variable d'environnement `ADMIN_PASSWORD`.

## API endpoints

Public:

```text
GET  /api/health
POST /api/contact
```

Admin:

```text
POST  /api/admin/login
POST  /api/admin/logout
GET   /api/admin/messages
GET   /api/admin/messages/:id
PATCH /api/admin/messages/:id
```

`POST /api/admin/login` vérifie `ADMIN_PASSWORD` et renvoie un token de session de courte durée. Les autres endpoints admin demandent le header:

```text
x-admin-token: <token reçu à la connexion>
```

Le mot de passe ne circule donc qu'une seule fois, à la connexion.

## Sécurité

- validation côté navigateur et côté serveur sur le formulaire de contact;
- honeypot anti-spam, masqué hors écran avec `aria-hidden` et `tabindex="-1"` plutôt qu'en `display:none`;
- rate limiting séparé pour le formulaire de contact (5/min), les routes admin (20/15 min) et la connexion admin (5/15 min);
- authentification admin par token de session à durée limitée (30 minutes), avec logout côté serveur; le mot de passe n'est jamais renvoyé sur les requêtes suivantes;
- comparaison du mot de passe admin en temps constant (`crypto.timingSafeEqual`), avec gestion explicite des longueurs différentes;
- en-têtes de sécurité HTTP via Helmet sur l'API;
- prise en compte de l'adresse IP réelle du client derrière le reverse proxy nginx (`trust proxy`), sans quoi le rate limiting s'appliquerait globalement au lieu de par visiteur;
- dans `docker-compose.yml`, le service API n'expose aucun port sur l'hôte: il n'est joignable que par nginx sur le réseau interne;
- `ADMIN_PASSWORD` fourni uniquement via un fichier `.env` local, jamais commité.

### État des dépendances

À la date de rendu, `npm audit` remonte des vulnérabilités qui concernent uniquement la chaîne de build (`postcss`, `nanoid`) et ne sont pas embarquées dans le bundle livré au navigateur. L'alerte sur `react-router` suppose une valeur externe passée à `<Link>`, ce qui n'existe pas dans ce projet: toutes les destinations sont statiques ou construites à partir de `projects.json`.

## Variables d'environnement

Créer un fichier `.env` en local si nécessaire:

```env
PORT=3001
ADMIN_PASSWORD=change-this-admin-password
```

Variables supportées:

- `PORT`: port du serveur Express;
- `ADMIN_PASSWORD`: mot de passe administrateur;
- `DATA_DIR`: dossier de stockage des messages, utile pour les tests ou un environnement spécifique;
- `TRUST_PROXY`: à mettre à `1` uniquement quand l'API tourne derrière le nginx du docker-compose, pour lire correctement l'adresse IP réelle du client.

Un exemple est disponible dans `.env.example`.

## Installation

```bash
npm install
```

## Lancer le frontend

```bash
npm run dev
```

Adresse locale:

```text
http://127.0.0.1:5173
```

## Lancer le backend

```bash
npm run backend
```

Adresse API locale:

```text
http://127.0.0.1:3001/api/health
```

Pour tester l'admin en local, définir `ADMIN_PASSWORD` avant de lancer le backend.

## Build production

```bash
npm run build
```

Le dossier généré est:

```text
dist/
```

## Preview production locale

```bash
npm run preview
```

## Tests

```bash
npm run test
```

Ce sont des tests d'intégration: ils démarrent un vrai serveur sur un port dédié avec un `DATA_DIR` isolé, puis exercent le cycle complet en HTTP.

Les tests vérifient:

- formulaire vide refusé;
- email invalide refusé;
- création d'un message valide;
- connexion admin refusée avec un mauvais mot de passe;
- token invalide refusé;
- token refusé après logout;
- refus de l'ancien header `x-admin-password`, remplacé par le token de session;
- lecture des messages admin;
- mise à jour du statut;
- routes principales en preview production.

## Docker

Le projet contient:

- `Dockerfile`;
- `Dockerfile.api`;
- `docker-compose.yml`;
- `nginx.conf`.

Créer un fichier `.env` à la racine (voir `.env.example`) avant de lancer Docker, pour définir `ADMIN_PASSWORD`. `docker-compose.yml` charge automatiquement ce fichier.

Commande:

```bash
docker compose up --build
```

Puis ouvrir:

```text
http://localhost:8080
```

Un seul port est exposé sur l'hôte. Le service `blanc-studio-api` n'a pas de section `ports`: nginx est le seul point d'entrée et relaie `/api/` vers l'API sur le réseau interne Docker.

## SEO

Éléments en place:

- titres par page;
- méta descriptions;
- canonical;
- Open Graph;
- Twitter Cards;
- `noindex, nofollow` sur l'admin et la page 404;
- `robots.txt`;
- `sitemap.xml`;
- textes alternatifs sur les images, avec `alt=""` volontaire sur les images décoratives;
- lazy loading sur les images hors premier écran.

URL de production utilisée dans le sitemap:

```text
https://blanc-studio.netlify.app
```

## Git workflow

Le projet utilise une branche principale:

```text
main
```

Les commits sont séparés par étapes:

- corrections critiques;
- améliorations UX/contenu;
- formulaire et backend messages;
- admin dashboard;
- SEO/accessibilité/performance;
- tests et vérification finale.

## Limites et évolutions

### Limites actuelles

Ces limites sont assumées et documentées, pas découvertes après coup.

- **Stockage fichier.** Les messages sont dans un fichier JSONL. L'écriture d'un nouveau message est atomique (`appendFileSync`), mais la mise à jour d'un statut relit et réécrit tout le fichier: deux modifications simultanées depuis l'admin s'écraseraient. Sans effet avec un seul administrateur; résolu par une transaction en passant à SQLite.
- **Sessions en mémoire.** Les sessions admin vivent dans une `Map` du processus: un redémarrage déconnecte l'administrateur, et une mise à l'échelle horizontale casserait l'authentification. Adapté à une instance unique; sinon Redis ou un JWT signé.
- **Token en `sessionStorage`.** Accessible au JavaScript de la page. Le risque est limité par une durée de vie courte sans renouvellement, un logout serveur, et l'absence de vecteur XSS (React échappe ses sorties, `dangerouslySetInnerHTML` n'est utilisé nulle part). La solution stricte serait un cookie `httpOnly` + `SameSite=Strict`.
- **Méta-tags côté client.** Le composant `Seo` s'exécute dans un `useEffect`: les crawlers qui n'exécutent pas JavaScript, notamment ceux des réseaux sociaux, ne voient que les balises statiques de `index.html`. Résolu par du prerender ou du SSR.
- **404 logiciel.** La règle SPA de Netlify renvoie `index.html` avec un code 200 sur les routes inexistantes. Compromis classique des SPA, corrigeable avec un `404.html` dédié.
- **Pas d'envoi d'email automatique.** Les demandes sont stockées et consultées dans l'espace admin.
- **Tests d'intégration uniquement.** Pas de tests unitaires sur les fonctions isolées, pas de tests UI.

### Évolutions possibles

- Migrer le stockage vers SQLite ou PostgreSQL.
- Passer le token admin en cookie `httpOnly`.
- Ajouter des notifications email.
- Ajouter des tests end-to-end UI avec Playwright.
- Convertir les images lourdes en WebP et servir plusieurs tailles.
- Ajouter ESLint, Prettier et un workflow GitHub Actions.
- Ajouter du prerender pour les méta-tags par page.
- Ajouter des données structurées JSON-LD.

## Préparation Studi

Le projet permet de présenter:

- contexte et cahier des charges;
- architecture frontend;
- architecture backend;
- formulaire de contact avec double validation;
- API REST et gestion des erreurs;
- espace administrateur avec authentification par token;
- responsive design;
- accessibilité;
- SEO;
- sécurité applicative;
- tests automatisés;
- workflow Git;
- déploiement frontend sur Netlify et conteneurisation Docker.
