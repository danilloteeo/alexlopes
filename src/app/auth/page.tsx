"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, Lock, User, Phone, Chrome, Scissors } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Bem-vindo de volta! ✂️", {
          description: "Você já pode agendar seu horário.",
        });
        router.push("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });

        await setDoc(doc(db, "users", userCredential.user.uid), {
          name,
          email,
          phone,
          createdAt: new Date(),
        });

        toast.success("Conta criada com sucesso!", {
          description: "Agora você pode agendar seus horários e ver seu histórico.",
        });
        router.push("/");
      }
    } catch (error: any) {
      const msg =
        error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
          ? "Email ou senha incorretos"
          : error.code === "auth/email-already-in-use"
          ? "Este email já está sendo usado"
          : error.code === "auth/weak-password"
          ? "A senha deve ter pelo menos 6 caracteres"
          : "Erro ao processar. Tente novamente.";

      toast.error("Oops!", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login com Google realizado!", {
        description: "Você está conectado e pronto para agendar.",
      });
      router.push("/");
    } catch {
      toast.error("Erro com Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Efeito de fundo */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-zinc-800 shadow-2xl relative z-10">
        <div className="p-8">
          {/* Logo + Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
              <Scissors className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Alex Lopes <span className="text-green-500">Barbearia</span>
            </h1>
            <p className="text-zinc-400 mt-2 text-sm">
              {isLogin ? "Acesse sua conta" : "Crie sua conta gratuita"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                  <Input
                    name="name"
                    placeholder="Seu nome completo"
                    required
                    className="pl-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 transition"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                  <Input
                    name="phone"
                    placeholder="(11) 98765-4321"
                    required
                    className="pl-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 transition"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
              <Input
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="pl-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
              <Input
                name="password"
                type="password"
                placeholder="Sua senha (mín. 6 caracteres)"
                required
                minLength={6}
                className="pl-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-green-500 transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : isLogin ? (
                "Entrar na conta"
              ) : (
                "Criar minha conta"
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/40 px-3 text-zinc-500">Ou continue com</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 border-zinc-700 hover:bg-zinc-900/50 text-white"
            onClick={handleGoogle}
            disabled={loading}
          >
            <Chrome className="mr-3 h-5 w-5" />
            Entrar com Google
          </Button>

          {/* Alternar */}
          <p className="text-center mt-8 text-sm text-zinc-400">
            {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-500 font-semibold hover:underline transition"
            >
              {isLogin ? "Crie uma agora →" : "← Faça login aqui"}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}