import express from "express";
import helmet from "helmet";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 3001;

// Actif uniquement derriere le nginx du docker-compose (TRUST_PROXY=1),
// desactive par defaut pour ne pas changer le comportement en local.
app.set("trust proxy", process.env.TRUST_PROXY === "1" ? 1 : false);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(projectRoot, "data");
const messagesFile = path.join(dataDir, "messages.jsonl");
const contactAttempts = new Map();
const adminPassword = process.env.ADMIN_PASSWORD || "";

// API JSON uniquement, pas de HTML servi ici : CSP n'a aucun contexte a proteger.
app.use(helmet({ contentSecurityPolicy: false }));
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

function ensureDataDir() {
  fs.mkdirSync(dataDir, { recursive: true });
}

function normalizeStatus(status) {
  return ["new", "read", "processed", "replied"].includes(status) ? status : "new";
}

function normalizeMessage(rawMessage, index = 0) {
  const createdAt = rawMessage.createdAt || new Date().toISOString();
  return {
    id:
      rawMessage.id ||
      crypto.createHash("sha1").update(`${createdAt}-${rawMessage.email || ""}-${index}`).digest("hex").slice(0, 12),
    createdAt,
    updatedAt: rawMessage.updatedAt || createdAt,
    name: rawMessage.name || "",
    email: rawMessage.email || "",
    phone: rawMessage.phone || "",
    projectType: rawMessage.projectType || "",
    budget: rawMessage.budget || "",
    message: rawMessage.message || "",
    status: normalizeStatus(rawMessage.status),
    adminComment: rawMessage.adminComment || "",
    repliedAt: rawMessage.repliedAt || null,
  };
}

function readMessages() {
  if (!fs.existsSync(messagesFile)) {
    return [];
  }

  return fs
    .readFileSync(messagesFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line, index) => {
      try {
        return normalizeMessage(JSON.parse(line), index);
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean);
}

function writeMessages(messages) {
  ensureDataDir();
  fs.writeFileSync(messagesFile, `${messages.map((message) => JSON.stringify(message)).join("\n")}\n`, "utf8");
}

function appendMessage(message) {
  ensureDataDir();
  fs.appendFileSync(messagesFile, `${JSON.stringify(message)}\n`, "utf8");
}

function isRateLimited(request) {
  const now = Date.now();
  const ip = request.ip || request.socket.remoteAddress || "unknown";
  const windowMs = 60 * 1000;
  const maxAttempts = 5;
  const attempts = (contactAttempts.get(ip) || []).filter((timestamp) => now - timestamp < windowMs);
  attempts.push(now);
  contactAttempts.set(ip, attempts);
  return attempts.length > maxAttempts;
}

function requireAdmin(request, response, next) {
  if (!adminPassword) {
    response.status(503).json({
      ok: false,
      message: "ADMIN_PASSWORD doit être défini pour accéder à l'espace administrateur.",
    });
    return;
  }

  if (request.get("x-admin-password") !== adminPassword) {
    response.status(401).json({
      ok: false,
      message: "Mot de passe administrateur incorrect.",
    });
    return;
  }

  next();
}

app.get("/api/health", (request, response) => {
  response.json({ ok: true, service: "blanc-studio-api" });
});

app.post("/api/contact", (request, response) => {
  if (isRateLimited(request)) {
    response.status(429).json({
      ok: false,
      message: "Trop de demandes ont été envoyées. Veuillez réessayer dans quelques instants.",
    });
    return;
  }

  const honeypot = cleanText(request.body.company, 120);
  const name = cleanText(request.body.name, 80);
  const email = cleanText(request.body.email, 120).toLowerCase();
  const phone = cleanText(request.body.phone, 40);
  const projectType = cleanText(request.body.projectType, 80);
  const budget = cleanText(request.body.budget, 80);
  const message = cleanText(request.body.message, 1500);
  const privacy = Boolean(request.body.privacy);

  if (honeypot) {
    response.status(400).json({
      ok: false,
      message: "Votre demande n'a pas pu être envoyée.",
    });
    return;
  }

  if (!name || !isValidEmail(email) || !message || !privacy) {
    response.status(400).json({
      ok: false,
      message: "Veuillez vérifier les informations du formulaire.",
    });
    return;
  }

  const now = new Date().toISOString();
  const savedMessage = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    name,
    email,
    phone,
    projectType,
    budget,
    message,
    status: "new",
    adminComment: "",
    repliedAt: null,
  };

  appendMessage(savedMessage);

  response.status(201).json({
    ok: true,
    id: savedMessage.id,
    message: "Votre demande a bien été enregistrée. Blanc Studio vous répondra prochainement.",
  });
});

app.get("/api/admin/messages", requireAdmin, (request, response) => {
  const messages = readMessages().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  response.json({ ok: true, messages });
});

app.get("/api/admin/messages/:id", requireAdmin, (request, response) => {
  const message = readMessages().find((item) => item.id === request.params.id);

  if (!message) {
    response.status(404).json({ ok: false, message: "Message introuvable." });
    return;
  }

  response.json({ ok: true, message });
});

app.patch("/api/admin/messages/:id", requireAdmin, (request, response) => {
  const messages = readMessages();
  const messageIndex = messages.findIndex((item) => item.id === request.params.id);

  if (messageIndex === -1) {
    response.status(404).json({ ok: false, message: "Message introuvable." });
    return;
  }

  const status = request.body.status ? normalizeStatus(request.body.status) : messages[messageIndex].status;
  const adminComment =
    request.body.adminComment === undefined
      ? messages[messageIndex].adminComment
      : cleanText(request.body.adminComment, 1000);
  const now = new Date().toISOString();

  messages[messageIndex] = {
    ...messages[messageIndex],
    status,
    adminComment,
    updatedAt: now,
    repliedAt: status === "replied" ? messages[messageIndex].repliedAt || now : null,
  };

  writeMessages(messages);

  response.json({ ok: true, message: messages[messageIndex] });
});

app.locals.messages = {
  readMessages,
  writeMessages,
};

app.listen(port, () => {
  console.log(`API Blanc Studio disponible sur http://127.0.0.1:${port}`);
});
