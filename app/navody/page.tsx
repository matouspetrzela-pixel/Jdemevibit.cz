import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { getContentByCategory } from "@/lib/content-types";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { PageIntro } from "@/components/lab/PageIntro";
import { ContentListLink } from "@/components/lab/ContentListLink";

export const metadata = generatePageMetadata({
  title: "Návody",
  description:
    "Praktické návody pro vytváření projektů s AI nástroji. Krok za krokem, s konkrétními příklady a kódem.",
  path: "/navody",
});

export default function NavodyPage() {
  const navody = getContentByCategory("navod");

  return (
    <LabInnerLayout>
      <PageIntro
        eyebrow="// the_vault.index"
        title="Návody"
        subtitle={'Knihovna postupů — až přibydou, najdeš je tady.'}
      />

      {navody.length === 0 ? (
        <p className="lab-eyebrow py-16 text-center text-zinc-500/80">
          {"// vault_empty — zatím žádné záznamy"}
        </p>
      ) : (
        <div className="space-y-4">
          {navody.map((navod) => (
            <ContentListLink
              key={navod.id}
              href={`/navody/${navod.slug}`}
              title={navod.title}
              description={navod.description}
            />
          ))}
        </div>
      )}
    </LabInnerLayout>
  );
}
