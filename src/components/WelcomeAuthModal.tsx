"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Chrome, Sparkles } from "lucide-react";
import { toast } from "sonner";

const googleProvider = new GoogleAuthProvider();

export default function WelcomeAuthModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Já está logado → não mostra nada
        setOpen(false);
        setLoading(false);
      } else {
        // Não está logado → mostra o modal em 1 segundo
        const timer = setTimeout(() => {
          setOpen(true);
          setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Bem-vindo de volta! ✨", {
        description: "Login realizado com sucesso.",
      });
      setOpen(false);
    } catch (error: any) {
      toast.error("Erro no login", {
        description: error.message.includes("popup") ? "Popup bloqueado. Tente no celular ou permita popups." : "Tente novamente.",
      });
    }
  };

  const handleAnonymous = async () => {
    try {
      await signInAnonymously(auth);
      toast.success("Você entrou como convidado!", {
        description: "Pode agendar, mas faça login pra salvar seu histórico.",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao entrar como convidado");
    }
  };

  // Não renderiza nada enquanto carrega ou se já estiver logado
  if (loading || !open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md px-6">
      <Card className="relative w-full max-w-md bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-green-500/30 shadow-2xl overflow-hidden">
        {/* Botão fechar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl animate-pulse">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-black text-white mb-4">
              Bem-vindo à <span className="text-green-400">Alex Lopes</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Faça login rápido para agendar e salvar seu histórico
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogle}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-white hover:bg-zinc-200 text-black shadow-xl"
            >
              <Chrome className="w-6 h-6 mr-3" />
              Continuar com Google
            </Button>

            <Button
              onClick={handleAnonymous}
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg border-white/30 hover:bg-white/10"
            >
              Entrar como convidado
            </Button>
          </div>

          <p className="text-xs text-zinc-500">
            Ao continuar, você aceita nossos Termos e Política de Privacidade
          </p>
        </div>
      </Card>
    </div>
  );
}