'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Rocket, 
  Users, 
  Coins, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  Plus,
  Trash2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
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
  whitelist_enabled: boolean;
  kyc_enabled: boolean;
  tiered: boolean;
}

interface Stats {
  totalProjects: number;
  totalRaised: number;
  activeProjects: number;
  pendingProjects: number;
  totalContributors: number;
}

// ─── Main Component ─────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [adminToken, setAdminToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'launchpad'>('overview');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalRaised: 0,
    activeProjects: 0,
    pendingProjects: 0,
    totalContributors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // ─── Auth ──────────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminToken.trim()) {
      setIsAuthenticated(true);
      fetchData();
    }
  };

  // ─── Fetch Data ────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all projects (admin)
      const projRes = await fetch('/api/launchpad/projects?status=all', {
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });
      if (!projRes.ok) throw new Error('Failed to fetch projects');
      const projData = await projRes.json();
      setProjects(projData);

      // Compute stats
      const total = projData.length;
      const raised = projData.reduce((sum: number, p: any) => sum + parseFloat(p.raised_so_far || 0), 0);
      const active = projData.filter((p: any) => p.status === 'active').length;
      const pending = projData.filter((p: any) => p.status === 'pending').length;
      
      setStats({
        totalProjects: total,
        totalRaised: raised,
        activeProjects: active,
        pendingProjects: pending,
        totalContributors: 0, // we could fetch contributions count separately
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Approve ───────────────────────────────────────────────────────
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
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Reject ────────────────────────────────────────────────────────
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
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Distribute ────────────────────────────────────────────────────
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
      if (!res.ok) throw new Error('Distribution failed');
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Login Screen ──────────────────────────────────────────────────
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

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
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

      {/* ─── Tabs ─────────────────────────────────────────────────────── */}
      <div className="flex gap-2 border-b border-[#1a1a1a] mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeTab === 'overview'
              ? 'text-white bg-[#FF2D2D]/20 border-b-2 border-[#FF2D2D]'
              : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
          }`}
        >
          <LayoutDashboard className="h-4 w-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('launchpad')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeTab === 'launchpad'
              ? 'text-white bg-[#FF2D2D]/20 border-b-2 border-[#FF2D2D]'
              : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
          }`}
        >
          <Rocket className="h-4 w-4 inline mr-2" />
          Launchpad Management
        </button>
      </div>

      {/* ─── Content ──────────────────────────────────────────────────── */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin" />
          <p className="text-[#BDDBDB] mt-4">Loading...</p>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Projects" value={stats.totalProjects} icon={<Rocket className="h-5 w-5" />} />
                <StatCard label="Total Raised" value={`${stats.totalRaised.toFixed(2)} SOL`} icon={<Coins className="h-5 w-5" />} />
                <StatCard label="Active Projects" value={stats.activeProjects} icon={<CheckCircle className="h-5 w-5" />} />
                <StatCard label="Pending Approval" value={stats.pendingProjects} icon={<Clock className="h-5 w-5" />} />
              </div>

              {/* Recent Activity / Quick Actions */}
              <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
                <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <Link href="/admin/launchpad" className="px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-lg text-sm transition">
                    Manage Launchpad
                  </Link>
                  <Link href="/launchpad" className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg text-sm transition">
                    View Public Launchpad
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'launchpad' && (
            <LaunchpadManagement
              projects={projects}
              adminToken={adminToken}
              actionLoading={actionLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              onDistribute={handleDistribute}
              fetchData={fetchData}
            />
          )}
        </>
      )}
    </div>
  );
}

// ─── Stat Card Component ────────────────────────────────────────────
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
      <div className="flex items-center gap-2 text-[#BDDBDB] text-sm mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

// ─── Launchpad Management Component ──────────────────────────────────
function LaunchpadManagement({ 
  projects, 
  adminToken, 
  actionLoading, 
  onApprove, 
  onReject, 
  onDistribute,
  fetchData 
}: any) {
  const [whitelistWallet, setWhitelistWallet] = useState('');
  const [kycWallet, setKycWallet] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const pending = projects.filter((p: any) => p.status === 'pending');
  const all = projects;

  const addWhitelist = async (projectId: number) => {
    if (!whitelistWallet) return;
    try {
      const res = await fetch(`/api/launchpad/admin/projects/${projectId}/whitelist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: whitelistWallet }),
      });
      if (!res.ok) throw new Error('Failed to add to whitelist');
      setWhitelistWallet('');
      await fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const verifyKyc = async (projectId: number) => {
    if (!kycWallet) return;
    try {
      const res = await fetch(`/api/launchpad/admin/projects/${projectId}/kyc`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: kycWallet }),
      });
      if (!res.ok) throw new Error('Failed to verify KYC');
      setKycWallet('');
      await fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Pending Projects */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Pending Approval</h2>
        {pending.length === 0 ? (
          <p className="text-[#BDDBDB]">No pending projects.</p>
        ) : (
          <div className="grid gap-4">
            {pending.map((p: any) => (
              <div key={p.id} className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold">{p.token_name} ({p.token_symbol})</h3>
                    <p className="text-[#BDDBDB] text-sm">Creator: {p.creator_wallet.slice(0, 8)}...</p>
                    <p className="text-[#BDDBDB] text-sm">Hard Cap: {p.hard_cap} SOL</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onApprove(p.id)}
                      disabled={actionLoading === p.id}
                      className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {actionLoading === p.id ? '...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => onReject(p.id)}
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

      {/* All Projects */}
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
                <th className="pb-2 pr-4">Whitelist</th>
                <th className="pb-2 pr-4">KYC</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {all.map((p: any) => {
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
                    <td className="py-2 pr-4 text-white">
                      {p.whitelist_enabled ? '✅' : '❌'}
                    </td>
                    <td className="py-2 pr-4 text-white">
                      {p.kyc_enabled ? '✅' : '❌'}
                    </td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/launchpad/${p.id}`} target="_blank" className="text-[#FF2D2D] hover:text-[#B10000] text-xs">
                          View
                        </Link>
                        {canDistribute && (
                          <button
                            onClick={() => onDistribute(p.id)}
                            disabled={actionLoading === p.id}
                            className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs disabled:opacity-50"
                          >
                            {actionLoading === p.id ? '...' : 'Distribute'}
                          </button>
                        )}
                        {(p.whitelist_enabled || p.kyc_enabled) && (
                          <button
                            onClick={() => setSelectedProjectId(p.id)}
                            className="px-2 py-0.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded text-xs"
                          >
                            Manage
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

      {/* ─── Whitelist / KYC Management Modal ──────────────────────── */}
      {selectedProjectId !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white font-bold text-lg mb-4">Manage Project #{selectedProjectId}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm block mb-1">Add to Whitelist</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whitelistWallet}
                    onChange={(e) => setWhitelistWallet(e.target.value)}
                    placeholder="Wallet address"
                    className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] text-sm focus:outline-none focus:border-[#FF2D2D]"
                  />
                  <button
                    onClick={() => addWhitelist(selectedProjectId)}
                    className="px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-lg text-sm transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="text-white text-sm block mb-1">Verify KYC</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={kycWallet}
                    onChange={(e) => setKycWallet(e.target.value)}
                    placeholder="Wallet address"
                    className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] text-sm focus:outline-none focus:border-[#FF2D2D]"
                  />
                  <button
                    onClick={() => verifyKyc(selectedProjectId)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                  >
                    Verify
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedProjectId(null)}
                className="w-full py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
