"use client";

const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/matouš-petržela";

export function CommunitySection() {
  return (
    <section className="text-center py-8 text-[#ffffff]">
      <h2 className="text-2xl font-semibold text-white mb-4">Komunita</h2>

      <p className="opacity-80 mb-8 text-base md:text-lg leading-relaxed">
        Sdílím projekty, proces i slepé uličky.
        <br />
        Pokud tě baví tvořit, učit se a zkoušet nové věci, patříš sem.
      </p>

      {LINKEDIN_URL && (
        <div className="flex justify-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d9ff00] font-semibold hover:underline transition-all inline-flex items-center gap-2"
            aria-label="LinkedIn profil"
          >
            LinkedIn
          </a>
        </div>
      )}
    </section>
  );
}
