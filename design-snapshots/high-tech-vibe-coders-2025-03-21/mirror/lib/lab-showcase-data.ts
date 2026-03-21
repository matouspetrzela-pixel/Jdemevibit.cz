export type LabStackId =
  | "cursor"
  | "bolt"
  | "v0"
  | "claude"
  | "replit"
  | "lovable";

export interface LabProject {
  id: string;
  authorName: string;
  authorNick: string;
  authorInitials: string;
  title: string;
  gut: string;
  stack: LabStackId[];
  accent?: "cyan" | "copper";
}

export const LAB_STACK_META: Record<
  LabStackId,
  { label: string; short: string }
> = {
  cursor: { label: "Cursor", short: "Cr" },
  bolt: { label: "Bolt", short: "Bt" },
  v0: { label: "v0", short: "v0" },
  claude: { label: "Claude", short: "Cl" },
  replit: { label: "Replit", short: "Rp" },
  lovable: { label: "Lovable", short: "Lv" },
};

export const LAB_PROJECTS: LabProject[] = [
  {
    id: "1",
    authorName: "Honza Novák",
    authorNick: "@honza_builds",
    authorInitials: "HN",
    title: "Interní dashboard pro SMB",
    gut: "Shipnul jsem MVP za víkend: auth, tabulky, export CSV. Error log v newsletteru — tři pády API, všechny opravené live.",
    stack: ["cursor", "claude"],
    accent: "cyan",
  },
  {
    id: "2",
    authorName: "Tereza K.",
    authorNick: "@terezavibe",
    authorInitials: "TK",
    title: "Landing + waitlist Brno",
    gut: "Design systém ve v0, logika v Bolt. Lokální copy, žádný generický Silicon Valley slang.",
    stack: ["v0", "bolt"],
    accent: "copper",
  },
  {
    id: "3",
    authorName: "Michal P.",
    authorNick: "@promptosaur",
    authorInitials: "MP",
    title: "AI asistent pro HR tým",
    gut: "Stack: Cursor + Claude. Ukázali jsme i špatné prompty — autenticita > leštěnka.",
    stack: ["cursor", "claude", "replit"],
    accent: "cyan",
  },
  {
    id: "4",
    authorName: "Eva S.",
    authorNick: "@evaship",
    authorInitials: "ES",
    title: "Micro-SaaS pro školky",
    gut: "Lovable na UI, Cursor na integrace. První platící zákazník z Olomouce.",
    stack: ["lovable", "cursor"],
    accent: "copper",
  },
];
