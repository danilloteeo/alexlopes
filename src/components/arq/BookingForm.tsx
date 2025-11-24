// src/components/BookingForm.tsx
"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Scissors, Clock, User, Phone } from "lucide-react";

const barbers = ["Alex Lopes", "Ramon Silva", "Gleyve Lopes", "Daniel Moreira", "Eduard Freitas"];
const services = ["Corte de Cabelo", "Barba Completa", "Corte + Barba", "Sobrancelha", "Pigmentação"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export default function BookingForm() {
  const [barber, setBarber] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const canShowCalendar = barber && service;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    setLoading(true);
    // Aqui você coloca seu Firebase ou webhook
    await new Promise(r => setTimeout(r, 1000)); // simula envio

    toast.success("Horário agendado com sucesso!", {
      description: `${name}, seu horário está confirmado para ${format(date, "dd 'de' MMMM", { locale: ptBR })} às ${time} com ${barber}.`,
    });

    // Reset
    setBarber(""); setService(""); setDate(undefined); setTime(""); setName(""); setPhone("");
    setLoading(false);
  };

  return (
    <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Barbeiro */}
        <div className="space-y-3">
          <Label className="text-lg text-white flex items-center gap-2">
            <Scissors className="w-5 h-5 text-green-400" />
            Escolha o barbeiro
          </Label>
          <Select value={barber} onValueChange={setBarber}>
            <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecione o profissional" />
            </SelectTrigger>
            <SelectContent>
              {barbers.map(b => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Serviço */}
        {barber && (
          <div className="space-y-3">
            <Label className="text-lg text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Escolha o serviço
            </Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="h-14 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Qual serviço deseja?" />
              </SelectTrigger>
              <SelectContent>
                {services.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Calendário + Horário */}
        {canShowCalendar && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label className="text-white mb-3 block">Selecione a data</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date() || d.getDay() === 0}
                locale={ptBR}
                className="rounded-xl border-white/20 bg-white/5"
              />
            </div>

            <div>
              <Label className="text-white mb-3 block">Horário disponível</Label>
              <div className="grid grid-cols-3 gap-3">
                {times.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`h-12 rounded-lg font-medium transition ${time === t
                        ? "bg-green-600 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dados pessoais */}
        {date && time && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                Nome completo
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Silva"
                required
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                WhatsApp
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98765-4321"
                required
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
        )}

        {/* Botão */}
        {date && time && name && phone && (
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Confirmando...
              </>
            ) : (
              "Confirmar Agendamento"
            )}
          </Button>
        )}
      </form>
    </Card>
  );
}