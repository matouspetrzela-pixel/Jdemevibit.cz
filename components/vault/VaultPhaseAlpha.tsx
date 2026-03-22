"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  normalizeVaultInput,
  readVaultUnlocked,
  VAULT_SECRET_CODE,
  writeVaultUnlocked,
} from "@/lib/vault-constants";
import {
  VAULT_001_HEADLINE,
  VAULT_001_INSIGHT,
  VAULT_001_INTRO,
  VAULT_001_SNIPPET,
  VAULT_002_HEADLINE,
  VAULT_002_INSIGHT,
  VAULT_002_INTRO,
  VAULT_002_SNIPPET,
  VAULT_002_STEPS,
  VAULT_003_HEADLINE,
  VAULT_003_INSIGHT,
  VAULT_003_INTRO,
  VAULT_003_SNIPPET,
} from "@/lib/vault-content";

type ModalKind = "denied" | "001" | "002" | "003" | null;

type FileRow = {
  id: string;
  filename: string;
  ext: string;
  lockedUntilClearance: boolean;
};

const FILES: FileRow[] = [
  {
    id: "001",
    filename: "ARCHITECT_INITIALIZER",
    ext: ".md",
    lockedUntilClearance: false,
  },
  {
    id: "002",
    filename: "THE_VIBE_PIPELINE",
    ext: ".md",
    lockedUntilClearance: true,
  },
  {
    id: "003",
    filename: "MOTION_REVEAL_ENGINE",
    ext: ".md",
    lockedUntilClearance: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ArchitectInsight({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-sm border border-[#00f0ff]/20 bg-[#00f0ff]/[0.06] px-3 py-2.5">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#00f0ff]/55">
        {"// ARCHITECT_INSIGHT"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{children}</p>
    </div>
  );
}

function SnippetPre({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-4 max-h-[min(42vh,22rem)] overflow-x-auto overflow-y-auto rounded-sm border border-white/[0.08] bg-black/70 p-3 text-left font-mono text-[0.68rem] leading-relaxed text-zinc-400 md:text-[0.72rem]">
      <code className="whitespace-pre text-inherit">{children}</code>
    </pre>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function VaultPhaseAlpha() {
  const reduceMotion = useReducedMotion();
  const [unlocked, setUnlocked] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [modal, setModal] = useState<ModalKind>(null);
  const [copyFlash, setCopyFlash] = useState<string | null>(null);
  const modalTitleId = useId();

  useEffect(() => {
    setUnlocked(readVaultUnlocked());
  }, []);

  const runUnlock = useCallback(() => {
    writeVaultUnlocked();
    setUnlocked(true);
    setCodeInput("");
    if (reduceMotion) return;
    setGlitching(true);
    window.setTimeout(() => setGlitching(false), 1000);
  }, [reduceMotion]);

  const submitCode = useCallback(() => {
    const a = normalizeVaultInput(codeInput);
    const b = normalizeVaultInput(VAULT_SECRET_CODE);
    if (a === b) {
      runUnlock();
    }
  }, [codeInput, runUnlock]);

  const isRowDecrypted = (row: FileRow) =>
    !row.lockedUntilClearance || unlocked;

  const openRow = (row: FileRow) => {
    if (!isRowDecrypted(row)) {
      setModal("denied");
      return;
    }
    if (row.id === "001") setModal("001");
    else if (row.id === "002") setModal("002");
    else if (row.id === "003") setModal("003");
  };

  const copySnippet = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFlash(id);
      window.setTimeout(() => setCopyFlash(null), 700);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <div
      className={`vault-alpha relative min-h-[70vh] bg-black font-mono text-[0.8125rem] text-zinc-300 md:text-sm ${
        glitching && !reduceMotion ? "vault-alpha--glitch" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.75)]"
        aria-hidden
      />
      <div className="vault-alpha-scanlines pointer-events-none" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-5xl px-0 pb-28 pt-2 md:pb-16 md:pt-4">
        <header className="mb-8 border-b border-white/[0.08] pb-6">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#00f0ff]/55">
            {"// EXCLUSIVE_BUILDER_PROTOCOLS"}
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="font-sans text-2xl font-bold uppercase tracking-[-0.04em] text-white md:text-3xl">
              [ THE VAULT ]
            </h1>

            <div className="hidden w-full max-w-md flex-col gap-2 md:flex">
              <span className="text-[0.62rem] uppercase tracking-[0.2em] text-zinc-600">
                [ ENTER_CLEARANCE_CODE ]
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  autoComplete="off"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitCode()}
                  className="min-w-0 flex-1 rounded-sm border border-white/[0.1] bg-black/80 px-3 py-2.5 text-[#00f0ff]/90 outline-none transition-colors placeholder:text-zinc-700 focus:border-[#00f0ff]/40"
                  placeholder="············"
                  aria-label="Clearance code"
                />
                <button
                  type="button"
                  onClick={submitCode}
                  className="shrink-0 rounded-sm border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-4 py-2.5 text-[0.65rem] uppercase tracking-wider text-[#00f0ff] transition-colors hover:bg-[#00f0ff]/15"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto rounded-sm border border-white/[0.06]">
          <table className="w-full min-w-[280px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] text-[0.62rem] uppercase tracking-[0.18em] text-zinc-600">
                <th className="px-3 py-3 font-normal md:px-4">ID</th>
                <th className="px-3 py-3 font-normal md:px-4">FILENAME</th>
                <th className="hidden px-4 py-3 font-normal md:table-cell">
                  TYPE
                </th>
                <th className="hidden px-4 py-3 font-normal md:table-cell">
                  STATUS
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {FILES.map((row) => {
                const dec = isRowDecrypted(row);
                return (
                  <motion.tr
                    key={row.id}
                    variants={rowVariants}
                    tabIndex={0}
                    className="cursor-pointer border-b border-white/[0.05] transition-colors duration-300 hover:bg-white/[0.03] focus-visible:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00f0ff]/40"
                    onClick={() => openRow(row)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openRow(row);
                      }
                    }}
                  >
                    <td className="px-3 py-3.5 text-zinc-500 md:px-4">
                      {row.id}
                    </td>
                    <td className="px-3 py-3.5 md:px-4">
                      <span className="flex items-center gap-2">
                        {!dec ? (
                          <LockIcon className="shrink-0 text-amber-500/90" />
                        ) : null}
                        <span
                          className={
                            dec
                              ? "vault-decrypted-glow text-[#00f0ff]/95"
                              : "text-amber-200/85"
                          }
                        >
                          {row.filename}
                        </span>
                      </span>
                    </td>
                    <td className="hidden px-4 py-3.5 text-zinc-500 md:table-cell">
                      {row.ext}
                    </td>
                    <td className="hidden px-4 py-3.5 md:table-cell">
                      <span
                        className={
                          dec
                            ? "text-[#00f0ff]/90"
                            : "text-amber-400/90"
                        }
                      >
                        {dec ? "DECRYPTED" : "ENCRYPTED"}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>

        <p className="mt-6 text-[0.65rem] text-zinc-600">
          Klikni na řádek. Veřejný protokol 001 je vždy DECRYPTED; 002–003 po
          správném clearance kódu.
        </p>
      </div>

      {/* Mobil: plovoucí vstup clearance */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-white/[0.08] bg-black/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.58rem] uppercase tracking-[0.16em] text-zinc-500">
            [ ENTER_CLEARANCE_CODE ]
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              autoComplete="off"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitCode()}
              className="min-w-0 flex-1 rounded-sm border border-white/[0.12] bg-black px-3 py-2.5 text-sm text-[#00f0ff] outline-none focus:border-[#00f0ff]/45"
              placeholder="············"
            />
            <button
              type="button"
              onClick={submitCode}
              className="shrink-0 rounded-sm border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-3 py-2 text-[0.65rem] uppercase tracking-wider text-[#00f0ff]"
            >
              OK
            </button>
          </div>
        </label>
      </div>

      <AnimatePresence>
        {modal ? (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-white/[0.1] bg-[#050505] p-6 shadow-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal === "denied" ? (
                <>
                  <h2 id={modalTitleId} className="text-lg font-bold text-amber-400">
                    ACCESS DENIED
                  </h2>
                  <p className="mt-4 leading-relaxed text-zinc-400">
                    Vyžadována prověrka. Nápověda v laboratoři nebo v patičce
                    webu.
                  </p>
                </>
              ) : null}

              {modal === "001" ? (
                <>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-zinc-600">
                    VAULT_ENTRY [001] · ARCHITECT_INITIALIZER
                  </p>
                  <h2
                    id={modalTitleId}
                    className="mt-2 text-lg font-bold tracking-tight text-[#00f0ff] md:text-xl"
                  >
                    {VAULT_001_HEADLINE}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {VAULT_001_INTRO}
                  </p>
                  <ArchitectInsight>{VAULT_001_INSIGHT}</ArchitectInsight>
                  <SnippetPre>{VAULT_001_SNIPPET}</SnippetPre>
                  <button
                    type="button"
                    onClick={() => copySnippet("001", VAULT_001_SNIPPET)}
                    className={`vault-copy-btn mt-4 w-full rounded-sm border border-emerald-500/40 bg-emerald-500/10 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/15 ${
                      copyFlash === "001" ? "vault-copy-btn--flash" : ""
                    }`}
                  >
                    [ COPY_TO_BUFFER ]
                  </button>
                </>
              ) : null}

              {modal === "002" ? (
                <>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-zinc-600">
                    VAULT_ENTRY [002] · THE_VIBE_PIPELINE
                  </p>
                  <h2
                    id={modalTitleId}
                    className="mt-2 text-lg font-bold tracking-tight text-[#00f0ff] md:text-xl"
                  >
                    {VAULT_002_HEADLINE}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {VAULT_002_INTRO}
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-500">
                    {VAULT_002_STEPS}
                  </p>
                  <ArchitectInsight>{VAULT_002_INSIGHT}</ArchitectInsight>
                  <SnippetPre>{VAULT_002_SNIPPET}</SnippetPre>
                  <button
                    type="button"
                    onClick={() => copySnippet("002", VAULT_002_SNIPPET)}
                    className={`vault-copy-btn mt-4 w-full rounded-sm border border-emerald-500/40 bg-emerald-500/10 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/15 ${
                      copyFlash === "002" ? "vault-copy-btn--flash" : ""
                    }`}
                  >
                    [ COPY_TO_BUFFER ]
                  </button>
                </>
              ) : null}

              {modal === "003" ? (
                <>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-zinc-600">
                    VAULT_ENTRY [003] · MOTION_REVEAL_ENGINE
                  </p>
                  <h2
                    id={modalTitleId}
                    className="mt-2 text-lg font-bold tracking-tight text-[#00f0ff] md:text-xl"
                  >
                    {VAULT_003_HEADLINE}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {VAULT_003_INTRO}
                  </p>
                  <ArchitectInsight>{VAULT_003_INSIGHT}</ArchitectInsight>
                  <SnippetPre>{VAULT_003_SNIPPET}</SnippetPre>
                  <button
                    type="button"
                    onClick={() => copySnippet("003", VAULT_003_SNIPPET)}
                    className={`vault-copy-btn mt-4 w-full rounded-sm border border-emerald-500/40 bg-emerald-500/10 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/15 ${
                      copyFlash === "003" ? "vault-copy-btn--flash" : ""
                    }`}
                  >
                    [ COPY_TO_BUFFER ]
                  </button>
                </>
              ) : null}

              <button
                type="button"
                onClick={() => setModal(null)}
                className="mt-6 w-full border border-white/[0.12] py-2.5 text-xs uppercase tracking-wider text-zinc-500 transition-colors hover:border-white/25 hover:text-zinc-300"
              >
                [ CLOSE ]
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
