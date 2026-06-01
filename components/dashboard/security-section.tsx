"use client";

import * as React from "react";
import {
  Check,
  Laptop,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PasswordInput } from "@/components/auth/password-input";
import { Switch } from "@/components/ui/switch";
import { MOCK_LOGIN_SESSIONS, MOCK_USER } from "@/lib/mock-dashboard";
import { formatRelative, cn } from "@/lib/utils";

export function SecuritySection() {
  return (
    <section
      id="keamanan"
      className="rounded-2xl border border-border bg-surface/70 p-6"
    >
      <header className="mb-6 flex flex-col gap-1">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Keamanan
        </h2>
        <p className="text-sm text-muted">
          Lindungi akun kamu dengan password kuat dan otentikasi dua faktor.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <PasswordForm />
        <div className="border-t border-border pt-6">
          <TwoFactorCard />
        </div>
        <div className="border-t border-border pt-6">
          <LoginHistory />
        </div>
      </div>
    </section>
  );
}

function PasswordForm() {
  const [current, setCurrent] = React.useState("");
  const [next, setNext] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState<{
    current?: string;
    next?: string;
    confirm?: string;
  }>({});
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!current) errs.current = "Wajib diisi";
    if (!next) errs.next = "Wajib diisi";
    else if (next.length < 8) errs.next = "Minimal 8 karakter";
    if (next !== confirm) errs.confirm = "Konfirmasi tidak cocok";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    // TODO: PUT /user/password in Fase 1f.
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setCurrent("");
      setNext("");
      setConfirm("");
      setTimeout(() => setSaved(false), 2_500);
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
          Ganti Password
        </h3>
      </div>
      <PasswordInput
        label="Password Saat Ini"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        error={errors.current}
        autoComplete="current-password"
      />
      <div /> {/* Spacer for grid alignment */}
      <PasswordInput
        label="Password Baru"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        error={errors.next}
        autoComplete="new-password"
        hint={errors.next ? undefined : "Minimal 8 karakter, gabungan huruf & angka."}
      />
      <PasswordInput
        label="Konfirmasi Password Baru"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
        autoComplete="new-password"
      />
      <div className="flex items-center gap-3 lg:col-span-2">
        <Button type="submit" variant="primary" size="md" disabled={saving}>
          {saving ? "Menyimpan..." : "Update Password"}
        </Button>
        {saved ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
            <Check className="h-4 w-4" /> Password berhasil diubah
          </span>
        ) : null}
      </div>
    </form>
  );
}

function TwoFactorCard() {
  const [enabled, setEnabled] = React.useState(MOCK_USER.twoFactorEnabled);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
        Otentikasi Dua Faktor (2FA)
      </h3>
      <div
        className={cn(
          "flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between",
          enabled
            ? "border-success/30 bg-success/5"
            : "border-warning/30 bg-warning/5",
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              enabled
                ? "bg-success/15 text-success"
                : "bg-warning/15 text-warning",
            )}
          >
            {enabled ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <ShieldOff className="h-5 w-5" />
            )}
          </span>
          <div>
            <p className="font-semibold">
              {enabled ? "2FA Aktif" : "2FA Belum Aktif"}
              {enabled ? (
                <Badge variant="success" className="ml-2">
                  Aktif
                </Badge>
              ) : null}
            </p>
            <p className="mt-1 max-w-md text-sm text-muted">
              {enabled
                ? "Akun kamu dilindungi otentikasi dua faktor lewat aplikasi authenticator."
                : "Tambahkan lapisan keamanan ekstra dengan aplikasi authenticator (Google Authenticator, Authy, dll.)"}
            </p>
          </div>
        </div>
        <Button
          variant={enabled ? "outline" : "primary"}
          size="md"
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? "Nonaktifkan 2FA" : "Aktifkan 2FA"}
        </Button>
      </div>
    </div>
  );
}

const DEVICE_ICON: Record<string, typeof Laptop> = {
  Mac: Laptop,
  Windows: Laptop,
  Linux: Laptop,
  iPhone: Smartphone,
  Samsung: Smartphone,
  iPad: Tablet,
};

function deviceIcon(device: string) {
  for (const [key, Icon] of Object.entries(DEVICE_ICON)) {
    if (device.includes(key)) return Icon;
  }
  return Laptop;
}

function LoginHistory() {
  const [sessions, setSessions] = React.useState(MOCK_LOGIN_SESSIONS);

  const revoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
          Sesi Login Aktif
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSessions(sessions.filter((s) => s.current))}
          disabled={sessions.length <= 1}
        >
          Logout dari semua perangkat lain
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {sessions.map((session) => {
          const Icon = deviceIcon(session.device);
          return (
            <li
              key={session.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-secondary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">
                    {session.device}{" "}
                    <span className="text-sm font-normal text-muted">
                      · {session.browser}
                    </span>
                    {session.current ? (
                      <Badge variant="success" className="ml-2">
                        Sesi ini
                      </Badge>
                    ) : null}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {session.location} · IP {session.ip} ·{" "}
                    {formatRelative(session.lastActiveAt)}
                  </p>
                </div>
              </div>
              {!session.current ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => revoke(session.id)}
                  className="border-danger/30 text-danger hover:border-danger hover:bg-danger/10"
                >
                  Logout
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
