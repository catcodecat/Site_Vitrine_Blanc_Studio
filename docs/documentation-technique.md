# Documentation technique

## Stack

Le projet utilise React avec Vite. Le routage est fait avec React Router. Les styles sont écrits en CSS classique.

## Architecture

- `src/components` contient les composants réutilisables.
- `src/pages` contient les pages du site.
- `src/data` contient les données locales en JSON.
- `src/styles/global.css` contient les styles globaux.
- `public/images` contient les images servies par Vite.

## Composants

Les principaux composants sont :

- `Header` pour la navigation ;
- `Footer` pour le pied de page ;
- `Layout` pour la structure commune ;
- `ServiceCard` pour les services ;
- `ProjectCard` pour les projets ;
- `ContactForm` pour le formulaire ;
- `Button` pour les boutons et liens principaux.

## Données

Les données sont locales et mockées. Les fichiers utilisés sont :

- `services.json` ;
- `projects.json` ;
- `testimonials.json` ;
- `faq.json`.

Dans cette version, il n'y a pas de vraie API ni de base de données.

## Routage

Les routes principales sont :

- `/` ;
- `/a-propos` ;
- `/services` ;
- `/portfolio` ;
- `/portfolio/:projectId` ;
- `/processus` ;
- `/contact` ;
- `/mentions-legales` ;
- page 404 pour les routes inconnues.

## Formulaire

Le formulaire vérifie côté front-end :

- le nom obligatoire ;
- le format de l'email ;
- le message obligatoire ;
- l'acceptation obligatoire.

Après validation, l'envoi est simulé et la demande est enregistrée dans le localStorage du navigateur.

## Responsive

Le CSS contient des media queries pour adapter le menu, les grilles, les images et le formulaire sur mobile, tablette et desktop.

## Accessibilité

Le projet utilise :

- une structure HTML sémantique ;
- des labels associés aux champs ;
- des textes alternatifs pour les images utiles ;
- un focus visible au clavier ;
- des liens et boutons explicites ;
- un contraste lisible.

## Docker

Le projet possède un `Dockerfile` multi-stage. Node.js construit l'application avec `npm run build`, puis Nginx sert le dossier `dist`.

Commande :

```bash
docker compose up --build
```

Adresse :

```text
http://localhost:8080
```

## Git

Le projet a été organisé avec Git afin de garder une trace des principales étapes de développement. Les commits permettent d'identifier l'ajout des pages, du portfolio, du formulaire, de la documentation et de la configuration Docker.

## Limites actuelles

- Pas de vrai back-end.
- Pas de base de données.
- Pas d'envoi réel d'email.
- Pas d'espace administrateur.

## Améliorations futures

- Ajouter une API.
- Connecter une base de données.
- Ajouter une authentification.
- Créer un espace d'administration pour gérer les projets.
- Envoyer réellement les messages de contact.
