// OG Image generator utility
// Pro LinkedIn-optimalizované OG obrázky

import { siteOrigin } from "@/lib/seo";

export interface OGImageData {
  title: string;
  tool?: string;
  result?: string;
  category?: "use-case" | "navod" | "nastroj";
}

export function generateOGImagePath(data: OGImageData): string {
  // V produkci by se zde generovaly dynamické OG obrázky
  // Prozatím vracíme statickou cestu
  // TODO: Implementovat dynamickou generaci OG obrázků
  
  return `${siteOrigin}/og-image.jpg`;
}

// Helper pro vytvoření OG image URL s parametry
export function buildOGImageUrl(data: OGImageData): string {
  const params = new URLSearchParams({
    title: data.title,
    ...(data.tool && { tool: data.tool }),
    ...(data.result && { result: data.result }),
    ...(data.category && { category: data.category }),
  });
  
  // Dynamická generace přes API route
  return `${siteOrigin}/api/og?${params.toString()}`;
}
