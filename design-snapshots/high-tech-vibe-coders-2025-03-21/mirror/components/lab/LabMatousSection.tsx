import Link from "next/link";

export function LabMatousSection() {
  return (
    <section className="relative border-t border-[#00f0ff]/10 bg-black/40 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(0,240,255,0.05),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="lab-eyebrow text-[#a855f7]/70">// founder.signal</p>
          <h2 className="lab-section-title mt-3 text-2xl font-extrabold uppercase tracking-[0.14em] text-white md:text-3xl">
            Slovo Matouše
          </h2>
          <p className="mt-2 font-mono text-sm text-zinc-500">
            AI Ambassador · komunita · Haná
          </p>
        </div>

        <div className="ht-terminal ht-corner-frame mx-auto mt-14 max-w-4xl">
          <div className="ht-terminal__bar">
            <span className="ht-terminal__dot bg-red-500/90" />
            <span className="ht-terminal__dot bg-amber-400/90" />
            <span className="ht-terminal__dot bg-emerald-400/90" />
            <span className="ht-terminal__title">message — priority_high</span>
          </div>
          <div className="grid gap-10 p-8 md:grid-cols-[200px_1fr] md:gap-12 md:p-10">
            <div className="flex justify-center md:justify-start">
              <div
                className="relative aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-sm border border-[#00f0ff]/20 shadow-[0_0_40px_rgba(0,240,255,0.08)]"
                aria-hidden
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(160deg, rgba(168,85,247,0.25) 0%, #050508 50%, rgba(0,240,255,0.12) 100%)
                    `,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-bold text-white/[0.07]">
                  M
                </div>
                <div className="ht-scanlines absolute inset-0 opacity-[0.18]" />
              </div>
            </div>

            <div>
              <blockquote className="font-mono text-lg font-medium leading-relaxed text-zinc-100 md:text-xl">
                <span className="text-[#00f0ff]/40">&gt;</span> Bariéra padla. Zkus
                to. Postav to. Ukaž to.
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                Radikální autenticita — errory v logu, ne v pitch decku. Build in
                public.
              </p>
              <Link
                href="https://aijeok.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-[#a855f7]/35 bg-[#a855f7]/10 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b4fe] transition-all hover:border-[#a855f7]/55 hover:bg-[#a855f7]/15 hover:shadow-[0_0_28px_rgba(168,85,247,0.15)]"
              >
                Připoj se
                <span className="text-[0.65rem] font-normal normal-case tracking-normal text-zinc-500">
                  AI Haná · aijeok.cz
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
