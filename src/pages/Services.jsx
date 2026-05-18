import ServiceCard from "../components/ServiceCard.jsx";
import services from "../data/services.json";

function Services() {
  return (
    <section className="services section page">
      <div className="section-heading reveal">
        <p className="eyebrow">Services</p>
        <h1>Une offre complète pour présenter les projets avec impact.</h1>
        <p>Les prestations reprennent les besoins principaux d'un studio de visualisation.</p>
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
