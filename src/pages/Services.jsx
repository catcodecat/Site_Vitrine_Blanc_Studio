import ServiceCard from "../components/ServiceCard.jsx";
import services from "../data/services.json";

function Services() {
  return (
    <section className="section page-section">
      <p className="eyebrow">Services</p>
      <h1>Des prestations simples pour présenter un projet avec clarté.</h1>
      <div className="card-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
