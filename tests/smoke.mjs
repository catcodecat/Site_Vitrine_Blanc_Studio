import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiPort = 3201;
const previewPort = 4174;
const adminPassword = "test-admin-password";
const dataDir = path.join(root, ".tmp-test-data");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(url, timeoutMs = 10000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (error) {
      // Server not ready yet.
    }
    await wait(250);
  }

  throw new Error(`Timeout waiting for ${url}`);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  return { response, body };
}

function start(command, args, options = {}) {
  return spawn(command, args, {
    cwd: root,
    stdio: "pipe",
    ...options,
  });
}

function stop(processRef) {
  if (processRef && !processRef.killed) {
    processRef.kill();
  }
}

async function run() {
  fs.rmSync(dataDir, { recursive: true, force: true });

  const api = start(process.execPath, ["server/server.js"], {
    env: {
      ...process.env,
      PORT: String(apiPort),
      DATA_DIR: dataDir,
      ADMIN_PASSWORD: adminPassword,
    },
  });

  try {
    await waitFor(`http://127.0.0.1:${apiPort}/api/health`);

    const empty = await requestJson(`http://127.0.0.1:${apiPort}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (empty.response.status !== 400) {
      throw new Error("Empty contact form should return 400.");
    }

    const invalidEmail = await requestJson(`http://127.0.0.1:${apiPort}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Client Test",
        email: "invalid-email",
        message: "Message test",
        privacy: true,
      }),
    });
    if (invalidEmail.response.status !== 400) {
      throw new Error("Invalid email should return 400.");
    }

    const created = await requestJson(`http://127.0.0.1:${apiPort}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Client Test",
        email: "client@example.com",
        phone: "0600000000",
        projectType: "Visualisation 3D intérieure",
        budget: "Sur devis",
        message: "Bonjour, je souhaite préparer des visuels pour un projet.",
        privacy: true,
      }),
    });
    if (created.response.status !== 201 || !created.body.id) {
      throw new Error("Valid contact form should create a message.");
    }

    const unauthorized = await requestJson(`http://127.0.0.1:${apiPort}/api/admin/messages`, {
      headers: { "x-admin-password": "wrong-password" },
    });
    if (unauthorized.response.status !== 401) {
      throw new Error("Admin endpoint should reject an invalid password.");
    }

    const list = await requestJson(`http://127.0.0.1:${apiPort}/api/admin/messages`, {
      headers: { "x-admin-password": adminPassword },
    });
    if (list.response.status !== 200 || list.body.messages.length !== 1) {
      throw new Error("Admin endpoint should list created messages.");
    }

    const messageId = list.body.messages[0].id;
    const patched = await requestJson(`http://127.0.0.1:${apiPort}/api/admin/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": adminPassword,
      },
      body: JSON.stringify({ status: "replied", adminComment: "Réponse envoyée." }),
    });
    if (patched.response.status !== 200 || patched.body.message.status !== "replied" || !patched.body.message.repliedAt) {
      throw new Error("Admin PATCH should update status and repliedAt.");
    }
  } finally {
    stop(api);
  }

  const viteCli = path.join(root, "node_modules", "vite", "bin", "vite.js");
  const preview = start(process.execPath, [viteCli, "preview", "--host", "127.0.0.1", "--port", String(previewPort)]);

  try {
    await waitFor(`http://127.0.0.1:${previewPort}/`);
    const routes = ["/", "/services", "/portfolio", "/contact", "/admin"];

    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${previewPort}${route}`);
      if (!response.ok) {
        throw new Error(`Preview route ${route} returned ${response.status}.`);
      }
    }
  } finally {
    stop(preview);
    fs.rmSync(dataDir, { recursive: true, force: true });
  }

  console.log("Smoke tests passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
