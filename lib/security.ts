// Security utilities
// Email obfuskace a další bezpečnostní funkce

/**
 * Obfuskuje email pomocí base64 encoding + reverse
 * Pro použití v environment variables
 */
export function obfuscateEmail(email: string): string {
  return btoa(email.split("").reverse().join(""));
}

/**
 * Deobfuskuje email (pouze na klientovi)
 */
export function deobfuscateEmail(obfuscated: string): string {
  try {
    return atob(obfuscated).split("").reverse().join("");
  } catch {
    return "";
  }
}

/**
 * Validuje URL pro bezpečné externí odkazy
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Vytvoří bezpečný externí odkaz s rel atributy
 */
export function createSafeExternalLink(url: string): {
  href: string;
  target: "_blank";
  rel: "noopener noreferrer";
} {
  return {
    href: isValidUrl(url) ? url : "#",
    target: "_blank",
    rel: "noopener noreferrer",
  };
}
