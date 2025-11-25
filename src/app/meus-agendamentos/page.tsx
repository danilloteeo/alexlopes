"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, doc, deleteDoc } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar, Clock, Scissors, Crown, LogOut, Trash2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import Link from "next/link";

export default function MeusAgendamentos() {
  const [user, loadingAuth] = useAuthState(auth);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [cancelandoId, setCancelandoId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<any>(null);

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
        const dados = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAgendamentos(dados);
      } catch (err) {
        toast.error("Erro ao carregar agendamentos");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [user]);

  const proximos = agendamentos.filter(a => new Date(a.date.seconds * 1000) >= new Date());
  const passados = agendamentos.filter(a => new Date(a.date.seconds * 1000) < new Date());
  const totalCortes = passados.length;
  const cortesParaBrinde = 10 - (totalCortes % 10);
  const proximoBrinde = cortesParaBrinde === 10 ? 0 : cortesParaBrinde;

  const handleCancelar = async () => {
    if (!agendamentoParaCancelar) return;

    setCancelandoId(agendamentoParaCancelar.id);
    try {
      await deleteDoc(doc(db, "appointments", agendamentoParaCancelar.id));
      setAgendamentos(prev => prev.filter(a => a.id !== agendamentoParaCancelar.id));
      toast.success("Agendamento cancelado com sucesso!", {
        description: `Horário com ${agendamentoParaCancelar.barber} às ${agendamentoParaCancelar.time} foi removido.`,
      });
    } catch (error) {
      toast.error("Erro ao cancelar. Tente novamente.");
    } finally {
      setCancelandoId(null);
      setDialogOpen(false);
      setAgendamentoParaCancelar(null);
    }
  };

  const abrirDialog = (agendamento: any) => {
    setAgendamentoParaCancelar(agendamento);
    setDialogOpen(true);
  };

  if (loadingAuth || carregando) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-6">Faça login para ver seus agendamentos</h1>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-500">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho VIP */}
        <div className="text-center mb-16">
          <Avatar className="w-28 h-28 mx-auto ring-4 ring-green-500/50 shadow-2xl">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="text-5xl bg-green-600">
              {user.displayName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-8">
            Olá, <span className="text-green-400">{user.displayName?.split(" ")[0] || "Cliente"}</span>!
          </h1>
          <p className="text-2xl text-zinc-400 mt-4 flex items-center justify-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            Cliente VIP da Alex Lopes Barbearia
          </p>
        </div>
        {/* Próximos Agendamentos */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-white mb-10 flex items-center gap-4">
            <Calendar className="w-10 h-10 text-green-400" />
            Próximos Horários
          </h2>

          {proximos.length === 0 ? (
            <Card className="p-16 text-center bg-white/5 border-white/10">
              <p className="text-xl text-zinc-400 mb-8">Você não tem agendamentos futuros</p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-500">
                <Link href="/agendamento">Agendar Novo Horário</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6">
              {proximos.map((a) => (
                <Card key={a.id} className="p-8 bg-white/5 border-white/10 hover:bg-white/10 transition group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                        <Scissors className="w-9 h-9 text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-green-400">{a.barber}</p>
                        <p className="text-xl text-white">{a.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-zinc-400">
                        {format(new Date(a.date.seconds * 1000), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p className="text-4xl font-black text-white flex items-center justify-end gap-2">
                        <Clock className="w-8 h-8 text-green-400" />
                        {a.time}
                      </p>
                    </div>
                  </div>

                  {/* Botão Cancelar */}
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => abrirDialog(a)}
                      variant="destructive"
                      size="sm"
                      disabled={cancelandoId === a.id}
                      className="bg-red-600/80 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {cancelandoId === a.id ? "Cancelando..." : "Cancelar Horário"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Diálogo de Confirmação */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent className="bg-zinc-900 border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que quer cancelar?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                Você está cancelando seu horário com <strong>{agendamentoParaCancelar?.barber}</strong> em{" "}
                <strong>
                  {agendamentoParaCancelar && format(new Date(agendamentoParaCancelar.date.seconds * 1000), "dd/MM/yyyy")} às {agendamentoParaCancelar?.time}
                </strong>
                .<br /><br />
                Essa ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-white/20">Voltar</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelar} className="bg-red-600 hover:bg-red-700">
                Sim, cancelar horário
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Botão Sair */}
        <div className="text-center mt-20">
          <Button onClick={() => signOut(auth)} size="lg" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">
            <LogOut className="w-5 h-5 mr-3" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}