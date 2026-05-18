# Documentation technique

## Stack

Le projet utilise React, Vite, React Router, JavaScript et CSS.

## Architecture

- `src/components` contient les composants réutilisables.
- `src/pages` contient les pages du site.
- `src/data` contient les données locales en JSON.
- `src/styles/global.css` contient le style principal.
- `public/images` contient les images utilisées dans l'application.

## Routage

Les routes principales sont :

- `/`
- `/a-propos`
- `/services`
- `/portfolio`
- `/portfolio/:projectId`
- `/processus`
- `/contact`
- `/mentions-legales`

## Données

Dans cette version, les données sont mockées localement en JSON. Le formulaire de contact simule l'envoi et peut enregistrer les informations localement. Une future version pourrait être connectée à une API et à une base de données.

## Formulaire

Le formulaire contient :

- nom ;
- email ;
- téléphone facultatif ;
- type de projet ;
- budget facultatif ;
- message ;
- acceptation de la politique de confidentialité.

La validation est faite côté front-end. Le formulaire n'envoie pas de vrai email.

## Style visuel

Le style a été restauré à partir de la version sauvegardée du projet. Les éléments conservés sont le grand hero, les cartes de services, la galerie, la section équipe, les références clients avec logos, les couleurs foncées premium et les visuels déjà présents.

## Docker

Le projet possède une configuration Docker :

- `Dockerfile`
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

- Pas de clé API dans le code.
- Pas de mot de passe.
- Pas de données sensibles.
- Validation front-end du formulaire.
- Pas d'injection HTML volontaire dans les contenus.

## Limites actuelles

- Pas de vrai back-end.
- Pas de base de données.
- Pas d'envoi réel d'email.
- Données mockées localement.

## Améliorations futures

- Créer une API.
- Connecter une base de données.
- Ajouter une authentification.
- Ajouter un espace administrateur.
- Envoyer les messages par email.
