import { notFound } from "next/navigation";
import { getContentBySlug, type Navod } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { BackButton } from "@/components/BackButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as Navod | null;

  if (!content || content.category !== "navod") {
    return generatePageMetadata({
      title: "Návod nenalezen",
      description: "Požadovaný návod nebyl nalezen.",
      path: `/navody/${slug}`,
      noindex: true,
    });
  }

  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: `/navody/${slug}`,
  });
}

export default async function NavodPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as Navod | null;

  if (!content || content.category !== "navod") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          {content.title}
        </h1>

        {/* TL;DR sekce */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">TL;DR</h2>
          <p className="text-white/80">{content.description}</p>
        </div>

        {/* Informace o návodu */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <div>
              <span className="font-semibold text-white">Obtížnost:</span>{" "}
              {content.difficulty === "beginner"
                ? "Začátečník"
                : content.difficulty === "intermediate"
                ? "Střední"
                : "Pokročilý"}
            </div>
            <div>
              <span className="font-semibold text-white">Čas:</span>{" "}
              {content.timeRequired}
            </div>
          </div>

          {/* Nástroje */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Nástroje</h3>
            <div className="flex flex-wrap gap-2">
              {content.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-[#7b3beb]/20 text-[#7b3beb] rounded-lg text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Kroky návodu */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Postup</h2>
          <div className="space-y-8">
            {content.steps.map((step, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Krok {index + 1}: {step.title}
                </h3>
                <p className="text-white/80 mb-4">{step.description}</p>
                {step.code && (
                  <pre className="bg-[#0f1217] border border-white/10 rounded p-4 overflow-x-auto">
                    <code className="text-sm text-white/70">{step.code}</code>
                  </pre>
                )}
                {step.image && (
                  <div className="mt-4">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="rounded-lg max-w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
