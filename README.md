# Blanc Studio

Blanc Studio est un site vitrine professionnel pour une studio de visualisation 3D, concepts IA et design d'interieur. Le projet presente les services, le portfolio, le processus de travail, une page de contact et un espace administrateur simple pour suivre les demandes entrantes.

Le projet a ete prepare pour une presentation Studi avec une architecture claire, un frontend React, un backend Express minimal, des tests smoke/API et une configuration de production pour un deploiement statique Netlify.

## Production

- Site public: https://blanc-studio.netlify.app
- Repository GitHub: https://github.com/catcodecat/Site_Vitrine_Blanc_Studio

Le deploiement Netlify sert le frontend React/Vite. Les routes SPA sont gerees par `public/_redirects`.

L'API Express fonctionne en local ou via une infrastructure Node/Docker separee. Sur Netlify, le site reste accessible mais les endpoints `/api/*` ne disposent pas d'un serveur persistant. Le frontend gere ce cas avec un message clair indiquant que l'API n'est pas disponible sur le deploiement statique.

## Technologies

- React 18
- Vite
- React Router
- JavaScript
- CSS
- Node.js
- Express
- JSONL pour le stockage simple des messages
- Docker / Docker Compose
- Nginx pour servir la version de production Docker
- Tests smoke/API avec Node.js

## Structure du projet

```text
src/
  components/        Composants reutilisables
  data/              Donnees de contenu en JSON
  pages/             Pages React Router
  styles/            Styles globaux
server/
  server.js          API Express
public/
  images/            Assets publics
  robots.txt         Robots SEO
  sitemap.xml        Sitemap production
  _redirects         Regles Netlify SPA
tests/
  smoke.mjs          Tests smoke/API
docs/                Documentation projet
```

Les dossiers locaux `docs-*`, `Captures-*` et certains PDF peuvent etre conserves localement comme materiels de presentation Studi. Ils ne sont pas necessaires au fonctionnement du site.

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

Le composant `Seo` met a jour les titres, meta descriptions, Open Graph, Twitter Card, canonical et robots par page.

## Backend

Le backend est une API Express simple dans `server/server.js`.

Il gere:

- la verification de sante;
- l'envoi du formulaire de contact;
- la validation backend;
- un honeypot anti-spam;
- un rate limiting simple;
- le stockage des messages dans `data/messages.jsonl`;
- les endpoints administrateur pour lister, lire et mettre a jour les messages.

## Contact Form

La page `/contact` permet d'envoyer une demande projet.

Champs:

- nom;
- email;
- telephone;
- type de projet;
- budget approximatif;
- message;
- acceptation de la politique de confidentialite.

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
- nettoyage des caracteres dangereux;
- honeypot;
- rate limiting.

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
- `processed` / Traite;
- `replied` / Reponse envoyee.

L'acces aux endpoints admin est protege par une variable d'environnement `ADMIN_PASSWORD`.

## API endpoints

Public:

```text
GET  /api/health
POST /api/contact
```

Admin:

```text
GET   /api/admin/messages
GET   /api/admin/messages/:id
PATCH /api/admin/messages/:id
```

Les endpoints admin demandent le header:

```text
x-admin-password: <ADMIN_PASSWORD>
```

## Variables d'environnement

Creer un fichier `.env` en local si necessaire:

```env
PORT=3001
ADMIN_PASSWORD=change-this-admin-password
```

Variables supportees:

- `PORT`: port du serveur Express;
- `ADMIN_PASSWORD`: mot de passe administrateur;
- `DATA_DIR`: dossier de stockage des messages, utile pour les tests ou un environnement specifique.

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

Pour tester l'admin en local, definir `ADMIN_PASSWORD` avant de lancer le backend.

## Build production

```bash
npm run build
```

Le dossier genere est:

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

Les tests verifient:

- formulaire vide refuse;
- email invalide refuse;
- creation d'un message valide;
- protection admin avec mauvais mot de passe;
- lecture des messages admin;
- mise a jour du statut;
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

## SEO

Elements en place:

- titres par page;
- meta descriptions;
- canonical;
- Open Graph;
- Twitter Cards;
- `robots.txt`;
- `sitemap.xml`;
- textes alternatifs sur les images principales;
- lazy loading sur les images hors premier ecran.

URL de production utilisee dans le sitemap:

```text
https://blanc-studio.netlify.app
```

## Git workflow

Le projet utilise une branche principale:

```text
main
```

Les commits sont separes par etapes:

- corrections critiques;
- ameliorations UX/contenu;
- formulaire et backend messages;
- admin dashboard;
- SEO/accessibilite/performance;
- tests et verification finale.

## Limites et evolutions

### Limites actuelles

- Les messages sont stockes dans un fichier JSONL.
- Il n'y a pas encore de base de donnees relationnelle.
- Il n'y a pas d'envoi d'email automatique.
- La protection admin est volontairement simple avec `ADMIN_PASSWORD`.
- Les tests sont des smoke/API tests de base.
- Le deploiement Netlify sert le frontend statique; l'API Express doit etre lancee separement pour tester l'envoi reel et l'administration des messages.

### Evolutions possibles

- Migrer le stockage vers PostgreSQL ou SQLite.
- Ajouter une authentification administrateur plus complete.
- Ajouter des notifications email.
- Ajouter des tests end-to-end UI avec Playwright.
- Optimiser davantage les images lourdes.
- Ameliorer le suivi SEO avec un domaine final personnalise.
- Ajouter un monitoring simple des erreurs de formulaire.

## Preparation Studi

Le projet permet de presenter:

- contexte et cahier des charges;
- architecture frontend;
- architecture backend;
- formulaire de contact;
- API;
- espace administrateur;
- responsive design;
- SEO;
- securite minimale;
- tests;
- workflow Git;
- deployment frontend sur Netlify.
