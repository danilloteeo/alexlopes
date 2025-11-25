"use client";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, User, Phone } from "lucide-react";
import { format } from "date-fns";

const barbers = ["Alex Lopes", "Ramon Silva", "Gleyverson Lopes", "Daniel Moreira", "Eduardo Freitas"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export default function AgendamentoPage() {
  const [user, loading] = useAuthState(auth);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Preenche nome automaticamente se estiver logado
  useState(() => {
    if (user?.displayName) setName(user.displayName);
  });

  const handleFinalizar = async () => {
    if (!user) {
      toast.error("Faça login para agendar");
      return;
    }
    if (!name || !phone || !date || !time || !barber) {
      toast.error("Preencha todos os campos");
      return;
    }

    setSalvando(true);

    try {
      // Cria a data completa (data + horário)
      const [hour, minute] = time.split(":");
      const dataCompleta = new Date(date);
      dataCompleta.setHours(parseInt(hour), parseInt(minute), 0, 0);

      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        userName: name.trim(),
        userPhone: phone.replace(/\D/g, ""), // remove tudo que não é número
        userEmail: user.email || null,
        barber: barber,
        service: "Corte + Barba", // você pode expandir depois
        date: dataCompleta, // ← AGORA É UMA DATA VÁLIDA
        time: time,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });

      toast.success("Horário agendado com sucesso!", {
        description: `${name}, seu corte com ${barber} está confirmado para ${format(dataCompleta, "dd/MM/yyyy")} às ${time}`,
        duration: 6000,
      });

      // Reset total
      setStep(1);
      setBarber("");
      setDate("");
      setTime("");
      setName(user.displayName || "");
      setPhone("");
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar agendamento", {
        description: "Verifique sua conexão e tente novamente.",
      });
    } finally {
      setSalvando(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-center text-white mb-16">
          Agende seu Horário
        </h1>

        {/* PASSO 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Escolha seu barbeiro</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {barbers.map((b) => (
                <Card
                  key={b}
                  onClick={() => { setBarber(b); setStep(2); }}
                  className="p-10 bg-white/5 border-white/10 hover:border-green-500 hover:bg-white/10 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-white">{b}</h3>
                      <p className="text-green-400 mt-3 text-lg">Toque para continuar</p>
                    </div>
                    <ChevronRight className="w-10 h-10 text-green-400 group-hover:translate-x-3 transition" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PASSO 2 */}
        {step === 2 && (
          <Card className="p-10 bg-white/5 backdrop-blur-xl border-white/10">
            <h2 className="text-3xl font-black text-green-400 text-center mb-10">
              Agendamento com {barber}
            </h2>
            <div className="space-y-10">
              <div>
                <label className="text-white text-xl font-bold mb-4 block flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Data
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-16 px-6 rounded-xl bg-white/10 border border-white/20 text-white text-lg"
                  required
                />
              </div>

              <div>
                <label className="text-white text-xl font-bold mb-4 block">Horário</label>
                <div className="grid grid-cols-3 gap-4">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`h-16 rounded-xl font-bold text-lg transition ${
                        time === t
                          ? "bg-green-600 text-white shadow-lg shadow-green-600/50"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!date || !time}
                  className="flex-1 bg-green-600 hover:bg-green-500"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* PASSO 3 */}
        {step === 3 && (
          <Card className="p-10 bg-white/5 backdrop-blur-xl border-white/10">
            <h2 className="text-3xl font-black text-white text-center mb-10">Confirme seus dados</h2>
            <div className="space-y-8">
              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-16 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-lg"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp (11 98765-4321)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-16 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-lg"
                required
              />

              <div className="bg-white/5 rounded-xl p-6 text-center">
                <p className="text-xl text-white">Resumo do agendamento:</p>
                <p className="text-2xl font-black text-green-400 mt-3">{barber}</p>
                <p className="text-xl text-white">
                  {date && format(new Date(date), "dd 'de' MMMM 'de' yyyy")} às {time}
                </p>
              </div>

              <Button
                onClick={handleFinalizar}
                disabled={salvando || !name || !phone}
                className="w-full h-20 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                {salvando ? "Salvando no sistema..." : "Confirmar Agendamento"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}