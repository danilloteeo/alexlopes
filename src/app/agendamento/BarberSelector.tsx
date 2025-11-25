"use client";

import { Card } from "@/components/ui/card";
import { Scissors, Instagram } from "lucide-react";
import Link from "next/link";

const barbers = [
  { slug: "alex", nome: "Alex Lopes", especialidade: "Fundador • Degradê & Corte Clássico", instagram: "alexlopesbarber", foto: "/barbeiros/alex.jpg" },
  { slug: "ramon", nome: "Ramon Silva", especialidade: "Degradê Zero & Desenhos", instagram: "ramonbarber", foto: "/barbeiros/ramon.jpg" },
  { slug: "gleyve", nome: "Gleyve Lopes", especialidade: "Barba Artística & Pigmentação", instagram: "gleyvebarber", foto: "/barbeiros/gleyve.jpg" },
  { slug: "daniel", nome: "Daniel Moreira", especialidade: "Corte Social & Barba Premium", instagram: "danielbarber", foto: "/barbeiros/daniel.jpg" },
];

export default function BarberSelector() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {barbers.map((b) => (
        <Link key={b.slug} href={`/agendamento/${b.slug}`}>
          <Card className="group overflow-hidden bg-white/5 border-white/10 hover:border-green-500/50 transition-all hover:scale-105 cursor-pointer">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={b.foto}
                alt={b.nome}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <h3 className="text-2xl font-black text-white">{b.nome}</h3>
                <p className="text-green-400 text-sm font-medium">{b.especialidade}</p>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-2 text-white/80">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@{b.instagram}</span>
              </div>
              <Scissors className="w-8 h-8 text-green-400" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}