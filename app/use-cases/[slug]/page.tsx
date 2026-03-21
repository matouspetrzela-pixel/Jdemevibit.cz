import { notFound } from "next/navigation";
import { getContentBySlug, type UseCase } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { buildOGImageUrl } from "@/app/seo/ogImage";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { GlassPanel } from "@/components/lab/GlassPanel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  const ogImage =
    content.ogImage ||
    buildOGImageUrl({
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
    <LabInnerLayout>
      <article>
        <p className="lab-eyebrow mb-3 text-[#00f0ff]/60">
          {"// use_case.archive"}
        </p>
        <h1 className="lab-section-title mb-8 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
          {content.title} vytvořený za {content.timeSpent} s AI
        </h1>

        <GlassPanel className="mb-10 p-6 md:p-8">
          <h2 className="lab-section-title mb-3 text-lg font-semibold text-white">
            TL;DR
          </h2>
          <p className="text-zinc-400">{content.description}</p>
        </GlassPanel>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Kontext a cíl projektu
          </h2>
          <div className="space-y-6 text-zinc-400">
            <div>
              <h3 className="lab-section-title mb-2 text-lg font-semibold text-white">
                Kontext
              </h3>
              <p>{content.context}</p>
            </div>
            <div>
              <h3 className="lab-section-title mb-2 text-lg font-semibold text-white">
                Cíl
              </h3>
              <p>{content.goal}</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Použité nástroje
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.tools.map((tool) => (
              <span key={tool} className="vc-tag vc-tag--violet">
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Jak probíhal vývoj
          </h2>
          <div className="space-y-6 text-zinc-400">
            {content.process.map((step, index) => (
              <div key={index}>
                <h3 className="lab-section-title mb-2 text-lg font-semibold text-white">
                  {content.prompts?.[index] ? "Promptování" : `Krok ${index + 1}`}
                </h3>
                {content.prompts?.[index] ? (
                  <pre className="mb-3 overflow-x-auto rounded-sm border border-white/[0.08] bg-black/50 p-4 font-mono text-sm text-zinc-400">
                    {content.prompts[index]}
                  </pre>
                ) : null}
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {content.iterations && content.iterations.length > 0 ? (
          <section className="mb-12">
            <h3 className="lab-section-title mb-4 text-xl font-semibold text-white">
              Iterace
            </h3>
            <ul className="list-inside list-disc space-y-2 text-zinc-400">
              {content.iterations.map((iteration, index) => (
                <li key={index}>{iteration}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {content.lessonsLearned && content.lessonsLearned.length > 0 ? (
          <section className="mb-12">
            <h3 className="lab-section-title mb-4 text-xl font-semibold text-white">
              Co bych dnes udělal jinak
            </h3>
            <ul className="list-inside list-disc space-y-2 text-zinc-400">
              {content.lessonsLearned.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="mb-12">
            <h3 className="lab-section-title mb-4 text-xl font-semibold text-white">
              Co bych dnes udělal jinak
            </h3>
            <p className="text-zinc-400">
              Tato sekce bude doplněna později s konkrétními poznatky z projektu.
            </p>
          </section>
        )}

        <section className="mb-12">
          <h2 className="lab-section-title mb-4 text-2xl font-bold tracking-[-0.04em] text-white">
            Výsledek
          </h2>
          <div className="space-y-4 text-zinc-400">
            <p>{content.result}</p>
            <div className="flex flex-wrap gap-4">
              {content.url ? (
                <a
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-text-link inline-flex items-center gap-2 font-mono text-sm font-medium"
                >
                  Zobrazit projekt
                  <span aria-hidden>→</span>
                </a>
              ) : null}
              {content.githubUrl ? (
                <a
                  href={content.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-text-link vc-text-link--violet inline-flex items-center gap-2 font-mono text-sm font-medium"
                >
                  GitHub
                  <span aria-hidden>→</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </article>
    </LabInnerLayout>
  );
}
