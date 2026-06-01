"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "kamu@email.com";

  const [digits, setDigits] = React.useState<string[]>(
    Array(OTP_LENGTH).fill(""),
  );
  const [error, setError] = React.useState<string>();
  const [submitting, setSubmitting] = React.useState(false);
  const [resentAt, setResentAt] = React.useState<number | null>(null);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(0, 1);
    setDigit(index, value);
    if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < Math.min(text.length, OTP_LENGTH); i++) next[i] = text[i];
    setDigits(next);
    const lastIndex = Math.min(text.length, OTP_LENGTH) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }
    setError(undefined);
    setSubmitting(true);
    // TODO: integrate with /auth/verify-email API in Fase 1c
    setTimeout(() => router.push("/dashboard"), 600);
  };

  return (
    <AuthCard
      title="Verifikasi Email Kamu"
      description={
        <>
          Kami sudah mengirim kode 6 digit ke{" "}
          <span className="font-semibold text-foreground">{email}</span>.
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
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              inputMode="numeric"
              pattern="\d"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={cn(
                "h-14 w-11 rounded-xl border bg-background/40 text-center font-mono text-xl font-bold text-foreground outline-none transition-colors sm:h-16 sm:w-12 sm:text-2xl",
                "focus:border-primary focus:ring-2 focus:ring-primary/30",
                error ? "border-danger/60" : "border-border",
              )}
              aria-label={`Digit ke-${i + 1}`}
            />
          ))}
        </div>

        {error ? (
          <p className="-mt-2 text-center text-xs text-danger">{error}</p>
        ) : null}

        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Memverifikasi..." : "Verifikasi"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </Button>

        <div className="text-center text-sm text-muted">
          Tidak menerima kode?{" "}
          <button
            type="button"
            onClick={() => setResentAt(Date.now())}
            className="inline-flex items-center gap-1 font-semibold text-secondary hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            Kirim ulang
          </button>
          {resentAt ? (
            <span className="ml-2 text-xs text-success">
              Kode baru dikirim ✓
            </span>
          ) : null}
        </div>
      </form>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="text-sm text-muted">Memuat...</div>
      }
    >
      <VerifyEmailForm />
    </React.Suspense>
  );
}
