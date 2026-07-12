import { useEffect, useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";

const statuses = {
  new: "Nouveau",
  read: "Lu",
  processed: "Traité",
  replied: "Réponse envoyée",
};

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function clearSession() {
  sessionStorage.removeItem("blancAdminToken");
  sessionStorage.removeItem("blancAdminTokenExpiry");
}

function storeSession(token, expiresAt) {
  sessionStorage.setItem("blancAdminToken", token);
  sessionStorage.setItem("blancAdminTokenExpiry", String(expiresAt));
}

function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => sessionStorage.getItem("blancAdminToken") || "");
  const [tokenExpiry, setTokenExpiry] = useState(() => Number(sessionStorage.getItem("blancAdminTokenExpiry")) || 0);
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [adminComment, setAdminComment] = useState("");
  const [status, setStatus] = useState("new");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedMessage = messages.find((message) => message.id === selectedId) || messages[0] || null;
  const filteredMessages = useMemo(
    () => (statusFilter === "all" ? messages : messages.filter((message) => message.status === statusFilter)),
    [messages, statusFilter],
  );

  function endSession() {
    clearSession();
    setToken("");
    setTokenExpiry(0);
    setMessages([]);
    setSelectedId("");
  }

  async function callAdminApi(path, authToken, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": authToken,
        ...options.headers,
      },
    });
    let result;
    try {
      result = await response.json();
    } catch (error) {
      result = {
        ok: false,
        message: "Le serveur API n'est pas disponible sur ce déploiement.",
      };
    }

    if (response.status === 401) {
      endSession();
    }

    if (!response.ok || result.ok === false) {
      throw new Error(result.message || "La requête administrateur a échoué.");
    }

    return result;
  }

  async function loadMessages(authToken) {
    setIsLoading(true);
    setFeedback("");

    try {
      const result = await callAdminApi("/api/admin/messages", authToken);
      setMessages(result.messages);
      setSelectedId((current) => current || result.messages[0]?.id || "");
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(event) {
    event.preventDefault();
    setIsLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      let result;
      try {
        result = await response.json();
      } catch (error) {
        result = {
          ok: false,
          message: "Le serveur API n'est pas disponible sur ce déploiement.",
        };
      }

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || "Connexion refusée.");
      }

      storeSession(result.token, result.expiresAt);
      setToken(result.token);
      setTokenExpiry(result.expiresAt);
      setPassword("");
      setIsLoading(false);
      await loadMessages(result.token);
    } catch (error) {
      setFeedback(error.message);
      setIsLoading(false);
    }
  }

  async function logout() {
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { "x-admin-token": token },
        });
      } catch (error) {
        // Deconnexion locale de toute facon, meme si l'appel serveur echoue.
      }
    }
    endSession();
    setFeedback("");
  }

  async function saveMessage(event) {
    event.preventDefault();

    if (!selectedMessage || !token) {
      return;
    }

    setIsLoading(true);
    setFeedback("");

    try {
      const result = await callAdminApi(`/api/admin/messages/${selectedMessage.id}`, token, {
        method: "PATCH",
        body: JSON.stringify({ status, adminComment }),
      });
      setMessages((current) => current.map((message) => (message.id === result.message.id ? result.message : message)));
      setFeedback("Message mis à jour.");
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedMessage) {
      setStatus(selectedMessage.status);
      setAdminComment(selectedMessage.adminComment || "");
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (token && tokenExpiry > Date.now()) {
      loadMessages(token);
    } else if (token) {
      endSession();
    }
    // Chargement automatique une seule fois au montage si une session valide existe deja.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="admin-page section page">
      <Seo title="Administration" description="Espace administrateur Blanc Studio." noIndex />
      <div className="section-heading reveal">
        <p className="eyebrow">Administration</p>
        <h1>Messages entrants</h1>
        <p>Suivez les demandes reçues depuis le formulaire de contact Blanc Studio.</p>
      </div>

      {!token ? (
        <form className="admin-login" onSubmit={login}>
          <label htmlFor="admin-password">Mot de passe administrateur</label>
          <div>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Se connecter
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-login">
          <button className="btn" type="button" onClick={logout} disabled={isLoading}>
            Se déconnecter
          </button>
        </div>
      )}

      {feedback && <p className="form-message" role="status">{feedback}</p>}

      {messages.length > 0 && (
        <div className="admin-dashboard">
          <aside className="admin-list" aria-label="Liste des messages">
            <div className="filter-bar">
              <button className={statusFilter === "all" ? "filter active" : "filter"} type="button" onClick={() => setStatusFilter("all")}>
                Tous
              </button>
              {Object.entries(statuses).map(([value, label]) => (
                <button
                  className={statusFilter === value ? "filter active" : "filter"}
                  type="button"
                  key={value}
                  onClick={() => setStatusFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {filteredMessages.map((message) => (
              <button
                className={selectedMessage?.id === message.id ? "message-preview active" : "message-preview"}
                type="button"
                key={message.id}
                onClick={() => setSelectedId(message.id)}
              >
                <span className={`status-badge status-${message.status}`}>{statuses[message.status]}</span>
                <strong>{message.name}</strong>
                <small>{message.email}</small>
                <small>{message.projectType || "Projet à préciser"} • {formatDate(message.createdAt)}</small>
                <span>{message.message.slice(0, 110)}</span>
              </button>
            ))}
          </aside>

          {selectedMessage && (
            <form className="admin-detail" onSubmit={saveMessage}>
              <div>
                <span className={`status-badge status-${selectedMessage.status}`}>{statuses[selectedMessage.status]}</span>
                <h2>{selectedMessage.name}</h2>
                <p>{formatDate(selectedMessage.createdAt)}</p>
              </div>

              <dl>
                <div><dt>Email</dt><dd><a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></dd></div>
                <div><dt>Téléphone</dt><dd>{selectedMessage.phone || "Non renseigné"}</dd></div>
                <div><dt>Type de projet</dt><dd>{selectedMessage.projectType || "Non renseigné"}</dd></div>
                <div><dt>Budget</dt><dd>{selectedMessage.budget || "Non renseigné"}</dd></div>
                <div><dt>Message</dt><dd>{selectedMessage.message}</dd></div>
              </dl>

              <label htmlFor="message-status">Statut</label>
              <select id="message-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                {Object.entries(statuses).map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>

              <label htmlFor="admin-comment">Commentaire administrateur</label>
              <textarea
                id="admin-comment"
                value={adminComment}
                onChange={(event) => setAdminComment(event.target.value)}
                rows="5"
                maxLength="1000"
              />

              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                Enregistrer
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;
