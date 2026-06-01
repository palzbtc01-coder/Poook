"use client";

import * as React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ServiceCard } from "@/components/dashboard/service-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  PLATFORMS,
  CATEGORIES,
  SERVICES,
  QUALITY_LABEL,
  type ServiceQuality,
  categoriesByPlatform,
} from "@/lib/mock-catalog";
import { cn } from "@/lib/utils";

const QUALITIES: ("all" | ServiceQuality)[] = [
  "all",
  "cheap",
  "standard",
  "premium",
  "high_retention",
];

export default function ServicesCatalogPage() {
  const [platform, setPlatform] = React.useState<string>("all");
  const [categoryId, setCategoryId] = React.useState<string>("all");
  const [quality, setQuality] = React.useState<"all" | ServiceQuality>("all");
  const [search, setSearch] = React.useState("");

  // When platform changes, reset category to "all" (its options change).
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    setCategoryId("all");
  };

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return SERVICES.filter((service) => {
      const cat = CATEGORIES.find((c) => c.id === service.categoryId);
      if (platform !== "all" && cat?.platform !== platform) return false;
      if (categoryId !== "all" && String(service.categoryId) !== categoryId)
        return false;
      if (quality !== "all" && service.quality !== quality) return false;
      if (
        term &&
        !service.name.toLowerCase().includes(term) &&
        !service.description.toLowerCase().includes(term)
      )
        return false;
      return true;
    });
  }, [platform, categoryId, quality, search]);

  const visibleCategories =
    platform === "all" ? CATEGORIES : categoriesByPlatform(platform);

  const hasActiveFilters =
    platform !== "all" ||
    categoryId !== "all" ||
    quality !== "all" ||
    search.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Katalog Layanan" },
        ]}
        title="Katalog Layanan"
        description="Browse 500+ layanan SMM untuk berbagai platform sosial media."
      />

      {/* Platform tabs */}
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1">
          <PlatformPill
            label="Semua"
            active={platform === "all"}
            onClick={() => handlePlatformChange("all")}
          />
          {PLATFORMS.map((p) => (
            <PlatformPill
              key={p}
              label={p}
              active={platform === p}
              onClick={() => handlePlatformChange(p)}
            />
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="grid gap-3 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]">
        <Input
          placeholder="Cari layanan…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search />}
          containerClassName="sm:col-span-1"
        />
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Kategori"
          leftIcon={<SlidersHorizontal />}
        >
          <option value="all">Semua kategori</option>
          {visibleCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.platform} — {c.name}
            </option>
          ))}
        </Select>
        <Select
          value={quality}
          onChange={(e) => setQuality(e.target.value as typeof quality)}
          aria-label="Kualitas"
        >
          <option value="all">Semua kualitas</option>
          {QUALITIES.filter((q) => q !== "all").map((q) => (
            <option key={q} value={q}>
              {QUALITY_LABEL[q as ServiceQuality]}
            </option>
          ))}
        </Select>
        {hasActiveFilters ? (
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setPlatform("all");
              setCategoryId("all");
              setQuality("all");
              setSearch("");
            }}
          >
            <X className="h-4 w-4" /> Reset
          </Button>
        ) : null}
      </div>

      {/* Results meta */}
      <p className="text-sm text-muted">
        Menampilkan{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        dari {SERVICES.length} layanan
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada layanan yang cocok"
          description="Coba ubah filter atau kata kunci pencarianmu."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPlatform("all");
                setCategoryId("all");
                setQuality("all");
                setSearch("");
              }}
            >
              Reset Filter
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

function PlatformPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border px-4 py-2 text-sm font-semibold transition-all",
        active
          ? "border-transparent bg-gradient-brand text-white shadow-glow"
          : "border-border bg-surface/60 text-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
