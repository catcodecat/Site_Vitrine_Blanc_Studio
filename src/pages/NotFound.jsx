import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section page not-found">
      <p className="eyebrow">Erreur 404</p>
      <h1>Page introuvable</h1>
      <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
    </section>
  );
}

export default NotFound;
