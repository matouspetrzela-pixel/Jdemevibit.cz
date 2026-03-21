"use client";

import { useState, useRef } from "react";
import { GlassPanel } from "@/components/lab/GlassPanel";

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_CONFIGURED = Boolean(FORMSPREE_FORM_ID);
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const API_CONTACT = "/api/contact";

/** Výchozí = percent-encoded (š, ž) — spolehlivější než diakritika v některých .env */
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  "https://www.linkedin.com/in/matou%C5%A1-petr%C5%BEela";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!FORMSPREE_CONFIGURED) {
    return (
      <section id="kontakt-formular">
        <GlassPanel className="mx-auto max-w-xl p-6">
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
      <GlassPanel className="p-6 text-center md:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <h2 className="lab-section-title m-0 text-xl font-bold text-white">
            Napište mi
          </h2>
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vc-text-link font-mono text-sm"
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
            <label htmlFor="contact-name" className="vc-form-label">
              Jméno <span className="vc-form-required">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              placeholder="Vaše jméno"
              className="vc-form-input"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="vc-form-label">
              Váš email <span className="vc-form-required">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              placeholder="vas@email.cz"
              className="vc-form-input"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="vc-form-label">
              Zpráva <span className="vc-form-required">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Co potřebujete? Napište mi..."
              className="vc-form-input min-h-[120px] resize-y"
            />
          </div>

          <button
            type="button"
            disabled={sending}
            onClick={() => formRef.current?.requestSubmit()}
            className="ht-cta w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Odesílám…" : "Odeslat"}
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

        {LINKEDIN_URL ? (
          <p className="mt-6 text-center text-sm text-zinc-600">
            Případně napište na{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vc-text-link"
            >
              LinkedIn
            </a>
            .
          </p>
        ) : null}
      </GlassPanel>
    </section>
  );
}
