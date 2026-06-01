"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowRight, MailCheck } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email wajib diisi");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Format email tidak valid");
      return;
    }
    setError(undefined);
    // TODO: integrate with /auth/forgot-password API in Fase 1c
    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard
        title="Cek Inbox-mu"
        description={
          <>
            Kami sudah mengirim link reset password ke{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Tautan berlaku selama 1 jam.
          </>
        }
        footer={
          <Link
            href="/login"
            className="font-medium text-secondary hover:underline"
          >
            ← Kembali ke Login
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success">
            <MailCheck className="h-8 w-8" />
          </span>
          <p className="text-center text-sm text-muted">
            Tidak menerima email? Cek folder spam atau{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-semibold text-secondary hover:underline"
            >
              kirim ulang
            </button>
            .
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Lupa Password?"
      description="Masukkan email kamu, kami akan kirimkan link untuk mengatur ulang password."
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
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="kamu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail />}
          error={error}
        />
        <Button type="submit" variant="primary" size="lg">
          Kirim Link Reset
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthCard>
  );
}
