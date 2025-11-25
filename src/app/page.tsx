import { Scissors, MapPin, Star, Instagram } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO LIMPO E IMPACTANTE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <img src="/hero.jpg" alt="Alex Lopes Barbearia" className="w-full h-full object-cover" />
        </video>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            ALEX LOPES
            <span className="block text-5xl md:text-7xl text-green-400 mt-2">
              BARBEARIA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto">
            Onde tradição encontra estilo.
          </p>
        </div>
      </section>

      {/* GALERIA DE CORTES */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center text-white mb-16">Nossos Trabalhos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src={`/works/${i}.jpg`}
                  alt={`Corte ${i}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="https://www.instagram.com/barbearia_alexlopes/"
              target="_blank"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition"
            >
              <Instagram className="w-6 h-6" />
              Veja mais no Instagram
            </Link>
          </div>
        </div>
      </section>
      {/* RODAPÉ SIMPLES */}
      <footer className="bg-black border-t border-zinc-800 py-12 text-center">
        <p className="text-zinc-500">
          © 2025 Alex Lopes Barbearia
        </p>
      </footer>
    </>
  );
}