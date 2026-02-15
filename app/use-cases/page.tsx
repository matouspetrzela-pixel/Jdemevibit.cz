import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { UseCasesSection } from "@/components/UseCasesSection";
import { BackButton } from "@/components/BackButton";
import { getProjects } from "@/lib/projects";

export const metadata = generatePageMetadata({
  title: "Use Cases",
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  // Načtení projektů na serveru
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <UseCasesSection projects={projects} />
    </div>
  );
}
