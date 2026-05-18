import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <article className="project-card reveal">
      <img src={project.image} alt={`Vue du projet ${project.title}`} />
      <div>
        <p>
          {project.category} • {project.location}
        </p>
        <h3>{project.title}</h3>
        <Link to={`/portfolio/${project.id}`}>Voir le projet</Link>
      </div>
    </article>
  );
}

export default ProjectCard;
