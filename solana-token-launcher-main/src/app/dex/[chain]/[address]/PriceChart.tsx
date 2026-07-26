'use client';

// src/app/dex/[chain]/[address]/PriceChart.tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function formatAxisPrice(value: number) {
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toExponential(2)}`;
}

function formatAxisDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function PriceChart({ data }: { data: ChartPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-white/5 bg-black/30 text-sm text-white/40">
        No chart data available yet for this pool
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A855F7" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatAxisDate}
            stroke="#ffffff30"
            tick={{ fill: '#ffffff60', fontSize: 11 }}
            minTickGap={30}
          />
          <YAxis
            dataKey="close"
            domain={['auto', 'auto']}
            tickFormatter={formatAxisPrice}
            stroke="#ffffff30"
            tick={{ fill: '#ffffff60', fontSize: 11 }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              background: '#0B0E14',
              border: '1px solid #ffffff20',
              borderRadius: 8,
              fontFamily: 'monospace',
              fontSize: 12,
            }}
            labelFormatter={(ts) => new Date(ts).toLocaleString()}
            formatter={(value: number) => [formatAxisPrice(value), 'Close']}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#A855F7"
            strokeWidth={2}
            fill="url(#priceFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
