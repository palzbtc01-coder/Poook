import { Check, ArrowRight, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { RESELLER_PERKS } from "@/lib/content";

export function ResellerCta() {
  return (
    <section id="reseller" className="section">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-surface to-background p-8 sm:p-12">
          {/* Glow accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-secondary/20 blur-[100px]" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-5">
              <Badge variant="accent">
                <Store className="h-3.5 w-3.5" />
                Program Reseller
              </Badge>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Bangun Bisnis SMM-mu Sendiri,{" "}
                <span className="text-gradient">Mulai Hari Ini</span>
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-muted">
                Jadi reseller SuntikSocial dan dapatkan harga khusus, panel
                white-label, serta akses API penuh. Cocok untuk agensi dan
                pebisnis digital.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/register" variant="primary" size="lg">
                  Daftar Jadi Reseller
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#" variant="outline" size="lg">
                  Pelajari Selengkapnya
                </Button>
              </div>
            </div>

            <ul className="grid gap-3">
              {RESELLER_PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface/70 px-5 py-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground/90">
                    {perk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
