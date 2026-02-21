#!/usr/bin/env node
/**
 * Diagnostika Airtable 403 – načte .env.local a prověří token, base a zápis.
 * Spuštění: node scripts/airtable-diagnose.mjs
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch (e) {
    console.error("CHYBA: Nelze načíst .env.local:", e.message);
    process.exit(1);
  }
  const env = {};
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const value = t.slice(eq + 1).trim();
    if (key && value !== undefined) env[key] = value;
  }
  return env;
}

function maskToken(token) {
  if (!token || token.length < 12) return "(prázdný nebo krátký)";
  return token.slice(0, 8) + "..." + token.slice(-4);
}

async function main() {
  console.log("=== Airtable diagnostika (403) ===\n");

  const env = loadEnvLocal();
  const token = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  const tableName = (env.AIRTABLE_TABLE_CONTACTS || "Table1").trim();

  console.log("1. ENV z .env.local:");
  console.log("   AIRTABLE_BASE_ID:", baseId || "(chybí)");
  console.log("   AIRTABLE_TABLE_CONTACTS:", JSON.stringify(tableName));
  console.log("   AIRTABLE_API_KEY:", maskToken(token), "| délka:", (token || "").length);
  console.log("   Token začíná na 'pat':", (token || "").startsWith("pat"));
  console.log("");

  if (!token || !baseId) {
    console.error("CHYBA: Chybí AIRTABLE_API_KEY nebo AIRTABLE_BASE_ID v .env.local");
    process.exit(1);
  }

  const baseUrl = `https://api.airtable.com/v0/${baseId}`;
  const tableEncoded = encodeURIComponent(tableName);
  const tableUrl = `${baseUrl}/${tableEncoded}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // --- 2. Meta: seznam bases (může vyžadovat scope schema.bases:read)
  console.log("2. GET /v0/meta/bases (ověření tokenu a přístupu k bases):");
  try {
    const metaRes = await fetch("https://api.airtable.com/v0/meta/bases", { headers });
    const metaBody = await metaRes.text();
    console.log("   Status:", metaRes.status);
    if (metaRes.ok) {
      const data = JSON.parse(metaBody);
      const bases = data.bases || [];
      console.log("   Počet bases:", bases.length);
      const ourBase = bases.find((b) => b.id === baseId);
      if (ourBase) {
        console.log("   Base", baseId, "NALEZENA:", ourBase.name);
      } else {
        console.log("   Base", baseId, "NENÍ v seznamu. Dostupné base IDs:", bases.map((b) => b.id).join(", ") || "(žádné)");
      }
    } else {
      console.log("   Body:", metaBody.slice(0, 500));
      if (metaRes.status === 403) console.log("   -> Token nemá scope schema.bases:read nebo nemá přístup k meta.");
    }
  } catch (e) {
    console.log("   Chyba:", e.message);
  }
  console.log("");

  // --- 3. GET záznamů z tabulky (read – data.records:read)
  console.log("3. GET", tableUrl, "(list records – ověření read + base + tabulka):");
  try {
    const listRes = await fetch(tableUrl + "?maxRecords=1", { headers });
    const listBody = await listRes.text();
    console.log("   Status:", listRes.status);
    if (listRes.ok) {
      const data = JSON.parse(listBody);
      console.log("   Tabulka existuje. Počet záznamů (max 1):", (data.records || []).length);
    } else {
      console.log("   Body:", listBody);
      if (listRes.status === 403) console.log("   -> 403: Token nemá přístup k této base/tabulce nebo tabulka neexistuje.");
      if (listRes.status === 404) console.log("   -> 404: Špatný base ID nebo název tabulky.");
    }
  } catch (e) {
    console.log("   Chyba:", e.message);
  }
  console.log("");

  // --- 4. POST nový záznam (write)
  const postBody = {
    fields: {
      Jméno: "Diagnostika script",
      Email: "diagnose@test.cz",
      Zpráva: "Test zápisu z airtable-diagnose.mjs",
    },
  };
  console.log("4. POST", tableUrl, "(create record):");
  console.log("   Body:", JSON.stringify(postBody, null, 2));
  try {
    const postRes = await fetch(tableUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(postBody),
    });
    const postBodyText = await postRes.text();
    console.log("   Status:", postRes.status);
    console.log("   Response headers:", Object.fromEntries(postRes.headers.entries()));
    console.log("   Body:", postBodyText);
    if (postRes.ok) {
      console.log("   -> ZÁPIS ÚSPĚŠNÝ (201). Zkontrolujte v Airtable tabulku", tableName);
    } else {
      let errJson;
      try {
        errJson = JSON.parse(postBodyText);
      } catch (_) {}
      if (errJson?.error?.message) {
        console.log("   Chybová zpráva:", errJson.error.message);
        if (postRes.status === 422) console.log("   -> 422: Názvy polí (Jméno, Email, Zpráva) musí přesně odpovídat sloupcům v Airtable.");
      }
    }
  } catch (e) {
    console.log("   Chyba:", e.message);
  }

  // --- 5. Možnost: Base ID může být z jiné base než ta, ke které má token přístup
  console.log("5. Závěr:");
  console.log("   - GET i POST na base/tabulku vrací 403 → token k této base nemá přístup NEBO base/table ID je špatně.");
  console.log("   - Ověřte v Airtable: Token → Access → vyberte PŘESNĚ tu base, kam chcete zapisovat.");
  console.log("   - Pak otevřete TUTO base v prohlížeči a z URL zkopírujte Base ID (část app...). Musí sedět s AIRTABLE_BASE_ID.");
  console.log("   - Pokud máte více bases, Base ID z .env musí být z té same base, která je v tokenu v Access.");
  console.log("   - Alternativa: vytvořte NOVÝ token a u něj v Access zvolte jen base „Jdemevibit.cz“, uložte a vložte celý nový token do .env.local.");
  console.log("\n=== Konec diagnostiky ===");
}

main();
