import Button from "../components/Button.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import services from "../data/services.json";
import projects from "../data/projects.json";
import testimonials from "../data/testimonials.json";

function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/image_fond_hero.jpg" alt="" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">Studio de design et visualisation</p>
          <h1>Blanc Studio</h1>
          <p>
            Blanc Studio accompagne les particuliers, les architectes et les professionnels de
            l'immobilier dans la présentation et la valorisation de leurs projets d'aménagement,
            d'architecture intérieure et de visualisation 3D.
          </p>
          <div className="hero-actions">
            <Button to="/portfolio">Voir le portfolio</Button>
            <Button to="/contact" variant="light">Demander un contact</Button>
          </div>
        </div>
      </section>

      <section className="section intro-grid">
        <div>
          <p className="eyebrow">Présentation</p>
          <h2>Une vitrine claire pour présenter les projets avant leur réalisation.</h2>
        </div>
        <p>
          Le site présente une studio fictif spécialisé dans les images 3D, le design intérieur
          et les supports de présentation. Les contenus sont simples pour rester adaptés à un
          projet de formation.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Les principales prestations</h2>
        </div>
        <div className="card-grid">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section warm-section">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Quelques projets fictifs mais crédibles</h2>
        </div>
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <div className="section-heading">
          <p className="eyebrow">Avis</p>
          <h2>Retours clients</h2>
        </div>
        <div className="card-grid">
          {testimonials.map((testimonial) => (
            <article className="card quote-card" key={testimonial.id}>
              <p>"{testimonial.quote}"</p>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
