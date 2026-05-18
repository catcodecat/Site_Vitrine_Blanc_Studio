import { useState } from "react";
import Button from "./Button.jsx";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "Design d'intérieur",
  budget: "",
  message: "",
  accepted: false,
};

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
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

    if (!values.accepted) {
      nextErrors.accepted = "Vous devez accepter la politique de confidentialité.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setSuccessMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedRequests = JSON.parse(localStorage.getItem("blancStudioRequests") || "[]");
    savedRequests.push({
      ...values,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("blancStudioRequests", JSON.stringify(savedRequests));

    setValues(initialValues);
    setSuccessMessage(
      "Votre demande a bien été enregistrée. Blanc Studio vous répondra prochainement.",
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">Nom *</label>
        <input id="name" name="name" value={values.name} onChange={updateField} />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" value={values.email} onChange={updateField} />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Téléphone</label>
        <input id="phone" name="phone" type="tel" value={values.phone} onChange={updateField} />
      </div>

      <div className="form-row">
        <label htmlFor="projectType">Type de projet</label>
        <select id="projectType" name="projectType" value={values.projectType} onChange={updateField}>
          <option>Design d'intérieur</option>
          <option>Visualisation 3D intérieure</option>
          <option>Visualisation 3D extérieure</option>
          <option>Présentation immobilière</option>
          <option>Accompagnement de projet</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="budget">Budget approximatif</label>
        <input id="budget" name="budget" value={values.budget} onChange={updateField} />
      </div>

      <div className="form-row full">
        <label htmlFor="message">Message *</label>
        <textarea id="message" name="message" rows="6" value={values.message} onChange={updateField} />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <div className="checkbox-row full">
        <input
          id="accepted"
          name="accepted"
          type="checkbox"
          checked={values.accepted}
          onChange={updateField}
        />
        <label htmlFor="accepted">
          J'accepte que mes informations soient utilisées pour répondre à ma demande.
        </label>
      </div>
      {errors.accepted && <p className="field-error full">{errors.accepted}</p>}

      <div className="form-actions full">
        <Button type="submit">Envoyer une demande</Button>
      </div>

      {successMessage && <p className="success-message full">{successMessage}</p>}
    </form>
  );
}

export default ContactForm;
