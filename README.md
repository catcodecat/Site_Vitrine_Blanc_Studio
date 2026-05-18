# Blanc Studio

## Présentation du projet

Blanc Studio est un site vitrine réalisé dans le cadre d'un projet de formation pour le titre professionnel Développeur Web et Web Mobile.

Le site présente une studio fictif spécialisée dans le design d'intérieur, la visualisation 3D et les supports de présentation pour des projets d'architecture et d'immobilier.

## Objectif

L'objectif est de présenter les services de Blanc Studio, afficher un portfolio de projets et permettre à un visiteur d'envoyer une demande de contact.

## Technologies utilisées

- React
- Vite
- React Router
- JavaScript
- CSS
- Données locales en JSON
- Docker avec Nginx pour servir la version de production

## Fonctionnalités

- Navigation principale responsive
- Pages séparées avec React Router
- Page d'accueil avec hero
- Présentation de la studio
- Liste des services
- Portfolio avec filtres par catégorie
- Page détail pour chaque projet
- Page processus
- Formulaire de contact avec validation front-end
- Message de confirmation après envoi
- Mentions légales
- Page 404
- Mise en page responsive mobile, tablette et desktop

## Installation locale

```bash
npm install
npm run dev
```

Le projet est ensuite disponible à l'adresse indiquée par Vite, en général :

```text
http://localhost:5173
```

## Lancer le projet avec Docker

Le projet peut aussi être lancé dans un conteneur Docker.

Commande :

```bash
docker compose up --build
```

Puis ouvrir le site dans le navigateur :

```text
http://localhost:8080
```

Pour arrêter le conteneur :

```bash
docker compose down
```

Docker permet ici de créer un environnement d'exécution stable pour servir la version de production du site.

## Méthode Git utilisée

La méthode prévue pour ce projet est simple :

- `main` contient la version stable du projet ;
- `develop` sert au développement ;
- les branches `feature` servent à ajouter une fonctionnalité précise ;
- les commits sont réguliers avec des messages clairs.

Exemples de commandes :

```bash
git init
git branch -M main
git checkout -b develop
```

Exemples de branches :

- `feature/pages`
- `feature/portfolio`
- `feature/contact-form`
- `feature/documentation`
- `feature/docker`

Exemples de commits :

```bash
git add .
git commit -m "Initialisation du projet Blanc Studio"

git add .
git commit -m "Ajout des pages principales du site vitrine"

git add .
git commit -m "Ajout du portfolio et des données projets"

git add .
git commit -m "Ajout du formulaire de contact avec validation"

git add .
git commit -m "Ajout de la documentation du projet"

git add .
git commit -m "Ajout de la configuration Docker"
```

Commande utile pour montrer l'historique :

```bash
git log --oneline --graph --all
```

## Structure du projet

- `src/components` : composants réutilisables.
- `src/pages` : pages du site.
- `src/data` : données locales en JSON.
- `src/styles` : styles globaux.
- `public/images` : images utilisées par le site.
- `docs` : documentation pour l'examen.
- `Dockerfile` et `docker-compose.yml` : configuration Docker.

## Données

Les données sont locales et mockées en JSON. Il n'y a pas de vraie base de données dans cette version.

## Accessibilité et responsive

Le site utilise des balises HTML sémantiques, des labels associés aux champs du formulaire, des textes alternatifs pour les images utiles, un focus visible au clavier et une mise en page adaptée aux écrans mobiles, tablettes et desktop.

## Sécurité

- Validation front-end du formulaire.
- Pas de données sensibles dans le code.
- Pas de clé API.
- Pas de mot de passe.
- Pas de vrai envoi email dans cette version.
- Les données du formulaire sont enregistrées localement dans le navigateur.

## Améliorations possibles

- Ajouter un vrai back-end.
- Connecter une base de données.
- Créer un espace administrateur.
- Ajouter l'upload de projets.
- Ajouter une authentification.
- Envoyer réellement les messages de contact par email.
