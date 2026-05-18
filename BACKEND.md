# Back-end - Blanc Studio

Cette version du projet ne contient pas de vrai back-end.

Le site est un projet front-end réalisé avec React et Vite. Les données du portfolio, des services, de l'équipe, des avis et de la FAQ sont stockées localement dans des fichiers JSON.

## Formulaire de contact

Le formulaire de contact valide les informations côté navigateur :

- nom obligatoire ;
- email obligatoire avec un format valide ;
- message obligatoire ;
- acceptation obligatoire de la politique de confidentialité.

Après validation, l'envoi est simulé. La demande est enregistrée dans le `localStorage` du navigateur.

Phrase à retenir pour l'examen :

> Dans cette version, les données sont mockées localement en JSON. Le formulaire de contact simule l'envoi et peut enregistrer les informations localement. Une future version pourrait être connectée à une API et à une base de données.

## Évolution possible

Une amélioration possible serait de créer plus tard une API pour :

- enregistrer les demandes dans une base de données ;
- envoyer un email à la studio ;
- gérer les projets depuis un espace administrateur.
