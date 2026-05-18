function About() {
  return (
    <section className="section page-section">
      <p className="eyebrow">À propos</p>
      <h1>Une studio fictif construite pour un projet professionnel.</h1>
      <div className="content-grid">
        <div>
          <p>
            Blanc Studio est présenté comme une studio spécialisée dans la conception d'espaces,
            la visualisation 3D et les supports de présentation pour l'architecture et l'immobilier.
          </p>
          <p>
            Le projet a été réalisé pour montrer des compétences front-end: structure des pages,
            composants, données locales, navigation, formulaire, responsive design et accessibilité.
          </p>
        </div>
        <img src="/images/Image_interier.png" alt="Ambiance intérieure claire utilisée pour Blanc Studio" />
      </div>
    </section>
  );
}

export default About;
