"use client";

import * as React from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2" aria-label={SITE.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Suntik<span className="text-gradient">Social</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button href="#" variant="ghost" size="sm">
            Masuk
          </Button>
          <Button href="#" variant="primary" size="sm">
            Daftar Gratis
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button href="#" variant="outline" size="md">
              Masuk
            </Button>
            <Button href="#" variant="primary" size="md">
              Daftar Gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
