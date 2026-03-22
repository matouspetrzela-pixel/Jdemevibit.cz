/**
 * The Vault — Master Snippety (No-FOMO).
 * Každý záznam = okamžitě použitelný vstup pro Cursor / Claude / GPT-4o.
 */

// —— 001 [ ARCHITECT_INITIALIZER ] ——
export const VAULT_001_HEADLINE = "Protokol 001: Architektura vize";

export const VAULT_001_INTRO =
  "Tento snippet vlož do Cursoru (Cmd+L / Composer) na začátku projektu. Nastaví mantinely, aby model netvořil zmatečný nebo roztříštěný kód.";

/** Text zkopírovaný tlačítkem [ COPY_TO_BUFFER ] */
export const VAULT_001_SNIPPET = `Vytvoř strukturu Next.js 15 aplikace.
Pravidla:

Použij App Router a Server Components.

UI styl: High-end dark mode, Glassmorphism, Tailwind 4.

Každá komponenta musí mít plynulý vstup přes Framer Motion.

Piš čistý, modulární kód bez zbytečných komentářů.`;

export const VAULT_001_INSIGHT =
  "Tímto si nastavíš směr hned na startu — AI chápe, že nechceš generický výstup, ale srozumitelnou architekturu a konzistentní UI.";

// —— 002 [ THE_VIBE_PIPELINE ] ——
export const VAULT_002_HEADLINE = "Protokol 002: Workflow bez tření";

export const VAULT_002_INTRO =
  "Jak postupovat, abys neztratil nit. Metoda tří kroků — blueprint místo chaosu.";

export const VAULT_002_STEPS = `1. v0 Prompting: Nejdřív vygeneruj vizuál v v0.dev.

2. Context Inject: Hoď kód do Cursoru a přidej @docs pro shadcn/ui nebo svůj stack.

3. Iterative Polish: Nechtěj vše naráz. Nejdřív layout, pak data, nakonec animace.`;

/** Jeden blok ke vložení do chatu jako připomínka pipeline */
export const VAULT_002_SNIPPET = `Metoda 3 kroků (Vibe pipeline):

1) v0 Prompting: Nejdřív vygeneruj vizuál v v0.dev.

2) Context Inject: Hoď kód do Cursoru a přidej @docs pro shadcn/ui nebo svůj stack.

3) Iterative Polish: Nechtěj vše naráz. Nejdřív layout, pak data, nakonec animace.`;

export const VAULT_002_INSIGHT =
  "Tento postup ti pomůže držet soustředění na nápad a strukturu; syntaktickou práci nech na nástroji, ale v jasných fázích.";

// —— 003 [ MOTION_REVEAL_ENGINE ] ——
export const VAULT_003_HEADLINE = "Protokol 003: Duše v kódu (Motion)";

export const VAULT_003_INTRO =
  "Zkopíruj snippet a řekni modelu, ať ho aplikuje na vybrané karty nebo sekce (upřesni selektor nebo komponentu).";

export const VAULT_003_SNIPPET = `Aplikuj na tento element Framer Motion reveal efekt.
Parametry:
- initial: { opacity: 0, scale: 0.95, y: 20 }
- whileInView: { opacity: 1, scale: 1, y: 0 }
- transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
- viewport: { once: true }`;

export const VAULT_003_INSIGHT =
  "Plynulý reveal při vstupu do viewportu působí „prémiově“ — organický pohyb bez přehnaného chaosu na celé stránce.";

// Zpětná kompatibilita (starý import v jiných souborech — pokud existuje)
export const MASTER_CURSOR_RULES_SNIPPET = VAULT_001_SNIPPET;
