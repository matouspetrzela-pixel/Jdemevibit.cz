// SEO Structured Data Schemas
// Implementujeme pouze WebSite a Person (E-E-A-T)

import { siteConfig } from "@/lib/seo";

export interface PersonSchema {
  "@context": string;
  "@type": "Person";
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface WebSiteSchema {
  "@context": string;
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
}

// Person Schema pro E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness)
export function getPersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jdemevibit",
    url: siteConfig.url,
    jobTitle: "Vibe Coding & AI Developer",
    description: "Praktikující vývojář zaměřený na vibe coding, AI programování a learning in public. Stavím projekty s AI nástroji a dokumentuji proces.",
    sameAs: [
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    ].filter(Boolean),
    knowsAbout: [
      "Vibe Coding",
      "AI Programming",
      "Next.js",
      "TypeScript",
      "Learning in Public",
      "Rapid Prototyping",
    ],
  };
}

// WebSite — bez SearchAction (žádná /search stránka; fiktivní Sitelinks search by škodil konzistenci).
export function getWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
