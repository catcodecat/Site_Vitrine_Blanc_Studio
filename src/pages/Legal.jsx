import Seo from "../components/Seo.jsx";

function Legal() {
  return (
    <section className="section page legal-page">
      <Seo title="Mentions légales" description="Mentions légales et traitement des données personnelles pour le site Blanc Studio." />
      <p className="eyebrow">Mentions légales</p>
      <h1>Mentions légales</h1>
      <p>
        Blanc Studio présente ses services de visualisation 3D, concepts IA et design
        d'intérieur auprès des particuliers, architectes, promoteurs et professionnels de
        l'immobilier.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Les informations transmises via le formulaire de contact sont utilisées uniquement pour
        répondre à la demande envoyée: nom, email, téléphone le cas échéant, type de projet,
        budget indicatif et message. Elles sont enregistrées côté serveur afin de permettre le
        suivi des demandes entrantes.
      </p>
      <h2>Confidentialité</h2>
      <p>
        Les données de contact ne sont pas revendues. Une demande de suppression ou de correction
        peut être adressée à contact@blancstudio.fr.
      </p>
    </section>
  );
}

export default Legal;
