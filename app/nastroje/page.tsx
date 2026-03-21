import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { getContentByCategory } from "@/lib/content-types";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { PageIntro } from "@/components/lab/PageIntro";
import { ContentListLink } from "@/components/lab/ContentListLink";

export const metadata = generatePageMetadata({
  title: "Nástroje",
  description:
    "Přehled AI nástrojů a technologií používaných v projektech. Co jsou, proč je používáme a jak je používat.",
  path: "/nastroje",
});

export default function NastrojePage() {
  const nastroje = getContentByCategory("nastroj");

  return (
    <LabInnerLayout>
      <PageIntro
        eyebrow="// stack.registry"
        title="Nástroje"
        subtitle="Co používáme v laboratoři — přehled a kontext."
      />

      {nastroje.length === 0 ? (
        <p className="lab-eyebrow py-16 text-center text-zinc-500/80">
          {"// registry_empty — zatím žádné záznamy"}
        </p>
      ) : (
        <div className="space-y-4">
          {nastroje.map((nastroj) => (
            <ContentListLink
              key={nastroj.id}
              href={`/nastroje/${nastroj.slug}`}
              title={nastroj.title}
              description={nastroj.description}
            />
          ))}
        </div>
      )}
    </LabInnerLayout>
  );
}
