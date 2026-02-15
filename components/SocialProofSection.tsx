export function SocialProofSection() {
  const testimonials = [
    {
      text: "Díky Jdemevibit jsem přestal odkládat a konečně spustil první projekt. Není dokonalý, ale JE.",
      author: "Tomáš",
      role: "analytik z Prahy",
    },
    {
      text: "Poprvé jsem pochopil, že můžu začít, i když neumím všechno. Stačí začít s tím, co mám.",
      author: "Jana",
      role: "HR manažerka",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Co říkají ostatní
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <p className="text-white/80 mb-4 leading-relaxed italic">
              "{testimonial.text}"
            </p>
            <div className="text-white/60 text-sm">
              <span className="font-semibold text-white">{testimonial.author}</span>
              {", "}
              {testimonial.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
