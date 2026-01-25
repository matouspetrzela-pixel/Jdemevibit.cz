export function Hero() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24 text-center">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
        Vibe Coding & AI Tvorba z Praxe
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto">
        Projekty vytvořené s AI nástroji, dokumentované procesy a learning in public přístup.{" "}
        <span className="hidden md:inline">
          <br />
        </span>
        Reálné výsledky, ne teorie.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="#projekty"
          className="w-full sm:w-auto px-6 py-3 bg-[#7b3beb] text-white rounded-lg hover:bg-[#6b2dd4] transition-colors text-center"
        >
          Zobrazit projekty
        </a>
        <a
          href="#kontakt"
          className="w-full sm:w-auto px-6 py-3 border-2 border-[#ef2c28] text-[#ef2c28] rounded-lg hover:bg-[#ef2c28] hover:text-white transition-colors text-center"
        >
          Přidej se
        </a>
      </div>
    </section>
  );
}
