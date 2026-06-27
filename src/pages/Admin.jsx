import { useEffect, useMemo, useState } from "react";

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

function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("blancAdminPassword") || "");
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

  async function requestAdmin(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
        ...options.headers,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "La requête administrateur a échoué.");
    }

    return result;
  }

  async function loadMessages(event) {
    event?.preventDefault();
    setIsLoading(true);
    setFeedback("");

    try {
      const result = await requestAdmin("/api/admin/messages");
      setMessages(result.messages);
      setSelectedId((current) => current || result.messages[0]?.id || "");
      sessionStorage.setItem("blancAdminPassword", password);
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveMessage(event) {
    event.preventDefault();

    if (!selectedMessage) {
      return;
    }

    setIsLoading(true);
    setFeedback("");

    try {
      const result = await requestAdmin(`/api/admin/messages/${selectedMessage.id}`, {
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

  return (
    <section className="admin-page section page">
      <div className="section-heading reveal">
        <p className="eyebrow">Administration</p>
        <h1>Messages entrants</h1>
        <p>Suivez les demandes reçues depuis le formulaire de contact Blanc Studio.</p>
      </div>

      <form className="admin-login" onSubmit={loadMessages}>
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
            Charger
          </button>
        </div>
      </form>

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
