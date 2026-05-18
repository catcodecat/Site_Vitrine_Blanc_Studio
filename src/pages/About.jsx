import team from "../data/team.json";

function About() {
  return (
    <section className="page section team">
      <div className="section-heading reveal">
        <p className="eyebrow">À propos</p>
        <h1>Une studio créative pour valoriser les projets d'architecture.</h1>
        <p>
          Blanc Studio accompagne les particuliers, les architectes et les professionnels de
          l'immobilier dans la présentation de projets d'aménagement, d'architecture intérieure
          et de visualisation 3D.
        </p>
      </div>
      <div className="about-panel reveal">
        <img src="/images/Image_interier.png" alt="Ambiance intérieure présentée par Blanc Studio" />
        <div>
          <h2>Une approche visuelle et structurée</h2>
          <p>
            Le site reste un projet de formation, mais il présente une organisation proche d'un
            vrai site vitrine: identité visuelle, portfolio, services, équipe et contact.
          </p>
        </div>
      </div>
      <div className="team-grid">
        {team.map((person) => (
          <article className="team-card reveal" key={person.name}>
            <img src={person.image} alt={`Portrait de ${person.name}`} />
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default About;
