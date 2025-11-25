"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, Menu, X, Calendar, User, LogOut, Crown } from "lucide-react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition">
            <Scissors className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white leading-none">ALEX LOPES</h1>
            <p className="text-green-400 text-xs font-bold tracking-wider">BARBEARIA</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#galeria" className="text-white/80 hover:text-white transition text-lg font-medium">
            Galeria
          </Link>
          <Link href="/planos" className="text-white/80 hover:text-white transition text-lg font-medium">
            Planos
          </Link>

          {/* USUÁRIO LOGADO → DROPDOWN COM PERFIL */}
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 hover:bg-white/10 transition">
                  <Avatar className="w-10 h-10 ring-2 ring-green-500/50">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-green-600 text-white font-bold">
                      {user.displayName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-white font-semibold">{user.displayName?.split(" ")[0] || "Cliente"}</p>
                    <p className="text-xs text-green-400">Área VIP</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border-white/10 text-white">
                <DropdownMenuLabel className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Cliente VIP
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link href="/meus-agendamentos" className="flex items-center gap-3 cursor-pointer">
                    <Calendar className="w-5 h-5" />
                    Meus Agendamentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center gap-3 cursor-pointer">
                    <User className="w-5 h-5" />
                    Meu Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-300 cursor-pointer">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* NÃO LOGADO */
            <Link href="/agendamento" className="text-white/80 hover:text-white text-lg font-medium">
              Agendar
            </Link>
          )}

          {/* Botão Agendar */}
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-500 shadow-xl text-lg px-8">
            <Link href="/agendamento">
              Agendar Horário
            </Link>
          </Button>
        </nav>

        {/* Mobile */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
          <nav className="flex flex-col py-6 px-6 space-y-5">
            <Link href="/#galeria" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white text-xl">
              Galeria
            </Link>
            <Link href="/planos" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white text-xl">
              Planos
            </Link>

            {user ? (
              <>
                <div className="flex items-center gap-4 py-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-green-600">{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-bold">{user.displayName}</p>
                    <p className="text-green-400 text-sm">Cliente VIP</p>
                  </div>
                </div>
                <Link href="/meus-agendamentos" onClick={() => setMobileMenuOpen(false)} className="text-xl text-white">
                  Meus Agendamentos
                </Link>
                <Link href="/perfil" onClick={() => setMobileMenuOpen(false)} className="text-xl text-white">
                  Meu Perfil
                </Link>
                <Button variant="outline" onClick={handleLogout} className="w-full mt-4">
                  Sair
                </Button>
              </>
            ) : (
              <Link href="/agendamento" onClick={() => setMobileMenuOpen(false)} className="text-xl text-white">
                Agendar
              </Link>
            )}

            <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-500 text-xl py-7 mt-6">
              <Link href="/agendamento" onClick={() => setMobileMenuOpen(false)}>
                Agendar Horário
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}