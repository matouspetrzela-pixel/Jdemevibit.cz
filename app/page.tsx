import { Header } from "@/components/Header";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { LabHero } from "@/components/lab/LabHero";
import { LabShowcaseSection } from "@/components/lab/LabShowcaseSection";
import { LabMatousSection } from "@/components/lab/LabMatousSection";
import { LabVaultSection } from "@/components/lab/LabVaultSection";

export const metadata = generatePageMetadata({
  title: "Vibe Coding Laboratory — přestaň mluvit, začni vibit",
  description:
    "Exkluzivní česká laboratoř pro buildery. Nejnovější vibes, laboratorní stack, pozvánka do klubu.",
  path: "/",
});

export default function Home() {
  return (
    <div className="lab-page min-h-screen">
      <Header />
      <main className="relative z-10">
        <LabHero />
        <LabShowcaseSection />
        <LabVaultSection />
        <LabMatousSection />
      </main>
    </div>
  );
}
