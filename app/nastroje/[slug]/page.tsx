import { notFound } from "next/navigation";
import { getContentBySlug, type Nastroj } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { BackButton } from "@/components/BackButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as Nastroj | null;

  if (!content || content.category !== "nastroj") {
    return generatePageMetadata({
      title: "Nástroj nenalezen",
      description: "Požadovaný nástroj nebyl nalezen.",
      path: `/nastroje/${slug}`,
      noindex: true,
    });
  }

  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: `/nastroje/${slug}`,
  });
}

export default async function NastrojPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug) as Nastroj | null;

  if (!content || content.category !== "nastroj") {
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

        {/* Co to je */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Co to je</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            {content.what}
          </p>
        </section>

        {/* Proč to používáme */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Proč to používáme</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            {content.why}
          </p>
        </section>

        {/* Jak to používat */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Jak to používat</h2>
          <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
            {content.how}
          </p>
        </section>

        {/* Praktické use cases */}
        {content.useCases && content.useCases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Praktické use cases
            </h2>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              {content.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Alternativy */}
        {content.alternatives && content.alternatives.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Alternativy</h2>
            <div className="flex flex-wrap gap-2">
              {content.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="px-3 py-1 bg-white/10 rounded text-sm text-white/80"
                >
                  {alt}
                </span>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
