# Documentation technique

## Stack

Le projet utilise HTML, CSS et JavaScript. Vite sert à lancer le site en local et à construire une version de production.

## Architecture

- `index.html` contient la structure du site.
- `css/style.css` contient les styles, la mise en page et le responsive.
- `js/script.js` contient les interactions simples.
- `public/images` contient les images servies par Vite.
- `docs` contient les documents utiles pour l'examen.

## Pages et sections

Le site est organisé en une page vitrine avec plusieurs sections :

- accueil ;
- galerie ;
- services ;
- processus ;
- portfolio ;
- références ;
- contact.

Ce choix garde le projet simple et proche de la première version.

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

Si Docker ne peut pas être installé sur la machine, la configuration reste présente dans le projet. Le site peut aussi être présenté avec :

```bash
npm run build
npm run preview -- --port 8080
```

## Git

Le projet a été organisé avec Git afin de garder une trace des principales étapes de développement. Les commits permettent d'identifier l'ajout du site vitrine, du formulaire, de la documentation et de la configuration Docker.

## Limites actuelles

- Pas de vrai back-end.
- Pas de base de données.
- Pas d'envoi réel d'email.
- Pas d'espace administrateur.

## Améliorations futures

- Ajouter plusieurs pages si le projet évolue.
- Ajouter une API.
- Connecter une base de données.
- Ajouter une authentification.
- Créer un espace d'administration pour gérer les projets.
- Envoyer réellement les messages de contact.
