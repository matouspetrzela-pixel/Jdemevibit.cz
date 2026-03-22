/** Sdílené nastavení kontaktního formuláře (stránka + header modal). */
export const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
export const FORMSPREE_CONFIGURED = Boolean(FORMSPREE_FORM_ID);
export const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
export const API_CONTACT = "/api/contact";

/** Výchozí = percent-encoded (š, ž) */
export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  "https://www.linkedin.com/in/matou%C5%A1-petr%C5%BEela";
