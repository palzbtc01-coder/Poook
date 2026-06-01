"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, Gift, ArrowRight } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { OAuthButton } from "@/components/auth/oauth-button";
import { PasswordInput } from "@/components/auth/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agree?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [referral, setReferral] = React.useState("");
  const [showReferral, setShowReferral] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Nama wajib diisi";
    if (!email) next.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Format email tidak valid";
    if (!password) next.password = "Password wajib diisi";
    else if (password.length < 8) next.password = "Minimal 8 karakter";
    if (!agree) next.agree = "Kamu harus menyetujui syarat & ketentuan";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: integrate with /auth/register API in Fase 1c
    setSubmitting(true);
    setTimeout(
      () => router.push(`/verify-email?email=${encodeURIComponent(email)}`),
      600,
    );
  };

  return (
    <AuthCard
      title="Daftar Akun Gratis"
      description="Mulai dalam hitungan detik. Tanpa kartu kredit."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-secondary hover:underline"
          >
            Masuk di sini
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Nama Lengkap"
          autoComplete="name"
          placeholder="Budi Santoso"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User />}
          error={errors.name}
        />
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
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint={errors.password ? undefined : "Gunakan kombinasi huruf & angka."}
        />

        {showReferral ? (
          <Input
            label="Kode Referral (opsional)"
            placeholder="REF123"
            value={referral}
            onChange={(e) => setReferral(e.target.value.toUpperCase())}
            leftIcon={<Gift />}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowReferral(true)}
            className="self-start text-sm font-medium text-secondary hover:underline"
          >
            + Punya kode referral?
          </button>
        )}

        <label className="flex cursor-pointer items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-background accent-primary"
          />
          <span>
            Saya setuju dengan{" "}
            <Link href="#" className="text-secondary hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="#" className="text-secondary hover:underline">
              Kebijakan Privasi
            </Link>
            .
          </span>
        </label>
        {errors.agree ? (
          <p className="-mt-2 text-xs text-danger">{errors.agree}</p>
        ) : null}

        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Memproses..." : "Daftar Sekarang"}
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
