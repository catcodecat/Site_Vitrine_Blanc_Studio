import ServiceCard from "../components/ServiceCard.jsx";
import services from "../data/services.json";

function Services() {
  return (
    <section className="services section page">
      <div className="section-heading reveal">
        <p className="eyebrow">Services</p>
        <h1>Une offre complète pour présenter les projets avec impact.</h1>
        <p>Chaque prestation aide vos clients, investisseurs ou partenaires à comprendre le projet avant sa réalisation.</p>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
      <div className="service-details reveal">
        {services.map((service) => (
          <article key={`${service.id}-details`}>
            <p className="eyebrow">{service.number}</p>
            <h2>{service.title}</h2>
            <dl>
              <div>
                <dt>Pour qui</dt>
                <dd>{service.audience}</dd>
              </div>
              <div>
                <dt>Résultat</dt>
                <dd>{service.deliverable}</dd>
              </div>
              <div>
                <dt>Organisation</dt>
                <dd>{service.timeline}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
