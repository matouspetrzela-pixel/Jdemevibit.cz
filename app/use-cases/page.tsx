import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { getContentByCategory } from "@/lib/content-types";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Use Cases",
  description: "Praktické projekty vytvořené s AI nástroji. Dokumentované procesy, reálné výsledky a learning in public přístup.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  const useCases = getContentByCategory("use-case");

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Use Cases
        </h1>

        {useCases.length === 0 ? (
          <p className="text-white/80">
            Use cases budou přidány brzy...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.slug}`}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {useCase.title}
                </h2>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {useCase.description}
                </p>
                <span className="text-xs text-white/60">
                  {useCase.category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
