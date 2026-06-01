import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { PLATFORMS } from "@/lib/content";

export function Platforms() {
  return (
    <section className="section relative">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary">10+ Platform, 500+ Layanan</Badge>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Mendukung Semua Platform{" "}
            <span className="text-gradient">Favoritmu</span>
          </h2>
          <p className="max-w-xl text-sm text-muted sm:text-base">
            Satu panel untuk semua kebutuhan social media marketing kamu.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5"
        >
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface hover:shadow-glow"
              >
                <Icon
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: platform.color }}
                  aria-hidden
                />
                <span className="text-xs font-medium text-muted transition-colors group-hover:text-foreground sm:text-sm">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
