# Technická dokumentace - Jdemevibit.cz

## 📋 Obsah

1. [Architektura](#architektura)
2. [SEO Implementace](#seo-implementace)
3. [Security](#security)
4. [Performance](#performance)
5. [Content Struktura](#content-struktura)
6. [Deployment](#deployment)
7. [Vývoj](#vývoj)

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
│   └── kontakt/
│       └── page.tsx            # Kontakt stránka
├── components/
│   ├── Header.tsx              # Hlavička s navigací
│   ├── Hero.tsx                # Hero sekce
│   ├── UseCasesSection.tsx    # Use cases grid
│   ├── ProjectCard.tsx         # Karta projektu
│   ├── ContactInfo.tsx         # Kontaktní údaje
│   ├── StructuredData.tsx      # JSON-LD komponenta
│   └── OptimizedImage.tsx      # Optimalizovaná Image komponenta
├── lib/
│   ├── seo.ts                  # SEO utilities
│   ├── security.ts             # Security utilities
│   ├── content-types.ts        # Content datový model
│   └── projects.ts             # Projekty data
├── public/                     # Statické soubory
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

---

## 🚀 Deployment

### Vercel Deployment

**Automatické:**
- SSL certifikáty (Let's Encrypt)
- WAF ochrana
- CDN distribuce
- Edge functions

**Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://jdemevibit.cz
NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED=<obfuscated>
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/...
```

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

- [ ] Environment variables nastavené
- [ ] `.env.local` v `.gitignore`
- [ ] Security headers testovány
- [ ] CSP validován
- [ ] SEO metadata zkontrolováno
- [ ] Structured data validováno
- [ ] robots.txt a sitemap.xml funkční
- [ ] Performance testován (Lighthouse 90+)
- [ ] Custom domain nastaven
- [ ] SSL certifikát aktivní
- [ ] Google Search Console připojen
- [ ] Analytics nastaven

---

**Poslední aktualizace:** 2024
**Verze:** 1.0.0
