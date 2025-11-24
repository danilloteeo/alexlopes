"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scissors, Phone, Calendar, Image, LogIn, X } from "lucide-react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export default function Header() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logout realizado!");
    setOpen(false);
  };

  const menuItems = [
    { label: "Serviços", href: "#servicos", icon: Scissors },
    { label: "Galeria", href: "#galeria", icon: Image },
    { label: "Agendar", href: "#agendamento", icon: Calendar },
    { label: "Contato", href: "#contato", icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <Scissors className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">ALEX LOPES</h1>
            <p className="text-xs text-green-400 -mt-1">Barbearia</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/80 hover:text-green-400 font-medium transition flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}

          {/* Login / Perfil */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/meus-agendamentos" className="text-green-400 font-semibold">
                Olá, {user.displayName?.split(" ")[0] || "Cliente"}!
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-red-400">
                Sair
              </Button>
            </div>
          ) : (
            <Button asChild className="bg-green-600 hover:bg-green-500">
              <Link href="/auth" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-white/10 w-80">
            <div className="flex flex-col gap-8 mt-10">
              <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Alex Lopes</h2>
                  <p className="text-green-400 text-sm">Barbearia Premium</p>
                </div>
              </Link>

              <nav className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-xl text-white/80 hover:text-green-400 font-medium flex items-center gap-3 transition"
                  >
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      href="/meus-agendamentos"
                      onClick={() => setOpen(false)}
                      className="text-xl text-green-400 font-semibold flex items-center gap-3"
                    >
                      Meus Agendamentos
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="w-full justify-start text-red-400">
                      Sair da conta
                    </Button>
                  </>
                ) : (
                  <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-500">
                    <Link href="/auth" onClick={() => setOpen(false)}>
                      <LogIn className="mr-2" /> Fazer Login
                    </Link>
                  </Button>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}