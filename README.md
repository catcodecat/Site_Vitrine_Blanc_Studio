# Blanc Studio

## Présentation du projet

Blanc Studio est un site vitrine réalisé dans le cadre d'un projet de formation pour le titre professionnel Développeur Web et Web Mobile.

Le projet présente une studio fictif spécialisée dans le design d'intérieur, la visualisation 3D, les perspectives architecturales et les supports de présentation pour l'immobilier.

## Objectif

L'objectif est de présenter les services de Blanc Studio, afficher un portfolio de projets, montrer une équipe et permettre à un visiteur d'envoyer une demande de contact simulée.

## Technologies utilisées

- React
- Vite
- React Router
- JavaScript
- CSS
- Données locales en JSON
- Back-end simple avec Node.js et Express
- Docker et Nginx pour servir la version de production

## Fonctionnalités

- Navigation responsive.
- Pages séparées avec React Router.
- Page d'accueil avec hero, galerie, services, équipe, portfolio et témoignages.
- Portfolio filtrable par catégorie.
- Page détail projet.
- Formulaire de contact avec validation front-end.
- Enregistrement des demandes avec une API Express simple.
- Sauvegarde locale dans le navigateur si le serveur API n'est pas lancé.
- Témoignages avec quatre logos/icônes clients.
- Responsive mobile, tablette et desktop.

## Installation locale

```bash
npm install
npm run dev
```

Puis ouvrir :

```text
http://localhost:5173
```

Pour tester le back-end en local, ouvrir un deuxième terminal :

```bash
npm run backend
```

L'API est disponible ici :

```text
http://localhost:3001/api/health
```

## Lancer une version de production sans Docker

Si Docker n'est pas disponible sur la machine :

```bash
npm run build
npm run preview -- --port 8080
```

Puis ouvrir :

```text
http://localhost:8080
```

## Lancer le projet avec Docker

Commande :

```bash
docker compose up --build
```

Puis ouvrir :

```text
http://localhost:8080
```

Pour arrêter :

```bash
docker compose down
```

Docker permet ici de construire l'application avec Node.js, puis de servir le dossier `dist` avec Nginx. Si Docker ne peut pas être installé sur la machine, les fichiers restent présents pour montrer la configuration prévue.

## Méthode Git utilisée

La méthode prévue pour le projet :

- `main` pour la version stable ;
- `develop` pour le développement ;
- branches `feature` pour les fonctionnalités.

Exemples de branches :

- `feature/restore-design`
- `feature/testimonials`
- `feature/exam-docs`
- `feature/docker`

Commande utile pour montrer l'historique :

```bash
git log --oneline --graph --all
```

## Structure du projet

- `src/components` : composants réutilisables.
- `src/pages` : pages du site.
- `src/data` : données mockées en JSON.
- `src/styles` : styles globaux.
- `public/images` : images utilisées par l'application.
- `docs` : documentation pour l'examen.
- `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `nginx.conf` : configuration Docker.

## Données et back-end

Dans cette version, les données de contenu sont mockées localement en JSON. Le formulaire de contact utilise une petite API Express qui enregistre les demandes dans `data/messages.jsonl`. Il n'y a pas encore de vraie base de données ni d'envoi email.

## Accessibilité et responsive

Le site utilise des balises sémantiques, des textes alternatifs sur les images utiles, des labels de formulaire, un focus visible au clavier et une mise en page responsive.

## Limites

- Pas de vraie base de données.
- Pas d'envoi réel d'email.
- Pas d'espace administrateur.

## Améliorations possibles

- Ajouter une API.
- Connecter une base de données.
- Ajouter un espace administrateur.
- Permettre l'ajout de projets depuis une interface.
- Envoyer réellement les messages de contact par email.
