import * as React from "react";
import Link from "next/link";
import { ArrowRight, Gauge, Heart, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  type CatalogService,
  QUALITY_LABEL,
  TAG_LABEL,
  TYPE_LABEL,
  findCategory,
} from "@/lib/mock-catalog";
import { formatIDR, formatNumber, cn } from "@/lib/utils";

const TAG_VARIANT: Record<
  string,
  "primary" | "secondary" | "accent" | "success" | "default"
> = {
  terlaris: "primary",
  termurah: "accent",
  tercepat: "secondary",
  baru: "success",
  rekomendasi: "primary",
  garansi_refill: "success",
};

export function ServiceCard({ service }: { service: CatalogService }) {
  const category = findCategory(service.categoryId);
  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface/70 p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-muted">
            {category?.platform} · {category?.name}
          </p>
          <h3 className="mt-1 font-display text-base font-bold leading-snug tracking-tight">
            {service.name}
          </h3>
        </div>
        <button
          type="button"
          aria-label="Tambah ke favorit"
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-danger"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {service.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <Badge key={tag} variant={TAG_VARIANT[tag] ?? "default"}>
              {TAG_LABEL[tag]}
            </Badge>
          ))}
        </div>
      ) : null}

      <p className="line-clamp-2 text-sm text-muted">{service.description}</p>

      <dl className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-background/40 px-3 py-2">
          <dt className="inline-flex items-center gap-1 text-muted">
            <Gauge className="h-3.5 w-3.5" /> Kecepatan
          </dt>
          <dd className="mt-0.5 font-medium">{service.estimatedSpeed}</dd>
        </div>
        <div className="rounded-lg bg-background/40 px-3 py-2">
          <dt className="inline-flex items-center gap-1 text-muted">
            <Sparkles className="h-3.5 w-3.5" /> Kualitas
          </dt>
          <dd className="mt-0.5 font-medium">{QUALITY_LABEL[service.quality]}</dd>
        </div>
        <div className="rounded-lg bg-background/40 px-3 py-2">
          <dt className="text-muted">Min / Max</dt>
          <dd className="mt-0.5 font-medium tabular-nums">
            {formatNumber(service.minQuantity)} / {formatNumber(service.maxQuantity)}
          </dd>
        </div>
        <div className="rounded-lg bg-background/40 px-3 py-2">
          <dt className="inline-flex items-center gap-1 text-muted">
            <Zap className="h-3.5 w-3.5" /> Tipe
          </dt>
          <dd className="mt-0.5 font-medium">{TYPE_LABEL[service.type]}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-4">
        <div>
          <p className="text-[11px] text-muted">Per 1.000</p>
          <p className="font-display text-xl font-bold text-gradient">
            {formatIDR(service.pricePer1000)}
          </p>
        </div>
        <Link
          href={`/dashboard/orders/new?service=${service.id}`}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-brand px-4 text-sm font-semibold text-white shadow-glow transition-all",
            "hover:shadow-[0_0_50px_-6px_rgba(108,59,245,0.7)] group-hover:translate-x-0.5",
          )}
        >
          Pesan
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
