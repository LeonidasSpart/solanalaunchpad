'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Coins, TrendingUp, LogOut, Eye, EyeOff } from 'lucide-react';

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
    // Check authentication
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        if (!response.ok) {
          router.push('/admin/login');
          return;
        }
        // Fetch dashboard data
        // const data = await fetch('/api/admin/stats').then(res => res.json());
        // setStats(data);
        // setRecentTokens(data.recentTokens);
        setStats({
          totalTokens: 1427,
          totalUsers: 856,
          totalRevenue: 214.5,
          activeUsers: 234,
        });
        setRecentTokens([
          { name: 'ZRPDEEPSEEK', symbol: 'ZDP', created: '2026-06-29', network: 'Devnet' },
          { name: 'SolToken', symbol: 'SOLT', created: '2026-06-29', network: 'Devnet' },
          { name: 'Memecoin', symbol: 'MEME', created: '2026-06-28', network: 'Devnet' },
        ]);
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/50 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <span className="text-white font-bold">ZRP Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition px-4 py-2 rounded-xl hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Tokens</p>
                <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                <Coins className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Revenue (SOL)</p>
                <p className="text-2xl font-bold text-white">{stats.totalRevenue}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-900/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-900/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tokens */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-white font-semibold">Recent Tokens</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/30">
                  <th className="px-6 py-3 text-left text-zinc-400 font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-zinc-400 font-medium">Symbol</th>
                  <th className="px-6 py-3 text-left text-zinc-400 font-medium">Network</th>
                  <th className="px-6 py-3 text-left text-zinc-400 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentTokens.map((token, index) => (
                  <tr key={index} className="border-t border-zinc-800/50 hover:bg-zinc-800/20">
                    <td className="px-6 py-3 text-white">{token.name}</td>
                    <td className="px-6 py-3 text-zinc-300">{token.symbol}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        token.network === 'Mainnet' 
                          ? 'bg-green-900/50 text-green-400' 
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {token.network}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-zinc-400">{token.created}</td>
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
