"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const PLAIN = [
  "-> ~/lab jdeme_vibit --ship mode",
  '$ prompt "build in public, česky"',
  "✔ stack: cursor | claude code | github | v0",
  "select: ready_to_vibe()",
];

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function LineColored({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <>
          <span className="d">-&gt;</span> <span className="c">~/lab</span>{" "}
          <span className="m">jdeme_vibit</span>{" "}
          <span className="d">--ship mode</span>
        </>
      );
    case 1:
      return (
        <>
          <span className="d">$</span> <span className="c">prompt</span>
          <span className="d"> &quot;build in public, česky&quot;</span>
        </>
      );
    case 2:
      return (
        <>
          <span className="g">✔</span>{" "}
          <span className="d">stack: cursor | claude code | github | v0</span>
        </>
      );
    case 3:
      return (
        <>
          <span className="m">select:</span>{" "}
          <span className="d">ready_to_vibe</span>
          <span className="c">()</span>
        </>
      );
    default:
      return null;
  }
}

export function LabTerminalClient() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const [pos, setPos] = useState({ line: 0, char: 0 });

  const line = reduceMotion ? PLAIN.length : pos.line;
  const char = reduceMotion ? 0 : pos.char;
  const done = line >= PLAIN.length;

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setPos((s) => {
        if (s.line >= PLAIN.length) return s;
        const L = PLAIN[s.line] ?? "";
        if (s.char < L.length) {
          return { line: s.line, char: s.char + 1 };
        }
        return { line: s.line + 1, char: 0 };
      });
    }, 28);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="ht-terminal vc-panel ht-corner-frame w-full max-w-md">
      <div className="ht-terminal__bar">
        <span
          className="ht-terminal__dot bg-red-500/90"
          style={{ boxShadow: "0 0 8px rgba(239,68,68,0.5)" }}
        />
        <span className="ht-terminal__dot bg-amber-400/90" />
        <span
          className="ht-terminal__dot bg-emerald-400/90"
          style={{ boxShadow: "0 0 8px rgba(52,211,153,0.45)" }}
        />
        <span className="ht-terminal__title">session — zsh</span>
      </div>
      <div className="ht-terminal__body min-h-[8.5rem]">
        {done ? (
          <>
            {PLAIN.map((_, i) => (
              <div key={i} className={i > 0 ? "mt-2" : ""}>
                <LineColored index={i} />
              </div>
            ))}
            <span className="ht-cursor-blink" aria-hidden />
          </>
        ) : (
          <>
            {PLAIN.map((text, i) => {
              if (i < line) {
                return (
                  <div key={i} className={i > 0 ? "mt-2" : ""}>
                    <LineColored index={i} />
                  </div>
                );
              }
              if (i === line) {
                if (char < text.length) {
                  return (
                    <div key={i} className={i > 0 ? "mt-2" : ""}>
                      <span className="text-zinc-400">
                        {text.slice(0, char)}
                      </span>
                      <span className="c">▍</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className={i > 0 ? "mt-2" : ""}>
                    <LineColored index={i} />
                  </div>
                );
              }
              return null;
            })}
          </>
        )}
      </div>
    </div>
  );
}
