import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Blanc Studio</strong>
        <p>Design intérieur, visualisation 3D et supports de présentation.</p>
      </div>
      <nav aria-label="Liens du pied de page">
        <Link to="/services">Services</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/mentions-legales">Mentions légales</Link>
      </nav>
    </footer>
  );
}

export default Footer;
