"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function BookingCalendar({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }: BookingCalendarProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Escolha a data</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date() || date.getDay() === 0}
          locale={ptBR}
          className="rounded-xl border border-white/20 bg-white/5"
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Horários disponíveis</h3>
        <div className="grid grid-cols-3 gap-4">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`h-14 rounded-xl font-semibold transition-all ${
                selectedTime === time
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/50"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}