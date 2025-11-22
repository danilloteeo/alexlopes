import BookingForm from "@/components/arq/BookingForm";
import BarbersGallery from "@/components/arq/BarbersGallery";
import { Instagram, Scissors, MapPin, Phone, Clock } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen bg-[url('/hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Alex Lopes</h1>
          <p className="text-xl md:text-3xl mb-8">O melhor local para mudar seu visual</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Scissors className="w-6 h-6" />
            <span>Corte | Barba | Acabamento</span>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Bem-vindo à Alex Lopes Barbearia</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Aqui o homem moderno encontra tradição, estilo e atendimento de excelência. 
            Nossa equipe é especializada em cortes clássicos e modernos, barba completa e tratamentos premium.
          </p>
        </div>
      </section>

      {/* Barbeiros */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Nossos Barbeiros</h2>
          <BarbersGallery />
        </div>
      </section>

      {/* Agendamento */}
      <section id="agendamento" className="py-20 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Agende seu Horário</h2>
          <BookingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-4">Alex Lopes Barbearia</h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5" />
              <span>Rua Exemplo, 123 - São Paulo, SP</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <Phone className="w-5 h-5" />
              <span>(11) 98765-4321</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-5 h-5" />
              Horário de Funcionamento
            </h3>
            <p>Segunda a Sexta: 09h - 20h</p>
            <p>Sábado: 09h - 18h</p>
            <p>Domingo: Fechado</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="mb-4">Nos siga no Instagram</p>
            <a
              href="https://instagram.com/alexlopesbarbearia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-300 transition"
            >
              <Instagram className="w-6 h-6" />
              <span>@alexlopesbarbearia</span>
            </a>
          </div>
        </div>
        <div className="text-center mt-10 text-sm">
          © 2025 Alex Lopes Barbearia. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}