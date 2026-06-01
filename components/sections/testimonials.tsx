import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { TESTIMONIALS, type Testimonial } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-accent text-accent"
              : "h-4 w-4 text-border"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-surface/70 p-6 sm:w-[360px]">
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
        <Quote className="h-6 w-6 text-primary/40" />
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white">
          {t.initials}
        </span>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="section relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title={
            <>
              Dipercaya Ribuan{" "}
              <span className="text-gradient">Pelanggan</span>
            </>
          }
          description="Dari content creator hingga digital agency — mereka tumbuh bersama kami."
        />

        {/* Counters */}
        <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6 text-center">
            <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
              <Counter value={12500} suffix="+" />
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">Pelanggan Puas</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/60 p-6 text-center">
            <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
              <Counter value={2000000} suffix="+" />
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">Order Selesai</p>
          </div>
        </div>
      </div>

      {/* Marquee carousel */}
      <div className="group relative mt-12 w-full">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
