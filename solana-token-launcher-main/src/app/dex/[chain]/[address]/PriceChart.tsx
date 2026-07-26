'use client';

// src/app/dex/[chain]/[address]/PriceChart.tsx
// Zero-dependency SVG line chart (no recharts) to avoid adding new packages
// to an already-heavy dependency tree.

import { useState } from 'react';

interface ChartPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function formatPrice(value: number) {
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toExponential(2)}`;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const WIDTH = 800;
const HEIGHT = 240;
const PADDING_LEFT = 60;
const PADDING_RIGHT = 12;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 28;

export default function PriceChart({ data }: { data: ChartPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-white/5 bg-black/30 text-sm text-white/40">
        No chart data available yet for this pool
      </div>
    );
  }

  const closes = data.map((d) => d.close);
  const minPrice = Math.min(...closes);
  const maxPrice = Math.max(...closes);
  const priceRange = maxPrice - minPrice || maxPrice * 0.01 || 1;

  const plotWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  const xForIndex = (i: number) =>
    PADDING_LEFT + (data.length === 1 ? 0 : (i / (data.length - 1)) * plotWidth);
  const yForPrice = (price: number) =>
    PADDING_TOP + plotHeight - ((price - minPrice) / priceRange) * plotHeight;

  const linePoints = data.map((d, i) => `${xForIndex(i)},${yForPrice(d.close)}`).join(' ');
  const areaPoints = `${PADDING_LEFT},${PADDING_TOP + plotHeight} ${linePoints} ${xForIndex(
    data.length - 1
  )},${PADDING_TOP + plotHeight}`;

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = Math.min(1, Math.max(0, (relativeX - PADDING_LEFT) / plotWidth));
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(Math.min(data.length - 1, Math.max(0, index)));
  };

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        style={{ height: 240 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Y-axis gridlines + labels */}
        {[0, 0.5, 1].map((t) => {
          const y = PADDING_TOP + t * plotHeight;
          const price = maxPrice - t * priceRange;
          return (
            <g key={t}>
              <line
                x1={PADDING_LEFT}
                x2={WIDTH - PADDING_RIGHT}
                y1={y}
                y2={y}
                stroke="#ffffff15"
                strokeWidth={1}
              />
              <text x={PADDING_LEFT - 8} y={y + 4} textAnchor="end" fontSize={10} fill="#ffffff60">
                {formatPrice(price)}
              </text>
            </g>
          );
        })}

        {/* X-axis labels (first / last date) */}
        <text x={PADDING_LEFT} y={HEIGHT - 8} fontSize={10} fill="#ffffff60">
          {formatDate(data[0].timestamp)}
        </text>
        <text
          x={WIDTH - PADDING_RIGHT}
          y={HEIGHT - 8}
          textAnchor="end"
          fontSize={10}
          fill="#ffffff60"
        >
          {formatDate(data[data.length - 1].timestamp)}
        </text>

        {/* Area fill */}
        <polygon points={areaPoints} fill="url(#priceFill)" />

        {/* Line */}
        <polyline points={linePoints} fill="none" stroke="#A855F7" strokeWidth={2} />

        {/* Hover indicator */}
        {hovered && (
          <>
            <line
              x1={xForIndex(hoverIndex!)}
              x2={xForIndex(hoverIndex!)}
              y1={PADDING_TOP}
              y2={PADDING_TOP + plotHeight}
              stroke="#ffffff30"
              strokeWidth={1}
            />
            <circle
              cx={xForIndex(hoverIndex!)}
              cy={yForPrice(hovered.close)}
              r={4}
              fill="#A855F7"
              stroke="#0B0E14"
              strokeWidth={2}
            />
          </>
        )}
      </svg>

      {hovered && (
        <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/70">
          <span>{new Date(hovered.timestamp).toLocaleDateString()}</span>
          <span className="font-semibold text-white">Close: {formatPrice(hovered.close)}</span>
        </div>
      )}
    </div>
  );
}
