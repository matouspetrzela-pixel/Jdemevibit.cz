import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { ContactInfo } from "@/components/ContactInfo";
import { BackButton } from "@/components/BackButton";
import { CommunitySection } from "@/components/CommunitySection";

export const metadata = generatePageMetadata({
  title: "Kontakt",
  description: "Kontaktní informace pro Jdemevibit. Spolupracujte na projektech nebo se připojte k learning in public komunitě.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Kontakt
        </h1>

        {/* Komunita sekce */}
        <CommunitySection />

        <ContactInfo />
      </article>
    </div>
  );
}
