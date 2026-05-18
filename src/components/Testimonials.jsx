import { useState } from "react";
import testimonials from "../data/testimonials.json";

function Testimonials() {
  const [selectedId, setSelectedId] = useState(testimonials[0].id);
  const selected = testimonials.find((item) => item.id === selectedId) || testimonials[0];

  return (
    <section className="references section">
      <div className="section-heading reveal">
        <p className="eyebrow">Références</p>
        <h2>Des visuels pensés pour les acteurs exigeants de l'architecture.</h2>
        <p>Le bloc reprend l'esprit de la première version avec quatre références et leurs icônes.</p>
      </div>

      <div className="client-grid reveal" aria-label="Références clients">
        {testimonials.map((testimonial) => (
          <button
            className={selectedId === testimonial.id ? "client-card active" : "client-card"}
            type="button"
            key={testimonial.id}
            onClick={() => setSelectedId(testimonial.id)}
          >
            <img src={testimonial.logo} alt={`Logo ${testimonial.company}`} />
            <span>{testimonial.company}</span>
          </button>
        ))}
      </div>

      <div className="testimonial-panel reveal">
        <article className="testimonial-content">
          <p className="testimonial-company">{selected.company}</p>
          <blockquote>“{selected.quote}”</blockquote>
        </article>
      </div>
    </section>
  );
}

export default Testimonials;
