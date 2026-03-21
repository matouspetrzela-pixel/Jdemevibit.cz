"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!localStorage.getItem("cookie-consent")) {
        setShowBanner(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
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
    <div className="fixed bottom-0 left-0 right-0 z-[80] border-t border-white/[0.1] bg-black/85 p-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex-1 text-sm text-zinc-400">
          Tento web používá cookies pro analýzu návštěvnosti.{" "}
          <a href="/o-mne" className="vc-text-link">
            Více informací
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={rejectCookies}
            className="vc-btn-ghost rounded-sm px-4 py-2"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="vc-btn-primary rounded-sm px-6 py-2 text-sm"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
