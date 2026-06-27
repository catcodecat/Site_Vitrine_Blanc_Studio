function ServiceCard({ service }) {
  return (
    <article className="service-card reveal">
      <img src={service.image} alt={`Illustration ${service.title}`} loading="lazy" />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      {service.deliverable && <p className="service-outcome">{service.deliverable}</p>}
    </article>
  );
}

export default ServiceCard;
