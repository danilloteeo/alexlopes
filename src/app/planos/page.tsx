"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Planos() {
  const planos = [
    { nome: "Plano Cabelo", preco: "R$ 65/mês", popular: true },
    { nome: "Plano Barba", preco: "R$ 80/mês", popular: false },
    { nome: "Plano Cabelo e Barba", preco: "R$ 120/mês", popular: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-16">
          Nossos <span className="text-green-400">Planos</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {planos.map((plano) => (
            <Card
              key={plano.nome}
              className={`relative p-16 bg-white/5 backdrop-blur-xl border ${
                plano.popular
                  ? "border-green-500 shadow-2xl shadow-green-500/30 scale-110"
                  : "border-white/10"
              } hover:bg-white/10 transition-all`}
            >
              {plano.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-bold">
                  MAIS ESCOLHIDO
                </div>
              )}
              <h3 className="text-4xl font-black text-white mb-8">{plano.nome}</h3>
              <p className="text-6xl font-black text-green-400 mb-12">{plano.preco}</p>
              <Button className="w-full h-16 text-2xl font-bold bg-green-600 hover:bg-green-500">
                Quero Este Plano
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}