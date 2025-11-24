// src/app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/arq/Header";
import WelcomeAuthModal from "@/components/arq/WelcomeAuthModal";
import FloatingWhatsApp from "@/components/arq/FloatingWhatsApp";

export const metadata = {
  title: "Alex Lopes Barbearia • Corte e Barba Premium em SP",
  description: "Agende seu horário online com os melhores barbeiros da Vila Madalena.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white min-h-screen">
        <Header />
        
        {/* Modal de login automático (só aparece se não estiver logado) */}
        <WelcomeAuthModal />
        
        <main className="pt-20">{children}</main>
        
        <FloatingWhatsApp />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}