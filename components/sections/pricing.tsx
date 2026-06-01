"use client";

import * as React from "react";
import { ArrowRight, Gauge, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICES, PRICING_TABS } from "@/lib/content";
import { formatIDR, cn } from "@/lib/utils";

const badgeVariant = {
  Terlaris: "primary",
  Tercepat: "secondary",
  Termurah: "accent",
} as const;

export function Pricing() {
  const [active, setActive] = React.useState<string>(PRICING_TABS[0]);

  const visible = SERVICES.filter((s) => s.platform === active);

  return (
    <section id="harga" className="section relative">
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Harga"
          title={
            <>
              Layanan Populer,{" "}
              <span className="text-gradient">Harga Bersahabat</span>
            </>
          }
          description="Harga transparan per 1.000. Pilih platform untuk melihat layanan terlaris kami."
        />

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-surface/50 p-1.5">
          {PRICING_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                active === tab
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "text-muted hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <div
              key={service.name}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-base font-bold leading-snug tracking-tight">
                  {service.name}
                </h3>
                {service.badge ? (
                  <Badge variant={badgeVariant[service.badge]}>
                    {service.badge}
                  </Badge>
                ) : null}
              </div>

              <div className="flex items-end gap-1">
                <span className="font-display text-3xl font-bold text-gradient">
                  {formatIDR(service.pricePer1000)}
                </span>
                <span className="mb-1 text-xs text-muted">/ 1.000</span>
              </div>

              <div className="flex flex-col gap-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-secondary" />
                  Kecepatan: {service.speed}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Kualitas: {service.quality}
                </span>
              </div>

              <Button href="#" variant="outline" size="sm" className="mt-2 w-full">
                Pesan Sekarang
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="#" variant="primary" size="lg">
            Lihat Semua 500+ Layanan
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
