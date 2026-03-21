import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { UseCasesSection } from "@/components/UseCasesSection";
import { getProjects } from "@/lib/projects";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";

export const metadata = generatePageMetadata({
  title: "Use Cases",
  description:
    "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  const projects = getProjects();

  return (
    <LabInnerLayout wide>
      <UseCasesSection projects={projects} />
    </LabInnerLayout>
  );
}
