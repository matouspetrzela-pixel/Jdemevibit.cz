// Komponenta pro vkládání structured data (JSON-LD)
// Implementujeme pouze WebSite a Person (E-E-A-T)

import { getPersonSchema, getWebSiteSchema } from "@/app/seo/schemas";

export function StructuredData() {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
