import { Header } from "@/components/Header";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { FAQSection } from "@/components/FAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { StarterProjectsCTA } from "@/components/StarterProjectsCTA";
import Link from "next/link";

// Homepage SEO metadata
export const metadata = generatePageMetadata({
  title: "Vibe Coding & AI Tvorba z Praxe",
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup. Vibe coding v praxi.",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <Header />
      <main>
        {/* Hero sekce */}
        <section className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="text-center max-w-4xl -mt-[20%]">
            {/* H1: Jdemevibit */}
            <h1 className="text-[4.05rem] md:text-[6.48rem] lg:text-[8.64rem] font-black tracking-tight mb-4 md:mb-6 leading-[0.98] animate-hero-fade">
              <span className="text-[#ffffff]">Jdeme</span>
              <span className="text-[#ef2c28] text-[1.188em]">vibit</span>
            </h1>

            {/* H2 / Claim: Vibe coding projekty. Autenticky. Z praxe. */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-[#ffffff] opacity-70 leading-relaxed animate-hero-fade">
              Vibe coding projekty.
              <br />
              Autenticky. Z praxe.
            </h2>

            {/* CTA: Prozkoumat use cases */}
            <div className="mt-8 animate-hero-fade">
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

        {/* How It Works sekce */}
        <HowItWorksSection />

        {/* Social Proof sekce */}
        <SocialProofSection />

        {/* FAQ sekce */}
        <FAQSection />

        {/* Starter Projects CTA */}
        <StarterProjectsCTA />
      </main>
    </div>
  );
}
