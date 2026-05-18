import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const messagesFile = path.join(dataDir, "messages.jsonl");

app.use(express.json({ limit: "20kb" }));

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get("/api/health", (request, response) => {
  response.json({ ok: true, service: "blanc-studio-api" });
});

app.post("/api/contact", (request, response) => {
  const name = cleanText(request.body.name, 80);
  const email = cleanText(request.body.email, 120).toLowerCase();
  const phone = cleanText(request.body.phone, 40);
  const projectType = cleanText(request.body.projectType, 80);
  const budget = cleanText(request.body.budget, 80);
  const message = cleanText(request.body.message, 1500);
  const privacy = Boolean(request.body.privacy);

  if (!name || !isValidEmail(email) || !message || !privacy) {
    response.status(400).json({
      ok: false,
      message: "Veuillez vérifier les informations du formulaire.",
    });
    return;
  }

  fs.mkdirSync(dataDir, { recursive: true });

  const savedMessage = {
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    projectType,
    budget,
    message,
  };

  fs.appendFileSync(messagesFile, `${JSON.stringify(savedMessage)}\n`, "utf8");

  response.status(201).json({
    ok: true,
    message: "Votre demande a bien été enregistrée. Blanc Studio vous répondra prochainement.",
  });
});

app.listen(port, () => {
  console.log(`API Blanc Studio disponible sur http://127.0.0.1:${port}`);
});
