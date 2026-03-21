import Link from "next/link";

export function LabVaultSection() {
  return (
    <section className="relative border-t border-white/[0.08] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_120%,rgba(168,85,247,0.07),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="lab-eyebrow text-[#00f0ff]/60">{"// the_vault.gate"}</p>
          <h2 className="lab-section-title mt-3 text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl">
            [THE VAULT]
          </h2>
          <p className="mt-5 font-mono text-sm leading-relaxed text-zinc-500">
            Knihovna workflow, které jinde nekoupíš. Přístup pouze pro ty, kteří
            už něco shipnuli.
          </p>
          <Link
            href="/navody"
            className="vc-vault-cta mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-300"
          >
            Odemknout vault
            <span className="text-[#00f0ff]/50">→</span>
            <span className="normal-case tracking-normal text-zinc-600">
              /navody
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
