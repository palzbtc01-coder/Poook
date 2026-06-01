"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [done, setDone] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!password) next.password = "Password baru wajib diisi";
    else if (password.length < 8) next.password = "Minimal 8 karakter";
    if (password !== confirm) next.confirm = "Konfirmasi tidak cocok";
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: integrate with /auth/reset-password API in Fase 1c
    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  };

  if (done) {
    return (
      <AuthCard
        title="Password Berhasil Direset"
        description="Kamu akan diarahkan ke halaman login..."
      >
        <div className="flex justify-center py-2">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success">
            <ShieldCheck className="h-8 w-8" />
          </span>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Atur Password Baru"
      description="Buat password baru yang kuat untuk akunmu."
      footer={
        <Link
          href="/login"
          className="font-medium text-secondary hover:underline"
        >
          ← Kembali ke Login
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <PasswordInput
          label="Password Baru"
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordInput
          label="Konfirmasi Password Baru"
          autoComplete="new-password"
          placeholder="Ulangi password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />
        <Button type="submit" variant="primary" size="lg">
          Reset Password
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthCard>
  );
}
