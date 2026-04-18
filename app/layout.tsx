import type { Metadata, Viewport } from "next";
import { siteOrigin } from "@/lib/seo";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lab-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lab-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Vibe Coding Laboratory | Jdemevibit",
    template: "%s | Jdemevibit",
  },
  description:
    "Exkluzivní česká laboratoř pro buildery, kteří ohýbají AI a shipují v českých reáliích. Case study, stack, komunita.",
  keywords: [
    "jdemevibit",
    "vibe coding",
    "Vibe Coding Laboratory",
    "AI build",
    "Cursor",
    "case study",
    "vibecodingcz",
  ],
  authors: [{ name: "Jdemevibit" }],
  creator: "Jdemevibit",
  publisher: "Jdemevibit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteOrigin,
    siteName: "Jdemevibit",
    title: "Vibe Coding Laboratory | Jdemevibit",
    description:
      "Exkluzivní česká laboratoř pro buildery. Kdo, co, jak — v češtině a s lokálním kontextem.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jdemevibit — Vibe Coding Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Laboratory | Jdemevibit",
    description:
      "Exkluzivní česká laboratoř pro buildery. Kdo, co, jak — v češtině.",
    images: ["/og-image.jpg"],
  },
  robots: {
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
  alternates: {
    canonical: siteOrigin,
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "96x96" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <SiteFooter />
        <CookieConsent />
        <GoogleAnalyticsWrapper />
      </body>
    </html>
  );
}
