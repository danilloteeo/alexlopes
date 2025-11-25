"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, Scissors, ChevronRight } from "lucide-react";

const barbers = ["Alex Lopes", "Ramon Silva", "Gleyverson Lopes", "Daniel Moreira", "Eduardo Freitas"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function AgendamentoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success("Horário agendado com sucesso!", {
      description: `${name}, seu corte com ${barber} está confirmado para ${date} às ${time}`,
    });
    setLoading(false);
    setStep(1);
    setBarber(""); setDate(""); setTime(""); setName(""); setPhone("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-center text-white mb-16">
          Agende seu Horário
        </h1>

        {/* PASSO 1 - ESCOLHER BARBEIRO */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Escolha seu barbeiro</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {barbers.map((b) => (
                <Card
                  key={b}
                  onClick={() => { setBarber(b); setStep(2); }}
                  className="p-8 bg-white/5 border-white/10 hover:border-green-500 hover:bg-white/10 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-white">{b}</h3>
                      <p className="text-green-400 mt-2">Toque para continuar</p>
                    </div>
                    <ChevronRight className="w-8 h-8 text-green-400 group-hover:translate-x-2 transition" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PASSO 2 - DATA E HORA */}
        {step === 2 && (
          <Card className="p-10 bg-white/5 backdrop-blur-xl border-white/10">
            <h2 className="text-3xl font-black text-green-400 text-center mb-8">
              Agendamento com {barber}
            </h2>
            <div className="space-y-8">
              <div>
                <label className="text-white text-lg font-medium mb-4 block">Escolha a data</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white text-lg font-medium mb-4 block">Horário</label>
                <div className="grid grid-cols-3 gap-4">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`h-14 rounded-xl font-bold transition ${
                        time === t ? "bg-green-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => date && time && setStep(3)}
                disabled={!date || !time}
                className="w-full h-16 text-xl bg-green-600 hover:bg-green-500"
              >
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* PASSO 3 - DADOS FINAIS */}
        {step === 3 && (
          <Card className="p-10 bg-white/5 backdrop-blur-xl border-white/10">
            <h2 className="text-3xl font-black text-white text-center mb-8">Quase lá!</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
              <input
                type="tel"
                placeholder="Seu WhatsApp (11 98765-4321)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />

              <Button
                onClick={handleSubmit}
                disabled={loading || !name || !phone}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                {loading ? "Confirmando..." : "Confirmar Agendamento"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}