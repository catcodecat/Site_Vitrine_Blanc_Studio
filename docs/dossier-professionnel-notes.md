# Notes pour le dossier professionnel

## Activité type 1 : Développer la partie front-end d'une application web ou web mobile sécurisée

### Exemple : Création de l'interface responsive du site Blanc Studio

J'ai créé et organisé l'interface du site vitrine Blanc Studio avec React. J'ai travaillé sur la structure des pages, les composants réutilisables, la navigation, les cartes de services, le portfolio et le formulaire de contact. J'ai aussi veillé à garder une cohérence graphique et une bonne adaptation aux écrans mobiles.

J'ai restauré le style de la première version sauvegardée du projet pour conserver l'identité visuelle: grand hero, galerie, cartes de services, équipe, témoignages avec logos et ambiance premium.

### Moyens utilisés

J'ai utilisé React, Vite, React Router, JavaScript, CSS, Visual Studio Code, le navigateur, les DevTools, Git et Docker pour la configuration de production.

### Avec qui j'ai travaillé

J'ai travaillé principalement seule dans le cadre de ma formation. Je me suis appuyée sur le cahier des charges, la documentation officielle et les ressources pédagogiques.

### Difficultés rencontrées

Une difficulté a été de garder le style initial du site tout en ajoutant une structure plus propre avec plusieurs pages React. J'ai aussi dû rester honnête sur les limites du projet, car il n'y a pas encore de vrai back-end.

## Activité type 2 : Développer la partie back-end d'une application web ou web mobile sécurisée

Dans cette version du projet, j'ai ajouté un back-end simple avec Node.js et Express. Les données de contenu sont organisées localement en fichiers JSON. Le formulaire de contact contient une validation côté front-end et côté back-end, puis les demandes sont enregistrées dans un fichier `messages.jsonl`.

Il n'y a pas encore de vraie base de données ni d'envoi réel d'email. J'ai gardé cette limite volontairement pour rester sur un projet clair et réaliste.

## Utilisation de Git

J'ai utilisé Git pour conserver l'historique du projet. Les commits permettent de montrer les étapes importantes: restauration du style initial, ajout des pages, amélioration du formulaire, documentation et configuration Docker.

## Utilisation de Docker

J'ai ajouté une configuration Docker pour montrer comment le front-end peut être construit avec Node.js puis servi avec Nginx, et comment l'API Express peut fonctionner dans un deuxième service. Sur une machine limitée en mémoire RAM, Docker peut être difficile à lancer, mais les fichiers sont présents et documentés.

## Améliorations possibles

- Ajouter une vraie API.
- Connecter une base de données.
- Ajouter un espace administrateur.
- Envoyer réellement les messages de contact.
- Ajouter une gestion dynamique du portfolio.
