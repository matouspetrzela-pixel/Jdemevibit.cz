# Jdemevibit.cz - Web

Moderní web pro Jdemevibit postavený s Next.js 16, TypeScript a Tailwind CSS.

> 📖 **Kompletní technická dokumentace:** Viz [TECHNICKA_DOKUMENTACE.md](./TECHNICKA_DOKUMENTACE.md)

## 🚀 Rychlý start

### Instalace závislostí

```bash
npm install
```

### Nastavení environment variables

1. Zkopírujte `.env.example` jako `.env.local`:
```bash
cp .env.example .env.local
```

2. Vyplňte hodnoty v `.env.local`:
```
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_SITE_URL=https://jdemevibit.cz
```

### Spuštění development serveru

```bash
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

## 📁 Struktura projektu

```
jdemevibit-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout s SEO metadata
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # robots.txt generátor
│   └── sitemap.ts          # sitemap.xml generátor
├── components/             # React komponenty
│   ├── Header.tsx          # Hlavička s navigací
│   ├── Hero.tsx            # Hero sekce
│   ├── UseCasesSection.tsx # Sekce use cases
│   ├── ProjectCard.tsx      # Karta projektu
│   ├── ContactInfo.tsx     # Kontaktní údaje
│   └── StructuredData.tsx  # SEO structured data
├── lib/                     # Utility funkce
│   ├── projects.ts         # Data projektů
│   └── seo.ts              # SEO utilities
└── public/                 # Statické soubory
```

## 🎨 Design systém

### Barvy
- **Pozadí:** `#0f1217` (černá)
- **Text:** `#ffffff` (bílá)
- **Lila:** `#7b3beb` (pro "Jdeme")
- **Červená:** `#ef2c28` (pro "vibit" a navigaci)
- **Šedá:** `#6b6c6d` (sekundární prvky)

### Font
- **Inter** (Google Fonts) - aplikován globálně

## 🔒 Bezpečnost

- Security headers v `next.config.ts`
- Environment variables pro citlivé údaje
- Email obfuskace proti spam botům
- `.gitignore` chrání citlivé soubory

## 🔍 SEO Optimalizace

- Kompletní metadata (title, description, keywords)
- Open Graph tags pro sociální sítě
- Twitter Cards
- Structured Data (JSON-LD) - Organization, WebSite schema
- robots.txt a sitemap.xml
- Semantic HTML

## 📦 Build a deployment

### Production build

```bash
npm run build
npm start
```

### Deployment na Vercel

1. Pushněte kód na GitHub
2. Připojte repository k Vercel
3. Nastavte environment variables v Vercel dashboard
4. Přidejte custom domain: `jdemevibit.cz`
5. SSL certifikát se nastaví automaticky

## 🛠️ Technologie

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Inter Font** - Google Fonts

## 📝 Poznámky

- Všechny texty jsou v češtině
- Web má černé pozadí s bílým textem
- Logo "Jdemevibit" je uprostřed hlavičky
- Navigace je vpravo nahoře v červené barvě
- Responsive design pro všechny velikosti obrazovek

## 📄 License

Všechna práva vyhrazena - Jdemevibit
