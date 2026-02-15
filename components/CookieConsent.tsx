"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Zkontroluj, jestli uživatel už dal souhlas
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Znovu načti stránku, aby se GA načetlo
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f1217] border-t border-white/20 p-4 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl">
        <p className="text-white/80 text-sm">
          Tento web používá cookies pro analýzu návštěvnosti.{" "}
          <a 
            href="/o-mne" 
            className="text-[#ef2c28] underline hover:text-[#ff3d35] transition-colors"
          >
            Více informací
          </a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            Odmítnout
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-[#ef2c28] text-white rounded-lg hover:bg-[#ff3d35] transition-colors text-sm font-semibold"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
