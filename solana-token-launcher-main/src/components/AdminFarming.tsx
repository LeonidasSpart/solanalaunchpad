'use client';

import { useEffect, useState } from 'react';

interface Pool {
  id: number;
  lp_mint: string;
  reward_mint: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
  min_stake: number;
  max_stake: number;
  total_staked: number;
  total_rewards_paid: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminFarming({ token }: { token: string | null }) {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPool, setEditingPool] = useState<Pool | null>(null);
  const [form, setForm] = useState<Partial<Pool>>({
    lp_mint: '',
    reward_mint: '',
    token_symbol: '',
    token_name: '',
    apy: 0,
    lock_duration: 0,
    min_stake: 0,
    max_stake: 0,
    is_active: true,
  });

  const fetchPools = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/farming/pools', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch pools');
      const data = await res.json();
      setPools(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const url = editingPool
      ? `/api/admin/farming/pools/${editingPool.id}`
      : '/api/admin/farming/pools';
    const method = editingPool ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save pool');
      await fetchPools();
      setShowModal(false);
      setEditingPool(null);
      setForm({ lp_mint: '', reward_mint: '', token_symbol: '', token_name: '', apy: 0, lock_duration: 0, min_stake: 0, max_stake: 0, is_active: true });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this pool?')) return;
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/farming/pools/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchPools();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openEdit = (pool: Pool) => {
    setEditingPool(pool);
    setForm(pool);
    setShowModal(true);
  };

  if (loading) return <div className="text-center py-8 text-[#BDDBDB]">Loading pools...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Farming Pools</h2>
        <button
          onClick={() => { setEditingPool(null); setForm({ lp_mint: '', reward_mint: '', token_symbol: '', token_name: '', apy: 0, lock_duration: 0, min_stake: 0, max_stake: 0, is_active: true }); setShowModal(true); }}
          className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-4 py-2 rounded-lg text-sm transition"
        >
          + Create Pool
        </button>
      </div>

      {error && <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1a1a1a]/30">
            <tr>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">ID</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">LP Mint</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">Symbol</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">APY</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">Lock (s)</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">Staked</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">Active</th>
              <th className="px-4 py-2 text-left text-[#BDDBDB]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pools.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-4 text-[#BDDBDB]">No pools found.</td></tr>
            ) : (
              pools.map((pool) => (
                <tr key={pool.id} className="border-t border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/20">
                  <td className="px-4 py-2 text-white">{pool.id}</td>
                  <td className="px-4 py-2 text-white font-mono text-xs">{pool.lp_mint.slice(0, 8)}...</td>
                  <td className="px-4 py-2 text-white">{pool.token_symbol}</td>
                  <td className="px-4 py-2 text-[#FF2D2D]">{pool.apy}%</td>
                  <td className="px-4 py-2 text-white">{pool.lock_duration}</td>
                  <td className="px-4 py-2 text-white">{pool.total_staked}</td>
                  <td className="px-4 py-2 text-white">{pool.is_active ? '✅' : '❌'}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => openEdit(pool)} className="text-blue-400 hover:text-blue-300 mr-2">Edit</button>
                    <button onClick={() => handleDelete(pool.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold text-lg mb-4">{editingPool ? 'Edit Pool' : 'Create Pool'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white text-sm block">LP Mint *</label>
                  <input
                    type="text"
                    name="lp_mint"
                    value={form.lp_mint || ''}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF2D2D]"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Reward Mint *</label>
                  <input
                    type="text"
                    name="reward_mint"
                    value={form.reward_mint || ''}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF2D2D]"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Token Symbol</label>
                  <input
                    type="text"
                    name="token_symbol"
                    value={form.token_symbol || ''}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Token Name</label>
                  <input
                    type="text"
                    name="token_name"
                    value={form.token_name || ''}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">APY (%) *</label>
                  <input
                    type="number"
                    name="apy"
                    value={form.apy || 0}
                    onChange={handleChange}
                    required
                    step="0.1"
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Lock (seconds)</label>
                  <input
                    type="number"
                    name="lock_duration"
                    value={form.lock_duration || 0}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Min Stake</label>
                  <input
                    type="number"
                    name="min_stake"
                    value={form.min_stake || 0}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block">Max Stake (0 = unlimited)</label>
                  <input
                    type="number"
                    name="max_stake"
                    value={form.max_stake || 0}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active !== undefined ? form.is_active : true}
                  onChange={(e) => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="w-4 h-4 accent-[#FF2D2D]"
                />
                <label className="text-white text-sm">Active</label>
              </div>
              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition">
                  {editingPool ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditingPool(null); }} className="flex-1 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
