# Snímek UI: High-tech vibe coders (2025-03-21)

Archiv aktuální podoby úvodní stránky (laboratoř, terminál, mesh, animace) pro případné **budoucí nasazení** nebo srovnání s jiným vizuálním směrem.

## Co je uvnitř `mirror/`

Kompletní kopie souborů, které tvoří tento vzhled:

- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- `components/Header.tsx`
- `components/lab/LabLogo.tsx` (mark **M/P**), `LabHero.tsx`, `LabTerminal.tsx`, `LabShowcaseSection.tsx`, `LabMatousSection.tsx`
- `lib/lab-showcase-data.ts`
- `next.config.ts` (včetně úpravy HSTS jen pro produkci)

## Jak tento snímek znovu nasadit do projektu

Z kořene `jdemevibit-web` (PowerShell):

```powershell
$snap = "design-snapshots\high-tech-vibe-coders-2025-03-21\mirror"
Copy-Item "$snap\app\globals.css" "app\" -Force
Copy-Item "$snap\app\layout.tsx" "app\" -Force
Copy-Item "$snap\app\page.tsx" "app\" -Force
Copy-Item "$snap\components\Header.tsx" "components\" -Force
Copy-Item "$snap\components\lab\*.tsx" "components\lab\" -Force
Copy-Item "$snap\lib\lab-showcase-data.ts" "lib\" -Force
Copy-Item "$snap\next.config.ts" "." -Force
```

Pak `npm run build` a nasazení jako obvykle.

## Poznámka k logu

Na úvodní stránce je v marku **M / {P}** (místo dřívějšího V/C). Zbytek brandu zůstává „JDEME VIBIT“.
