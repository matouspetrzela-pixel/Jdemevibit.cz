"use client";

import { GlassPanel } from "@/components/lab/GlassPanel";

const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  "https://www.linkedin.com/in/matou%C5%A1-petr%C5%BEela";

export function CommunitySection() {
  return (
    <section className="mb-12">
      <GlassPanel className="p-6 text-center md:p-10">
        <p className="lab-eyebrow text-[#a855f7]/70">{"// community.signal"}</p>
        <h2 className="lab-section-title mt-3 text-xl font-bold text-white md:text-2xl">
          Komunita
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-500 md:text-lg">
          Sdílím projekty, proces i slepé uličky.
          <br />
          Pokud tě baví tvořit, učit se a zkoušet nové věci, patříš sem.
        </p>

        {LINKEDIN_URL ? (
          <div className="mt-8 flex justify-center">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vc-text-link font-mono text-sm font-medium"
              aria-label="LinkedIn profil"
            >
              LinkedIn →
            </a>
          </div>
        ) : null}
      </GlassPanel>
    </section>
  );
}
