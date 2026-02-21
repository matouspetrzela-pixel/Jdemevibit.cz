import { NextRequest, NextResponse } from "next/server";

/** In-memory rate limit: max 5 requestů za 15 minut na IP. Na Vercelu platí jen v rámci jedné instance; pro sdílený limit použijte např. Vercel KV / Upstash Redis. */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) ?? [];
  timestamps = timestamps.filter((t) => t > now - RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_CONTACTS = (process.env.AIRTABLE_TABLE_CONTACTS || "Zprávy").trim();
const AIRTABLE_FIELD_NAME = (process.env.AIRTABLE_FIELD_NAME || "Jméno").trim();
const AIRTABLE_FIELD_EMAIL = (process.env.AIRTABLE_FIELD_EMAIL || "Email").trim();
/** Prázdné = neposílat pole zprávy do Airtable (např. když tabulka má jen Email). */
const AIRTABLE_FIELD_MESSAGE =
  process.env.AIRTABLE_FIELD_MESSAGE !== undefined ? process.env.AIRTABLE_FIELD_MESSAGE.trim() : "Zpráva";
const AIRTABLE_FIELD_PHONE = (process.env.AIRTABLE_FIELD_PHONE || "").trim();
const AIRTABLE_FIELD_SOURCE = (process.env.AIRTABLE_FIELD_SOURCE || "").trim();
/** Hodnota pro zdroj (např. „web“). Musí být předem v Airtable jako možnost u Single select. Prázdné = pole Source neposílat. */
const AIRTABLE_SOURCE_VALUE = (process.env.AIRTABLE_SOURCE_VALUE || "").trim();

/** Ověří ENV a formáty; vrací chybové hlášky. */
function validateAirtableEnv(): string[] {
  const errors: string[] = [];
  const key = AIRTABLE_API_KEY ?? "";
  const baseId = AIRTABLE_BASE_ID ?? "";
  const table = AIRTABLE_TABLE_CONTACTS ?? "";

  if (!key || key === "undefined") errors.push("AIRTABLE_API_KEY chybí nebo je prázdné");
  else {
    if (key.includes('"') || key.includes("'")) errors.push("AIRTABLE_API_KEY nesmí obsahovat uvozovky");
    const trimmed = key.trim();
    if (!trimmed.startsWith("pat")) errors.push("AIRTABLE_API_KEY musí začínat na pat");
    if (trimmed !== key) errors.push("AIRTABLE_API_KEY má mezeru na začátku nebo konci");
  }

  if (!baseId || baseId === "undefined") errors.push("AIRTABLE_BASE_ID chybí nebo je prázdné");
  else {
    if (baseId.includes('"') || baseId.includes("'")) errors.push("AIRTABLE_BASE_ID nesmí obsahovat uvozovky");
    if (!/^app[a-zA-Z0-9]+$/.test(baseId)) errors.push("AIRTABLE_BASE_ID musí začínat na app a obsahovat jen písmena/číslice");
    if (baseId.length < 14 || baseId.length > 20) errors.push("AIRTABLE_BASE_ID má mít cca 17 znaků");
    if (/\s/.test(baseId)) errors.push("AIRTABLE_BASE_ID nesmí obsahovat mezeru ani newline");
  }

  if (!table || table === "undefined") errors.push("AIRTABLE_TABLE_CONTACTS chybí nebo je prázdné");
  else if (table.includes('"') || table.includes("'")) errors.push("AIRTABLE_TABLE_CONTACTS nesmí obsahovat uvozovky");

  return errors;
}

const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validuje vstupní pole; vrací chybovou hlášku nebo null. */
function validateContactInput(name: string, email: string, message: string): string | null {
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();
  if (!n) return "Jméno je povinné.";
  if (!e) return "Email je povinný.";
  if (!m) return "Zpráva je povinná.";
  if (n.length > MAX_NAME_LENGTH) return `Jméno může mít nejvíc ${MAX_NAME_LENGTH} znaků.`;
  if (m.length > MAX_MESSAGE_LENGTH) return `Zpráva může mít nejvíc ${MAX_MESSAGE_LENGTH} znaků.`;
  if (!EMAIL_REGEX.test(e)) return "Zadejte platnou e-mailovou adresu.";
  return null;
}

async function saveToAirtable(
  name: string,
  email: string,
  message: string,
  phone?: string
) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return;

  const envErrors = validateAirtableEnv();
  if (envErrors.length > 0) {
    console.error("[api/contact] Airtable ENV neplatné:", envErrors);
    return;
  }

  const tableEncoded = encodeURIComponent(AIRTABLE_TABLE_CONTACTS);
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableEncoded}`;
  console.log("[api/contact] Airtable endpoint:", url);

  // Když EMAIL i MESSAGE mapují na stejný sloupec (např. Notes), sloučíme do jednoho textu.
  const sameField = AIRTABLE_FIELD_EMAIL && AIRTABLE_FIELD_EMAIL === AIRTABLE_FIELD_MESSAGE;
  const fields: Record<string, string> = {};
  if (AIRTABLE_FIELD_NAME) fields[AIRTABLE_FIELD_NAME] = name;
  if (sameField) {
    fields[AIRTABLE_FIELD_EMAIL] = `Email: ${email}\n\nZpráva: ${message}`;
  } else {
    if (AIRTABLE_FIELD_EMAIL) fields[AIRTABLE_FIELD_EMAIL] = email;
    if (AIRTABLE_FIELD_MESSAGE) fields[AIRTABLE_FIELD_MESSAGE] = message;
  }
  if (AIRTABLE_FIELD_SOURCE && AIRTABLE_SOURCE_VALUE) fields[AIRTABLE_FIELD_SOURCE] = AIRTABLE_SOURCE_VALUE;
  if (AIRTABLE_FIELD_PHONE && phone !== undefined && phone !== "") {
    fields[AIRTABLE_FIELD_PHONE] = phone;
  }

  const body = { fields };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const bodyText = await res.text();
  console.log("[api/contact] Airtable status:", res.status);
  console.log("[api/contact] Airtable body:", bodyText);

  if (!res.ok) {
    throw new Error(`Airtable ${res.status}: ${bodyText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Příliš mnoho odeslání, zkuste to za chvíli." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";
    const phone = (formData.get("phone") as string) || undefined;

    const validationError = validateContactInput(name, email, message);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.set("name", name);
    params.set("email", email);
    params.set("message", message);
    params.set("_subject", (formData.get("_subject") as string) || "Nová zpráva z webu");
    params.set("_replyto", email);
    const gotcha = formData.get("_gotcha");
    if (gotcha && typeof gotcha === "string") params.set("_gotcha", gotcha);

    const origin = request.headers.get("origin") || request.headers.get("referer") || "https://www.jdemevibit.cz";
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: params.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Referer: origin,
        "User-Agent": request.headers.get("user-agent") || "Mozilla/5.0 (compatible; jdemevibit/1.0)",
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("[api/contact] Formspree ne-OK:", res.status, data);
      const errorMessage =
        res.status === 429
          ? "Příliš mnoho odeslání, zkuste to za chvíli."
          : res.status >= 500
            ? "Dočasná chyba serveru. Zkuste to prosím později."
            : typeof data?.error === "string"
              ? data.error
              : "Odeslání se nepovedlo. Zkuste to prosím znovu.";
      return NextResponse.json(
        { error: errorMessage, formspreeStatus: res.status, ...data },
        { status: res.status }
      );
    }

    let airtableSaved: boolean | null = null;
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      try {
        await saveToAirtable(name, email, message, phone);
        airtableSaved = true;
      } catch (err) {
        console.error("[api/contact] Airtable zápis selhal (zpráva byla odeslána):", err);
        airtableSaved = false;
      }
    }

    return NextResponse.json({ ...data, airtableSaved }, { status: res.status });
  } catch (err) {
    console.error("[api/contact] Chyba při předání Formspree:", err);
    return NextResponse.json(
      { error: "Chyba serveru" },
      { status: 500 }
    );
  }
}
