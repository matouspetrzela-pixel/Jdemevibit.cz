export function LabLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      <div
        className="relative flex items-end gap-1 font-mono text-[2.25rem] font-semibold leading-none tracking-tight md:text-[2.75rem]"
        aria-hidden
      >
        <span className="lab-mp-m relative inline-block">
          <span
            className="absolute -left-0.5 top-[0.06em] h-[0.48em] w-[2px] rounded-full bg-[#00f0ff]"
            style={{ boxShadow: "0 0 14px #00f0ff, 0 0 28px rgba(0,240,255,0.4)" }}
          />
          M
        </span>
        <span className="pb-[0.05em] text-[0.5em] font-normal text-[#00f0ff]/35">
          /
        </span>
        <span className="relative text-white">
          <span className="text-[0.72em] text-[#a855f7]">{"{"}</span>
          <span className="text-[#e4e4e7]">P</span>
          <span className="text-[0.72em] text-[#a855f7]">{"}"}</span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
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
    </div>
  );
}
