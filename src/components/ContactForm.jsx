import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "Design d'intérieur",
  budget: "",
  message: "",
  privacy: false,
};

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Le nom est obligatoire.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "L'adresse email doit être valide.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Le message est obligatoire.";
    }

    if (!values.privacy) {
      nextErrors.privacy = "Vous devez accepter la politique de confidentialité.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setStatus("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.message || "Le message n'a pas pu être enregistré.");
        return;
      }

      setValues(initialValues);
      setStatus(result.message);
    } catch (error) {
      setStatus(
        "Le serveur n'est pas disponible. Votre demande n'a pas été envoyée. Veuillez réessayer ou nous écrire directement à contact@blancstudio.fr.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Nom *</label>
      <input
        id="name"
        name="name"
        value={values.name}
        onChange={updateField}
        autoComplete="name"
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}

      <label htmlFor="email">Email *</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={updateField}
        autoComplete="email"
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}

      <label htmlFor="phone">Téléphone</label>
      <input id="phone" name="phone" type="tel" value={values.phone} onChange={updateField} autoComplete="tel" />

      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="company">Société</label>
        <input
          id="company"
          name="company"
          value={values.company}
          onChange={updateField}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <label htmlFor="projectType">Type de projet</label>
      <select id="projectType" name="projectType" value={values.projectType} onChange={updateField}>
        <option>Design d'intérieur</option>
        <option>Visualisation 3D intérieure</option>
        <option>Visualisation 3D extérieure</option>
        <option>Présentation immobilière</option>
        <option>Accompagnement de projet</option>
      </select>

      <label htmlFor="budget">Budget approximatif</label>
      <input id="budget" name="budget" value={values.budget} onChange={updateField} />

      <label htmlFor="message">Message *</label>
      <textarea
        id="message"
        name="message"
        value={values.message}
        onChange={updateField}
        rows="5"
        maxLength="1500"
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "message-error" : undefined}
      />
      {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}

      <div className="checkbox-row">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          checked={values.privacy}
          onChange={updateField}
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? "privacy-error" : undefined}
        />
        <label htmlFor="privacy">J'accepte que mes informations soient utilisées pour répondre à ma demande.</label>
      </div>
      {errors.privacy && <p className="field-error" id="privacy-error">{errors.privacy}</p>}

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer une demande"}
      </button>
      {status && <p className="form-message" role="status">{status}</p>}
    </form>
  );
}

export default ContactForm;
