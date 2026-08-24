# Guide utilisateur

## Navigation

Le visiteur peut utiliser le menu principal pour accéder aux pages Accueil, À propos, Services, Portfolio, Processus et Contact.

Sur mobile, le bouton Menu permet d'ouvrir ou fermer la navigation.

## Consulter les services

La page Services présente les prestations de Blanc Studio sous forme de cartes simples. Chaque carte contient un titre, une description et une image.

## Consulter le portfolio

La page Portfolio affiche les projets fictifs de la studio. Le visiteur peut filtrer les projets par catégorie avec les boutons situés au-dessus de la liste.

## Ouvrir une page projet

Chaque carte projet contient un lien "Voir le projet". Ce lien ouvre une page détail avec le lieu, l'année, les services réalisés, une description longue et des images complémentaires.

## Envoyer une demande de contact

La page Contact contient un formulaire avec les champs suivants :

- nom ;
- email ;
- téléphone ;
- type de projet ;
- budget approximatif ;
- message ;
- acceptation de la politique de confidentialité.

Les champs nom, email, message et acceptation sont obligatoires. Après validation, un message de confirmation s'affiche.

La demande est réellement envoyée au serveur, qui la valide puis l'enregistre.
Elle apparaît ensuite dans l'espace administrateur du site.

## Espace administrateur

L'espace administrateur est accessible à l'adresse `/admin`. Il demande le mot de
passe défini par l'administrateur du site. La connexion reste valable 30 minutes,
puis il faut se reconnecter.

Une fois connecté, il est possible de :

- consulter la liste des demandes reçues, de la plus récente à la plus ancienne ;
- filtrer les demandes par statut ;
- ouvrir une demande pour en lire le détail ;
- changer son statut : Nouveau, Lu, Traité, Réponse envoyée ;
- ajouter un commentaire interne à une demande.

Le bouton de déconnexion invalide immédiatement la session côté serveur.
