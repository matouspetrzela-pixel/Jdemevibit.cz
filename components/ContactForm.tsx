"use client";

import { useState, useRef } from "react";
import { GlassPanel } from "@/components/lab/GlassPanel";
import {
  API_CONTACT,
  FORMSPREE_CONFIGURED,
  FORMSPREE_URL,
  LINKEDIN_URL,
} from "@/lib/contact-constants";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!FORMSPREE_CONFIGURED) {
    return (
      <section id="kontakt-formular">
        <GlassPanel className="mx-auto max-w-xl p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <p className="text-sm text-zinc-500">
            Formulář není nakonfigurován. Nastavte{" "}
            <code className="rounded-sm border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-xs text-zinc-400">
              NEXT_PUBLIC_FORMSPREE_FORM_ID
            </code>{" "}
            v .env.local a vytvořte formulář na formspree.io (zprávy půjdou na
            váš email tam nastavený).
          </p>
          {LINKEDIN_URL ? (
            <p className="mt-4 text-zinc-400">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="vc-text-link"
              >
                LinkedIn profil
              </a>
            </p>
          ) : null}
        </GlassPanel>
      </section>
    );
  }

  return (
    <section id="kontakt-formular" className="mx-auto max-w-xl pb-16">
      <GlassPanel className="p-6 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] md:p-8">
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <h2 className="m-0 text-center font-mono text-base font-bold uppercase tracking-[0.14em] text-white [text-shadow:0_0_20px_rgba(0,240,255,0.35)] md:text-lg">
            [ SEND_MESSAGE ]
          </h2>
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-white/15 bg-black/30 px-3 py-2 font-mono text-sm text-[var(--ht-cyan)] transition-colors hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-300"
              aria-label="LinkedIn profil"
            >
              LinkedIn →
            </a>
          ) : null}
        </div>

        <p className="mb-6 text-sm text-zinc-500">
          Vyplňte jméno, email a zprávu – ozvu se vám na uvedený email.
        </p>

        <form
          ref={formRef}
          id="contact-form"
          action={FORMSPREE_URL}
          method="POST"
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
                    "Zpráva byla odeslána na váš email. Nepodařilo se ji uložit do databáze – zkontrolujte prosím nastavení."
                  );
                } else {
                  setFormStatus("Zpráva byla úspěšně odeslána 👍");
                }
                form.reset();
              } else {
                const errorMsg =
                  result?.error ||
                  (response.status === 429
                    ? "Příliš mnoho odeslání, zkuste to za chvíli."
                    : response.status >= 500
                      ? "Dočasná chyba. Zkuste to prosím později."
                      : "Odeslání se nepovedlo. Zkuste to prosím znovu.");
                setFormStatus(errorMsg);
              }
            } catch {
              setFormStatus("Chyba připojení. Zkuste to znovu.");
            } finally {
              setSending(false);
            }
          }}
          className="mx-auto max-w-md space-y-4 text-left"
          aria-label="Kontaktní formulář"
        >
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-px w-px"
            aria-hidden
          />
          <input type="hidden" name="_subject" value="Nová zpráva z webu" />

          <div>
            <label htmlFor="contact-name" className="contact-lab-label">
              Jméno <span className="contact-lab-required">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              placeholder="Vaše jméno"
              className="contact-lab-input"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="contact-lab-label">
              Váš email <span className="contact-lab-required">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              placeholder="vas@email.cz"
              className="contact-lab-input"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="contact-lab-label">
              Zpráva <span className="contact-lab-required">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Co potřebujete? Napište mi..."
              className="contact-lab-input contact-lab-textarea min-h-[120px] resize-y"
            />
          </div>

          <button
            type="button"
            disabled={sending}
            onClick={() => formRef.current?.requestSubmit()}
            className="contact-lab-submit flex justify-center"
          >
            {sending ? "[ TRANSMITTING... ]" : "[ EXECUTE_SEND ]"}
          </button>

          <p
            id="form-status"
            className="min-h-[1.5rem] text-center text-sm text-zinc-400"
            role="status"
            aria-live="polite"
          >
            {formStatus}
          </p>
        </form>

        <p className="mt-6 text-center font-mono text-[0.65rem] leading-relaxed tracking-wide text-zinc-500/45">
          // secure_uplink_established // channel: encrypted
        </p>
      </GlassPanel>
    </section>
  );
}
