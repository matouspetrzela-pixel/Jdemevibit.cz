// OG Image generator utility
// Pro LinkedIn-optimalizované OG obrázky

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
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jdemevibit.cz";
  return `${baseUrl}/og-image.jpg`;
}

// Helper pro vytvoření OG image URL s parametry
export function buildOGImageUrl(data: OGImageData): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jdemevibit.cz";
  const params = new URLSearchParams({
    title: data.title,
    ...(data.tool && { tool: data.tool }),
    ...(data.result && { result: data.result }),
    ...(data.category && { category: data.category }),
  });
  
  // V produkci: ${baseUrl}/api/og?${params.toString()}
  // Prozatím statická
  return `${baseUrl}/og-image.jpg`;
}
