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
          <h3>Documents</h3>
          <p>Réception des plans, références, matériaux, contraintes techniques et inspirations.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3l8 4v10l-8 4-8-4V7z" /><path d="M12 3v18M4 7l8 4 8-4" /></svg>
          </span>
          <h3>Cadrage</h3>
          <p>Validation du périmètre, du planning, des livrables et de l'acompte de lancement.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" /><path d="M4 20h16" /></svg>
          </span>
          <h3>Modélisation</h3>
          <p>Création de la base 3D, des volumes, matières, éclairages ou directions IA.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 5h16v12H4z" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
          </span>
          <h3>Previews</h3>
          <p>Envoi des premières vues pour valider cadrages, ambiance et intentions visuelles.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 13-6" /><path d="M20 6v5h-5" /><path d="M20 12a8 8 0 0 1-13 6" /><path d="M4 18v-5h5" /></svg>
          </span>
          <h3>Corrections</h3>
          <p>Intégration des retours, ajustements des détails et contrôle de cohérence.</p>
        </article>
        <article className="step reveal">
          <span className="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 17l5-5 4 4 7-8" /><path d="M4 20h16" /></svg>
          </span>
          <h3>Livraison</h3>
          <p>Export final des images, vidéos ou supports prêts pour présentation et diffusion.</p>
        </article>
      </div>
    </section>
  );
}

export default Process;
