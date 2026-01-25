import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { UseCasesSection } from "@/components/UseCasesSection";

export const metadata = generatePageMetadata({
  title: "Use Cases",
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#0f1217]">
      <UseCasesSection />
    </div>
  );
}
