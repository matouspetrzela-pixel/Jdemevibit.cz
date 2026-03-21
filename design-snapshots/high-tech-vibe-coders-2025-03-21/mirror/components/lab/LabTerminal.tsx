export function LabTerminal() {
  return (
    <div className="ht-terminal ht-corner-frame w-full max-w-md">
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
        <span className="ht-terminal__title">vibe_session — zsh</span>
      </div>
      <div className="ht-terminal__body">
        <div>
          <span className="g">➜</span> <span className="c">~/lab</span>{" "}
          <span className="m">jdemevibit</span>{" "}
          <span className="d">— ship mode</span>
        </div>
        <div className="mt-2">
          <span className="d">$</span> <span className="c">prompt</span>
          <span className="d"> &quot;build in public, česky&quot;</span>
          <span className="ht-cursor-blink" />
        </div>
        <div className="mt-2 text-[0.68rem] text-zinc-500">
          <span className="g">✓</span> stack: cursor · claude · v0
        </div>
        <div className="mt-1 text-[0.68rem]">
          <span className="m">output:</span>{" "}
          <span className="d">ready_to_vibe</span>
          <span className="c">()</span>
        </div>
      </div>
    </div>
  );
}
