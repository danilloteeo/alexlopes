"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Scissors, Calendar, Clock, User, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export default function PerfilPage() {
  const [user, loading] = useAuthState(auth);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!user) return;

    const carregarHistorico = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);
        const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAgendamentos(dados);
      } catch (error) {
        toast.error("Erro ao carregar histórico");
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, [user]);

  const totalCortes = agendamentos.filter(a => a.status === "completed").length;
  const cortesParaBrinde = 10 - (totalCortes % 10);
  const proximoBrinde = cortesParaBrinde === 10 ? 0 : cortesParaBrinde;

  if (loading || carregando) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Faça login para ver seu perfil
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header do Perfil */}
        <div className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto ring-4 ring-green-500/50 shadow-2xl">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="text-5xl bg-green-600">
              {user.displayName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-5xl font-black text-white mt-8">
            {user.displayName || "Cliente VIP"}
          </h1>
          <p className="text-2xl text-green-400 flex items-center justify-center gap-2 mt-4">
            <Crown className="w-8 h-8" />
            Cliente VIP
          </p>
        </div>
        {/* Próximos Agendamentos */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
            <Calendar className="w-10 h-10 text-green-400" />
            Próximos Horários
          </h2>
          {agendamentos.filter(a => new Date(a.date.seconds * 1000) >= new Date()).length === 0 ? (
            <Card className="p-12 text-center bg-white/5 border-white/10">
              <p className="text-xl text-zinc-400">Nenhum agendamento futuro</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {agendamentos
                .filter(a => new Date(a.date.seconds * 1000) >= new Date())
                .map((a) => (
                  <Card key={a.id} className="p-6 bg-white/5 border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-400">{a.barber}</p>
                      <p className="text-white text-lg">{a.service}</p>
                    </div>
                    <div className="text-right text-zinc-300">
                      <p>{format(new Date(a.date.seconds * 1000), "dd 'de' MMMM", { locale: ptBR })}</p>
                      <p className="text-2xl font-bold">{a.time}</p>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </section>

        {/* Histórico Recente */}
        <section>
          <h2 className="text-4xl font-black text-white mb-8">Histórico de Cortes</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {agendamentos.slice(0, 8).map((a, i) => (
              <Card key={a.id} className="bg-white/5 border-white/10 p-6 text-center hover:bg-white/10 transition">
                <Scissors className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-2xl font-black text-green-400">Corte #{totalCortes - i}</p>
                <p className="text-white mt-2">{a.service}</p>
                <p className="text-sm text-zinc-400 mt-2">
                  {format(new Date(a.date.seconds * 1000), "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Botão Sair */}
        <div className="text-center mt-16">
          <Button onClick={() => signOut(auth)} size="lg" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">
            <LogOut className="w-5 h-5 mr-3" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}