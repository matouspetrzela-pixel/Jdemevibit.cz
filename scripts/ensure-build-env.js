const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const envFile = path.join(root, ".env.production.local");
const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";

if (!process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID) {
  const line = `NEXT_PUBLIC_FORMSPREE_FORM_ID=${formId}\n`;
  const exists = fs.existsSync(envFile);
  const content = exists ? fs.readFileSync(envFile, "utf8") : "";
  if (!content.includes("NEXT_PUBLIC_FORMSPREE_FORM_ID")) {
    fs.appendFileSync(envFile, line);
    console.log("[ensure-build-env] Doplněn NEXT_PUBLIC_FORMSPREE_FORM_ID do .env.production.local");
  }
}
