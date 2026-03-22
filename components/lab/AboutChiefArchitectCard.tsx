import Image from "next/image";
import Link from "next/link";

/** Úryvek z kořenového `.cursorrules` (workspace) — staticky v odlesku brýlí. */
const CURSORRULES_LENS_SNIPPET = `# Context7 Integration

When the user asks about:
- Library APIs or documentation
- Framework setup or configuration
- Code examples for external packages
- How to use a specific library feature

Automatically use Context7 MCP to fetch current documentation. Don't rely on training data for library-specific code.`;

const BINARY_SCRIM =
  "01001101 01000001 01010100 01001111 01010101 01010011 00100000 01000011 01001000 01001001 01000101 01000110 00100000 01000001 01010010 01000011 01001000 01001001 01010100 01000101 01000011 01010100 01001111 01010010 00100000 01010110 01001001 01000010 01000101 00100000 01000011 01001111 01000100 01000101 01010010 00100000 01001100 01000001 01000010 00100000 01000011 01010101 01010010 01000001 01010100 01001111 01010010 00100000 01010110 01001001 01010011 01001001 01001111 01001110 00100000 01010101 01001110 01001100 01001111 01000011 01001011 00100000 01000011 01001100 01000101 01000001 01010010 01000001 01001110 01000011 01000101 00100000 00110001 00100000 01010110 01001001 01000010 01000101 00100000 01010011 01001000 01001111 01010111 01000011 01000001 01010011 01000101 00100000 01010110 01000001 01010101 01001100 01010100";

export function AboutChiefArchitectCard() {
  return (
    <div className="about-chief-card relative overflow-hidden rounded-sm p-5 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] md:items-center md:gap-10 lg:gap-12">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="chief-photo-shell group relative mx-auto w-full max-w-[320px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-black">
              <Image
                src="/about/matous-chief-architect.png"
                alt="Matouš — portrét"
                width={768}
                height={1024}
                className="chief-photo-img h-full w-full object-cover object-[center_24%] select-none"
                sizes="(max-width: 768px) 100vw, 280px"
                priority
              />
              <div
                className="chief-photo-cyan-tint pointer-events-none absolute inset-0"
                aria-hidden
              />
              <div
                className="chief-photo-terminal-vignette pointer-events-none absolute inset-0"
                aria-hidden
              />
              <div
                className="chief-lens-glow pointer-events-none absolute z-[1]"
                aria-hidden
              >
                <pre className="chief-lens-rules">
                  {CURSORRULES_LENS_SNIPPET}
                </pre>
              </div>
              <div
                className="chief-binary-scrim pointer-events-none absolute inset-0 z-[2] overflow-hidden font-mono text-[7px] leading-[1.15] tracking-tighter text-[var(--ht-cyan)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.22]"
                aria-hidden
              >
                <p className="absolute inset-x-0 top-0 whitespace-pre-wrap break-all">
                  {BINARY_SCRIM}
                </p>
              </div>
            </div>
          </div>
          <p className="font-mono text-[0.65rem] leading-relaxed tracking-wide text-zinc-500 md:text-xs">
            // curating.vibe // entity.matous.unlock(clearance_1)
          </p>
        </div>

        <div className="min-w-0 space-y-5">
          <h2 className="text-lg font-bold tracking-tight text-white md:text-xl">
            [ SYSTEM_CHIEF_ARCHITECT ]
          </h2>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            Neprogramuji, kurátoruji vizi. Moje seance (viz.{" "}
            <Link
              href="/use-cases"
              className="text-[var(--ht-cyan)] underline decoration-[var(--ht-cyan)]/35 underline-offset-2 transition-colors hover:decoration-[var(--ht-cyan)]"
            >
              Showcase
            </Link>{" "}
            a{" "}
            <Link
              href="/vault"
              className="text-[var(--ht-cyan)] underline decoration-[var(--ht-cyan)]/35 underline-offset-2 transition-colors hover:decoration-[var(--ht-cyan)]"
            >
              Vault
            </Link>
            ) jsou důkazem, že AI není nástroj, ale exekutor mé architektury.
            Pokud chceš postavit něco, co má duši a výkon, začni ve Vaultu.
          </p>
        </div>
      </div>
    </div>
  );
}
