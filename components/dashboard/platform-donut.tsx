import * as React from "react";
import type { PLATFORM_BREAKDOWN } from "@/lib/mock-dashboard";

interface PlatformDonutProps {
  data: typeof PLATFORM_BREAKDOWN;
}

/**
 * Pure-SVG donut chart. Each segment is a circle whose stroke-dasharray
 * traces only its slice, computed from the cumulative percentages.
 */
export function PlatformDonut({ data }: PlatformDonutProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-40 w-40 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
          role="img"
          aria-label="Breakdown order per platform"
        >
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#252536"
            strokeWidth="14"
          />
          {data.map((segment) => {
            const length = (segment.percent / 100) * circumference;
            const offset = (cumulative / 100) * circumference;
            cumulative += segment.percent;
            return (
              <circle
                key={segment.name}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="14"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              >
                <title>{`${segment.name}: ${segment.percent}%`}</title>
              </circle>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-wider text-muted">
            Total
          </p>
          <p className="font-display text-xl font-bold">100%</p>
        </div>
      </div>

      {/* Legend */}
      <ul className="grid w-full gap-2 sm:flex-1">
        {data.map((segment) => (
          <li
            key={segment.name}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-foreground">{segment.name}</span>
            </span>
            <span className="font-semibold tabular-nums text-muted">
              {segment.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
