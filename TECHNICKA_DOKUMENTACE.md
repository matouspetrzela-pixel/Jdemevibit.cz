# Technická dokumentace - Jdemevibit.cz

## 📋 Obsah

1. [Architektura](#architektura)
2. [SEO Implementace](#seo-implementace)
3. [Security](#security)
4. [Pravidla pro AI a publikaci citlivých údajů](#pravidla-pro-ai-a-publikaci-citlivých-údajů)
5. [Performance](#performance)
6. [Content Struktura](#content-struktura)
7. [Kontaktní formulář a Formspree](#kontaktní-formulář-a-formspree)
8. [Deployment](#deployment)
9. [Vývoj](#vývoj)

---

## 🏗️ Architektura

### Technický Stack

- **Framework:** Next.js 16 (App Router)
- **Jazyk:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Font:** Inter (Google Fonts)
- **Runtime:** Node.js 18+

### Struktura projektu

```
jdemevibit-web/
├── app/
│   ├── layout.tsx              # Root layout s globálním SEO
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Globální styly
│   ├── robots.ts               # robots.txt generátor
│   ├── sitemap.ts              # sitemap.xml generátor
│   ├── seo/                    # SEO modul
│   │   ├── generateMetadata.ts # Page-level metadata generator
│   │   ├── schemas.ts          # Structured data schemas
│   │   └── ogImage.ts          # OG image utilities
│   ├── use-cases/              # Use cases sekce
│   │   ├── page.tsx            # Use cases listing
│   │   └── [slug]/page.tsx    # Dynamický use case
│   ├── navody/                 # Návody sekce
│   │   └── [slug]/page.tsx    # Dynamický návod
│   ├── nastroje/               # Nástroje sekce
│   │   └── [slug]/page.tsx    # Dynamický nástroj
│   ├── o-mne/
│   │   └── page.tsx            # O mně stránka
│   ├── kontakt/
│   │   └── page.tsx            # Kontakt stránka
│   └── api/
│       ├── contact/route.ts    # POST – Formspree + Airtable
│       └── og/route.tsx        # OG image (Edge)
├── components/
│   ├── Header.tsx              # Hlavička s navigací
│   ├── Hero.tsx                # Hero sekce
│   ├── UseCasesSection.tsx    # Use cases grid
│   ├── ProjectCard.tsx         # Karta projektu
│   ├── ContactForm.tsx          # Kontaktní formulář (Formspree přes /api/contact)
│   ├── StructuredData.tsx      # JSON-LD komponenta
│   └── OptimizedImage.tsx      # Optimalizovaná Image komponenta
├── lib/
│   ├── seo.ts                  # SEO utilities
│   ├── security.ts             # Security utilities
│   ├── content-types.ts        # Content datový model
│   └── projects.ts             # Projekty data
├── public/                     # Statické soubory
├── scripts/
│   └── airtable-diagnose.mjs   # Diagnostika Airtable (env, meta, POST)
├── styles/                     # Další styly (volitelné)
├── next.config.ts              # Next.js konfigurace
├── tailwind.config.ts          # Tailwind konfigurace
├── tsconfig.json               # TypeScript konfigurace
└── package.json                # Dependencies
```

### Design Systém

#### Barvy

- **Pozadí:** `#0f1217` (černá)
- **Text:** `#ffffff` (bílá)
- **Lila (Jdeme):** `#7b3beb`
- **Červená (vibit):** `#ef2c28`
- **Šedá (sekundární):** `#6b6c6d`

#### Typografie

- **Font:** Inter (Google Fonts)
- **Display:** swap (pro performance)
- **Antialiasing:** aktivní

---

## 🔍 SEO Implementace

### 3-vrstvá SEO strategie

#### A) Globální SEO (layout.tsx)

**Metadata struktura:**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Vibe Coding & AI Tvorba z Praxe | Jdemevibit",
    template: "%s | Jdemevibit"
  },
  description: "Praktické projekty vytvořené s AI nástroji...",
  // Open Graph, Twitter Cards, robots, canonical
}
```

**Klíčové prvky:**
- Title template pro konzistenci
- Description optimalizovaná pro vyhledávače
- Open Graph (LinkedIn-first)
- Twitter Cards
- Canonical URLs
- Robots meta tags

#### B) Page-level SEO

**Použití `generateMetadata()`:**
```typescript
// app/use-cases/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps) {
  const content = getContentBySlug(slug);
  return generatePageMetadata({
    title: `${content.title} vytvořený za ${content.timeSpent} s AI`,
    description: content.description,
    path: `/use-cases/${slug}`,
    ogImage: buildOGImageUrl({...}),
  });
}
```

**Každá stránka má:**
- Unikátní title
- Unikátní description
- Canonical URL
- Dynamické OG image
- Robots directives

#### C) Structured Data (JSON-LD)

**Implementované schemas:**

1. **Person Schema** (E-E-A-T)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jdemevibit",
  "jobTitle": "Vibe Coding & AI Developer",
  "knowsAbout": ["Vibe Coding", "AI Programming", ...]
}
```

2. **WebSite Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jdemevibit",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {...}
  }
}
```

**Umístění:** `components/StructuredData.tsx`

### Content SEO

#### H1/H2/H3 vzory

**Homepage:**
- H1: "Vibe Coding & AI Tvorba z Praxe"
- H2: "Co je vibe coding v reálném světě"
- H2: "Proč stavím projekty s AI veřejně"
- H2: "Projekty vytvořené za hodiny, ne týdny"
- H3: "Claude a Cursor v praxi", "Learning in public přístup", "Konkrétní use cases"

**Use Case stránka:**
- H1: "[Název projektu] vytvořený za [čas] s AI"
- H2: "Kontext a cíl projektu"
- H2: "Použité nástroje"
- H2: "Jak probíhal vývoj"
- H3: "Promptování", "Iterace", "Co bych dnes udělal jinak"
- H2: "Výsledek"

#### Content struktura

Každá obsahová stránka obsahuje:
- **TL;DR sekce** - krátké shrnutí
- **Kontext** - proč projekt vznikl
- **Proces** - jak probíhal vývoj
- **Výsledek** - co bylo dosaženo

### Image SEO

**Optimalizace:**
- WebP/AVIF formát (automaticky Next.js)
- Lazy loading (kromě hero)
- Správné alt texty (popisují realitu, žádný keyword stuffing)
- Width + height atributy
- Responsive images s sizes

**OG Images:**
- 1200x630px (LinkedIn optimalizace)
- Dynamická generace připravena
- Helper: `app/seo/ogImage.ts`

### Robots & Sitemap

**robots.txt:**
```
User-agent: *
Allow: /
Disallow: /api/, /admin/, /_next/

User-agent: Googlebot
Allow: /
Disallow: /api/, /admin/

Sitemap: https://jdemevibit.cz/sitemap.xml
```

**sitemap.xml:**
- Automatická generace z rout
- Dynamické přidávání content stránek
- Priorita a changeFrequency podle typu stránky

---

## 🔒 Security

### Security Headers

**Implementováno v `next.config.ts`:**

```typescript
headers: [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self'; style-src 'self' fonts.googleapis.com; ..."
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
      }
    ]
  }
]
```

### CSP (Content Security Policy)

**Strict CSP - žádné inline:**
- ❌ Žádné inline skripty (`unsafe-inline`)
- ❌ Žádné inline styly (`unsafe-inline`)
- ❌ Žádný `eval()` (`unsafe-eval`)
- ✅ Všechny skripty z `'self'`
- ✅ Styly z `'self'` + Google Fonts
- ✅ Obrázky z `'self'`, `data:`, `https:`

### Email Obfuskace

**Implementace:**
- Base64 encoding + reverse
- Deobfuskace pouze na klientovi
- SSR protection
- Utility: `lib/security.ts`

```typescript
// Obfuskace pro .env
NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED=<obfuscated>

// Deobfuskace v komponentě
const email = deobfuscateEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED);
```

### Externí odkazy

**Bezpečné odkazy:**
- Vždy `target="_blank"`
- Vždy `rel="noopener noreferrer"`
- URL validace
- Helper: `createSafeExternalLink()` v `lib/security.ts`

### Environment Variables

**Citlivé údaje:**
- Email (obfuskovaný)
- LinkedIn URL
- Site URL

**Ochrana:**
- `.gitignore` chrání `.env.local`
- `.env.example` jako template
- Žádné secrets v kódu

---

## 🤖 Pravidla pro AI a publikaci citlivých údajů

**Při práci s AI asistentem (např. v Cursoru) v tomto projektu platí:**

- **Nikdy nepublikovat ani uveřejňovat** odkazy na účty, přihlašovací stránky ani citlivé identifikátory, například:
  - Vercel (dashboard, projekty, nastavení)
  - GitHub (repozitáře, organizace, profily)
  - API klíče, tokeny, hesla a jakékoli secrets
  - Ostatní služby typu Formspree, analytics účty a podobně
- **Výjimka:** Tyto údaje nebo odkazy smí asistent uvést **pouze tehdy, když to výslovně požaduje sám uživatel**. Jinak nikdy.
- Cíl: zabránit náhodnému vložení citlivých odkazů nebo credentials do commitů, dokumentace, chatů nebo veřejných výstupů.

---

## ⚡ Performance

### Core Web Vitals

**Optimalizace:**

1. **LCP (Largest Contentful Paint)**
   - Priority loading pro hero images
   - WebP/AVIF formát
   - Optimální image sizes

2. **CLS (Cumulative Layout Shift)**
   - Width + height na všech obrázcích
   - Font display: swap
   - CSS optimalizace

3. **INP (Interaction to Next Paint)**
   - Minimální JavaScript
   - Client components pouze kde nutné
   - Optimalizované event handlery

### Image Optimization

**Next.js Image:**
- Automatický WebP/AVIF
- Lazy loading (default)
- Responsive images
- Priority pro above-the-fold

**Komponenta:** `components/OptimizedImage.tsx`

### Font Optimization

**Inter Font:**
- `display: swap` (prevent FOIT)
- Subset: latin
- Preload připraven

### CSS Optimization

**Tailwind CSS:**
- PurgeCSS automaticky
- Minimal bundle size
- No inline styles

### JavaScript Optimization

**Next.js:**
- Tree shaking
- Code splitting automaticky
- Remove console v produkci
- Minimal runtime

---

## 📝 Content Struktura

### Datový model

**Type-safe content types:**
```typescript
// lib/content-types.ts

interface UseCase extends BaseContent {
  category: "use-case";
  context: string;
  goal: string;
  tools: string[];
  timeSpent: string;
  process: string[];
  prompts?: string[];
  iterations?: string[];
  result: string;
  url?: string;
  githubUrl?: string;
  keywords: string[];
  ogImage?: string;
}
```

### Programmatic SEO

**Připraveno pro:**
- Use cases (`/use-cases/[slug]`)
- Návody (`/navody/[slug]`)
- Nástroje (`/nastroje/[slug]`)

**Každý content:**
- Unikátní příběh
- Reálný výsledek
- Žádná generická AI slova
- SEO optimalizovaný

### Content Helpers

**Funkce:**
- `getAllContent()` - všechny content items
- `getContentBySlug(slug)` - content podle slug
- `getContentByCategory(category)` - content podle kategorie

### Sekce Projekty (Projekty)

**Účel:** Na homepage se zobrazuje sekce „Projekty“ s kartami projektů (název, popis, technologie; volitelně odkaz na živou aplikaci a náhledový obrázek). Data se načítají z Markdown souborů, ne z CMS.

**Umístění:**
- **Markdown:** `projects/*.md` – každý projekt jeden soubor (např. `10-popelnice-pripominky-svozu-poplatku.md`).
- **Obrázky (volitelně):** `public/projects/` – náhledy ve formátu PNG nebo SVG. Cesta v frontmatter: `image: "/projects/<id>-<nazev>.png"`. Bez `image` se v modalu nezobrazuje náhled.
- **Načítání:** `lib/projects.ts` – funkce `getProjects()` čte všechny `.md` v `projects/`, parsuje frontmatter (gray-matter) a tělo jako `fullDescription`. Projekty se řadí podle číselného `id`.

**Frontmatter projektu:**
- **Povinná pole:** `id`, `title`, `description`, `technologies`, `timeSpent`, `status`, `category`
- **Volitelná:** `url` (odkaz na živou aplikaci – neuveden = na kartě není odkaz), `image` (náhled v modalu – neuveden = bez obrázku), `businessBenefit`, `createdAt`

**Přidání nového projektu:**
1. Vytvořit soubor `projects/<id>-<slug>.md` s YAML frontmatter a krátkým tělem (nadpis H1, pár vět – text má inspirovat, ne odrazovat).
2. Volitelně: přidat náhled do `public/projects/<id>-<nazev>.png` (nebo `.svg`) a v frontmatter uvést `image: "/projects/<id>-<nazev>.png"`.
3. Po uložení se projekt zobrazí na homepage po obnovení stránky (dev i po deployi).

**Příklad projektu:** Aplikace pro svoz komunálního odpadu (Popelnice) – soubor `projects/10-popelnice-pripominky-svozu-poplatku.md`. Bez `url` a bez `image` (pouze osobně poskytnutý přístup). Popis stručný: kdy vyvézt svozovou popelnici, kdy platit obecní poplatky, notifikace e-mailem den předem.

---

## 📬 Kontaktní formulář a Formspree

### Architektura odesílání

Odeslání zprávy neprobíhá přímo z prohlížeče na Formspree (kvůli blokování v síti, CORS nebo rozšířeních), ale přes vlastní API:

1. **Prohlížeč** – uživatel vyplní formulář a klikne na „Odeslat“.
2. **Klientský kód** (`components/ContactForm.tsx`) – `fetch("POST", "/api/contact", FormData)` s poli `name`, `email`, `message`, `_subject`, `_replyto`, `_gotcha`.
3. **API route** (`app/api/contact/route.ts`) – přijme POST, ověří vstup (validace), zkontroluje rate limit, pošle data na Formspree a při úspěchu zároveň zapíše záznam do Airtable (pokud jsou nastavené `AIRTABLE_API_KEY` a `AIRTABLE_BASE_ID`).
4. **Formspree** – zpracuje odeslání a pošle notifikaci na váš email.
5. **Airtable** (volitelně) – ukládá kontakty do tabulky (např. Name + Email) pro budování komunity.

**Soubory:**
- `components/ContactForm.tsx` – formulář (id `contact-form`), stav `form-status` s `role="status"` a `aria-live="polite"`, tlačítko volá `formRef.current.requestSubmit()`.
- `app/api/contact/route.ts` – validace, rate limit, proxy na Formspree, zápis do Airtable; používá `NEXT_PUBLIC_FORMSPREE_FORM_ID`, volitelně `AIRTABLE_*`.
- `scripts/airtable-diagnose.mjs` – diagnostický skript pro ověření Airtable připojení (spustit: `node scripts/airtable-diagnose.mjs` z kořene `jdemevibit-web`).

### Validace a ochrana

- **Backend validace:** Povinná pole (jméno, email, zpráva), formát emailu (regex), max. délka jména 200 znaků, zprávy 2000 znaků. Při neplatných datech API vrací `400` a JSON `{ error: "…" }` (česky).
- **Rate limiting:** Max. 5 požadavků za 15 minut na IP (in-memory; na Vercelu platí v rámci jedné instance). Při překročení odpověď `429` s hláškou „Příliš mnoho odeslání, zkuste to za chvíli.“
- **Zpětná vazba Airtable:** Odpověď API obsahuje `airtableSaved: true | false | null`. Když zápis do Airtable selže, uživatel vidí: „Zpráva byla odeslána na váš email. Nepodařilo se ji uložit do databáze – zkontrolujte prosím nastavení.“
- **Chybové hlášky:** Podle stavu Formspree/API se zobrazují konkrétní zprávy (429 = rate limit, 5xx = dočasná chyba serveru, 400 = validace).

### Environment variables

| Proměnná | Povinné | Popis |
|----------|---------|--------|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ano (produkce) | Form ID z Formspree (např. `xkovrywy`). Bez něj formulář na webu neodešle zprávy. |
| `NEXT_PUBLIC_SITE_URL` | doporučeno | Bázová URL webu (např. `https://www.jdemevibit.cz`). |
| `NEXT_PUBLIC_LINKEDIN_URL` | volitelné | Odkaz na LinkedIn v sekci Kontakt. |
| `AIRTABLE_API_KEY` | volitelné | Airtable Personal Access Token (začíná `pat…`). Bez něj se zprávy neukládají do Airtable. |
| `AIRTABLE_BASE_ID` | volitelné | ID Airtable base (začíná `app…`). |
| `AIRTABLE_TABLE_CONTACTS` | volitelné | Název tabulky pro zprávy (výchozí: `Zprávy`). |
| `AIRTABLE_FIELD_NAME` | volitelné | Název sloupce pro jméno (výchozí: `Jméno`). Prázdné = pole neposílat. |
| `AIRTABLE_FIELD_EMAIL` | volitelné | Název sloupce pro email (výchozí: `Email`). Musí přesně odpovídat Airtable. |
| `AIRTABLE_FIELD_MESSAGE` | volitelné | Název sloupce pro zprávu. **Prázdná hodnota** = zprávu do Airtable neposílat (jen Name + Email). Výchozí: `Zpráva`. |
| `AIRTABLE_FIELD_PHONE` | volitelné | Název sloupce pro telefon (formulář pole nemá; posílá se jen pokud přidáte). |
| `AIRTABLE_FIELD_SOURCE` | volitelné | Název sloupce pro zdroj (např. Single select). |
| `AIRTABLE_SOURCE_VALUE` | volitelné | Hodnota zdroje (např. `web`). Musí existovat v Airtable u daného pole. Prázdné = pole Source neposílat. |

Lokálně: zkopírovat `.env.example` do `.env.local` a vyplnit. **Na Vercel:** Settings → Environment Variables (Production) – nastavit všechny potřebné proměnné včetně Airtable a po uložení spustit **Redeploy**, aby se env načetly.

### Formspree (free verze)

- **Registrace:** Na [formspree.io](https://formspree.io) vytvořte formulář a zadejte email pro příjem zpráv.
- **Ověření emailu:** Po vytvoření formuláře Formspree pošle ověřovací email – je nutné na odkaz kliknout, jinak zprávy nemusí chodit.
- **Zprávy ve spamu:** U free verze mohou notifikace od Formspree končit ve spamu. Doporučení:
  - Ve složce Spam zvolit „Není spam“ u jedné zprávy od Formspree.
  - Přidat odesílatele (Formspree) do kontaktů v Gmailu/Outlooku.
  - V nastavení formuláře ve Formspree zkontrolovat, že je nastavený správný příjemce (Email to receive submissions).
- **CAPTCHA:** Pokud ve Formspree zapnete CAPTCHA, musí frontend posílat platný reCAPTCHA token. Aktuální implementace CAPTCHA nepoužívá – pro free bez reCAPTCHA nechte CAPTCHA vypnutou.

### Chybové stavy

- **„Chyba připojení. Zkuste to znovu.“** – `fetch("/api/contact")` selhal (síť, výpadek).
- **„Odeslání se nepovedlo.“** – Formspree nebo API vrátilo ne-OK. Zkontrolovat Formspree dashboard a nastavení formuláře.
- **„Příliš mnoho odeslání, zkuste to za chvíli.“** – Rate limit (429).
- **„Dočasná chyba. Zkuste to prosím později.“** – Chyba serveru (5xx).
- **Validace (400):** Konkrétní hláška (např. „Jméno je povinné.“, „Zadejte platnou e-mailovou adresu.“).

### Airtable (ukládání zpráv)

Pokud jsou nastavené `AIRTABLE_API_KEY` a `AIRTABLE_BASE_ID`, API po úspěšném odeslání na Formspree zapíše záznam do zadané Airtable tabulky. Názvy sloupců se mapují podle env (`AIRTABLE_FIELD_NAME`, `AIRTABLE_FIELD_EMAIL`, `AIRTABLE_FIELD_MESSAGE` atd.).

**Struktura tabulky:** Názvy sloupců musí **přesně** odpovídat hodnotám v env (v Airtable rozlišují velikost písmen). Můžete mít např. jen **Name** a **Email** – pak nastavte `AIRTABLE_FIELD_MESSAGE=` (prázdné) a zpráva se do Airtable neposílá.

Při chybě zápisu do Airtable se chyba zaloguje a uživatel uvidí: „Zpráva byla odeslána na váš email. Nepodařilo se ji uložit do databáze – zkontrolujte prosím nastavení.“

**Produkce (Vercel):** Aby záznamy chodily do Airtable na živém webu, musí být všechny Airtable proměnné nastavené v **Vercel → Settings → Environment Variables** pro prostředí **Production** a po jejich přidání/změně je nutné spustit **Redeploy** deploymentu.

**Chyba 403 (INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND):** Token nemá oprávnění k base nebo tabulka nebyla nalezena. Zkontrolujte Personal Access Token (scope `data.records:write`), `AIRTABLE_BASE_ID` a `AIRTABLE_TABLE_CONTACTS`. **Chyba 422 (UNKNOWN_FIELD_NAME):** Název sloupce v env neodpovídá Airtable – opravte `AIRTABLE_FIELD_*` podle přesných názvů v tabulce. Diagnostika: `node scripts/airtable-diagnose.mjs`.

---

## 📊 Google Analytics

### Implementace

- **Komponenta:** `components/GoogleAnalyticsWrapper.tsx` – načte skript GA pouze pokud:
  1. je nastavené **`NEXT_PUBLIC_GA_ID`** (Google Analytics 4, formát `G-XXXXXXXXXX`),
  2. uživatel **udělil souhlas s cookies** (v localStorage `cookie-consent` = `"accepted"`).
- Cookie lišta (`components/CookieConsent.tsx`) zobrazuje banner; po kliknutí „Přijmout“ se uloží souhlas a stránka se znovu načte, aby se GA načetl.

### Proč v GA nevidím dnešní návštěvnost

1. **Chybí `NEXT_PUBLIC_GA_ID` na Vercel**  
   Bez této proměnné v Production env se na živém webu GA vůbec nenačte.  
   **Řešení:** Vercel → Project → Settings → Environment Variables → přidat `NEXT_PUBLIC_GA_ID` = vaše GA4 měřicí ID (G-…) → uložit a znovu nasadit (redeploy).

2. **Souhlas s cookies**  
   Data posílají jen návštěvníci, kteří klikli na „Přijmout“. Kdo banner zavře, odmítne nebo nepřijme, není měřen.  
   **Důsledek:** Část návštěvnosti (někdy velká) v GA nebude.

3. **Zpoždění v GA4**  
   V GA4 se údaje za „dnes“ často zobrazují s odstupem (minuty až desítky minut); v některých reportech může být zpoždění i 24–48 h.

4. **Blokování v prohlížeči**  
   Rozšíření (adblock, privacy) mohou blokovat `googletagmanager.com` / `google-analytics.com` – tito uživatelé se v GA neobjeví.

### Checklist

- [ ] Vercel: `NEXT_PUBLIC_GA_ID` nastavené pro prostředí Production.
- [ ] Použité je GA4 měřicí ID (začíná `G-`), ne staré UA-.
- [ ] Po změně env na Vercel byl spuštěn nový deploy.
- [ ] V GA4 je v datových tocích přidaná URL webu (např. `www.jdemevibit.cz`).

---

## 🚀 Deployment

### Vercel – propojení a deploy

- Repozitář (GitHub) je propojen s Vercel projektem. **Push na větev `main`** spustí automatický build a nasazení.
- Po pushi zkontrolovat stav v **Vercel Dashboard → Project → Deployments**.

**Environment Variables na Vercel (Production):**
```
NEXT_PUBLIC_SITE_URL=https://www.jdemevibit.cz
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/...
NEXT_PUBLIC_FORMSPREE_FORM_ID=xkovrywy
NEXT_PUBLIC_GA_ID=G-...
# Airtable – pro zápis kontaktů z formuláře (volitelné):
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_CONTACTS=Table1
AIRTABLE_FIELD_NAME=Name
AIRTABLE_FIELD_EMAIL=Email
AIRTABLE_FIELD_MESSAGE=          # prázdné = neposílat zprávu do Airtable
# AIRTABLE_FIELD_PHONE=Phone
# AIRTABLE_FIELD_SOURCE=Source
# AIRTABLE_SOURCE_VALUE=web
```
Bez `NEXT_PUBLIC_FORMSPREE_FORM_ID` formulář na produkci nebude fungovat. Po přidání nebo změně env proměnných je nutné spustit **Redeploy** (Deployments → ⋯ u posledního deploymentu → Redeploy).

### Vercel – ostatní

**Automatické:**
- SSL certifikáty (Let's Encrypt)
- WAF ochrana
- CDN distribuce
- Edge functions

### Custom Domain

**Nastavení:**
1. Přidat domain v Vercel dashboard
2. DNS záznamy podle Vercel instrukcí
3. SSL se nastaví automaticky

### Build Process

**Produkční build:**
```bash
npm run build
npm start
```

**Optimalizace:**
- Static generation kde možné
- ISR pro dynamický content
- Minimal bundle size

---

## 💻 Vývoj

### Setup

```bash
# Instalace závislostí
npm install

# Development server
npm run dev

# Build
npm run build

# Production server
npm start
```

### Environment Variables

**Vytvořit `.env.local`:**
```bash
cp .env.example .env.local
```

**Vyplnit:**
```
NEXT_PUBLIC_SITE_URL=https://jdemevibit.cz
NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED=<obfuscated email>
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/...
```

### Přidání nového contentu

**Use Case:**
1. Přidat do `lib/content-types.ts` nebo CMS
2. Stránka se vygeneruje automaticky na `/use-cases/[slug]`
3. SEO metadata se vygeneruje automaticky

**Struktura:**
```typescript
const newUseCase: UseCase = {
  id: "unique-id",
  slug: "nazev-projektu",
  title: "Název projektu",
  description: "Popis...",
  category: "use-case",
  context: "...",
  goal: "...",
  tools: ["Next.js", "Claude"],
  timeSpent: "3h",
  process: ["Krok 1", "Krok 2"],
  result: "Výsledek...",
  keywords: ["keyword1", "keyword2"],
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
```

### Testing

**SEO Testing:**
- Google Search Console
- Google Rich Results Test
- Schema.org Validator

**Security Testing:**
- Security Headers Test
- CSP Evaluator
- SSL Labs

**Performance Testing:**
- PageSpeed Insights
- WebPageTest
- Lighthouse

---

## 📊 Monitoring

### SEO Monitoring

**Nástroje:**
- Google Search Console
- Google Analytics 4
- Bing Webmaster Tools

**Metriky:**
- Impressions
- Clicks
- CTR
- Average position
- Core Web Vitals

### Security Monitoring

**Kontrola:**
- Security headers pravidelně
- CSP violations
- SSL certifikáty
- Dependencies (npm audit)

---

## 🔄 Budoucí vylepšení

### Připraveno pro:

1. **CMS integrace**
   - Content model připraven
   - Type-safe rozhraní

2. **Dynamické OG images**
   - API route `/api/og`
   - @vercel/og nebo podobné

3. **Další structured data**
   - Article schema
   - FAQ schema
   - HowTo schema

4. **Search funkcionalita**
   - SearchAction schema připraven
   - Implementace search API

5. **Analytics**
   - Google Analytics 4
   - Vercel Analytics

---

## 📚 Reference

### Dokumentace

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org](https://schema.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

### Nástroje

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Security Headers](https://securityheaders.com/)
- [Schema Validator](https://validator.schema.org/)

---

## ✅ Checklist před deployem

- [ ] Environment variables nastavené (včetně `NEXT_PUBLIC_FORMSPREE_FORM_ID` na Vercel; pokud používáte Airtable, také `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_CONTACTS`, `AIRTABLE_FIELD_NAME`, `AIRTABLE_FIELD_EMAIL`, `AIRTABLE_FIELD_MESSAGE` dle struktury tabulky)
- [ ] Po změně env na Vercel spuštěn **Redeploy**
- [ ] `.env.local` v `.gitignore`
- [ ] Security headers testovány
- [ ] CSP validován
- [ ] SEO metadata zkontrolováno
- [ ] Structured data validováno
- [ ] robots.txt a sitemap.xml funkční
- [ ] Kontaktní formulář: odeslání přes `/api/contact`, doručení do Formspree a zápis do Airtable ověřeno (lokálně i na produkci)
- [ ] Produkce: po deployi odeslat zkušební zprávu na živém webu a zkontrolovat e-mail (Formspree) a záznam v Airtable (pokud je Airtable zapnutý)
- [ ] Performance testován (Lighthouse 90+)
- [ ] Custom domain nastaven
- [ ] SSL certifikát aktivní
- [ ] Google Search Console připojen
- [ ] Analytics nastaven

---

**Poslední aktualizace:** 2026  
**Verze:** 1.1.0
