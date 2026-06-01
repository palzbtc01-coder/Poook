import * as React from "react";
import type { ORDERS_LAST_7_DAYS } from "@/lib/mock-dashboard";

interface OrderChartProps {
  data: typeof ORDERS_LAST_7_DAYS;
}

/**
 * Pure-SVG bar chart. No external chart library — keeps the bundle slim.
 * The bars use the brand gradient for consistency with the rest of the UI.
 */
export function OrderChart({ data }: OrderChartProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  // Layout
  const width = 100; // viewBox is 100x60, scaled by CSS
  const height = 60;
  const paddingX = 4;
  const paddingTop = 6;
  const paddingBottom = 10; // room for x-axis labels
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingTop - paddingBottom;
  const slot = innerWidth / data.length;
  const barWidth = slot * 0.5;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-48 w-full"
      role="img"
      aria-label="Grafik order 7 hari terakhir"
    >
      <defs>
        <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#6C3BF5" />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={paddingX}
          x2={width - paddingX}
          y1={paddingTop + innerHeight * (1 - t)}
          y2={paddingTop + innerHeight * (1 - t)}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={0.3}
        />
      ))}

      {/* Bars + labels */}
      {data.map((d, i) => {
        const h = (d.count / max) * innerHeight;
        const x = paddingX + slot * i + (slot - barWidth) / 2;
        const y = paddingTop + (innerHeight - h);
        return (
          <g key={d.day}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={1.2}
              fill="url(#bar-gradient)"
            >
              <title>{`${d.day}: ${d.count} order`}</title>
            </rect>
            <text
              x={x + barWidth / 2}
              y={height - 2}
              textAnchor="middle"
              className="fill-muted"
              style={{ fontSize: 4 }}
            >
              {d.day}
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 1.5}
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 3.5, fontWeight: 600 }}
            >
              {d.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
