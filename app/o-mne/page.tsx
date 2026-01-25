import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { BackButton } from "@/components/BackButton";

export const metadata = generatePageMetadata({
  title: "O mně",
  description: "Osobní příběh o začátku s AI v roce 2024, objevu vibe coding a vzniku Jdemevibit. Autentický přístup k tvoření s AI nástroji a learning in public.",
  path: "/o-mne",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          O mně
        </h1>

        <div className="text-white/80 space-y-6 leading-relaxed text-lg">
          <p>
            Nevěřím na zkratky. Věřím na první krok.
          </p>

          <p>
            S AI jsem začal na konci roku 2024. Ne kvůli trendům, ale proto, že jsem cítil změnu v tom, jak přemýšlíme, tvoříme a pracujeme. Nejsem technik ani programátor, ale jako člověk, který chtěl dělat věci chytřeji a smysluplněji.
          </p>

          <p>
            Učím se nahlas. Zkouším, dělám chyby, sdílím co funguje i co ne. 
            Protože nejlepší způsob, jak pochopit AI, je používat ji v praxi, ne jen o ní mluvit. 
            Vzdělávám lidi kolem sebe, stavím nástroje, hledám kde AI opravdu pomáhá.
          </p>

          <p>
            Koncem roku 2025 jsem objevil vibe coding. Flow, hravost a pocit, že technologie přestává brzdit a začíná vést. Tvoření, kde se potkává kreativita s logikou, odvaha s intuicí. Najednou jsem stavěl věci, o kterých jsem dřív jen přemýšlel.
          </p>

          <p>
            Jdemevibit vzniklo z téhle cesty. Není to o dokonalosti ani o slibech, že AI vyřeší všechno. Je to o odvaze začít, zkoušet a jít dál. O tom, že nástroje jsou tady pro lidi, ne naopak.
          </p>

          <p>
            Pokud chceš tvořit jinak a zůstat přitom člověkem – jdeme na to, jdemevibit.
          </p>
        </div>
      </article>
    </div>
  );
}
