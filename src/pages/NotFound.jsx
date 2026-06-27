import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

function NotFound() {
  return (
    <section className="section page not-found">
      <Seo title="Page introuvable" description="Cette page n'existe pas sur le site Blanc Studio." noIndex />
      <p className="eyebrow">Erreur 404</p>
      <h1>Page introuvable</h1>
      <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
    </section>
  );
}

export default NotFound;
