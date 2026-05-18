import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <img src={project.image} alt={`Vue du projet ${project.title}`} />
      <div>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        <Link className="text-link" to={`/portfolio/${project.id}`}>
          Voir le projet
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
