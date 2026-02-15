"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalyticsWrapper() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Zkontroluj souhlas s cookies
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }
  }, []);

  // Načti GA jen pokud má uživatel souhlas a je nastaveno GA ID
  if (!hasConsent || !GA_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
}
