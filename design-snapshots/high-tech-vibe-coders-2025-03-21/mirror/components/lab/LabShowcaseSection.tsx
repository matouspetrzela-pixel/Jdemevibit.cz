"use client";

import { useMemo, useState } from "react";
import {
  LAB_PROJECTS,
  LAB_STACK_META,
  type LabStackId,
} from "@/lib/lab-showcase-data";

const ALL_STACKS: LabStackId[] = [
  "cursor",
  "bolt",
  "v0",
  "claude",
  "replit",
  "lovable",
];

function filterBtn(active: boolean) {
  if (active) {
    return "border-[#00f0ff]/55 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_24px_rgba(0,240,255,0.12)]";
  }
  return "border-white/10 bg-black/40 text-zinc-400 hover:border-[#00f0ff]/25 hover:text-zinc-200";
}

export function LabShowcaseSection() {
  const [active, setActive] = useState<LabStackId | null>(null);

  const filtered = useMemo(() => {
    if (!active) return LAB_PROJECTS;
    return LAB_PROJECTS.filter((p) => p.stack.includes(active));
  }, [active]);

  return (
    <section className="relative border-t border-[#00f0ff]/10 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(168,85,247,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="lab-eyebrow text-[#00f0ff]/55">// showcase.run</p>
          <h2 className="lab-section-title mt-3 text-2xl font-extrabold uppercase tracking-[0.12em] text-white md:text-3xl md:tracking-[0.16em]">
            Nejnovější vibes z ČR
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-zinc-500">
            Builder log · stack trace · reálné shipy — ne anonymní feed.
          </p>
        </div>

        <div className="ht-terminal mx-auto mt-14 max-w-4xl overflow-hidden">
          <div className="ht-terminal__bar">
            <span className="ht-terminal__dot bg-red-500/90" />
            <span className="ht-terminal__dot bg-amber-400/90" />
            <span className="ht-terminal__dot bg-emerald-400/90" />
            <span className="ht-terminal__title">stack_filter — interactive</span>
          </div>
          <div className="border-t border-[#00f0ff]/10 bg-black/30 px-4 py-8 md:px-8">
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.28em] text-zinc-500">
              Laboratorní stack
            </p>
            <p className="mt-1 text-center text-sm text-zinc-600">
              Klikni na nástroj — filtruj záznamy
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setActive(null)}
                className={`rounded-sm border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 md:text-sm ${filterBtn(active === null)}`}
              >
                *
              </button>
              {ALL_STACKS.map((id) => {
                const meta = LAB_STACK_META[id];
                const on = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActive(on ? null : id)}
                    className={`rounded-sm border px-4 py-2.5 font-mono text-xs transition-all duration-200 md:px-5 md:text-sm ${filterBtn(on)}`}
                    aria-pressed={on}
                  >
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded border border-dashed border-[#00f0ff]/20 py-16 text-center font-mono text-sm text-zinc-500">
              $ empty — pro tento stack zatím žádný log.
            </p>
          ) : (
            filtered.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-b from-zinc-950/90 to-black p-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="ht-card-glow flex items-center gap-2 border-b border-white/10 bg-black/60 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-wider text-zinc-500">
                    case_study.preview
                  </span>
                </div>

                <div className="relative p-6 md:p-7">
                  {p.accent === "copper" ? (
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
                      style={{
                        background:
                          "radial-gradient(circle, #d4a574 0%, transparent 70%)",
                      }}
                    />
                  ) : (
                    <div
                      className="pointer-events-none absolute -left-12 -bottom-20 h-44 w-44 rounded-full opacity-25 blur-3xl"
                      style={{
                        background:
                          "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
                      }}
                    />
                  )}

                  <div className="relative flex gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#00f0ff]/20 bg-black/80 font-mono text-xs font-bold text-[#00f0ff]"
                      aria-hidden
                    >
                      {p.authorInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        {p.authorName}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-zinc-500">
                        {p.authorNick}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#00f0ff]/15 bg-[#030712]">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          linear-gradient(135deg, rgba(0,240,255,0.06) 0%, transparent 45%),
                          linear-gradient(315deg, rgba(168,85,247,0.07) 0%, transparent 40%),
                          repeating-linear-gradient(0deg, transparent, transparent 16px, rgba(0,240,255,0.03) 16px, rgba(0,240,255,0.03) 17px)
                        `,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[0.62rem] leading-relaxed text-[#00f0ff]/25 md:text-[0.68rem]">
                      {`// build preview\nawait ship({ locale: "cs" });`}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <h3 className="relative mt-4 font-mono text-base font-bold text-white md:text-lg">
                    {p.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-zinc-500">
                    {p.gut}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-sm border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-[#67e8f9]"
                      >
                        {LAB_STACK_META[s].label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
