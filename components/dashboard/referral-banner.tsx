"use client";

import * as React from "react";
import { Send, Sparkles } from "lucide-react";
import { SiWhatsapp, SiTelegram, SiX } from "react-icons/si";
import { CopyButton } from "./copy-button";
import { Badge } from "@/components/ui/badge";

interface Props {
  referralLink: string;
  commissionRate: number;
}

export function ReferralBanner({ referralLink, commissionRate }: Props) {
  const message = encodeURIComponent(
    `Coba SuntikSocial — panel SMM #1 di Indonesia. Suntik followers, likes, views real! Daftar pakai link saya: ${referralLink}`,
  );
  const shares = [
    {
      label: "WhatsApp",
      icon: SiWhatsapp,
      color: "#25D366",
      href: `https://wa.me/?text=${message}`,
    },
    {
      label: "Telegram",
      icon: SiTelegram,
      color: "#26A5E4",
      href: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${message}`,
    },
    {
      label: "X / Twitter",
      icon: SiX,
      color: "#FFFFFF",
      href: `https://twitter.com/intent/tweet?text=${message}`,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/25 via-surface to-background p-6 sm:p-8">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-secondary/20 blur-[100px]" />

      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <Badge variant="accent" className="mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Komisi seumur hidup
          </Badge>
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Ajak Teman, <span className="text-gradient">Cuan Tanpa Batas</span>
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted sm:text-base">
            Dapatkan komisi <strong className="text-accent">{commissionRate}%</strong>{" "}
            dari setiap order teman yang kamu ajak — selamanya, tanpa batas
            waktu.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-wider text-muted">
            Link Referral Kamu
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-surface/80 px-3 py-2 font-mono text-xs sm:text-sm">
              {referralLink}
            </code>
            <CopyButton value={referralLink} className="h-9 px-3" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {shares.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3 text-xs font-semibold transition-colors hover:border-primary/40"
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                  {s.label}
                </a>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted">
            <Send className="mr-1 inline h-3 w-3" />
            Atau copy & paste link di mana saja.
          </p>
        </div>
      </div>
    </div>
  );
}
