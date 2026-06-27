import team from "../data/team.json";
import Seo from "../components/Seo.jsx";

function About() {
  return (
    <section className="page section team">
      <Seo
        title="À propos"
        description="Découvrez Blanc Studio, studio de visualisation 3D, concepts IA et design intérieur pour projets architecturaux et immobiliers."
      />
      <div className="section-heading reveal">
        <p className="eyebrow">À propos</p>
        <h1>Un studio créatif pour valoriser les projets d'architecture.</h1>
        <p>
          Blanc Studio accompagne les particuliers, les architectes et les professionnels de
          l'immobilier dans la présentation de projets d'aménagement, d'architecture intérieure
          et de visualisation 3D.
        </p>
      </div>
      <div className="about-panel reveal">
        <img src="/images/Image_interier.png" alt="Ambiance intérieure présentée par Blanc Studio" loading="lazy" />
        <div>
          <h2>Une approche visuelle et structurée</h2>
          <p>
            Nous transformons les plans, intentions et références en images lisibles, élégantes
            et prêtes à soutenir une présentation commerciale ou une décision de conception.
          </p>
        </div>
      </div>
      <div className="team-grid">
        {team.map((person) => (
          <article className="team-card reveal" key={person.name}>
            <img src={person.image} alt={`Portrait de ${person.name}`} loading="lazy" />
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default About;
