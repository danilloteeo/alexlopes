"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5511987654321?text=Oi%20Alex!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        <div className="relative bg-green-600 hover:bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
          <MessageCircle className="w-9 h-9" />
        </div>
        <span className="absolute -top-10 right-0 bg-black/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
          Fale conosco!
        </span>
      </div>
    </a>
  );
}