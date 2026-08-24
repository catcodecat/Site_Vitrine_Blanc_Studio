# Documentation technique

## Stack

Le projet utilise React, Vite, React Router, JavaScript, CSS et un petit back-end Node.js avec Express.

## Architecture

- `src/components` contient les composants réutilisables.
- `src/pages` contient les pages du site.
- `src/data` contient les données locales en JSON.
- `src/styles/global.css` contient le style principal.
- `public/images` contient les images utilisées dans l'application.

## Routage

Les routes principales sont :

- `/` — accueil
- `/a-propos` — présentation du studio et de l'équipe
- `/services` — détail des prestations
- `/portfolio` — liste des projets
- `/portfolio/:projectId` — fiche d'un projet
- `/processus` — étapes de travail
- `/contact` — formulaire de demande
- `/admin` — espace administrateur (`noindex, nofollow`)
- route 404 — page non trouvée (`noindex, nofollow`)

## Données

Dans cette version, les données de contenu sont mockées localement en JSON. Le formulaire de contact utilise une API Express simple et les demandes sont enregistrées dans `data/messages.jsonl`.

Il n'y a pas encore de vraie base de données. Une future version pourrait connecter l'API à une base de données.

## Vérification du back-end

Le back-end est développé avec Express dans le fichier `server/server.js`.
Il se lance depuis la racine du projet avec la commande :

```bash
npm run backend
```

Une fois le serveur lancé, l'API écoute sur le port 3001.

La route de test est :

```text
http://127.0.0.1:3001/api/health
```

Réponse attendue :

```json
{ "ok": true, "service": "blanc-studio-api" }
```

Cette route permet de vérifier que le serveur Express fonctionne correctement.

## Formulaire

Le formulaire contient :

- nom ;
- email ;
- téléphone facultatif ;
- type de projet ;
- budget facultatif ;
- message ;
- acceptation de la politique de confidentialité.

La validation est faite côté front-end et côté back-end. Le formulaire n'envoie pas de vrai email.

## Style visuel

Le style a été restauré à partir de la version sauvegardée du projet. Les éléments conservés sont le grand hero, les cartes de services, la galerie, la section équipe, les références clients avec logos, les couleurs foncées premium et les visuels déjà présents.

## Docker

Le projet possède une configuration Docker :

- `Dockerfile`
- `Dockerfile.api`
- `docker-compose.yml`
- `.dockerignore`
- `nginx.conf`

Commande :

```bash
docker compose up --build
```

Adresse :

```text
http://localhost:8080
```

Si Docker n'est pas disponible, le site peut être lancé avec :

```bash
npm run build
npm run preview -- --port 8080
```

## Git

Git est utilisé pour conserver l'historique des principales étapes du projet. Les commits permettent de montrer la restauration du style, l'ajout des pages, les données, la documentation et la configuration Docker.

## Sécurité

L'accès à l'espace administrateur est protégé par la variable d'environnement
`ADMIN_PASSWORD`, fournie via un fichier `.env` local qui n'est jamais versionné.

Le mot de passe ne circule qu'une seule fois, lors de la connexion à
`POST /api/admin/login`. Le serveur renvoie ensuite un token de session aléatoire
de 32 octets, valable 30 minutes, révocable par une déconnexion côté serveur.
Les requêtes suivantes s'authentifient avec l'en-tête `x-admin-token`.

La comparaison du mot de passe utilise `crypto.timingSafeEqual`, qui traite le
buffer entier quelle que soit la position du premier caractère différent. Une
comparaison classique s'interrompt au premier écart, ce qui rend le temps de
réponse exploitable pour deviner le mot de passe caractère par caractère. Le cas
des longueurs différentes est traité explicitement, sans quoi la fonction lèverait
une exception qui divulguerait elle-même la longueur attendue.

Autres mesures en place :

- validation systématique côté serveur, indépendante de la validation navigateur ;
- honeypot anti-spam sur le formulaire de contact, masqué hors écran avec
  `aria-hidden` et `tabindex="-1"` plutôt qu'en `display:none` ;
- rate limiting différencié selon le risque : 5 envois par minute sur le formulaire
  de contact, 20 requêtes par quart d'heure sur les routes d'administration,
  5 tentatives par quart d'heure sur la connexion ;
- en-têtes de sécurité HTTP via Helmet ;
- lecture de l'adresse IP réelle derrière le reverse proxy (`trust proxy`), faute
  de quoi le rate limiting s'appliquerait à tous les visiteurs confondus ;
- dans `docker-compose.yml`, le service d'API n'expose aucun port sur l'hôte : il
  n'est joignable que par Nginx sur le réseau interne Docker.

## Limites actuelles

- Back-end volontairement simple.
- Pas de base de données.
- Pas d'envoi réel d'email.
- Données mockées localement.

## Améliorations futures

- Migrer le stockage vers SQLite : index sur la date, lecture par identifiant sans
  parcourir tout le fichier, transactions sur la mise à jour de statut.
- Passer le token d'administration en cookie `httpOnly` avec `SameSite=Strict`.
- Ajouter des gestionnaires d'erreur et de route inconnue renvoyant du JSON, pour
  que l'API respecte son contrat en toutes circonstances.
- Ajouter les en-têtes de sécurité au niveau de Nginx, qui sert le HTML, en
  complément de Helmet qui protège l'API.
- Envoyer une notification par email à la réception d'une demande.
- Ajouter ESLint, Prettier et un workflow d'intégration continue.
- Ajouter des tests d'interface avec Playwright.
- Ajouter du prerender pour les balises méta.
