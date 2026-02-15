import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { getContentByCategory } from "@/lib/content-types";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Nástroje",
  description: "Přehled AI nástrojů a technologií používaných v projektech. Co jsou, proč je používáme a jak je používat.",
  path: "/nastroje",
});

export default function NastrojePage() {
  const nastroje = getContentByCategory("nastroj");

  return (
    <div className="min-h-screen bg-[#0f1217]">
      <BackButton />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Nástroje
        </h1>

        {nastroje.length === 0 ? (
          <p className="text-white/70 text-center py-12">
            Nástroje budou přidány brzy...
          </p>
        ) : (
          <div className="space-y-6">
            {nastroje.map((nastroj) => (
              <Link
                key={nastroj.id}
                href={`/nastroje/${nastroj.slug}`}
                className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {nastroj.title}
                </h2>
                <p className="text-white/70">{nastroj.description}</p>
              </Link>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
