"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Bell, Wallet, ChevronDown, LogOut, User as UserIcon, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_USER } from "@/lib/mock-dashboard";
import { formatIDR } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground lg:hidden"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="hidden text-sm font-medium text-muted sm:block">
          Halo,{" "}
          <span className="font-semibold text-foreground">
            {MOCK_USER.name.split(" ")[0]}
          </span>{" "}
          👋
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Balance pill */}
        <Link
          href="/dashboard"
          className="hidden items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40 sm:inline-flex"
        >
          <Wallet className="h-4 w-4 text-secondary" />
          <span className="text-gradient">{formatIDR(MOCK_USER.balance)}</span>
        </Link>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-xl border border-border bg-surface/60 p-2.5 text-muted transition-colors hover:border-primary/40 hover:text-foreground"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-background" />
        </button>

        {/* User menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-1.5 py-1.5 transition-colors hover:border-primary/40"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <Avatar initials={MOCK_USER.initials} size="sm" />
            <span className="hidden text-sm font-semibold sm:block">
              {MOCK_USER.name.split(" ")[0]}
            </span>
            <ChevronDown
              className={cn(
                "mr-1 h-4 w-4 text-muted transition-transform",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          <div
            className={cn(
              "absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-card backdrop-blur-xl transition-all",
              menuOpen
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
            role="menu"
          >
            <div className="border-b border-border px-3 py-2.5">
              <p className="text-sm font-semibold">{MOCK_USER.name}</p>
              <p className="truncate text-xs text-muted">{MOCK_USER.email}</p>
            </div>
            <div className="mt-1 flex flex-col">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <UserIcon className="h-4 w-4" /> Profil
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <Settings className="h-4 w-4" /> Pengaturan
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10"
              >
                <LogOut className="h-4 w-4" /> Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
