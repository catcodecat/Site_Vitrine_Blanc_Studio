import { Link, useParams } from "react-router-dom";
import projects from "../data/projects.json";

function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="section page">
        <h1>Projet introuvable</h1>
        <Link className="text-link" to="/portfolio">Retour au portfolio</Link>
      </section>
    );
  }

  return (
    <section className="section page project-detail-page">
      <Link className="text-link" to="/portfolio">Retour au portfolio</Link>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <div className="project-detail">
        <img src={project.image} alt={`Image principale du projet ${project.title}`} />
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
          <img src={image} alt={`Vue complémentaire du projet ${project.title}`} key={image} />
        ))}
      </div>
    </section>
  );
}

export default ProjectDetail;
