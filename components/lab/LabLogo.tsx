export function LabLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span
        className="lab-logo-text text-[0.72rem] font-bold tracking-[0.48em] text-white md:text-[0.78rem]"
        style={{ textShadow: "0 0 20px rgba(0,240,255,0.2)" }}
      >
        JDEME VIBIT
      </span>
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-[#00f0ff]/50 md:text-[0.62rem]">
        Vibe Coding Laboratory
      </span>
    </div>
  );
}
