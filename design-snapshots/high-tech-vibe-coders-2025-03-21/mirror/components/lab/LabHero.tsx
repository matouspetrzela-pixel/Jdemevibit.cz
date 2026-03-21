import Link from "next/link";
import { LabLogo } from "./LabLogo";
import { LabTerminal } from "./LabTerminal";

export function LabHero() {
  return (
    <section className="lab-hero relative min-h-[min(100vh,980px)]">
      <div className="ht-mesh" aria-hidden>
        <div className="ht-orb ht-orb--a" />
        <div className="ht-orb ht-orb--b" />
        <div className="ht-orb ht-orb--c" />
      </div>
      <div className="ht-grid-glow" aria-hidden />
      <div className="ht-grid" aria-hidden />
      <div className="ht-scanlines" aria-hidden />
      <div className="ht-scan-slow" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-16 md:gap-16 md:pb-32 md:pt-20 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <LabLogo className="mb-10 lg:mb-12" />

          <div className="mb-6 flex items-center justify-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-emerald-400/90 lg:justify-start">
            <span className="ht-pulse-dot" aria-hidden />
            <span>Lab online</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#00f0ff]/70">ČR / SR</span>
          </div>

          <p className="lab-eyebrow mb-4 max-w-xl lg:text-left">
            Vibe coders only — ship, don&apos;t slide
          </p>

          <h1 className="lab-headline max-w-[20ch] text-[clamp(1.85rem,4.2vw,3.35rem)] font-extrabold uppercase leading-[1.02] tracking-[0.04em] text-white lg:max-w-none lg:text-[clamp(2rem,4.8vw,3.75rem)]">
            Přestaň o AI mluvit.
            <br />
            <span className="ht-chrome-text">Začni vibit.</span>
          </h1>

          <p className="ht-sub-glow mt-7 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
            High-tech laboratoř pro buildery, co ohýbají modely a tlačí prompty do
            produkce. Česky. Bez výmluv.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
            <Link href="/kontakt" className="ht-cta">
              Vstup do laboratoře
              <span className="ml-2 font-mono text-[0.65rem] font-semibold normal-case tracking-normal opacity-90">
                [invite]
              </span>
            </Link>
            <p className="max-w-md font-mono text-[0.7rem] leading-relaxed text-zinc-500">
              <span className="text-[#00f0ff]/60">//</span> Pozvánka, ne signup wall.
              Kvalita &gt; počet sedadel.
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LabTerminal />
        </div>
      </div>
    </section>
  );
}
