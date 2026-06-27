import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import projects from "../data/projects.json";

function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="section page">
        <Seo title="Projet introuvable" description="Le projet demandé n'est pas disponible dans le portfolio Blanc Studio." noIndex />
        <h1>Projet introuvable</h1>
        <Link className="text-link" to="/portfolio">Retour au portfolio</Link>
      </section>
    );
  }

  return (
    <section className="section page project-detail-page">
      <Seo
        title={project.title}
        description={project.shortDescription || project.longDescription}
        image={project.image}
      />
      <Link className="text-link" to="/portfolio">Retour au portfolio</Link>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <div className="project-detail">
        <img src={project.image} alt={`Image principale du projet ${project.title}`} loading="lazy" />
        <div>
          <p>{project.longDescription}</p>
          <dl>
            <div><dt>Lieu</dt><dd>{project.location}</dd></div>
            <div><dt>Année</dt><dd>{project.year}</dd></div>
            <div><dt>Services</dt><dd>{project.services.join(", ")}</dd></div>
          </dl>
        </div>
      </div>
      <div className="detail-gallery">
        {project.gallery.map((image) => (
          <img src={image} alt={`Vue complémentaire du projet ${project.title}`} key={image} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

export default ProjectDetail;
