import ContactForm from "../components/ContactForm.jsx";
import faq from "../data/faq.json";

function Contact() {
  return (
    <section className="contact section page">
      <div className="contact-panel reveal">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Parlez-nous de votre projet</h1>
          <p>
            Décrivez votre besoin: images, animation, VR, concept IA ou accompagnement complet.
            Le formulaire simule l'envoi et reste adapté à un projet de formation.
          </p>
          <div className="contact-details">
            <a href="tel:+33761212887">07 61 21 28 87</a>
            <a href="mailto:contact@blancstudio.fr">contact@blancstudio.fr</a>
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="faq-list">
        {faq.map((item) => (
          <article key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Contact;
