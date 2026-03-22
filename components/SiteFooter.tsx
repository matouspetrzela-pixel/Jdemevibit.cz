import Link from "next/link";

/**
 * Jednoduchý podpis — nízká kontrastnost, monospace (Nanobanana polish).
 */
export function SiteFooter() {
  return (
    <footer
      className="relative z-[1] border-t border-white/5 bg-black py-10"
      aria-label="Patička webu"
    >
      <div className="mx-auto max-w-7xl px-5 text-center">
        <p className="font-mono text-[0.7rem] leading-relaxed tracking-wide text-zinc-500/45 md:text-xs">
          Curated by{" "}
          <Link
            href="/o-mne"
            className="text-zinc-500/55 underline decoration-transparent underline-offset-2 transition-colors duration-200 hover:text-[#00f0ff]/70 hover:decoration-[#00f0ff]/30"
          >
            [@MATOUS]
          </Link>{" "}
          // Vibe Coding Lab 2026
        </p>
      </div>
    </footer>
  );
}
