"use client";

import { useMemo, useState } from "react";
import {
  LAB_PROJECTS,
  LAB_STACK_META,
  type LabStackId,
} from "@/lib/lab-showcase-data";
import { StackToolIcon } from "./StackToolIcon";

const ALL_STACKS: LabStackId[] = [
  "cursor",
  "claude_code",
  "github",
  "claude",
];

function filterBtn(active: boolean) {
  if (active) {
    return "border-white/20 bg-white/[0.08] text-[#00f0ff] shadow-[inset_0_0_24px_rgba(0,240,255,0.08)]";
  }
  return "border-white/[0.08] bg-black/30 text-zinc-500 hover:border-white/15 hover:text-zinc-300";
}

export function LabShowcaseSection() {
  const [active, setActive] = useState<LabStackId | null>(null);

  const filtered = useMemo(() => {
    if (!active) return LAB_PROJECTS;
    return LAB_PROJECTS.filter((p) => p.stack.includes(active));
  }, [active]);

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,240,255,0.05),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="lab-eyebrow text-[#00f0ff]/60">
            {"// lab_protocols.manifest"}
          </p>
          <h2 className="lab-section-title mt-3 text-2xl font-bold uppercase tracking-[-0.04em] text-white md:text-3xl">
            Lab protocols
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-zinc-500/90">
            Čtyři protokoly vibe codera — rychlost, pravda, workflow, stack. Ne
            obecné rady.
          </p>
        </div>

        <div className="vc-panel vc-panel--terminal mx-auto mt-14 max-w-4xl overflow-hidden">
          <div className="ht-terminal__bar border-b border-white/[0.08]">
            <span className="ht-terminal__dot bg-red-500/90" />
            <span className="ht-terminal__dot bg-amber-400/90" />
            <span className="ht-terminal__dot bg-emerald-400/90" />
            <span className="ht-terminal__title">protocol_filter — interactive</span>
          </div>
          <div className="border-t border-transparent bg-black/20 px-4 py-8 md:px-8">
            <p className="text-center font-mono text-[0.65rem] lowercase tracking-[0.2em] text-zinc-500/60">
              {"// laboratorní stack"}
            </p>
            <p className="mt-1 text-center text-sm text-zinc-600">
              Klikni na nástroj — filtruj protokoly
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
            <p className="col-span-full rounded-sm vc-panel py-16 text-center font-mono text-sm text-zinc-500">
              $ empty — pro tento stack žádný protokol.
            </p>
          ) : (
            filtered.map((p) => (
              <article
                key={p.id}
                className="group vc-showcase-card"
                style={{ perspective: "1000px" }}
              >
                <div className="vc-card-inner vc-panel relative overflow-hidden rounded-sm transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(2deg)_rotateY(-4deg)]">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/40 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-red-500/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-mono text-[0.6rem] lowercase tracking-wider text-zinc-500/60">
                      {"// lab_protocol.preview"}
                    </span>
                  </div>

                  <div className="relative p-6 md:p-7">
                    {p.accent === "copper" ? (
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 blur-3xl"
                        style={{
                          background:
                            "radial-gradient(circle, #d4a574 0%, transparent 70%)",
                        }}
                      />
                    ) : (
                      <div
                        className="pointer-events-none absolute -left-12 -bottom-20 h-44 w-44 rounded-full opacity-20 blur-3xl"
                        style={{
                          background:
                            "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
                        }}
                      />
                    )}

                    <div className="relative flex gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-zinc-800/90 to-black font-mono text-[0.65rem] font-bold text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        aria-hidden
                      >
                        {p.authorInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">
                          {p.authorName}
                        </p>
                        <p className="mt-0.5 font-mono text-[0.7rem] lowercase text-zinc-500/60">
                          {p.authorNick}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#030712]">
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
                      <div className="absolute inset-0 flex items-center justify-center overflow-auto px-3 py-3 text-left font-mono text-xs leading-relaxed text-[#00f0ff]/35 md:text-[0.65rem]">
                        <span className="whitespace-pre-wrap">
                          {p.previewCode ??
                            `// build preview\nawait ship({ locale: "cs" });`}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    <h3 className="relative mt-4 text-lg font-bold tracking-[-0.03em] text-white md:text-xl">
                      {p.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-zinc-500">
                      {p.gut}
                    </p>

                    {p.wowTip ? (
                      <p className="relative mt-3 rounded-sm border border-[#00f0ff]/20 bg-[#00f0ff]/[0.06] px-3 py-2.5 font-mono text-[0.68rem] leading-relaxed text-[#a5f3fc] md:text-[0.72rem]">
                        <span className="text-[#00f0ff]/55">{"// wow_tip: "}</span>
                        {p.wowTip}
                      </p>
                    ) : null}

                    <p className="relative mt-4 font-mono text-[0.72rem] lowercase leading-relaxed text-zinc-500/80">
                      {`// insight: ${p.insight}`}
                    </p>

                    <div className="relative mt-4 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center text-zinc-500"
                          title={LAB_STACK_META[s].label}
                        >
                          <StackToolIcon id={s} />
                        </span>
                      ))}
                    </div>
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
