import {
  Zap,
  ShieldCheck,
  Wallet,
  LineChart,
  Lock,
  Handshake,
  CreditCard,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FEATURES } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Wallet,
  LineChart,
  Lock,
  Handshake,
  CreditCard,
  Headset,
};

export function Features() {
  return (
    <section id="keunggulan" className="section relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keunggulan"
          title={
            <>
              Kenapa Pilih{" "}
              <span className="text-gradient">SuntikSocial?</span>
            </>
          }
          description="Semua yang kamu butuhkan untuk tumbuh di sosial media — cepat, aman, dan terjangkau."
        />

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Zap;
            return (
              <Reveal
                key={feature.title}
                delay={(index % 4) * 80}
                className={cn(
                  "group flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                  feature.highlight
                    ? "border-primary/40 bg-gradient-to-br from-primary/15 to-surface/60 shadow-glow"
                    : "border-border bg-surface/60 hover:border-primary/40 hover:shadow-glow",
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    feature.highlight
                      ? "bg-gradient-brand text-white shadow-glow"
                      : "bg-primary/15 text-secondary",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
