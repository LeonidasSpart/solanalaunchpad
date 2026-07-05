'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Coins, TrendingUp, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalUsers: 0,
    totalRevenue: 0,
    activeUsers: 0,
  });
  const [recentTokens, setRecentTokens] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Verify auth
        const authRes = await fetch('/api/admin/verify');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        // 2. Fetch stats
        const statsRes = await fetch('/api/admin/stats');
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const data = await statsRes.json();

        setStats({
          totalTokens: data.totalTokens || 0,
          totalUsers: data.totalUsers || 0,
          totalRevenue: data.totalRevenue || 0,
          activeUsers: data.activeUsers || 0,
        });
        setRecentTokens(data.recentTokens || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-[#FF2D2D] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="bg-[#0D0D0D]/50 border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF2D2D] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <span className="text-white font-bold">ZRP Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#BDDBDB] hover:text-white transition px-4 py-2 rounded-xl hover:bg-[#1a1a1a]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BDDBDB] text-sm">Total Tokens</p>
                <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                <Coins className="h-5 w-5 text-[#FF2D2D]" />
              </div>
            </div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BDDBDB] text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-[#FF2D2D]" />
              </div>
            </div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BDDBDB] text-sm">Revenue (SOL)</p>
                <p className="text-2xl font-bold text-white">{stats.totalRevenue}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#FF2D2D]" />
              </div>
            </div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BDDBDB] text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-[#FF2D2D]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tokens */}
        <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1a1a1a]">
            <h2 className="text-white font-semibold">Recent Tokens</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1a1a]/30">
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Symbol</th>
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Network</th>
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentTokens.map((token, index) => (
                  <tr key={index} className="border-t border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/20">
                    <td className="px-6 py-3 text-white">{token.name}</td>
                    <td className="px-6 py-3 text-[#BDDBDB]">{token.symbol}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        token.network === 'Mainnet' 
                          ? 'bg-[#FF2D2D]/20 text-[#FF2D2D]' 
                          : 'bg-[#FF2D2D]/10 text-[#BDDBDB]'
                      }`}>
                        {token.network}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#BDDBDB]">{token.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
