import { notFound } from "next/navigation";
import { getContentBySlug, type Navod } from "@/lib/content-types";
import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { GlassPanel } from "@/components/lab/GlassPanel";

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
    <LabInnerLayout>
      <article>
        <p className="lab-eyebrow mb-3 text-[#00f0ff]/60">{"// navod.read"}</p>
        <h1 className="lab-section-title mb-10 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
          {content.title}
        </h1>

        <GlassPanel className="mb-10 p-6 md:p-8">
          <h2 className="lab-section-title mb-3 text-lg font-semibold text-white">
            TL;DR
          </h2>
          <p className="text-zinc-400">{content.description}</p>
        </GlassPanel>

        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-6 font-mono text-sm text-zinc-500">
            <div>
              <span className="text-zinc-400">Obtížnost:</span>{" "}
              {content.difficulty === "beginner"
                ? "Začátečník"
                : content.difficulty === "intermediate"
                  ? "Střední"
                  : "Pokročilý"}
            </div>
            <div>
              <span className="text-zinc-400">Čas:</span> {content.timeRequired}
            </div>
          </div>

          <div>
            <h3 className="lab-section-title mb-3 text-lg font-semibold text-white">
              Nástroje
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.tools.map((tool) => (
                <span key={tool} className="vc-tag vc-tag--violet">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="lab-section-title mb-6 text-2xl font-bold tracking-[-0.04em] text-white">
            Postup
          </h2>
          <div className="space-y-6">
            {content.steps.map((step, index) => (
              <GlassPanel key={index} className="p-6 md:p-8">
                <h3 className="lab-section-title mb-3 text-xl font-semibold text-white">
                  Krok {index + 1}: {step.title}
                </h3>
                <p className="mb-4 text-zinc-400">{step.description}</p>
                {step.code ? (
                  <pre className="overflow-x-auto rounded-sm border border-white/[0.08] bg-black/50 p-4">
                    <code className="font-mono text-sm text-zinc-400">
                      {step.code}
                    </code>
                  </pre>
                ) : null}
                {step.image ? (
                  <div className="mt-4">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="max-w-full rounded-sm border border-white/[0.08]"
                    />
                  </div>
                ) : null}
              </GlassPanel>
            ))}
          </div>
        </section>
      </article>
    </LabInnerLayout>
  );
}
