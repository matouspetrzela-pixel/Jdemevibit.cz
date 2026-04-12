import type { Project } from "@/lib/projects";

/** Krátké popisy (informační dieta) — strategické texty pro id 1–6, jinak ořez na max. slov. */
const BY_ID: Record<string, string> = {
  "1": "Vizuální engine lokální politiky. Ship za 24 hodin.",
  "2": "Externí mozek: ukládání a třídění vize automaticky.",
  "3": "Inspirace na klik. Extrakce vibe coding vzorců.",
  "4": "Enterprise AI v praxi. Dekonstrukce dat v reálném čase.",
  "5": "Minimalistické stopky pro deep work seance.",
  "6": "Architektura pozornosti. Eventy pod kontrolou.",
  "12": "SaaS náklady na jedné obrazovce. Data anonymizovaná.",
  "13": "Podpis do mailu: formulář, náhled, HTML ven.",
  "14": "Mapa pokrytí ulic. OSM trasy, barvy podle přiřazení.",
  "15": "Dotazy k vlastním souborům. Odpovědi s citací zdroje.",
};

function truncateWords(text: string, maxWords: number): string {
  const w = text.trim().split(/\s+/).filter(Boolean);
  if (w.length <= maxWords) return text.trim();
  return `${w.slice(0, maxWords).join(" ")}…`;
}

export function getArchiveSummary(project: Project): string {
  const custom = BY_ID[project.id];
  if (custom) return custom;
  return truncateWords(project.description, 10);
}
