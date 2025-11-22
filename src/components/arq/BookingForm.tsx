"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Firebase
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  phone: z
    .string()
    .min(14, "Telefone incompleto")
    .refine((val) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val), {
      message: "Telefone inválido",
    }),
  barber: z.string().min(1, "Escolha um barbeiro"),
  service: z.string().min(1, "Escolha um serviço"),
  date: z.instanceof(Date, { message: "Escolha uma data válida" }).refine(
    (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
    { message: "Não é possível agendar no passado" }
  ),
  time: z.string().min(1, "Escolha um horário"),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  { value: "corte", label: "Corte de Cabelo - R$ 70" },
  { value: "barba", label: "Barba Completa - R$ 50" },
  { value: "combo", label: "Corte + Barba - R$ 110" },
  { value: "sobrancelha", label: "Sobrancelha - R$ 25" },
  { value: "pigmentacao", label: "Pigmentação - R$ 120" },
];

const barbers = [
  "Alex Lopes",
  "João Silva",
  "Carlos Mendes",
  "Rafael Costa",
  "Lucas Oliveira",
];

const availableTimes = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

export default function BookingForm() {
  const [user, loadingAuth] = useAuthState(auth);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Máscara de telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      if (user) {
        await setDoc(doc(db, "appointments", `${user.uid}_${Date.now()}`), {
          ...data,
          userId: user.uid,
          userName: user.displayName || user.email,
          userEmail: user.email,
          createdAt: serverTimestamp(),
          status: "confirmado",
        });
      }

      toast.success("Agendamento confirmado!", {
        description: `${data.name}, seu horário com ${data.barber} foi marcado para ${format(data.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às ${data.time}. Entraremos em contato via WhatsApp!`,
        duration: 10000,
        action: {
          label: "Abrir WhatsApp",
          onClick: () => window.open(`https://wa.me/5511987654321?text=Olá! Fiz meu agendamento para ${format(data.date, "dd/MM")} às ${data.time} com ${data.barber}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user && !loadingAuth) {
      setValue("name", user.displayName || "");
    }
  }, [user, loadingAuth, setValue]);

  return (
    <Card className="p-8 bg-background/95 shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nome completo</label>
            <input
              {...register("name")}
              className="w-full px-4 py-3 rounded-lg border bg-background"
              placeholder="João Silva"
              defaultValue={user?.displayName || ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Telefone com máscara */}
          <div>
            <label className="block text-sm font-medium mb-2">Telefone (WhatsApp)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                setPhone(formatted);
                setValue("phone", formatted);
              }}
              placeholder="(11) 98765-4321"
              maxLength={15}
              className="w-full px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Barbeiro e Serviço */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Barbeiro</label>
            <Select onValueChange={(v) => setValue("barber", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o barbeiro" />
              </SelectTrigger>
              <SelectContent>
                {barbers.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.barber && <p className="text-red-500 text-sm mt-1">{errors.barber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Serviço</label>
            <Select onValueChange={(v) => setValue("service", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
          </div>
        </div>

        {/* Data e Horário */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <label className="block text-sm font-medium mb-2">Data</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                if (d) setValue("date", d);
              }}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              locale={ptBR}
              className="rounded-md border"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Horário</label>
            <Select onValueChange={(v) => setValue("time", v)} disabled={!date}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full text-lg py-7 font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar Agendamento"
          )}
        </Button>
      </form>
    </Card>
  );
}