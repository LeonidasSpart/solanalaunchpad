'use client';

import { useEffect, useState } from 'react';

interface TokenAnalytics {
  id: string;
  name: string;
  symbol: string;
  mint_address: string;
  price_usd: number;
  market_cap: number;
  volume_24h: number;
  holder_count: number;
  timestamp: string;
}

export default function AdminAnalytics({ token }: { token: string | null }) {
  const [data, setData] = useState<TokenAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch('/api/analytics/tokens', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="text-center py-8 text-[#BDDBDB]">Loading analytics...</div>;
  if (error) return <div className="text-center py-8 text-[#FF2D2D]">Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#1a1a1a]/30">
          <tr>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Token</th>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Price</th>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Market Cap</th>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Volume 24h</th>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Holders</th>
            <th className="px-4 py-2 text-left text-[#BDDBDB]">Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-[#BDDBDB]">
                No analytics data yet. Run the cron job to populate snapshots.
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr key={row.id} className="border-t border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/20">
                <td className="px-4 py-2 text-white">{row.name} ({row.symbol})</td>
                <td className="px-4 py-2 text-white">${row.price_usd?.toFixed(6) || 'N/A'}</td>
                <td className="px-4 py-2 text-white">${row.market_cap?.toLocaleString() || 'N/A'}</td>
                <td className="px-4 py-2 text-white">${row.volume_24h?.toLocaleString() || 'N/A'}</td>
                <td className="px-4 py-2 text-white">{row.holder_count || '0'}</td>
                <td className="px-4 py-2 text-[#BDDBDB]">
                  {row.timestamp ? new Date(row.timestamp).toLocaleString() : 'Never'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
