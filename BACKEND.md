# Back-end - Blanc Studio

Cette version du projet contient un petit back-end Node.js avec Express.

Le site est réalisé avec React et Vite. Les données du portfolio, des services, de l'équipe et des avis sont stockées localement dans des fichiers JSON.

## Formulaire de contact

Le formulaire de contact valide les informations côté navigateur :

- nom obligatoire ;
- email obligatoire avec un format valide ;
- message obligatoire ;
- acceptation obligatoire de la politique de confidentialité.

Après validation, la demande est envoyée à l'API :

```text
POST /api/contact
```

Le serveur enregistre les messages dans :

```text
data/messages.jsonl
```

Le formulaire de contact envoie une requête `POST /api/contact` à l'API Express.
Le serveur valide les données indépendamment de la validation navigateur, vérifie
le champ honeypot, applique le rate limiting, puis enregistre la demande dans
`data/messages.jsonl` par ajout en fin de fichier (`appendFileSync`). Cette
opération est atomique : plusieurs visiteurs peuvent envoyer une demande
simultanément sans risque de conflit.

Si l'API n'est pas joignable — c'est le cas sur le déploiement statique Netlify,
où aucun serveur Node ne tourne — le front-end affiche un message indiquant que
le service est momentanément indisponible. Aucune donnée n'est conservée dans le
navigateur.

Phrase à retenir pour l'examen :

> Dans cette version, les données de contenu sont mockées localement en JSON. Le formulaire de contact utilise une petite API Express et enregistre les demandes dans un fichier JSONL. Une future version pourrait être connectée à une vraie base de données.

## Évolution possible

Une amélioration possible serait de faire évoluer l'API pour :

- enregistrer les demandes dans une base de données ;
- envoyer un email à la studio ;
- gérer les projets depuis un espace administrateur.
