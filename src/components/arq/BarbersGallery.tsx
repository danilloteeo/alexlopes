// src/components/BarbersGallery.tsx
import { Scissors } from "lucide-react";

const barbers = [
  { name: "Alex Lopes", specialty: "Corte Clássico + Degradê" },
  { name: "Ramon Silva", specialty: "Degradê & Barba" },
  { name: "Gleyverson Lopes", specialty: "Barba Completa" },
  { name: "Daniel Moreira", specialty: "Corte Moderno" },
  { name: "Eduardo Freitas", specialty: "Sombrancelha & Pigmentação" },
];

export default function BarbersGallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-6">
      {barbers.map((barber) => (
        <div
          key={barber.name}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {barber.name.split(" ").map(n => n[0]).join("")}
          </div>
          <h4 className="text-xl font-bold text-white">{barber.name}</h4>
          <p className="text-sm text-green-400 mt-1 flex items-center justify-center gap-2">
            <Scissors className="w-4 h-4" />
            {barber.specialty}
          </p>
          <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}