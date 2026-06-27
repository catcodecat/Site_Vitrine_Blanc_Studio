import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import Seo from "../components/Seo.jsx";
import projects from "../data/projects.json";

function Portfolio() {
  const [category, setCategory] = useState("Tous");
  const categories = ["Tous", ...new Set(projects.map((project) => project.category))];
  const filteredProjects = useMemo(
    () => (category === "Tous" ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <section className="section page portfolio-preview">
      <Seo
        title="Portfolio"
        description="Portfolio Blanc Studio: exemples de visualisations 3D intérieures, extérieures, programmes immobiliers et concepts IA."
      />
      <div className="section-heading reveal">
        <p className="eyebrow">Portfolio</p>
        <h1>Des visuels pensés pour convaincre avant la réalisation.</h1>
        <p>
          Découvrez des typologies de projets accompagnées par Blanc Studio: intérieurs,
          extérieurs, programmes immobiliers et supports de vente.
        </p>
      </div>
      <div className="filter-bar" aria-label="Filtrer les projets">
        {categories.map((item) => (
          <button className={category === item ? "filter active" : "filter"} type="button" key={item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="portfolio-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="cta-band reveal">
        <h2>Vous préparez un lancement, une rénovation ou une présentation client?</h2>
        <p>Envoyez vos plans, références ou premières intentions. Nous vous aidons à choisir le format visuel le plus efficace.</p>
        <Link className="btn btn-primary" to="/contact">Parler de votre projet</Link>
      </div>
    </section>
  );
}

export default Portfolio;
