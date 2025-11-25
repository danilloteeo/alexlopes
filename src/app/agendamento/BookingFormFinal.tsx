"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BookingFormFinalProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export default function BookingFormFinal({ name, setName, phone, setPhone, loading, onSubmit }: BookingFormFinalProps) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-white text-lg">Nome completo</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="João Silva"
            required
            className="mt-2 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label className="text-white text-lg">WhatsApp</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 98765-4321"
            required
            className="mt-2 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={loading || !name || !phone}
        className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
      >
        {loading ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Confirmando seu horário...
          </>
        ) : (
          "Confirmar Agendamento"
        )}
      </Button>
    </div>
  );
}