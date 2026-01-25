import { notFound } from "next/navigation";
import { getContentBySlug, type UseCase } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { buildOGImageUrl } from "@/app/seo/ogImage";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata pro každý use case
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as UseCase | null;

  if (!content || content.category !== "use-case") {
    return generatePageMetadata({
      title: "Use Case nenalezen",
      description: "Požadovaný use case nebyl nalezen.",
      path: `/use-cases/${slug}`,
      noindex: true,
    });
  }

  const ogImage = content.ogImage || buildOGImageUrl({
    title: content.title,
    tool: content.tools[0],
    result: content.result.substring(0, 50),
    category: "use-case",
  });

  return generatePageMetadata({
    title: `${content.title} vytvořený za ${content.timeSpent} s AI`,
    description: content.description,
    path: `/use-cases/${slug}`,
    ogImage,
  });
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as UseCase | null;

  if (!content || content.category !== "use-case") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* H1 podle vzoru */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {content.title} vytvořený za {content.timeSpent} s AI
        </h1>

        {/* TL;DR sekce */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">TL;DR</h2>
          <p className="text-white/80">{content.description}</p>
        </div>

        {/* Kontext a cíl projektu */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Kontext a cíl projektu
          </h2>
          <div className="text-white/80 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Kontext</h3>
              <p>{content.context}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Cíl</h3>
              <p>{content.goal}</p>
            </div>
          </div>
        </section>

        {/* Použité nástroje */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Použité nástroje
          </h2>
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
        </section>

        {/* Jak probíhal vývoj */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Jak probíhal vývoj
          </h2>
          <div className="text-white/80 space-y-6">
            {content.process.map((step, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {content.prompts?.[index] ? "Promptování" : `Krok ${index + 1}`}
                </h3>
                {content.prompts?.[index] && (
                  <div className="bg-white/5 border border-white/10 rounded p-4 mb-3">
                    <code className="text-sm text-white/70">{content.prompts[index]}</code>
                  </div>
                )}
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Iterace */}
        {content.iterations && content.iterations.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Iterace
            </h3>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              {content.iterations.map((iteration, index) => (
                <li key={index}>{iteration}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Co bych dnes udělal jinak */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Co bych dnes udělal jinak
          </h3>
          <p className="text-white/80">
            {/* TODO: Přidat pole "lessonsLearned" do UseCase typu */}
            Tato sekce bude doplněna později s konkrétními poznatky z projektu.
          </p>
        </section>

        {/* Výsledek */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Výsledek</h2>
          <div className="text-white/80 space-y-4">
            <p>{content.result}</p>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ef2c28] hover:text-[#ff3d35] transition-colors font-medium"
              >
                Zobrazit projekt
                <span>→</span>
              </a>
            )}
            {content.githubUrl && (
              <a
                href={content.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#7b3beb] hover:text-[#8b4dfb] transition-colors font-medium ml-4"
              >
                GitHub
                <span>→</span>
              </a>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
