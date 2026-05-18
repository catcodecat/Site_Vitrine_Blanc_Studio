function Process() {
  return (
    <section className="process section page">
      <div className="section-heading reveal">
        <p className="eyebrow">Processus</p>
        <h1>Une méthode claire, de l'idée à l'image finale.</h1>
      </div>
      <div className="timeline">
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 5h14v14H5z" /><path d="M8 9h8M8 13h5" /></svg>
          </span>
          <h3>Brief client</h3>
          <p>Définition des objectifs, délais, supports attendus et contraintes.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 19h16" /><path d="M6 17V7l6-3 6 3v10" /><path d="M9 19v-6h6v6" /></svg>
          </span>
          <h3>Analyse</h3>
          <p>Étude des plans, références, matières et besoins du projet.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3l8 4v10l-8 4-8-4V7z" /><path d="M12 3v18M4 7l8 4 8-4" /></svg>
          </span>
          <h3>Production</h3>
          <p>Création des images, concepts, rendus ou supports de présentation.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" /><path d="M4 20h16" /></svg>
          </span>
          <h3>Livraison</h3>
          <p>Corrections, export des fichiers et préparation pour la présentation.</p>
        </article>
      </div>
    </section>
  );
}

export default Process;
