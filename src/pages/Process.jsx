const steps = [
  {
    title: "Brief",
    text: "Le besoin, le style, les contraintes et les supports attendus sont définis avec le client.",
  },
  {
    title: "Recherche",
    text: "Les références, les plans, les matériaux et les premières intentions visuelles sont organisés.",
  },
  {
    title: "Production",
    text: "Les images ou supports sont créés à partir des éléments validés.",
  },
  {
    title: "Retours",
    text: "Les corrections sont intégrées pour obtenir une présentation cohérente.",
  },
  {
    title: "Livraison",
    text: "Les fichiers finaux sont préparés pour le web, la présentation ou la commercialisation.",
  },
];

function Process() {
  return (
    <section className="section page-section">
      <p className="eyebrow">Processus</p>
      <h1>Une méthode de travail lisible et progressive.</h1>
      <div className="timeline">
        {steps.map((step, index) => (
          <article className="step-card" key={step.title}>
            <span>{index + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Process;
