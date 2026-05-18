# Blanc Studio

## Présentation du projet

Blanc Studio est un site vitrine statique réalisé dans le cadre d'un projet de formation pour le titre professionnel Développeur Web et Web Mobile.

Le site présente une studio fictif spécialisée dans le design d'intérieur, la visualisation 3D, l'architecture et les supports de présentation immobilière.

## Objectif

L'objectif est de présenter les services de Blanc Studio, afficher des exemples de projets et permettre à un visiteur d'envoyer une demande de contact simulée.

## Technologies utilisées

- HTML
- CSS
- JavaScript
- Vite pour lancer et construire le site
- Docker avec Nginx pour servir la version de production

## Fonctionnalités

- Navigation responsive
- Page d'accueil avec hero
- Galerie de visuels
- Présentation des services
- Processus de travail
- Portfolio simple
- Avis clients fictifs
- Formulaire de contact avec validation front-end
- Message de confirmation après envoi
- Design responsive mobile, tablette et desktop

## Installation locale

```bash
npm install
npm run dev
```

Le projet est ensuite disponible ici :

```text
http://localhost:5173
```

## Lancer une version de production sans Docker

Si Docker n'est pas disponible sur la machine, il est possible de lancer une prévisualisation de production :

```bash
npm run build
npm run preview -- --port 8080
```

Puis ouvrir :

```text
http://localhost:8080
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

Docker permet ici de créer un environnement d'exécution stable pour servir la version de production du site avec Nginx.

Si Docker ne peut pas être installé sur une machine limitée en mémoire RAM, la configuration reste présente dans le projet pour montrer la méthode prévue.

## Méthode Git utilisée

La méthode prévue pour ce projet est simple :

- `main` contient la version stable du projet ;
- `develop` peut servir au développement ;
- les branches `feature` servent à ajouter une fonctionnalité précise ;
- les commits sont réguliers avec des messages clairs.

Exemples de branches :

- `feature/site-vitrine`
- `feature/contact-form`
- `feature/documentation`
- `feature/docker`

Commande utile pour montrer l'historique :

```bash
git log --oneline --graph --all
```

## Structure du projet

- `index.html` : structure principale du site.
- `css/style.css` : mise en page, couleurs, responsive design.
- `js/script.js` : menu mobile, animations simples et formulaire.
- `public/images` : images utilisées par Vite.
- `images` : dossier d'images conservé depuis la version initiale.
- `docs` : documentation pour l'examen.
- `Dockerfile`, `docker-compose.yml`, `nginx.conf` : configuration Docker.

## Données

Les contenus sont écrits directement dans le HTML pour garder un projet simple et proche d'un site vitrine statique.

## Accessibilité et responsive

Le site utilise une structure HTML sémantique, des labels associés aux champs du formulaire, des textes alternatifs pour les images utiles, un focus visible au clavier et une mise en page adaptée aux écrans mobiles, tablettes et desktop.

## Sécurité

- Validation front-end du formulaire.
- Pas de données sensibles dans le code.
- Pas de clé API.
- Pas de mot de passe.
- Pas de vrai envoi email dans cette version.
- Les données du formulaire sont enregistrées localement dans le navigateur.

## Améliorations possibles

- Ajouter plusieurs pages séparées.
- Ajouter un vrai back-end.
- Connecter une base de données.
- Créer un espace administrateur.
- Envoyer réellement les messages de contact par email.
