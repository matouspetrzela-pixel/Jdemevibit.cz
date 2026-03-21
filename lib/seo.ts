// SEO utilities a site configuration

/** Kanonický původ webu bez koncového / — sjednocuje www vs apex napříč metadaty a JSON-LD. */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jdemevibit.cz"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Jdemevibit",
  url: siteOrigin,
  description: "Vibe Coding & AI Tvorba z Praxe. Projekty vytvořené s AI nástroji, dokumentované procesy a learning in public přístup.",
  keywords: [
    "jdemevibit",
    "vibe coding",
    "AI programování",
    "AI projekty",
    "learning in public",
    "Claude",
    "Cursor",
    "Next.js",
    "TypeScript",
  ],
};

// BreadcrumbList Schema helper (pro budoucí použití)
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
