"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { LogOut, Calendar, Clock, Scissors, User, Phone } from "lucide-react";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  barber: string;
  service: string;
  date: { seconds: number; nanoseconds: number };
  time: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export default function MeusAgendamentos() {
  const [user, loading] = useAuthState(auth);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Faça login para ver seus agendamentos");
      router.push("/auth");
      return;
    }

    if (user) {
      fetchAppointments();
    }
  }, [user, loading, router]);

  const fetchAppointments = async () => {
    try {
      const q = query(
        collection(db, "appointments"),
        where("userId", "==", user?.uid),
        orderBy("date", "desc"),
        orderBy("time", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[];

      setAppointments(data);
    } catch (error) {
      toast.error("Erro ao carregar agendamentos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    toast.success("Logout realizado com sucesso!");
    router.push("/");
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <Skeleton className="h-12 w-64" />
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              <Scissors className="w-10 h-10 text-primary" />
              Meus Agendamentos
            </h1>
            <p className="text-muted-foreground mt-2">
              Olá, {user?.displayName || user?.email}!
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Lista de agendamentos */}
        {appointments.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum agendamento ainda</h3>
              <p className="text-muted-foreground mb-6">
                Parece que você ainda não marcou nenhum horário conosco.
              </p>
              <Button size="lg" onClick={() => router.push("/#agendamento")}>
                Agendar agora
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {appointments.map((apt) => {
              const date = new Date(apt.date.seconds * 1000);
              return (
                <Card key={apt.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">
                        {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </CardTitle>
                      <span className="text-2xl font-bold text-primary">{apt.time}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{apt.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span>{apt.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Scissors className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{apt.barber}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span>{apt.service}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `https://wa.me/5511987654321?text=Olá! Sobre meu agendamento do dia ${format(date, "dd/MM")} às ${apt.time} com ${apt.barber}...`
                          )
                        }
                      >
                        Falar no WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}