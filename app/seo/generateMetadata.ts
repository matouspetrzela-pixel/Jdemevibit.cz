// Page-level SEO metadata generator
// Používá se pro každou stránku s generateMetadata()

import type { Metadata } from "next";
import { siteOrigin } from "@/lib/seo";

interface MetadataParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noindex = false,
}: MetadataParams): Metadata {
  const url = `${siteOrigin}${path}`;
  const fullTitle = `${title} | Jdemevibit`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Jdemevibit",
      locale: "cs_CZ",
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: `${siteOrigin}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [`${siteOrigin}/og-image.jpg`],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
