import "./globals.css";
import Header from "@/components/Header";
import WelcomeAuthModal from "@/components/WelcomeAuthModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Toaster } from "sonner";

export const metadata = {
  title: "Alex Lopes Barbearia • Vila Madalena, São Paulo",
  description: "A barbearia premium que todo homem merece. Corte perfeito, barba impecável.",
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
        <main>{children}</main>
        <WelcomeAuthModal />
        <FloatingWhatsApp />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}