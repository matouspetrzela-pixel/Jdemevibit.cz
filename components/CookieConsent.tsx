"use client";

import { useEffect, useState } from "react";

const cookieBtnClass =
  "rounded border border-zinc-400/30 bg-white/85 px-4 py-2 text-[0.975rem] font-normal leading-tight text-zinc-600 transition-colors hover:border-zinc-400/45 hover:bg-white/95 hover:text-zinc-800";

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
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-center md:gap-5">
        <p className="text-[0.9625rem] leading-relaxed text-zinc-400">
          Tento web používá cookies pro analýzu návštěvnosti.{" "}
          <a href="/o-mne" className="vc-text-link">
            Více informací
          </a>
        </p>
        <div className="flex shrink-0 justify-center gap-2.5">
          <button
            type="button"
            onClick={rejectCookies}
            className={cookieBtnClass}
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className={cookieBtnClass}
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
