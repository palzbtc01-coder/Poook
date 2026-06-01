"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { OAuthButton } from "@/components/auth/oauth-button";
import { PasswordInput } from "@/components/auth/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email) next.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Format email tidak valid";
    if (!password) next.password = "Password wajib diisi";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: integrate with /auth/login API in Fase 1c
    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 600);
  };

  return (
    <AuthCard
      title="Selamat Datang Kembali"
      description="Masuk ke akun SuntikSocial-mu untuk mulai memesan."
      footer={
        <>
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-secondary hover:underline"
          >
            Daftar gratis
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="kamu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail />}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-background accent-primary"
            />
            Ingat saya
          </label>
          <Link
            href="/forgot-password"
            className="font-medium text-secondary hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Memproses..." : "Masuk"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </Button>

        <div className="relative my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">atau</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <OAuthButton onClick={() => router.push("/dashboard")} />
      </form>
    </AuthCard>
  );
}
