"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Sparkles, X } from "lucide-react";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
              <Zap className="h-5 w-5 text-white" fill="white" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Suntik<span className="text-gradient">Social</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-background hover:text-foreground lg:hidden"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-6">
            {DASHBOARD_NAV.map((group) => (
              <li key={group.label}>
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/70">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.soon ? "/dashboard" : item.href}
                          onClick={(e) => {
                            if (item.soon) e.preventDefault();
                            onClose();
                          }}
                          aria-current={active ? "page" : undefined}
                          aria-disabled={item.soon || undefined}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                            active
                              ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_rgba(108,59,245,0.4)]"
                              : "text-muted hover:bg-background/60 hover:text-foreground",
                            item.soon && "cursor-not-allowed opacity-60",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0",
                              active && "text-secondary",
                            )}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.soon ? (
                            <span className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                              Soon
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reseller upgrade banner */}
        <div className="m-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-surface/0 p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Upgrade
          </div>
          <p className="text-sm font-semibold leading-snug">
            Buka panel reseller, dapatkan harga khusus & API.
          </p>
          <Link
            href="/#reseller"
            className="mt-3 inline-block text-xs font-semibold text-secondary hover:underline"
          >
            Pelajari lebih lanjut →
          </Link>
        </div>
      </aside>
    </>
  );
}
