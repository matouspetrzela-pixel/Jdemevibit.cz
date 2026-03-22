import { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content-types";
import { siteOrigin } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Statické stránky + listingy sekcí
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteOrigin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteOrigin}/projekty`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteOrigin}/vault`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteOrigin}/nastroje`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteOrigin}/o-mne`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteOrigin}/kontakt`,
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
      url: `${siteOrigin}/${item.category === "use-case" ? "use-cases" : item.category === "navod" ? "navody" : "nastroje"}/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly" as const,
      priority: item.category === "use-case" ? 0.9 : 0.8,
    }));

  return [...staticPages, ...contentPages];
}
