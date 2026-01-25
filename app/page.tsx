import { Header } from "@/components/Header";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import Link from "next/link";

// Homepage SEO metadata
export const metadata = generatePageMetadata({
  title: "Vibe Coding & AI Tvorba z Praxe",
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup. Vibe coding v praxi.",
  path: "/",
});

export default function Home() {
  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <Header />
      <main>
        {/* Hero sekce */}
        <section className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="text-center max-w-4xl -mt-[20%]">
            {/* H1: Jdemevibit */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 md:mb-6">
              <span className="text-[#ffffff]">Jdeme</span>
              <span className="text-[#ef2c28] text-[1.1em]">vibit</span>
            </h1>

            {/* H2 / Claim: Vibe coding projekty. Autenticky. Z praxe. */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-[#ffffff] opacity-90 leading-relaxed">
              Vibe coding projekty.
              <br />
              Autenticky. Z praxe.
            </h2>

            {/* CTA: Prozkoumat use cases */}
            <div className="mt-8">
              <Link
                href="/use-cases"
                className="text-[#ffffff] text-lg md:text-xl inline-flex items-center gap-2 transition-all opacity-90 hover:opacity-100 border-b border-[#ef2c28] border-opacity-60 hover:border-opacity-100"
              >
                Prozkoumat use cases
                <span className="text-[#ef2c28]">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Komunitní CTA sekce */}
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
          <div className="text-[#ffffff] opacity-80 space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              Sleduj projekty a proces v reálném čase.
              <br />
              Sdílím postupy i chyby na LinkedInu.
            </p>
            {linkedInUrl && (
              <div className="mt-6">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffff] text-base md:text-lg hover:underline inline-flex items-center gap-2 transition-opacity hover:opacity-100 opacity-90"
                >
                  → Připojit se na LinkedIn
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
