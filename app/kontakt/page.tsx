import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { ContactInfo } from "@/components/ContactInfo";

export const metadata = generatePageMetadata({
  title: "Kontakt",
  description: "Kontaktní informace pro Jdemevibit. Spolupracujte na projektech nebo se připojte k learning in public komunitě.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Kontakt
        </h1>

        <div className="text-white/80 space-y-6 mb-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Spolupráce
            </h2>
            <p>
              Jste vítáni ke spolupráci na projektech nebo připojení se k learning in public komunitě. 
              Kontaktujte mě přes LinkedIn nebo email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Komunita
            </h2>
            <p>
              Sledujte projekty, učte se z procesů a sdílejte vlastní zkušenosti. 
              Learning in public je o vzájemném růstu.
            </p>
          </section>
        </div>

        <ContactInfo />
      </article>
    </div>
  );
}
