import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { getContentByCategory } from "@/lib/content-types";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Návody",
  description: "Praktické návody pro vytváření projektů s AI nástroji. Krok za krokem, s konkrétními příklady a kódem.",
  path: "/navody",
});

export default function NavodyPage() {
  const navody = getContentByCategory("navod");

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Návody
        </h1>

        {navody.length === 0 ? (
          <p className="text-white/70 text-center py-12">
            Návody budou přidány brzy...
          </p>
        ) : (
          <div className="space-y-6">
            {navody.map((navod) => (
              <Link
                key={navod.id}
                href={`/navody/${navod.slug}`}
                className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {navod.title}
                </h2>
                <p className="text-white/70">{navod.description}</p>
              </Link>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
