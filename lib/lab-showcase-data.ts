export type LabStackId =
  | "cursor"
  | "claude_code"
  | "github"
  | "claude";

export interface LabProject {
  id: string;
  authorName: string;
  authorNick: string;
  authorInitials: string;
  title: string;
  gut: string;
  /** Jedna věta manifestu / ponaučení (řádek // insight) */
  insight: string;
  stack: LabStackId[];
  accent?: "cyan" | "copper";
  /** Volitelný cyan callout pod hlavním textem */
  wowTip?: string;
  /** Kód v náhledové oblasti karty (jinak výchozí snippet) */
  previewCode?: string;
}

export const LAB_STACK_META: Record<
  LabStackId,
  { label: string; short: string }
> = {
  cursor: { label: "Cursor", short: "Cr" },
  claude_code: { label: "Claude Code", short: "CC" },
  github: { label: "GitHub", short: "GH" },
  claude: { label: "Claude", short: "Cl" },
};

/** Čtyři lab protokoly — manifest vibe codera (obsahové karty, ne anonymní feed). */
export const LAB_PROJECTS: LabProject[] = [
  {
    id: "p1",
    authorName: "MANIFESTO",
    authorNick: "// protocol_001 — speed_over_scope",
    authorInitials: "01",
    title: "Shipuj vizi, ne dokonalý kód.",
    gut: "Největší past je čekat, až pochopíš každý řádek. AI je tvůj exekutor, ty jsi režisér. Tvým úkolem je trajektorie — shipni MVP za víkend. Když to nikdo nepoužije, ušetříš měsíce ladění zbytečností.",
    insight:
      "Dokonalost je v AI éře nepřítelem rychlosti — 80 % výsledku za 20 % času.",
    wowTip:
      "1-Hour Sprint: když první verze trvá déle než hodinu, uřízni 50 % scope. Shipuj jen to, co bolí nejvíc.",
    previewCode:
      '// protocol_001 — ship\nif (minutesToDemo > 60) {\n  scope = scope.filter((_, i) => i % 2 === 0);\n}',
    stack: ["cursor", "github"],
    accent: "cyan",
  },
  {
    id: "p2",
    authorName: "SECURITY",
    authorNick: "// protocol_002 — ai_truth_test",
    authorInitials: "02",
    title: "Model ti lže. Nauč se ho kontrolovat.",
    gut: "AI je silná, ale halucinuje u API klíčů, verzí knihoven a produkčních configů. Kód k databázi nebo k penězům nepouštěj bez manuálního diffu. Model je asistent — ty držíš spoušť.",
    insight:
      "Důvěřuj, ale ověřuj důkazem. Každá iterace musí skončit viditelným výstupem v terminálu nebo v UI.",
    wowTip:
      "Před mergem: „Vyjmenuj 3 místa, kde jsi mohl udělat chybu v logice.“ Často trefí problém dřív než ty.",
    previewCode:
      "// protocol_002 — validate\nassertEnvLoaded();\nassertNoSecretsInDiff(await git.diff());",
    stack: ["claude", "github"],
    accent: "copper",
  },
  {
    id: "p3",
    authorName: "WORKFLOW",
    authorNick: "// protocol_003 — composer",
    authorInitials: "03",
    title: "Zahoď copy-paste. Používej Composer.",
    gut: "Chat jen o jednom souboru je minulost. V Cursoru otevři Composer (Ctrl+I / Cmd+I) a nech AI měnit víc souborů najednou — API, databázi, frontend. Ty sleduješ, jak se skládá celá feature.",
    insight:
      "Pracuj na úrovni architektury, ne řádků. Buď dirigent, ne písař.",
    wowTip:
      "Zkus: „Přidej Stripe checkout a uprav podle toho UI i databázi.“ Sleduj multi-file diff.",
    previewCode:
      "// protocol_003 — compose\nawait composer.apply({\n  paths: [\"api/**\", \"db/**\", \"src/ui/**\"],\n});",
    stack: ["cursor", "claude_code"],
    accent: "cyan",
  },
  {
    id: "p4",
    authorName: "ARCHITECT",
    authorNick: "// protocol_004 — no_backend_era",
    authorInitials: "04",
    title: "Frontend je tvé nové bojiště.",
    gut: "Nemusíš být backend mág. Supabase nebo Firebase + AI ti pomůžou s logikou — soustřeď se na to, co uživatel vidí a cítí. Backend je komodita, kterou řídíš prompty a rozhraními.",
    insight:
      "Full-stack pocit za jedno odpoledne — když máš jasný scope a správný stack.",
    wowTip:
      "Pipeline: UI ve v0 → import do Cursoru → „napoj na Supabase“. Ušetříš dny mechanické práce.",
    previewCode:
      '// protocol_004 — stack\nconst pipeline = ["v0", "cursor", "supabase"];\nawait shipMVP({ pipeline });',
    stack: ["cursor", "github"],
    accent: "copper",
  },
];
