/** Tajný kód Phase Alpha — musí přesně sedět (case-insensitive po normalizaci). */
export const VAULT_SECRET_CODE = "VIBE_LAB_01";

export const VAULT_STORAGE_KEY = "jdv_vault_clearance_v1";

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
