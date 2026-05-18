import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/processus", label: "Processus" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setIsOpen(false)}>
        <img src="/images/logo_blanc_studio.png" alt="Logo Blanc Studio" />
        <span>
          <strong>Blanc Studio</strong>
          <small>Visualisation Architecturale</small>
        </span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      <nav className={isOpen ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
