import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalyticsWrapper } from "@/components/GoogleAnalyticsWrapper";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jdemevibit.cz"),
  title: {
    default: "Vibe Coding & AI Tvorba z Praxe | Jdemevibit",
    template: "%s | Jdemevibit"
  },
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup. Vibe coding v praxi.",
  keywords: [
    "jdemevibit",
    "vibe coding",
    "AI projekty",
    "začátečníci",
    "learning by doing",
    "AI tvorba",
    "začátek programování",
    "AI pro začátečníky",
    "vibecodingcz",
    "jdemenato",
    "ucimesedelaním"
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
    title: "Vibe Coding & AI Tvorba z Praxe",
    description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy a learning in public přístup.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jdemevibit - Začni tvořit s AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding & AI Tvorba z Praxe",
    description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy a learning in public přístup.",
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
    <html lang="cs" className={roboto.variable}>
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <CookieConsent />
        <GoogleAnalyticsWrapper />
      </body>
    </html>
  );
}
