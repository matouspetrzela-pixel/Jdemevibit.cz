export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Vyber si starter",
      description: "Jednoduchý projekt, který zvládneš za 30-60 minut",
    },
    {
      number: "2",
      title: "Postav to (s pomocí)",
      description: "Template + prompty pro AI + komunita na otázky",
    },
    {
      number: "3",
      title: "Sdílej a slavíme",
      description: "Ukáž světu. Oslavíme každý \"done\" projekt.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        3 kroky k prvnímu projektu
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-[#ef2c28] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {step.title}
            </h3>
            <p className="text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
