import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { ContactForm } from "@/components/ContactForm";
import { CommunitySection } from "@/components/CommunitySection";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { PageIntro } from "@/components/lab/PageIntro";

export const metadata = generatePageMetadata({
  title: "Kontakt",
  description:
    "Kontaktní informace pro Jdemevibit. Spolupracujte na projektech nebo se připojte k learning in public komunitě.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <LabInnerLayout>
      <PageIntro
        eyebrow="// contact.route"
        title="Kontakt"
        subtitle="Spojení, komunita, přímá zpráva."
      />
      <CommunitySection />
      <ContactForm />
    </LabInnerLayout>
  );
}
