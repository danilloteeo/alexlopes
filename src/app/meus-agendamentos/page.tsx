"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar, Clock, Scissors, Crown, LogOut, Trash2, CheckCircle2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import Link from "next/link";

export default function MeusAgendamentos() {
  const [user, loadingAuth] = useAuthState(auth);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!user) return;

    const carregar = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const snap = await getDocs(q);

        const lista = snap.docs.map(doc => {
          const data = doc.data();
          let dataDate: Date;
          if (data.date instanceof Timestamp) dataDate = data.date.toDate();
          else if (data.date?.seconds) dataDate = new Timestamp(data.date.seconds, data.date.nanoseconds).toDate();
          else dataDate = new Date(data.date || Date.now());

          return { id: doc.id, ...data, date: dataDate };
        });

        setAgendamentos(lista);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar agendamentos");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [user]);

  const proximos = agendamentos.filter(a => a.date >= new Date());
  const concluidos = agendamentos.filter(a => a.date < new Date());

  if (loadingAuth || carregando) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="animate-spin h-16 w-16 border-t-4 border-green-500 rounded-full"></div></div>;
  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">Faça login para ver seus agendamentos</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho VIP */}
        <div className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto ring-4 ring-green-500/50 shadow-2xl">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="text-6xl bg-green-600">{user.displayName?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <h1 className="text-6xl font-black text-white mt-8">
            Olá, <span className="text-green-400">{user.displayName?.split(" ")[0] || "Cliente"}</span>!
          </h1>
          <p className="text-2xl text-zinc-400 mt-4 flex items-center justify-center gap-3">
            <Crown className="w-9 h-9 text-yellow-500" />
            Cliente VIP da Alex Lopes Barbearia
          </p>
        </div>

        {/* Próximos Horários */}
        <section className="mb-20">
          <h2 className="text-4xl font-black text-white mb-10 flex items-center gap-4 justify-center">
            <Calendar className="w-10 h-10 text-green-400" />
            Próximos Horários
          </h2>

          {proximos.length === 0 ? (
            <Card className="p-16 text-center bg-white/5 border-white/10">
              <p className="text-xl text-zinc-400 mb-8">Nenhum agendamento futuro</p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-500">
                <Link href="/agendamento">Agendar Agora</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {proximos.map((a) => (
                <Card key={a.id} className="p-8 bg-white/5 border-white/10 hover:bg-white/10 transition group">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                        <Scissors className="w-10 h-10 text-green-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-black text-green-400">{a.barber}</p>
                        <p className="text-xl text-white">{a.service || "Corte + Barba"}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg text-zinc-400">
                        {format(a.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p className="text-5xl font-black text-white mt-2 flex items-center justify-center gap-3">
                        <Clock className="w-10 h-10 text-green-400" />
                        {a.time}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* HISTÓRICO DE CORTES REALIZADOS */}
        {concluidos.length > 0 && (
          <section>
            <h2 className="text-4xl font-black text-white mb-12 text-center flex items-center justify-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
              Histórico de Cortes Realizados
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {concluidos.map((a, index) => (
                <Card key={a.id} className="bg-white/5 border-white/10 p-6 text-center hover:bg-white/10 transition transform hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600/20 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <p className="text-3xl font-black text-green-400">
                    Corte #{concluidos.length - index}
                  </p>
                  <p className="text-white text-lg mt-2">{a.barber}</p>
                  <p className="text-sm text-zinc-400 mt-3">
                    {format(a.date, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                  <p className="text-2xl font-bold text-white mt-2">{a.time}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-3xl font-black text-green-400">
                Total de cortes: <span className="text-6xl">{concluidos.length}</span>
              </p>
              <p className="text-xl text-zinc-300 mt-4">
                Faltam {10 - (concluidos.length % 10) || 10} cortes para o próximo <strong className="text-yellow-400">BRINDE GRÁTIS</strong>!
              </p>
            </div>
          </section>
        )}

        {/* Botão Sair */}
        <div className="text-center mt-20">
          <Button onClick={() => signOut(auth)} size="lg" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">
            <LogOut className="w-6 h-6 mr-3" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}