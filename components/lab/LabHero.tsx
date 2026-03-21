import Link from "next/link";
import { LabLogo } from "./LabLogo";
import { LabTerminal } from "./LabTerminal";

export function LabHero() {
  return (
    <section className="lab-hero relative min-h-[min(100vh,980px)]">
      <div className="vc-glow vc-glow--cyan" aria-hidden />
      <div className="vc-glow vc-glow--violet" aria-hidden />
      <div className="ht-scanlines opacity-[0.06]" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-16 md:gap-16 md:pb-32 md:pt-20 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <LabLogo className="mb-10 lg:mb-12" />

          <p className="lab-eyebrow mb-6 max-w-xl text-[#00f0ff]/50 lg:text-left">
            {"// vibe_coders_only — ship, don't slide"}
          </p>

          <h1 className="lab-headline max-w-[22ch] text-[clamp(1.85rem,4.2vw,3.35rem)] font-bold uppercase leading-[1.02] text-white lg:max-w-none lg:text-[clamp(2rem,4.8vw,3.75rem)]">
            <span className="ht-headline-bloom">Přestaň o AI mluvit.</span>
            <br />
            <span className="ht-headline-bloom">Začni </span>
            <span className="ht-headline-gradient">vibit</span>
            <span className="ht-headline-bloom">.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
            High-tech laboratoř pro buildery, co ohýbají modely a tlačí prompty do
            produkce. Česky. Bez výmluv.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
            <Link href="/kontakt" className="ht-cta">
              VSTUP DO LABORATOŘE [SOUKROMÉ]
            </Link>
            <p className="lab-eyebrow max-w-md text-left leading-relaxed text-zinc-500/60">
              {
                "// pamatuj, ne všechno, co svítí, je kód. kvalita > počet followerů."
              }
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
