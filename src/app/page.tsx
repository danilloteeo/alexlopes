import BookingForm from "@/components/arq/BookingForm";
import Testimonials from "@/components/arq/Testimonials";
import { Button } from "@/components/ui/button";
import { Scissors, MapPin, Phone, Clock, Instagram, ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO ÉPICO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
          <img src="/hero.jpg" alt="Alex Lopes Barbearia" className="w-full h-full object-cover" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 text-green-400 text-sm font-medium uppercase tracking-wider mb-6">
            <Scissors className="w-6 h-6" />
            <span>Barbearia Premium em São Paulo</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
            ALEX LOPES
            <span className="block text-4xl md:text-6xl lg:text-7xl text-green-400 mt-2">
              BARBEARIA
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Onde tradição encontra estilo. Corte perfeito, barba impecável e atendimento de excelência.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild size="lg" className="text-lg px-10 py-7 bg-green-600 hover:bg-green-500 shadow-2xl">
              <Link href="#agendamento">Agendar Horário</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 backdrop-blur-lg border-white/30">
              <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-10 h-10 text-white" />
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Nossos Serviços</h2>
          <p className="text-xl text-zinc-400 mb-16 max-w-2xl mx-auto">
            Qualidade premium com preços justos
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Corte de Cabelo", price: "R$ 70", time: "45min", popular: true },
              { name: "Barba Completa", price: "R$ 50", time: "30min" },
              { name: "Corte + Barba", price: "R$ 110", time: "75min", save: "Economize R$ 10" },
              { name: "Sobrancelha", price: "R$ 25", time: "15min" },
              { name: "Pigmentação", price: "R$ 120", time: "90min" },
              { name: "Luzes / Coloração", price: "R$ 180+", time: "120min+" },
            ].map((servico) => (
              <div
                key={servico.name}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                {servico.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Mais Popular
                  </span>
                )}
                {servico.save && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {servico.save}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-3">{servico.name}</h3>
                <p className="text-4xl font-black text-green-400 mb-2">{servico.price}</p>
                <p className="text-zinc-400 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  {servico.time}
                </p>
                <Button asChild className="w-full mt-6 bg-green-600 hover:bg-green-500">
                  <Link href="#agendamento">Agendar Este</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDAMENTO */}
      <section id="agendamento" className="py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Agende seu Horário Agora
            </h2>
            <p className="text-xl text-zinc-400 mt-4 max-w-2xl mx-auto">
              Escolha seu barbeiro, serviço e horário em menos de 60 segundos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8">
                <BookingForm />
              </div>
            </div>

            {/* GALERIA DE BARBEIROS OPCIONAL */}
            <div className="order-1 lg:order-2">
              {(() => {
                try {
                  const BarbersGallery = require("@/components/BarbersGallery").default;
                  return (
                    <>
                      <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 justify-center lg:justify-start">
                        <Scissors className="w-10 h-10 text-green-400" />
                        Nossos Barbeiros
                      </h3>
                      <BarbersGallery />
                    </>
                  );
                } catch {
                  return null;
                }
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA DE TRABALHOS */}
      <section id="galeria" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Galeria de Transformações</h2>
          <p className="text-xl text-zinc-400 mb-16">Antes × Depois – Resultados reais</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={`/works/${i}.jpg`}
                  alt={`Transformação ${i}`}
                  className="w-full h-96 object-cover transition-transform group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white text-xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    Transformação Completa
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO & FOOTER */}
      <footer id="contato" className="bg-black border-t border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black text-white mb-4">ALEX LOPES</h3>
            <p className="text-zinc-400">A barbearia que todo homem merece.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5" />
              Endereço
            </h4>
            <p className="text-zinc-400">
              Rua Exemplo, 123<br />
              Vila Madalena - São Paulo, SP
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-5 h-5" />
              Horário
            </h4>
            <p className="text-zinc-400">
              Seg-Sex: 09h às 20h<br />
              Sábado: 09h às 18h<br />
              Domingo: Fechado
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Fale Conosco</h4>
            <Button asChild className="bg-green-600 hover:bg-green-500">
              <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                (11) 98765-4321
              </a>
            </Button>
            <div className="mt-6">
              <a
                href="https://instagram.com/alexlopesbarbearia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:scale-105 transition"
              >
                <Instagram className="w-6 h-6" />
                @alexlopesbarbearia
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-600 text-sm mt-12">
          © 2025 Alex Lopes Barbearia • Todos os direitos reservados
        </div>
        <Testimonials />
        <div className="text-center text-zinc-600 text-sm mt-12 space-x-6">
          <Link href="/politica" className="hover:text-white transition">Política de Cancelamento</Link>
          <span>•</span>
          <Link href="/privacidade" className="hover:text-white transition">Privacidade</Link>
        </div>
      </footer>
    </>
  );
}