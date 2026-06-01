import { Sparkles, ArrowRight, TrendingUp, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/ui/counter";
import { HERO_STATS } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-secondary/15 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start gap-6 animate-fade-up">
          <Badge variant="primary">
            <Sparkles className="h-3.5 w-3.5" />
            Panel SMM #1 di Indonesia
          </Badge>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Suntik Followers Real,{" "}
            <span className="text-gradient">Harga Gila-gilaan</span> — Langsung
            Proses!
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tingkatkan followers, likes, dan views untuk Instagram, TikTok,
            YouTube, dan 10+ platform lainnya. Proses otomatis 24/7 dengan
            garansi refill — mulai dari Rp 50 saja.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#" variant="primary" size="lg">
              Mulai Sekarang — Gratis Daftar
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#harga" variant="outline" size="lg">
              Lihat Harga
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-success" /> Tanpa password
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" /> Garansi refill
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-success" /> Proses instan
            </span>
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
          <div className="relative animate-float rounded-3xl border border-border bg-surface/80 p-5 shadow-card backdrop-blur-xl">
            {/* Mock header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-danger/80" />
                <span className="h-3 w-3 rounded-full bg-warning/80" />
                <span className="h-3 w-3 rounded-full bg-success/80" />
              </div>
              <Badge variant="success">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success" />
                Live
              </Badge>
            </div>

            {/* Balance card */}
            <div className="mb-4 rounded-2xl bg-gradient-brand p-5 text-white shadow-glow">
              <p className="text-xs font-medium opacity-80">Saldo Aktif</p>
              <p className="font-display text-3xl font-bold">Rp 1.250.000</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs opacity-90">
                <TrendingUp className="h-3.5 w-3.5" /> +18% bulan ini
              </p>
            </div>

            {/* Mini chart */}
            <div className="mb-4 rounded-2xl border border-border bg-background/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-muted">Order 7 hari</p>
                <span className="text-xs font-semibold text-secondary">+342</span>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {[45, 62, 38, 78, 55, 88, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-secondary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Order rows */}
            <div className="space-y-2">
              {[
                { name: "Instagram Followers", status: "Selesai", color: "success" },
                { name: "TikTok Views", status: "Proses", color: "secondary" },
              ].map((o) => (
                <div
                  key={o.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-3 py-2.5"
                >
                  <span className="text-sm font-medium">{o.name}</span>
                  <span
                    className={
                      o.color === "success"
                        ? "text-xs font-semibold text-success"
                        : "text-xs font-semibold text-secondary"
                    }
                  >
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social proof stats */}
      <div className="relative mx-auto mt-16 w-full max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:gap-6 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gradient sm:text-4xl">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
