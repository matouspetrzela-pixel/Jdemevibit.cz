"use client";

import { useEffect, useRef, useState } from "react";
import {
  API_CONTACT,
  FORMSPREE_CONFIGURED,
  FORMSPREE_URL,
  LINKEDIN_URL,
} from "@/lib/contact-constants";

type ContactTerminalModalProps = {
  open: boolean;
  onClose: () => void;
};

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ContactTerminalModal({ open, onClose }: ContactTerminalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      setFormStatus("");
    }
    if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const syncClosed = () => {
      if (!el.open) onClose();
    };
    el.addEventListener("close", syncClosed);
    return () => el.removeEventListener("close", syncClosed);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="contact-terminal-dialog fixed left-1/2 top-1/2 z-[100] max-h-[min(100dvh-2rem,90vh)] w-[min(100vw-1.5rem,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-none border border-white/20 bg-[#050505] p-0 font-mono text-xs text-zinc-400 shadow-[0_24px_64px_rgba(0,0,0,0.85)] open:flex open:flex-col"
      aria-labelledby="contact-terminal-title"
    >
      <header className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0 space-y-1">
          <p
            id="contact-terminal-title"
            className="text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500"
          >
            // SECURE_UPLINK :: V1
          </p>
          <p className="text-[0.7rem] leading-snug text-[var(--ht-cyan)]">
            <span className="text-zinc-500">&gt;</span> await handshake...{" "}
            <span className="text-zinc-500">enc_aes_gcm</span>
          </p>
          <p className="text-[0.65rem] text-zinc-600">
            0x7f2a...9c1d // channel_open // clearance: guest_tx
          </p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="contact-terminal-abort shrink-0 rounded-none border border-white/25 bg-transparent px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:border-white/40 hover:text-zinc-200"
        >
          [ ABORT ]
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {!FORMSPREE_CONFIGURED ? (
          <p className="text-sm leading-relaxed text-zinc-500">
            Kanál není nakonfigurován. Nastavte{" "}
            <code className="rounded-sm border border-white/10 bg-black/50 px-1 py-0.5 text-[0.65rem] text-zinc-400">
              NEXT_PUBLIC_FORMSPREE_FORM_ID
            </code>
            .
            {LINKEDIN_URL ? (
              <>
                {" "}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 border border-[#0a66c2] bg-[#0a66c2]/10 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[#58b5ff] transition-colors hover:bg-[#0a66c2]/20"
                >
                  <LinkedInGlyph className="h-4 w-4 shrink-0 text-[#58b5ff]" />
                  [ LINKEDIN_PROFILE ]
                </a>
              </>
            ) : null}
          </p>
        ) : (
          <form
            ref={formRef}
            action={FORMSPREE_URL}
            method="POST"
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (sending) return;
              setFormStatus("");
              setSending(true);
              const form = e.currentTarget;
              const data = new FormData(form);
              data.set("_replyto", (data.get("email") as string) || "");
              try {
                const response = await fetch(API_CONTACT, {
                  method: "POST",
                  body: data,
                  headers: { Accept: "application/json" },
                });
                const result = await response.json().catch(() => ({}));
                if (response.ok) {
                  if (result.airtableSaved === false) {
                    setFormStatus(
                      "// tx_ok // db_warn: zpráva doručena, zápis do DB selhal"
                    );
                  } else {
                    setFormStatus("// tx_ok // payload_delivered");
                  }
                  form.reset();
                } else {
                  const errorMsg =
                    result?.error ||
                    (response.status === 429
                      ? "// err: rate_limit"
                      : response.status >= 500
                        ? "// err: upstream"
                        : "// err: reject");
                  setFormStatus(errorMsg);
                }
              } catch {
                setFormStatus("// err: network");
              } finally {
                setSending(false);
              }
            }}
            aria-label="Zabezpečený kontaktní terminál"
          >
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="pointer-events-none absolute h-px w-px opacity-0"
              aria-hidden
            />
            <input type="hidden" name="_subject" value="Nová zpráva z webu" />

            <div>
              <label
                htmlFor="contact-terminal-name"
                className="mb-1 block text-[0.65rem] uppercase tracking-[0.12em] text-zinc-200"
              >
                $ CALLER_ID{" "}
                <span className="normal-case tracking-normal text-zinc-400">
                  (Vaše jméno)
                </span>{" "}
                <span className="text-[var(--ht-cyan)]">*</span>
              </label>
              <input
                id="contact-terminal-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="plaintext identity..."
                className="contact-terminal-input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="contact-terminal-email"
                className="mb-1 block text-[0.65rem] uppercase tracking-[0.12em] text-zinc-200"
              >
                $ RETURN_PATH{" "}
                <span className="normal-case tracking-normal text-zinc-400">
                  (Váš e-mail)
                </span>{" "}
                <span className="text-[var(--ht-cyan)]">*</span>
              </label>
              <input
                id="contact-terminal-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="signal@node.local"
                className="contact-terminal-input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="contact-terminal-message"
                className="mb-1 block text-[0.65rem] uppercase tracking-[0.12em] text-zinc-200"
              >
                $ PAYLOAD{" "}
                <span className="normal-case tracking-normal text-zinc-400">
                  (Zpráva)
                </span>{" "}
                <span className="text-[var(--ht-cyan)]">*</span>
              </label>
              <textarea
                id="contact-terminal-message"
                name="message"
                required
                rows={4}
                placeholder="// encrypted_body (plain) ..."
                className="contact-terminal-input min-h-[100px] w-full resize-y"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-stretch">
              <button
                type="submit"
                disabled={sending}
                className="rounded-none border-2 border-cyan-500 bg-cyan-500/10 px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cyan-300 transition-colors hover:bg-cyan-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-500/10 disabled:hover:text-cyan-300 sm:min-w-[13rem] sm:flex-1"
              >
                {sending ? "> TRANSMITTING..." : "> EXECUTE_SEND"}
              </button>
              {LINKEDIN_URL ? (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center gap-2 rounded-none border-2 border-[#0a66c2] bg-[#0a66c2]/12 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#5eb5ff] transition-colors hover:border-[#3d8fd9] hover:bg-[#0a66c2]/22 hover:text-white sm:min-w-[12rem]"
                  aria-label="Otevřít LinkedIn profil"
                >
                  <LinkedInGlyph className="h-4 w-4 shrink-0" />
                  [ LINKEDIN_PROFILE ]
                </a>
              ) : null}
            </div>

            <p
              className="min-h-[1.25rem] pt-1 text-[0.65rem] text-zinc-500"
              role="status"
              aria-live="polite"
            >
              {formStatus}
            </p>
          </form>
        )}
      </div>

      <footer className="shrink-0 border-t border-white/10 px-4 py-2 text-[0.6rem] text-zinc-600">
        <span className="text-zinc-700">#</span> kanál přes zabezpečený formulář – bez
        mailto:
      </footer>
    </dialog>
  );
}
