import type { Metadata } from "next";
import { Exo_2, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";

const labDisplay = Exo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lab-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const labSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lab-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const labMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lab-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jdemevibit.cz"),
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
    "ČR",
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
    url: "https://jdemevibit.cz",
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
    canonical: "https://jdemevibit.cz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${labDisplay.variable} ${labSans.variable} ${labMono.variable}`}
    >
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <CookieConsent />
        <GoogleAnalyticsWrapper />
      </body>
    </html>
  );
}
