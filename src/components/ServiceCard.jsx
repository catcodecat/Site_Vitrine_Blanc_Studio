function ServiceCard({ service }) {
  return (
    <article className="service-card reveal">
      <img src={service.image} alt="" />
      <span>{service.number}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}

export default ServiceCard;
