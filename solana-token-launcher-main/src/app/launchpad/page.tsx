'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  token_name: string;
  token_symbol: string;
  hard_cap: string;
  raised_so_far: string;
  start_time: string;
  end_time: string;
  status: string;
  logo_url?: string;
}

export default function LaunchpadPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/launchpad/projects?status=active')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading projects...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">🚀 Launchpad</h1>
        <Link href="/launchpad/create" className="bg-[#FF2D2D] text-white px-4 py-2 rounded-lg hover:bg-[#B10000] transition">
          + Create Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <p className="text-gray-400">No active projects at the moment.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map(p => {
            const raised = parseFloat(p.raised_so_far) || 0;
            const cap = parseFloat(p.hard_cap) || 0;
            const progress = cap > 0 ? (raised / cap) * 100 : 0;
            return (
              <Link key={p.id} href={`/launchpad/${p.id}`} className="block bg-[#0D0D0D] p-5 rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
                <div className="flex items-center gap-4">
                  {p.logo_url && <img src={p.logo_url} alt={p.token_name} className="w-12 h-12 rounded-full" />}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{p.token_name} ({p.token_symbol})</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>Raised: {raised.toFixed(2)} / {cap.toFixed(2)} SOL</span>
                      <span>•</span>
                      <span>{new Date(p.end_time) > new Date() ? 'Active' : 'Ended'}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded mt-2">
                      <div className="bg-[#FF2D2D] h-2 rounded" style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${new Date(p.end_time) > new Date() ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                      {new Date(p.end_time) > new Date() ? 'Active' : 'Closed'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
