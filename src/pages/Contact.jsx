import ContactForm from "../components/ContactForm.jsx";

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
    </section>
  );
}

export default Contact;
