"use client";

import * as React from "react";
import { Camera, Check, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_USER } from "@/lib/mock-dashboard";
import { formatDateTime } from "@/lib/utils";

export function ProfileSection() {
  const [name, setName] = React.useState(MOCK_USER.name);
  const [phone, setPhone] = React.useState(MOCK_USER.phone);
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: PUT /user/profile in Fase 1f.
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2_500);
    }, 600);
  };

  return (
    <section
      id="profil"
      className="rounded-2xl border border-border bg-surface/70 p-6"
    >
      <header className="mb-6 flex flex-col gap-1">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Profil
        </h2>
        <p className="text-sm text-muted">
          Informasi akun yang ditampilkan publik & untuk komunikasi.
        </p>
      </header>

      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="relative">
            <Avatar initials={MOCK_USER.initials} size="lg" className="h-20 w-20 text-xl" />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-surface text-muted transition-colors hover:text-foreground"
              aria-label="Ubah foto profil"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <Badge variant="primary">Tier {MOCK_USER.tier}</Badge>
          <p className="text-center text-[11px] text-muted sm:text-left">
            Bergabung {formatDateTime(MOCK_USER.joinedAt)}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4">
          <Input
            label="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User />}
            required
          />
          <Input
            label="Email"
            value={MOCK_USER.email}
            leftIcon={<Mail />}
            disabled
            rightSlot={
              MOCK_USER.emailVerified ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                  <ShieldCheck className="h-3.5 w-3.5" /> Terverifikasi
                </span>
              ) : null
            }
            hint="Email tidak bisa diubah. Hubungi support jika perlu."
          />
          <Input
            label="Nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone />}
            placeholder="+62 8xx-xxxx-xxxx"
            type="tel"
          />
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            {saved ? (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                <Check className="h-4 w-4" /> Tersimpan
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
