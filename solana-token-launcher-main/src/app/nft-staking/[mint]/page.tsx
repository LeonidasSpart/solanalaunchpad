'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ArrowLeft, Loader2, Lock, Unlock, Coins, CheckCircle, AlertCircle } from 'lucide-react';
import { Transaction } from '@solana/web3.js';

interface Pool {
  id: number;
  collection_mint: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
  min_stake: number;
  max_stake: number;
  total_staked: number;
  total_rewards_paid: number;
}

interface Position {
  id: number;
  nft_mint_address: string;
  reward_earned: number;
  reward_claimed: number;
  staked_at: string;
  unlocked_at: string | null;
  status: string;
}

interface OwnedNFT {
  id: number;
  mint_address: string;
  image_url?: string | null;
}

export default function NFTStakingDetail() {
  const params = useParams();
  const mint = params.mint as string;
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [pool, setPool] = useState<Pool | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<OwnedNFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [staking, setStaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }

    try {
      // Fetch pool
      const poolRes = await fetch(`/api/nft-staking/pools/${mint}`);
      if (!poolRes.ok) throw new Error('Pool not found');
      const poolData = await poolRes.json();
      setPool(poolData);

      // Fetch user's positions in this pool
      const posRes = await fetch(`/api/nft-staking/positions?pool=${poolData.id}&wallet=${publicKey.toBase58()}`);
      if (posRes.ok) {
        const posData = await posRes.json();
        setPositions(posData);
      }

      // Fetch user's owned NFTs from this collection
      const nftRes = await fetch(`/api/nft/owned?wallet=${publicKey.toBase58()}&collection=${poolData.collection_mint}`);
      if (nftRes.ok) {
        const nftData = await nftRes.json();
        setOwnedNFTs(nftData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [connected, publicKey, mint]);

  // ─── Stake ──────────────────────────────────────────────────────────
  const handleStake = async () => {
    if (!connected || !publicKey || !pool || !selectedNFT) {
      setError('Select an NFT to stake');
      return;
    }

    setStaking(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Build transaction
      const res = await fetch('/api/nft-staking/stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: pool.id,
          userWallet: publicKey.toBase58(),
          nftMintAddress: selectedNFT,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to build tx');

      // 2. Sign and send
      const txBuffer = Buffer.from(data.transaction, 'base64');
      const tx = Transaction.from(txBuffer);
      const signed = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signed);

      // 3. Confirm on backend
      const confirmRes = await fetch('/api/nft-staking/stake/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: pool.id,
          userWallet: publicKey.toBase58(),
          nftMintAddress: selectedNFT,
          txSignature: signed,
        }),
      });
      if (!confirmRes.ok) {
        const err = await confirmRes.json();
        throw new Error(err.error || 'Failed to confirm stake');
      }

      setSuccess('✅ NFT staked successfully!');
      setSelectedNFT('');
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStaking(false);
    }
  };

  // ─── Claim Rewards ──────────────────────────────────────────────────
  const handleClaim = async (positionId: number) => {
    if (!connected || !publicKey || !pool) return;
    setStaking(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/nft-staking/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: pool.id,
          userWallet: publicKey.toBase58(),
          positionId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Claim failed');
      setSuccess(`✅ Claimed ${data.reward.toFixed(4)} rewards!`);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStaking(false);
    }
  };

  // ─── Unstake ────────────────────────────────────────────────────────
  const handleUnstake = async (positionId: number) => {
    if (!connected || !publicKey || !pool) return;
    setStaking(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/nft-staking/unstake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: pool.id,
          userWallet: publicKey.toBase58(),
          positionId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unstake failed');
      setSuccess(`✅ Unstaked successfully!`);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStaking(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Lock className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to stake your NFTs.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading...</div>;
  if (!pool) return <div className="text-center py-12 text-[#BDDBDB]">Pool not found.</div>;

  const totalRewards = positions.reduce((sum, p) => sum + (p.reward_earned - p.reward_claimed), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/nft-staking" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Pools
      </Link>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{pool.token_name || 'NFT Collection'}</h1>
            <p className="text-[#BDDBDB] text-sm">{pool.token_symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-[#FF2D2D] font-bold text-2xl">{pool.apy}%</p>
            <p className="text-[#BDDBDB] text-xs">APY</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Total Staked</p>
            <p className="text-white font-bold">{pool.total_staked}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Your Staked</p>
            <p className="text-white font-bold">{positions.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Available Rewards</p>
            <p className="text-[#FF2D2D] font-bold">{totalRewards.toFixed(4)}</p>
          </div>
        </div>

        {error && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <p className="text-[#FF2D2D] text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        {/* ─── Stake Form ──────────────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-2">Stake an NFT</h3>
          {ownedNFTs.length === 0 ? (
            <p className="text-[#BDDBDB] text-sm">You don't own any NFTs from this collection.</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedNFT}
                onChange={(e) => setSelectedNFT(e.target.value)}
                className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              >
                <option value="">Select an NFT to stake</option>
                {ownedNFTs.map((nft) => (
                  <option key={nft.id} value={nft.mint_address}>
                    {nft.mint_address.slice(0, 8)}...
                  </option>
                ))}
              </select>
              <button
                onClick={handleStake}
                disabled={staking || !selectedNFT}
                className="px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center gap-2"
              >
                {staking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                {staking ? 'Staking...' : 'Stake'}
              </button>
            </div>
          )}
        </div>

        {/* ─── Positions ────────────────────────────────────────────────── */}
        {positions.length > 0 && (
          <div>
            <h3 className="text-white font-medium mb-2">Your Staked NFTs</h3>
            <div className="space-y-3">
              {positions.map((pos) => {
                const rewards = pos.reward_earned - pos.reward_claimed;
                const isLocked = pos.unlocked_at && new Date(pos.unlocked_at) > new Date();
                return (
                  <div key={pos.id} className="bg-[#1a1a1a] rounded-xl p-3 border border-[#1a1a1a]">
                    <div className="flex flex-wrap items-center justify-between">
                      <div>
                        <p className="text-white font-mono text-sm">{pos.nft_mint_address.slice(0, 8)}...</p>
                        <p className="text-[#BDDBDB] text-xs">Rewards: {rewards.toFixed(4)}</p>
                        {isLocked && (
                          <p className="text-[#BDDBDB] text-xs opacity-50">🔒 Locked until {new Date(pos.unlocked_at!).toLocaleDateString()}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {rewards > 0 && (
                          <button
                            onClick={() => handleClaim(pos.id)}
                            disabled={staking}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition disabled:opacity-50"
                          >
                            Claim
                          </button>
                        )}
                        {!isLocked && (
                          <button
                            onClick={() => handleUnstake(pos.id)}
                            disabled={staking}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition disabled:opacity-50"
                          >
                            Unstake
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
