import { generatePageMetadata } from "@/app/seo/generateMetadata";

export const metadata = generatePageMetadata({
  title: "O mně",
  description: "Praktikující vývojář zaměřený na vibe coding, AI programování a learning in public. Stavím projekty s AI nástroji a dokumentuji proces.",
  path: "/o-mne",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          O mně
        </h1>

        <div className="text-white/80 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Kdo jsem
            </h2>
            <p>
              Jsem praktikující vývojář, který se zaměřuje na vibe coding a AI programování. 
              Místo teorie stavím reálné projekty a dokumentuji celý proces - včetně chyb a iterací.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Co dělám
            </h2>
            <p>
              Vytvářím projekty pomocí AI nástrojů jako Claude a Cursor. Každý projekt má 
              dokumentovaný čas vývoje, použité nástroje a konkrétní výsledky. Žádné vágní sliby, 
              jen reálná data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Proč learning in public
            </h2>
            <p>
              Veřejná dokumentace procesu vytváření projektů s AI má několik výhod: transparentnost, 
              učení pro ostatní, důvěryhodnost a budování komunity. Sdílení zkušeností pomáhá všem růst.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              E-E-A-T principy
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Expertise:</strong> Praktické zkušenosti s AI nástroji a vývojem</li>
              <li><strong>Experience:</strong> Reálné projekty s dokumentovanými procesy</li>
              <li><strong>Authoritativeness:</strong> Veřejná dokumentace a transparentnost</li>
              <li><strong>Trustworthiness:</strong> Žádné marketingové sliby, jen fakta</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
