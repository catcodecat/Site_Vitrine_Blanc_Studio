function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <img src={service.image} alt="" />
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  );
}

export default ServiceCard;
