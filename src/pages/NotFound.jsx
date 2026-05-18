import Button from "../components/Button.jsx";

function NotFound() {
  return (
    <section className="section page-section not-found">
      <p className="eyebrow">Erreur 404</p>
      <h1>Page introuvable</h1>
      <p>La page demandée n'existe pas ou a été déplacée.</p>
      <Button to="/">Retour à l'accueil</Button>
    </section>
  );
}

export default NotFound;
