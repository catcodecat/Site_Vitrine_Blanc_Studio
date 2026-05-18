import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
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
      <div className="section-heading reveal">
        <p className="eyebrow">Portfolio</p>
        <h1>Projets de design, visualisation et présentation immobilière.</h1>
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
    </section>
  );
}

export default Portfolio;
