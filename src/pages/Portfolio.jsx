import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../data/projects.json";

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const categories = ["Tous", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Tous") {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="section page-section">
      <p className="eyebrow">Portfolio</p>
      <h1>Projets de design, visualisation et présentation immobilière.</h1>

      <div className="filter-bar" aria-label="Filtrer les projets par catégorie">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "filter-button active" : "filter-button"}
            type="button"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
