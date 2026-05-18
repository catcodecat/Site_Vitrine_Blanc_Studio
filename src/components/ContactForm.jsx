import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "Design d'intérieur",
  budget: "",
  message: "",
  privacy: false,
};

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

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

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setStatus("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedRequests = JSON.parse(localStorage.getItem("blancStudioRequests") || "[]");
    savedRequests.push({ ...values, createdAt: new Date().toISOString() });
    localStorage.setItem("blancStudioRequests", JSON.stringify(savedRequests));

    setValues(initialValues);
    setStatus("Votre demande a bien été enregistrée. Blanc Studio vous répondra prochainement.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Nom *</label>
      <input id="name" name="name" value={values.name} onChange={updateField} autoComplete="name" />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="email">Email *</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={updateField}
        autoComplete="email"
      />
      {errors.email && <p className="field-error">{errors.email}</p>}

      <label htmlFor="phone">Téléphone</label>
      <input id="phone" name="phone" type="tel" value={values.phone} onChange={updateField} />

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
      <textarea id="message" name="message" value={values.message} onChange={updateField} rows="5" />
      {errors.message && <p className="field-error">{errors.message}</p>}

      <div className="checkbox-row">
        <input id="privacy" name="privacy" type="checkbox" checked={values.privacy} onChange={updateField} />
        <label htmlFor="privacy">J'accepte que mes informations soient utilisées pour répondre à ma demande.</label>
      </div>
      {errors.privacy && <p className="field-error">{errors.privacy}</p>}

      <button className="btn btn-primary" type="submit">Envoyer une demande</button>
      {status && <p className="form-message" role="status">{status}</p>}
    </form>
  );
}

export default ContactForm;
