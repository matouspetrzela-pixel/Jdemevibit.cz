import { notFound } from "next/navigation";
import { getContentBySlug, type Nastroj } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { GlassPanel } from "@/components/lab/GlassPanel";

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
    <LabInnerLayout>
      <article>
        <p className="lab-eyebrow mb-3 text-[#00f0ff]/60">
          {"// nastroj.read"}
        </p>
        <h1 className="lab-section-title mb-10 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
          {content.title}
        </h1>

        <GlassPanel className="mb-10 p-6 md:p-8">
          <h2 className="lab-section-title mb-3 text-lg font-semibold text-white">
            TL;DR
          </h2>
          <p className="text-zinc-400">{content.description}</p>
        </GlassPanel>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Co to je
          </h2>
          <div className="lab-prose text-zinc-400">
            <p>{content.what}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Proč to používáme
          </h2>
          <div className="lab-prose text-zinc-400">
            <p>{content.why}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Jak to používat
          </h2>
          <div className="lab-prose whitespace-pre-line text-zinc-400">
            <p>{content.how}</p>
          </div>
        </section>

        {content.useCases && content.useCases.length > 0 ? (
          <section className="mb-12">
            <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
              Praktické use cases
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-zinc-400">
              {content.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {content.alternatives && content.alternatives.length > 0 ? (
          <section className="mb-12">
            <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
              Alternativy
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.alternatives.map((alt) => (
                <span key={alt} className="vc-tag">
                  {alt}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </LabInnerLayout>
  );
}
