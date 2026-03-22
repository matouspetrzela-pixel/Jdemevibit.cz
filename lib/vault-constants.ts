/** Tajný kód Vaultu — case-insensitive (viz normalizeVaultInput). */
export const VAULT_SECRET_CODE = "decrypted002";

/** Nová verze při změně hesla — starý unlock z předchozího kódu se ignoruje. */
export const VAULT_STORAGE_KEY = "jdv_vault_clearance_v2";

export function readVaultUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(VAULT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeVaultUnlocked(): void {
  try {
    window.localStorage.setItem(VAULT_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function normalizeVaultInput(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "_");
}
