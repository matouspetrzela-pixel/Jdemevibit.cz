"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalyticsWrapper() {
  if (!GA_ID) {
    console.warn("GA_ID missing");
    return null;
  }

  return (
    <>
      {/* Google tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          console.log("Google Analytics loaded:", "${GA_ID}");
        `}
      </Script>
    </>
  );
}
