"use client";

import * as React from "react";
import { Check, Mail, MessageCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DEFAULT_NOTIFICATION_PREFS,
  type NotificationChannel,
  type NotificationEventKey,
} from "@/lib/mock-dashboard";
import { cn } from "@/lib/utils";

const CHANNELS: { key: NotificationChannel; label: string; icon: typeof Mail }[] = [
  { key: "email", label: "Email", icon: Mail },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "push", label: "Push", icon: Bell },
];

export function NotificationsSection() {
  const [prefs, setPrefs] = React.useState(DEFAULT_NOTIFICATION_PREFS);
  const [saved, setSaved] = React.useState(false);

  const toggle = (
    eventKey: NotificationEventKey,
    channel: NotificationChannel,
  ) => {
    setPrefs((prev) =>
      prev.map((p) =>
        p.key === eventKey
          ? {
              ...p,
              channels: { ...p.channels, [channel]: !p.channels[channel] },
            }
          : p,
      ),
    );
    setSaved(true);
    // Auto-save after a short delay (visual cue only — wire to API in Fase 1f).
    setTimeout(() => setSaved(false), 2_000);
  };

  return (
    <section
      id="notifikasi"
      className="rounded-2xl border border-border bg-surface/70 p-6"
    >
      <header className="mb-6 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-lg font-bold tracking-tight">
            Pengaturan Notifikasi
          </h2>
          <p className="text-sm text-muted">
            Pilih channel mana yang aktif untuk setiap jenis notifikasi.
          </p>
        </div>
        {saved ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-success">
            <Check className="h-3.5 w-3.5" /> Tersimpan
          </span>
        ) : null}
      </header>

      {/* Desktop: matrix table */}
      <div className="hidden overflow-hidden rounded-xl border border-border lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background/40 text-left text-[11px] uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-semibold">Notifikasi</th>
              {CHANNELS.map(({ key, label, icon: Icon }) => (
                <th
                  key={key}
                  className="w-32 px-4 py-3 font-semibold text-center"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prefs.map((p, i) => (
              <tr
                key={p.key}
                className={cn(
                  "border-t border-border/50",
                  i % 2 === 1 && "bg-background/20",
                )}
              >
                <td className="px-4 py-3.5">
                  <p className="font-semibold">{p.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{p.description}</p>
                </td>
                {CHANNELS.map((c) => (
                  <td key={c.key} className="px-4 py-3.5">
                    <div className="flex justify-center">
                      <Switch
                        checked={p.channels[c.key]}
                        onCheckedChange={() => toggle(p.key, c.key)}
                        label={`${p.label} via ${c.label}`}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-3 lg:hidden">
        {prefs.map((p) => (
          <li
            key={p.key}
            className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-4"
          >
            <div>
              <p className="font-semibold">{p.label}</p>
              <p className="mt-0.5 text-xs text-muted">{p.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {CHANNELS.map(({ key, label, icon: Icon }) => (
                <label
                  key={key}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/40 px-3 py-2 text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-muted" /> {label}
                  <Switch
                    checked={p.channels[key]}
                    onCheckedChange={() => toggle(p.key, key)}
                    label={`${p.label} via ${label}`}
                  />
                </label>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
