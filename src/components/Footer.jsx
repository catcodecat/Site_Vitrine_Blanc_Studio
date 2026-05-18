import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <p>Blanc Studio - Visualisations architecturales et concepts IA</p>
      <nav aria-label="Liens du pied de page">
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/mentions-legales">Mentions légales</Link>
      </nav>
    </footer>
  );
}

export default Footer;
