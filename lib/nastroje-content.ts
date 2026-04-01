import type { Nastroj } from "./content-types";

const now = "2026-04-01T00:00:00.000Z";

export const NASTROJE_CONTENT: Nastroj[] = [
  {
    id: "tool-claude",
    slug: "claude",
    title: "Claude",
    description:
      "Hlavní partner pro přemýšlení, iterace a rozsekání mlhy mezi nápadem a funkčním řešením.",
    category: "nastroj",
    createdAt: now,
    updatedAt: now,
    published: true,
    what:
      "Claude používám jako pracovní vrstvu mezi nápadem a realizací. Ne jako generátor náhodného textu, ale jako spolupracovníka pro rozklad problému, návrh postupu, revizi logiky a rychlé hledání slepých míst.",
    why:
      "Je to nástroj, který mi nejvíc pomáhá udržet tempo bez ztráty směru. Když stavím nový projekt, Claude mi šetří čas hlavně v okamžiku, kdy potřebuji rychle ujasnit architekturu, zjednodušit scope nebo přepsat chaos do konkrétních kroků.",
    how:
      "Začínám cílem, ne technologií.\nSepíšu problém, očekávaný výsledek a limity.\nNechám si navrhnout první verzi řešení, ale pak ji vždycky tlačím do konkrétní podoby: co je MVP, co se má ověřit hned a co počká.\nClaude používám nejlépe tam, kde potřebuji přemýšlet nahlas, ne slepě kopírovat.",
    useCases: [
      "Rozbití velkého nápadu na první shipnutelný scope.",
      "Návrh struktury stránky, mikrocopy a message pro web.",
      "Revize logiky nebo contentu před publikací.",
      "Příprava variant textu pro LinkedIn, landing page nebo CTA.",
    ],
    alternatives: ["ChatGPT", "Gemini", "Perplexity"],
    keywords: [
      "Claude",
      "AI assistant",
      "prompting",
      "iteration",
      "workflow",
    ],
  },
  {
    id: "tool-github",
    slug: "github",
    title: "GitHub",
    description:
      "Verzování, historie a důkaz, že projekt není jen nápad, ale reálná práce v čase.",
    category: "nastroj",
    createdAt: now,
    updatedAt: now,
    published: true,
    what:
      "GitHub je pro mě paměť projektu. Drží historii změn, umožňuje vracet se zpět a dává celé tvorbě řád. I u menších buildů je to rozdíl mezi improvizací a disciplínou.",
    why:
      "Bez GitHubu se snadno ztratí kontext, proč se něco měnilo a co už fungovalo. S GitHubem je každý projekt čitelnější, bezpečnější a jednodušší na další iterace. Zároveň je to veřejný důkaz, že vzniká něco skutečného.",
    how:
      "Používám ho průběžně, ne až na konci. Každá větší změna by měla mít svůj důvod a svou stopu.\nDůležité je nečekat na perfektní stav. Commit je záznam rozhodnutí, ne muzeální exponát.\nDíky tomu se dá vracet, porovnávat a růst bez chaosu.",
    useCases: [
      "Verzování projektů před deployem na Vercel.",
      "Porovnání změn po zásahu AI asistenta.",
      "Bezpečný návrat k předchozí verzi řešení.",
      "Sdílení veřejného důkazu, že projekt existuje a vyvíjí se.",
    ],
    alternatives: ["GitLab", "Bitbucket"],
    keywords: ["GitHub", "git", "version control", "repository", "workflow"],
  },
  {
    id: "tool-vercel",
    slug: "vercel",
    title: "Vercel",
    description:
      "Nejrychlejší cesta od lokální verze k veřejnému výsledku, který může někdo otevřít hned dnes.",
    category: "nastroj",
    createdAt: now,
    updatedAt: now,
    published: true,
    what:
      "Vercel používám jako deployment vrstvu pro weby a experimenty, které mají být online co nejdřív. Je to nástroj, který drží momentum. Kód nemusí zůstat jen v lokálu nebo v repozitáři, ale může se rychle proměnit ve veřejný výstup.",
    why:
      "Právě deploy odděluje hraní si od skutečného shipování. Vercel mi pomáhá zkrátit cestu mezi nápadem a reakcí zvenku. To je klíčové hlavně u vibe codingu, kde je rychlá zpětná vazba součástí procesu.",
    how:
      "Nejdřív řeším funkční kostru, potom deploy. Jakmile je verze dost dobrá na ukázku, jde ven.\nVercel používám jako checkpoint: co je nasazené, to se dá ukázat, otestovat a zhodnotit.\nTím se projekt přestává schovávat v rozdělaném stavu.",
    useCases: [
      "Nasazení prezentačních webů a experimentů.",
      "Rychlé ověření, zda projekt funguje i mimo lokální prostředí.",
      "Sdílení konkrétního výsledku v LinkedIn postu nebo kontaktu.",
      "Průběžné publikování nových iterací webu.",
    ],
    alternatives: ["Netlify", "Render", "Cloudflare Pages"],
    keywords: ["Vercel", "deployment", "Next.js", "hosting", "ship fast"],
  },
  {
    id: "tool-airtable",
    slug: "airtable",
    title: "Airtable",
    description:
      "Lehká datová vrstva pro projekty, kde chceš rychle pracovat s obsahem, přehledem a workflow bez těžké databáze.",
    category: "nastroj",
    createdAt: now,
    updatedAt: now,
    published: true,
    what:
      "Airtable používám jako praktickou datovou vrstvu tam, kde potřebuji rychle spravovat strukturovaná data, obsah nebo jednoduchý interní workflow. Je to most mezi tabulkou a aplikací.",
    why:
      "Ne každý projekt potřebuje hned plnohodnotnou databázi a komplexní backend. Airtable je užitečný ve chvíli, kdy chceš rychle validovat datový model, pracovat s formuláři nebo držet obsah odděleně od kódu.",
    how:
      "Používám ho tam, kde má rychlost větší hodnotu než systémová čistota enterprise řešení.\nNejdřív si ujasním, jaká data opravdu potřebuji. Pak postavím jednoduchou strukturu tabulek a teprve poté řeším integraci do webu nebo workflow.\nAirtable funguje nejlépe jako pragmatický první krok, ne jako výmluva nic nespustit.",
    useCases: [
      "Správa lehkého contentu a interních přehledů.",
      "Rychlé ověření datového modelu před robustnějším řešením.",
      "Formuláře, statusy a jednoduchá workflow logika.",
      "Napojení malého webu na editovatelná data bez těžké administrace.",
    ],
    alternatives: ["Notion", "Baserow", "Supabase"],
    keywords: ["Airtable", "no-code", "database", "content", "workflow"],
  },
];
