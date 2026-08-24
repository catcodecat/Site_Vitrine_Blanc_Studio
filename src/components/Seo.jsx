import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteName = "Blanc Studio";
const fallbackDescription =
  "Blanc Studio crée des visualisations 3D, concepts IA et supports de présentation pour l'architecture, l'immobilier et le design intérieur.";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function Seo({ title, description = fallbackDescription, image = "/images/og-blanc-studio.jpg", noIndex = false }) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteName}` : `${siteName} - Visualisations 3D et design intérieur`;
    const origin = window.location.origin;
    const canonical = `${origin}${location.pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;

    document.title = pageTitle;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noIndex ? "noindex,nofollow" : "index,follow" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
  }, [description, image, location.pathname, noIndex, title]);

  return null;
}

export default Seo;
