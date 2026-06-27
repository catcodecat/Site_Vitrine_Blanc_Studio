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
    </section>
  );
}

export default Services;
