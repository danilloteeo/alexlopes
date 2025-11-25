// src/app/[barbeiro]/page.tsx
import BookingForm from "@/components/BookingForm";
import { Card } from "@/components/ui/card";
import { Scissors, Instagram, Clock } from "lucide-react";

const barbeiros = {
    alex: {
        nome: "Alex Lopes",
        especialidade: "Corte Clássico + Degradê + Barba",
        bio: "Fundador da Alex Lopes Barbearia. 12 anos de experiência, especialista em cortes modernos e degradê perfeito.",
        instagram: "alexlopesbarber",
        foto: "/barbeiros/alex.jpg",
        cor: "from-green-600 to-emerald-600",
    },
    ramon: {
        nome: "Ramon Silva",
        especialidade: "Degradê & Barba Artística",
        bio: "Mestre no degradê zero e desenhos na barba. Cliente sai com arte na cabeça.",
        instagram: "ramonbarber",
        foto: "/barbeiros/ramon.jpg",
        cor: "from-blue-600 to-cyan-600",
    },
    gleyve: {
        nome: "Gleyve Lopes",
        especialidade: "Barba Completa & Pigmentação",
        bio: "Rei da barba. Transforma qualquer barba em obra de arte.",
        instagram: "gleyvebarber",
        foto: "/barbeiros/gleyve.jpg",
        cor: "from-purple-600 to-pink-600",
    },
    // Adicione os outros aqui...
};

export default function BarbeiroPage({ params }: { params: { barbeiro: string } }) {
    const slug = params.barbeiro.toLowerCase();
    const barbeiro = barbeiros[slug as keyof typeof barbeiros];

    if (!barbeiro) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
                Barbeiro não encontrado
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero do Barbeiro */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
                <img
                    src={barbeiro.foto}
                    alt={barbeiro.nome}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
                        {barbeiro.nome}
                    </h1>
                    <p className="text-2xl md:text-4xl text-green-400 font-bold mb-8">
                        {barbeiro.especialidade}
                    </p>
                    <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        {barbeiro.bio}
                    </p>
                    <div className="flex justify-center gap-6 mt-10">
                        <a
                            href={`https://instagram.com/${barbeiro.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full hover:bg-white/20 transition"
                        >
                            <Instagram className="w-6 h-6" />
                            @{barbeiro.instagram}
                        </a>
                    </div>
                </div>
            </section>

            {/* Agendamento Direto */}
            <section className="py-24 bg-gradient-to-b from-black to-zinc-950">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-black text-white mb-8">
                        Agende com <span className="text-green-400">{barbeiro.nome}</span>
                    </h2>
                    <Card className="p-10 bg-white/5 backdrop-blur-xl border-white/10">
                        <BookingForm barbeiroFixo={barbeiro.nome} />
                    </Card>
                </div>
            </section>
        </div>
    );
}