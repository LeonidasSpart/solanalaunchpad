'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  token_name: string;
  token_symbol: string;
  creator_wallet: string;
  hard_cap: number;
  raised_so_far: number;
  status: string;
  start_time: string;
  end_time: string;
  fee_percentage: number;
}

export default function AdminLaunchpadPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminToken.trim()) {
      setIsAuthenticated(true);
      fetchProjects();
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/launchpad/projects?status=all', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/launchpad/admin/projects/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Approval failed');
      await fetchProjects();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: number) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/launchpad/admin/projects/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Rejection failed');
      await fetchProjects();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Distribute ──────────────────────────────────────────────────────
  const handleDistribute = async (id: number) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/launchpad/projects/${id}/distribute`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Distribution failed');
      }
      await fetchProjects();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Token"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin" />
        <p className="text-[#BDDBDB] mt-4">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Launchpad Admin</h1>
        <button
          onClick={() => { setIsAuthenticated(false); setAdminToken(''); }}
          className="text-[#BDDBDB] hover:text-white text-sm transition"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">
          {error}
        </div>
      )}

      {/* Pending Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Pending Approval</h2>
        {projects.filter(p => p.status === 'pending').length === 0 ? (
          <p className="text-[#BDDBDB]">No pending projects.</p>
        ) : (
          <div className="grid gap-4">
            {projects.filter(p => p.status === 'pending').map((p) => (
              <div key={p.id} className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold">{p.token_name} ({p.token_symbol})</h3>
                    <p className="text-[#BDDBDB] text-sm">Creator: {p.creator_wallet.slice(0, 8)}...</p>
                    <p className="text-[#BDDBDB] text-sm">Hard Cap: {p.hard_cap} SOL</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(p.id)}
                      disabled={actionLoading === p.id}
                      className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {actionLoading === p.id ? '...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(p.id)}
                      disabled={actionLoading === p.id}
                      className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Projects with Actions */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">All Projects</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#BDDBDB] border-b border-[#1a1a1a]">
                <th className="pb-2 pr-4">ID</th>
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Symbol</th>
                <th className="pb-2 pr-4">Raised</th>
                <th className="pb-2 pr-4">Cap</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Ends</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const now = new Date();
                const endTime = new Date(p.end_time);
                const canDistribute = p.status === 'active' && endTime < now;

                return (
                  <tr key={p.id} className="border-b border-[#1a1a1a]">
                    <td className="py-2 pr-4 text-white">{p.id}</td>
                    <td className="py-2 pr-4 text-white">{p.token_name}</td>
                    <td className="py-2 pr-4 text-white">{p.token_symbol}</td>
                    <td className="py-2 pr-4 text-white">{(p.raised_so_far || 0).toFixed(2)}</td>
                    <td className="py-2 pr-4 text-white">{p.hard_cap}</td>
                    <td className="py-2 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === 'active' ? 'bg-green-600 text-white' :
                        p.status === 'pending' ? 'bg-yellow-600 text-white' :
                        p.status === 'distributed' ? 'bg-blue-600 text-white' :
                        p.status === 'rejected' ? 'bg-red-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-[#BDDBDB]">
                      {new Date(p.end_time).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <a
                          href={`/launchpad/${p.id}`}
                          target="_blank"
                          className="text-[#FF2D2D] hover:text-[#B10000] transition text-xs"
                        >
                          View
                        </a>
                        {canDistribute && (
                          <button
                            onClick={() => handleDistribute(p.id)}
                            disabled={actionLoading === p.id}
                            className="px-3 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition disabled:opacity-50"
                          >
                            {actionLoading === p.id ? '...' : 'Distribute'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
