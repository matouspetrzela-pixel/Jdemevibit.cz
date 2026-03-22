# Jdemevibit.cz - Web

Moderní web pro Jdemevibit postavený s Next.js 16, TypeScript a Tailwind CSS.

> 📖 **Kompletní technická dokumentace:** Viz [TECHNICKA_DOKUMENTACE.md](./TECHNICKA_DOKUMENTACE.md)  
> **Prompt Library (AI zadání):** [prompts.md](./prompts.md)

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
NEXT_PUBLIC_SITE_URL=https://www.jdemevibit.cz
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_FORMSPREE_FORM_ID=xkovrywy   # váš formulář https://formspree.io/f/xkovrywy
```
Kontaktní formulář: na [formspree.io](https://formspree.io) vytvořte formulář a zadejte email, na který mají chodit zprávy. Do .env přidejte jejich Form ID.

**Zprávy mi nechodí na email?** (Formspree free): (1) Po přidání formuláře Formspree pošle na váš email **ověřovací zprávu** – je nutné na odkaz v ní kliknout, jinak se zprávy nedoručují. (2) Zkontrolujte složku Spam. (3) V Formspree → váš formulář → Settings zkontrolujte, že je nastavený správný příjemce (Email to receive submissions).

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
│   ├── ContactForm.tsx     # Kontaktní formulář (Formspree)
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
3. **Environment variables** (Vercel → Project → Settings → Environment Variables, prostředí Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://www.jdemevibit.cz`
   - `NEXT_PUBLIC_LINKEDIN_URL` = váš LinkedIn profil
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID` = `xkovrywy` (kontaktní formulář – bez toho formulář na produkci neodešle zprávy)
   - `NEXT_PUBLIC_GA_ID` = vaše Google Analytics ID (volitelné)
4. Přidejte custom domain: `www.jdemevibit.cz`
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
