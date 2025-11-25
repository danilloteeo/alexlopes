export default function Testimonials() {
  const reviews = [
    { name: "Lucas Oliveira", text: "Melhor corte da minha vida! O Alex é fora de série.", rating: 5 },
    { name: "Pedro Santos", text: "Atendimento impecável, ambiente top e barba perfeita.", rating: 5 },
    { name: "Gabriel Costa", text: "Já sou cliente fiel há 2 anos. Nunca mais troco!", rating: 5 },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16">O que nossos clientes dizem</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex justify-center mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-3xl">★</span>
                ))}
              </div>
              <p className="text-white text-lg italic mb-6">"{r.text}"</p>
              <p className="text-green-400 font-bold">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}