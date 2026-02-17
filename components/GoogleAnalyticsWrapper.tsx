"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * FIXED: Force-enable Google Analytics (cookie consent bypass).
 * GA se načítá vždy, když je nastavené NEXT_PUBLIC_GA_ID.
 * Pro obnovení kontroly souhlasu s cookies vrátit podmínku hasConsent.
 */
export function GoogleAnalyticsWrapper() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!GA_ID) {
      console.warn(
        "[Jdemevibit] Google Analytics se nenačítá: chybí NEXT_PUBLIC_GA_ID. Nastavte ho ve Vercel → Settings → Environment Variables (Production) a redeploy."
      );
      return;
    }
    console.info("[Jdemevibit] Google Analytics načten, měřicí ID:", GA_ID.replace(/(G-.{4}).*(.{4})/, "$1…$2"));
  }, []);

  if (!GA_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
}
