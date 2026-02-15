"use client";

import { useState } from "react";

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_CONFIGURED = Boolean(FORMSPREE_FORM_ID);
const SUBMIT_URL = "/api/contact";

const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/matouš-petržela";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_CONFIGURED) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        if (process.env.NODE_ENV === "development") {
          console.warn("[Kontakt] Ne-OK odpověď:", res.status, data);
        }
        setStatus("error");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Kontakt] Chyba při odeslání:", err);
      }
      setStatus("error");
    }
  }

  if (!FORMSPREE_CONFIGURED) {
    return (
      <section id="kontakt-formular" className="container mx-auto px-4 py-8 max-w-xl">
        <p className="text-white/70 text-sm mb-4">
          Formulář není nakonfigurován. Nastavte{" "}
          <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_FORMSPREE_FORM_ID</code> v .env.local
          a vytvořte formulář na formspree.io (zprávy půjdou na váš email tam nastavený).
        </p>
        {LINKEDIN_URL && (
          <p className="text-white/80 mt-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7b3beb] hover:underline"
            >
              LinkedIn profil
            </a>
          </p>
        )}
      </section>
    );
  }

  return (
    <section id="kontakt-formular" className="container mx-auto px-4 py-8 max-w-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-white m-0">Napište mi</h2>
        {LINKEDIN_URL && (
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-[#7b3beb] transition-colors text-sm sm:text-base shrink-0"
            aria-label="LinkedIn profil"
          >
            Také mě najdete na LinkedIn →
          </a>
        )}
      </div>

      <p className="text-white/70 text-sm mb-6">
        Vyplňte svůj email, abych vám mohl odpovědět, a zprávu.
      </p>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/20 text-green-300 text-sm">
          Zpráva byla odeslána. Ozvu se vám na uvedený email.
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-300 text-sm">
          Odeslání se nepovedlo. Zkuste to prosím znovu nebo mi napište na LinkedIn.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Kontaktní formulář"
        noValidate
      >
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] w-px h-px"
          aria-hidden
        />

        <div>
          <label
            htmlFor="contact-email"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Váš email <span className="text-[#ef2c28]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="vas@email.cz"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef2c28]"
            disabled={status === "sending"}
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-white/80 text-sm font-medium mb-1"
          >
            Zpráva <span className="text-[#ef2c28]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Co potřebujete? Napište mi..."
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef2c28] resize-y min-h-[120px]"
            disabled={status === "sending"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 px-4 rounded-lg bg-[#ef2c28] text-white font-semibold hover:bg-[#ef2c28]/90 focus:outline-none focus:ring-2 focus:ring-[#ef2c28] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status === "sending" ? "Odesílám…" : "Odeslat zprávu"}
        </button>
      </form>

      {LINKEDIN_URL && (
        <p className="text-center text-white/60 text-sm mt-6">
          Případně napište na{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7b3beb] hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      )}
    </section>
  );
}
