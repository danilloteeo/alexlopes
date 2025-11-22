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
import { Loader2, Mail, Lock, User, Phone, Chrome } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
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
        toast.success("Bem-vindo de volta! ✂️");
        router.push("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Salva dados extras no Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name,
          email,
          phone,
          createdAt: new Date(),
        });

        toast.success("Conta criada com sucesso! Bem-vindo!");
        router.push("/");
      }
    } catch (error: any) {
      const msg = error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
        ? "Email ou senha incorretos"
        : error.code === "auth/email-already-in-use"
        ? "Este email já está cadastrado"
        : "Erro ao fazer login. Tente novamente.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login com Google realizado!");
      router.push("/");
    } catch (error) {
      toast.error("Erro com login do Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 bg-background/95">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Alex Lopes Barbearia</h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Faça login para agendar" : "Crie sua conta"}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-5">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input name="name" placeholder="Seu nome" required className="pl-10" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input name="phone" placeholder="(11) 98765-4321" required className="pl-10" />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input name="email" type="email" placeholder="seu@email.com" required className="pl-10" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input name="password" type="password" placeholder="Sua senha" required minLength={6} className="pl-10" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : isLogin ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </Button>
        </div>

        <p className="text-center text-sm">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-primary hover:underline"
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </Card>
    </div>
  );
}