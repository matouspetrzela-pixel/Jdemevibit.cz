"use client";

export function FAQSection() {
  const faqs = [
    {
      question: "Musím umět programovat?",
      answer: "Ne. Stačí základní znalost (co je HTML/CSS/JS) nebo chuť se to naučit za pochodu.",
    },
    {
      question: "Kolik to stojí?",
      answer: "Starter projekty jsou zdarma. Žádné \"freemium\" triky. Až časem budou placené workshopy, ale základ je free.",
    },
    {
      question: "Jsem úplný začátečník, je to pro mě?",
      answer: "Přesně pro tebe to je. Jdemevibit vznikl pro lidi, co čekají na \"správný moment\". Ten moment je TEĎ.",
    },
    {
      question: "Jak dlouho to trvá?",
      answer: "První projekt: 30-60 minut. Ale není to sprint. Je to cesta. Jdi svým tempem.",
    },
    {
      question: "Co když se zaseknu?",
      answer: "Máš komunitu, máš PROMPTS.md (jak požádat AI), máš prostor zeptat se. Zasekávání je součást procesu.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Často kladené otázky
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-6 group"
          >
            <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
              <span>{faq.question}</span>
              <span className="text-[#ef2c28] text-2xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-white/70 mt-4 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
