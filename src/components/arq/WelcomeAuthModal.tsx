"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithRedirect, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Chrome, Scissors, Sparkles, X, Smartphone } from "lucide-react";

export default function WelcomeAuthModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Detecta se é mobile (popup falha mais em mobile)
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);

      if (currentUser) {
        setOpen(false);
        router.push("/"); // Redireciona pra home se já logado
      } else {
        const timer = setTimeout(() => setOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogle = async () => {
    try {
      if (isMobile) {
        // Fallback pra redirect em mobile (evita bloqueio de popup)
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Popup no desktop
        await signInWithPopup(auth, googleProvider);
      }

      toast.success("Bem-vindo à Alex Lopes Barbearia! ✨", {
        description: "Login realizado com sucesso. Você já pode agendar.",
        duration: 5000,
      });
      setOpen(false);
    } catch (error: any) {
      console.error("Erro no Google Login:", error);

      // Tratamento de erros comuns
      let errorMsg = "Erro ao fazer login. Tente novamente.";
      if (error.code === "auth/popup-blocked") {
        errorMsg = "Popup bloqueado pelo navegador. Tente no desktop ou use o botão de convidado.";
      } else if (error.code === "auth/popup-closed-by-user") {
        errorMsg = "Login cancelado. Tente novamente.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        errorMsg = "Esta conta já existe com outro método. Use o email/senha ou contate suporte.";
      } else if (error.code === "auth/network-request-failed") {
        errorMsg = "Problema de conexão. Verifique sua internet.";
      }

      toast.error("Falha no login com Google", {
        description: errorMsg,
        duration: 6000,
      });
    }
  };

  const handleAnonymous = async () => {
    try {
      await signInAnonymously(auth);
      toast.success("Você entrou como convidado! 👋", {
        description: "Pode agendar agora. Faça login depois para salvar histórico.",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao entrar como convidado");
    }
  };

  // Não mostra nada enquanto carrega ou se já estiver logado
  if (loadingAuth || user) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md px-6">
      <Card className="relative w-full max-w-md bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-green-500/30 shadow-2xl overflow-hidden">
        {/* Botão fechar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 text-center space-y-8 relative z-0">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl animate-pulse">
              <Scissors className="w-14 h-14 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-black text-white mb-3">
              Bem-vindo à <span className="text-green-400">Alex Lopes</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              {isMobile ? "Faça login rápido para agendar" : "Entre com Google em 1 clique"}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogle}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-white hover:bg-zinc-200 text-black shadow-xl"
            >
              <Chrome className="w-6 h-6 mr-3" />
              {isMobile ? "Login com Google" : "Continuar com Google"}
            </Button>

            <Button
              onClick={handleAnonymous}
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg border-white/30 hover:bg-white/10"
            >
              <Smartphone className="w-6 h-6 mr-3" />
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