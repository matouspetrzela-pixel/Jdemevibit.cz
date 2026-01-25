import { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jdemevibit.cz";
  const now = new Date();
  
  // Statické stránky
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/o-mne`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamické stránky z content
  const allContent = getAllContent();
  const contentPages: MetadataRoute.Sitemap = allContent
    .filter((item) => item.published)
    .map((item) => ({
      url: `${baseUrl}/${item.category === "use-case" ? "use-cases" : item.category === "navod" ? "navody" : "nastroje"}/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly" as const,
      priority: item.category === "use-case" ? 0.9 : 0.8,
    }));

  return [...staticPages, ...contentPages];
}
