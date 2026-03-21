export function PageIntro({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center" : "text-left";

  return (
    <header className={`mb-10 md:mb-14 ${alignCls}`}>
      <p className="lab-eyebrow text-[#00f0ff]/60">{eyebrow}</p>
      <h1 className="lab-section-title mt-3 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-4 font-mono text-sm text-zinc-500">{subtitle}</p>
      ) : null}
    </header>
  );
}
