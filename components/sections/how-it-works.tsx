import { UserPlus, MousePointerClick, Rocket, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { STEPS } from "@/lib/content";

const STEP_ICONS = [UserPlus, MousePointerClick, Rocket];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="section relative">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          title={
            <>
              Order dalam <span className="text-gradient">3 Langkah</span> Mudah
            </>
          }
          description="Tanpa ribet, tanpa menunggu lama. Dari daftar sampai engagement naik, semua otomatis."
        />

        <div className="relative mt-14 grid w-full gap-6 md:grid-cols-3 md:gap-5">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />

          {STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <Reveal
                key={step.title}
                delay={index * 120}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-surface shadow-glow">
                  <Icon className="h-8 w-8 text-secondary" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white shadow-glow">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {step.description}
                </p>

                {index < STEPS.length - 1 ? (
                  <ArrowRight className="mx-auto mt-5 h-5 w-5 rotate-90 text-primary/60 md:hidden" />
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
