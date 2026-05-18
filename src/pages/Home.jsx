import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import services from "../data/services.json";
import projects from "../data/projects.json";
import team from "../data/team.json";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/image_fond_hero.jpg" alt="" />
        </div>

        <div className="hero-content reveal">
          <div className="hero-brand">
            <img src="/images/logo_blanc_studio.png" alt="" />
            <div>
              <p>Visualization Architectural</p>
              <span>3D • IA • Expériences immersives</span>
            </div>
          </div>

          <h1>Des visuels qui accélèrent vos ventes immobilières</h1>
          <p>
            Nous créons des visuels photoréalistes pour promoteurs, architectes et
            professionnels de l'immobilier afin de présenter les projets avec clarté.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">Demander un devis</Link>
            <Link className="btn btn-light" to="/portfolio">Voir nos projets</Link>
          </div>

          <p className="hero-proof">
            +100 projets réalisés • Promoteurs & agences en France et Europe • 8 ans d'expérience
          </p>
        </div>
      </section>

      <section className="gallery section">
        <div className="section-heading reveal">
          <p className="eyebrow">Galerie</p>
          <h2>Des images fortes pour vendre, convaincre et se projeter.</h2>
        </div>

        <div className="gallery-grid">
          <article className="gallery-item large reveal">
            <img src="/images/Images_exteriers/Chalet_Alpes.jpg" alt="Chalet haut de gamme en montagne" />
            <span>Extérieurs</span>
          </article>
          <article className="gallery-item reveal">
            <img src="/images/Images_interiers/Salon.jpg" alt="Salon contemporain photoréaliste" />
            <span>Intérieurs</span>
          </article>
          <article className="gallery-item reveal">
            <img src="/images/Images_AI/image_ai_2.png" alt="Concept architectural créé avec IA" />
            <span>Concepts IA</span>
          </article>
          <article className="gallery-item wide reveal">
            <img src="/images/Images_exteriers/Logement_Villefranche-sur-Saone_2.jpg" alt="Projet immobilier résidentiel" />
            <span>Programmes immobiliers</span>
          </article>
        </div>
      </section>

      <section className="services section">
        <div className="section-heading reveal">
          <p className="eyebrow">Services</p>
          <h2>Une offre complète pour présenter votre projet avec impact.</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>

        <div className="service-showcase reveal">
          <article>
            <h3>Extérieurs</h3>
            <div>
              <img src="/images/Images_exteriers/Beach-club-Mandelieu.jpg" alt="Beach club à Mandelieu" />
              <img src="/images/Images_exteriers/Logement_Arnas.jpg" alt="Logement à Arnas" />
              <img src="/images/Images_exteriers/Villa_St_Raphael.jpg" alt="Villa à Saint-Raphaël" />
            </div>
          </article>
          <article>
            <h3>Intérieurs</h3>
            <div>
              <img src="/images/Images_interiers/Chambre.jpg" alt="Chambre contemporaine" />
              <img src="/images/Images_interiers/Salon_3.jpg" alt="Salon lumineux" />
              <img src="/images/Images_interiers/Sejour_2.jpg" alt="Séjour contemporain" />
            </div>
          </article>
          <article>
            <h3>Images IA</h3>
            <div>
              <img src="/images/Images_AI/image_ai_2.png" alt="Concept IA architectural" />
              <img src="/images/Images_AI/image_ai_4.png" alt="Concept IA intérieur" />
              <img src="/images/Image_AI.png" alt="Concept IA premium" />
            </div>
          </article>
        </div>

        <div className="video-panel reveal">
          <div>
            <p className="eyebrow">Animation 3D</p>
            <h3>Un film pour raconter le projet avant sa construction.</h3>
            <p>
              La vidéo permet de montrer l'ambiance, les volumes et le parcours dans le projet
              avec une présentation plus émotionnelle qu'une image fixe.
            </p>
          </div>
          <video controls preload="metadata" poster="/images/Images_exteriers/Chalet_Alpes.jpg">
            <source src="/images/video3D.mp4" type="video/mp4" />
            Votre navigateur ne peut pas lire cette vidéo.
          </video>
        </div>
      </section>

      <section className="process section">
        <div className="section-heading reveal">
          <p className="eyebrow">Processus</p>
          <h2>Une méthode claire, de l'idée à l'image finale.</h2>
        </div>
        <div className="timeline">
          <article className="step reveal">
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 5h14v14H5z" /><path d="M8 9h8M8 13h5" /></svg>
            </span>
            <h3>Brief client</h3>
            <p>Nous définissons les objectifs, les délais et les supports attendus.</p>
          </article>
          <article className="step reveal">
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 19h16" /><path d="M6 17V7l6-3 6 3v10" /><path d="M9 19v-6h6v6" /></svg>
            </span>
            <h3>Analyse des plans</h3>
            <p>Nous étudions les références, plans, matières et contraintes du projet.</p>
          </article>
          <article className="step reveal">
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 3l8 4v10l-8 4-8-4V7z" /><path d="M12 3v18M4 7l8 4 8-4" /></svg>
            </span>
            <h3>Modélisation ou IA</h3>
            <p>Nous créons la base 3D ou les concepts assistés par intelligence artificielle.</p>
          </article>
          <article className="step reveal">
            <span className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" /><path d="M4 20h16" /></svg>
            </span>
            <h3>Images et corrections</h3>
            <p>Nous produisons les visuels, intégrons les retours et livrons les fichiers finaux.</p>
          </article>
        </div>
      </section>

      <section className="team section">
        <div className="section-heading reveal">
          <p className="eyebrow">Qui sommes-nous</p>
          <h2>Une équipe créative au service de vos projets.</h2>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-card reveal" key={person.name}>
              <img src={person.image} alt={`Portrait de ${person.name}`} />
              <h3>{person.name}</h3>
              <p>{person.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-preview section">
        <div className="section-heading reveal">
          <p className="eyebrow">Portfolio</p>
          <h2>Des projets fictifs mais crédibles pour présenter le savoir-faire.</h2>
        </div>
        <div className="portfolio-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  );
}

export default Home;
