// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // <- MUDANÇA AQUI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Lopes Barbearia",
  description: "Agendamento online - Barbearia premium em São Paulo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster /> {/* <- Agora é do Sonner */}
      </body>
    </html>
  );
}