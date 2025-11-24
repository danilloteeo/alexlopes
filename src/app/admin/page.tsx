import { redirect } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = auth.currentUser;
  if (!user || user.email !== "seuemail@gmail.com") redirect("/auth"); // só você entra

  const snapshot = await getDocs(
    query(collection(db, "appointments"), orderBy("date", "desc"))
  );

  const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Painel Admin - Agendamentos</h1>
      <div className="grid gap-6">
        {appointments.map((apt: any) => (
          <div key={apt.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">{apt.name}</p>
                <p className="text-green-400">{apt.barber} • {apt.service}</p>
              </div>
              <div className="text-right">
                <p className="text-xl">{format(new Date(apt.date.seconds * 1000), "dd 'de' MMMM", { locale: ptBR })}</p>
                <p className="text-3xl font-bold text-green-400">{apt.time}</p>
              </div>
            </div>
            <p className="mt-4 text-zinc-400">WhatsApp: {apt.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}