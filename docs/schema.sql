-- Schéma relationnel cible pour la migration du stockage JSONL vers SQLite.
-- Non implémenté à ce jour : l'application utilise data/messages.jsonl.
-- Les colonnes correspondent une à une aux champs produits par normalizeMessage().

CREATE TABLE messages (
  id            TEXT PRIMARY KEY,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  project_type  TEXT,
  budget        TEXT,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new','read','processed','replied')),
  admin_comment TEXT,
  replied_at    TEXT
);

CREATE INDEX idx_messages_status     ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Requêtes correspondant aux endpoints actuels

-- GET /api/admin/messages
-- Liste des demandes, de la plus récente à la plus ancienne.
-- Le paramètre :status vaut NULL lorsque aucun filtre n'est appliqué,
-- ce qui renvoie alors la totalité des demandes.
SELECT id, created_at, updated_at, name, email, phone, project_type,
       budget, message, status, admin_comment, replied_at
FROM messages
WHERE (:status IS NULL OR status = :status)
ORDER BY created_at DESC;

-- GET /api/admin/messages/:id
-- Lecture d'une demande par son identifiant. L'index de clé primaire évite
-- de parcourir toute la table, là où la version fichier relit et analyse
-- l'intégralité de messages.jsonl pour retrouver une seule ligne.
SELECT id, created_at, updated_at, name, email, phone, project_type,
       budget, message, status, admin_comment, replied_at
FROM messages
WHERE id = :id;

-- POST /api/contact
-- Enregistrement d'une nouvelle demande envoyée depuis le formulaire public.
-- Le statut initial est 'new' et aucun commentaire administrateur n'existe
-- encore, d'où la chaîne vide.
INSERT INTO messages (
  id, created_at, updated_at, name, email, phone, project_type,
  budget, message, status, admin_comment, replied_at
) VALUES (
  :id, :created_at, :created_at, :name, :email, :phone, :project_type,
  :budget, :message, 'new', '', NULL
);

-- PATCH /api/admin/messages/:id
-- Mise à jour du statut et du commentaire administrateur.
-- La date de réponse est renseignée au premier passage au statut 'replied'
-- et conservée ensuite ; tout autre statut la remet à NULL.
--
-- La transaction résout le problème de concurrence propre à la version
-- fichier : celle-ci relit l'intégralité de messages.jsonl, modifie une
-- ligne en mémoire puis réécrit le fichier entier. Deux modifications
-- simultanées depuis l'espace administrateur s'écraseraient donc l'une
-- l'autre. Ici, le moteur sérialise les écritures et l'opération est soit
-- entièrement appliquée, soit entièrement annulée.
BEGIN;

UPDATE messages
SET status        = :status,
    admin_comment = :admin_comment,
    updated_at    = :updated_at,
    replied_at    = CASE
                      WHEN :status = 'replied' THEN COALESCE(replied_at, :updated_at)
                      ELSE NULL
                    END
WHERE id = :id;

COMMIT;
