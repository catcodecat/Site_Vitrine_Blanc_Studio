import ContactForm from "../components/ContactForm.jsx";
import faq from "../data/faq.json";

function Contact() {
  return (
    <section className="section page-section">
      <p className="eyebrow">Contact</p>
      <h1>Parler d'un projet avec Blanc Studio.</h1>
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Informations</h2>
          <p>
            Le formulaire ne fait pas de vrai envoi email. Il simule une demande client et
            l'enregistre dans le navigateur pour le projet de formation.
          </p>
          <p>Email: contact@blanc-studio.fr</p>
          <p>Ville: Strasbourg</p>
        </div>
        <ContactForm />
      </div>

      <div className="faq-list">
        <h2>Questions fréquentes</h2>
        {faq.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Contact;
