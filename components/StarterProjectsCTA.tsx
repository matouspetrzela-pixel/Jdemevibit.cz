import Link from "next/link";

export function StarterProjectsCTA() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Začni dnes. Ne až budeš ready.
        </h2>
        <p className="text-lg text-white/70 mb-8 leading-relaxed">
          Stáhni si první projekt zdarma a za 30 minut budeš mít svůj první build.
          <br />
          Ne dokonalý. Ale TVŮJ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link
            href="/use-cases"
            className="px-8 py-4 bg-[#ef2c28] text-white rounded-lg font-semibold hover:bg-[#ff3d35] transition-colors inline-flex items-center gap-2"
          >
            Prozkoumat projekty
            <span>→</span>
          </Link>
          <Link
            href="/navody"
            className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            Zobrazit návody
          </Link>
        </div>
        <p className="text-sm text-white/50">
          Žádný email, žádná registrace, žádný spam. Prostě začni.
        </p>
      </div>
    </section>
  );
}
