# Notes pour le dossier professionnel

## Activité type 1 : Développer la partie front-end d'une application web ou web mobile sécurisée

### Exemple : Création de l'interface responsive du site Blanc Studio

J'ai créé et organisé l'interface du site vitrine Blanc Studio avec React et React Router. J'ai structuré l'application en neuf routes, avec des composants réutilisables regroupés par responsabilité: `components/` pour les éléments d'interface, `pages/` pour les vues, `data/` pour le contenu en JSON, `styles/` pour les styles globaux. Le contenu éditorial est séparé du code, ce qui permet de modifier les services, les projets ou les témoignages sans toucher aux composants.

J'ai restauré le style de la première version sauvegardée du projet pour conserver l'identité visuelle: grand hero, galerie, cartes de services, équipe, témoignages avec logos et ambiance premium. La mise en page est adaptable et ne produit aucun débordement horizontal à 360 px de large.

J'ai intégré les recommandations d'accessibilité dès la conception plutôt qu'en correction finale:

- structure sémantique avec `main`, `nav`, `article`, et un seul `h1` par page;
- attribut `lang="fr"` sur le document;
- textes alternatifs sur toutes les images, avec `alt=""` volontaire sur les images purement décoratives;
- indicateur de focus visible via `:focus-visible`;
- champs de formulaire reliés à leurs messages d'erreur par `aria-invalid` et `aria-describedby`.

J'ai également développé un composant `Seo` qui met à jour, pour chaque route, le titre, la méta description, l'URL canonique, les balises Open Graph et Twitter Card, ainsi que la directive robots. Les pages d'administration et d'erreur 404 sont en `noindex, nofollow`.

Le formulaire de contact comporte une validation côté navigateur qui donne un retour immédiat: champs obligatoires, format d'email, consentement à la politique de confidentialité. Cette validation est un confort d'usage, pas une protection: le serveur revalide tout de son côté, sans faire confiance au client.

### Moyens utilisés

React 18, Vite, React Router, JavaScript, CSS, Visual Studio Code, les DevTools du navigateur pour l'inspection du DOM et l'analyse réseau, Git pour le versionnement, Docker et Nginx pour la configuration de production.

### Avec qui j'ai travaillé

J'ai travaillé principalement seule dans le cadre de ma formation. Je me suis appuyée sur le cahier des charges, la documentation officielle de React et de Vite, les critères WCAG pour l'accessibilité, et les ressources pédagogiques de la formation.

### Difficultés rencontrées

La principale difficulté a été de conserver l'identité visuelle de la première version, écrite en HTML et CSS statiques, tout en la réorganisant en composants React. Certains effets dépendaient d'un script d'animation au défilement qui n'avait pas d'équivalent direct dans l'architecture React; j'ai choisi de neutraliser l'effet plutôt que de laisser du contenu invisible si le script échouait, en privilégiant la lisibilité du contenu sur l'animation.

Une deuxième difficulté a porté sur le contraste des couleurs. La teinte du texte secondaire, héritée de la maquette d'origine, ne satisfaisait pas le rapport de 4,5:1 exigé par le niveau AA des WCAG. J'ai recalculé le rapport de contraste de chaque paire de couleurs de la palette et ajusté la variable CSS concernée pour atteindre la conformité sans modifier l'apparence générale du site.

## Activité type 2 : Développer la partie back-end d'une application web ou web mobile sécurisée

### Exemple : Développement de l'API et de l'espace administrateur de Blanc Studio

J'ai développé une API Express qui expose sept endpoints: deux publics (vérification de santé et envoi du formulaire de contact) et cinq réservés à l'administration (connexion, déconnexion, liste des messages, consultation d'un message, mise à jour de son statut).

Les demandes envoyées depuis le formulaire sont normalisées puis enregistrées dans un fichier `messages.jsonl`, à raison d'une ligne JSON par message. L'écriture se fait par ajout en fin de fichier, ce qui rend l'opération atomique et permet à plusieurs visiteurs d'envoyer une demande simultanément sans conflit.

J'ai mis en place plusieurs mesures de sécurité côté serveur:

- **Validation serveur indépendante du front-end**: format d'email, message non vide, limite de taille sur chaque champ.
- **Honeypot anti-spam**: un champ supplémentaire, invisible pour l'utilisateur et retiré de l'ordre de tabulation, que les robots remplissent automatiquement. Il est masqué hors écran plutôt qu'en `display:none`, parce que certains robots détectent ce dernier.
- **Rate limiting différencié selon le risque**: cinq envois par minute sur le formulaire de contact, vingt requêtes par quart d'heure sur les routes d'administration, cinq tentatives par quart d'heure sur la connexion.
- **Authentification par token de session**: le mot de passe administrateur ne circule qu'une seule fois, à la connexion. Le serveur renvoie ensuite un token aléatoire de 32 octets, valable trente minutes, révocable par une déconnexion côté serveur. Une version précédente envoyait le mot de passe dans un en-tête à chaque requête; j'ai corrigé ce point et ajouté un test qui vérifie que l'ancien en-tête est bien refusé.
- **Comparaison du mot de passe en temps constant** avec `crypto.timingSafeEqual`. Une comparaison classique s'arrête au premier caractère différent, ce qui rend le temps de réponse exploitable pour deviner le mot de passe caractère par caractère. J'ai traité explicitement le cas des longueurs différentes, sans quoi la fonction lève une exception qui divulguerait elle-même la longueur attendue.
- **En-têtes de sécurité HTTP** via Helmet.
- **Lecture de l'adresse IP réelle derrière le reverse proxy** (`trust proxy`), faute de quoi le rate limiting s'appliquerait à tous les visiteurs confondus au lieu de s'appliquer par visiteur.

La page `/admin` n'est volontairement pas masquée côté client. Elle s'ouvre, mais reste vide tant que l'API n'a pas validé un token: aucune donnée n'est présente dans le bundle JavaScript. Cacher une route dans le front-end ne protège de personne, puisque le code est de toute façon téléchargé par le navigateur.

J'ai écrit des tests d'intégration qui démarrent un vrai serveur sur un port dédié, avec un répertoire de données isolé, et parcourent le cycle complet en HTTP. Quatorze vérifications couvrent aussi les cas négatifs: formulaire vide, email invalide, mauvais mot de passe, token invalide, token utilisé après déconnexion.

### Documentation du déploiement

J'ai décrit et configuré deux modes de déploiement. Le front-end statique est publié sur Netlify, avec une règle de réécriture pour les routes de l'application monopage.

Pour le déploiement complet, j'ai écrit une configuration Docker en deux services: le premier construit le front-end avec Node puis le sert avec Nginx, le second exécute l'API Express. Le service d'API n'expose aucun port sur la machine hôte: il n'est joignable que par Nginx à travers le réseau interne Docker, et un seul port est ouvert vers l'extérieur. Nginx relaie les requêtes `/api/` vers l'API et sert les fichiers statiques pour tout le reste. Le mot de passe administrateur est fourni par un fichier `.env` qui n'est jamais versionné.

### Moyens utilisés

Node.js, Express, le module `crypto` de Node, Helmet, un middleware de rate limiting, un script d'intégration écrit en Node avec `fetch` et `child_process`, curl pour vérifier le comportement de l'API sur des requêtes malformées, Docker et Docker Compose, Nginx.

### Difficultés rencontrées

Le choix du stockage a demandé une décision assumée. Une base relationnelle aurait été la solution attendue, mais pour un volume de quelques dizaines de demandes et un déploiement à instance unique, j'ai retenu un fichier JSONL, plus simple à déployer et à inspecter. J'ai conçu la normalisation des messages de façon à ce que chaque champ corresponde directement à une colonne, pour que le passage à SQLite soit une opération mécanique.

Ce choix a des limites que j'ai identifiées et documentées: la mise à jour d'un statut relit et réécrit tout le fichier, donc deux modifications simultanées depuis l'espace administrateur s'écraseraient. Avec un seul administrateur le cas ne se présente pas, et une transaction SQL le résoudrait sans code supplémentaire.

La deuxième difficulté a concerné le stockage du token côté navigateur. Il est actuellement en `sessionStorage`, donc accessible au JavaScript de la page. J'ai réduit le risque par une durée de vie courte sans renouvellement et une déconnexion côté serveur, et vérifié qu'aucun vecteur d'injection n'existe dans l'application: React échappe ses sorties et `dangerouslySetInnerHTML` n'est utilisé nulle part. La solution rigoureuse reste un cookie `httpOnly` avec `SameSite=Strict`, inaccessible au JavaScript.

## Utilisation de Git

J'ai utilisé Git pour conserver l'historique du projet. Les commits sont regroupés par étapes fonctionnelles: restauration du style initial, ajout des pages React, formulaire et validation, back-end et stockage des messages, espace administrateur, SEO et accessibilité, tests et vérification finale. Cet historique permet de retracer les décisions techniques et de revenir en arrière si une modification introduit une régression.

## Améliorations possibles

- Migrer le stockage vers SQLite: index sur la date, lecture d'un message par identifiant sans parcourir tout le fichier, transactions sur la mise à jour de statut.
- Passer le token d'administration en cookie `httpOnly` avec `SameSite=Strict`.
- Ajouter des gestionnaires d'erreur et de route inconnue renvoyant du JSON, pour que l'API respecte son contrat en toutes circonstances.
- Ajouter les en-têtes de sécurité au niveau de Nginx, qui sert le HTML, en complément de Helmet qui protège l'API.
- Envoyer une notification par email à la réception d'une demande.
- Convertir les images lourdes en WebP et servir plusieurs tailles.
- Ajouter ESLint, Prettier et un workflow d'intégration continue exécutant build et tests à chaque envoi.
- Ajouter des tests d'interface avec Playwright.
- Ajouter du prerender pour que les balises méta soient présentes dans le HTML servi aux robots qui n'exécutent pas JavaScript.
