'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  ExternalLink,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { fetchTokenAuthorities, revokeAuthorities } from '@/lib/revoke-authority';

export default function RevokePage() {
  const { connected, publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  const [mintAddress, setMintAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txSignature, setTxSignature] = useState('');
  const [revokeMint, setRevokeMint] = useState(false);
  const [revokeFreeze, setRevokeFreeze] = useState(false);
  const [revokeUpdate, setRevokeUpdate] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const handleFetch = useCallback(async () => {
    if (!mintAddress || mintAddress.length < 32) {
      setError('Please enter a valid mint address.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setTokenInfo(null);
    setRevokeMint(false);
    setRevokeFreeze(false);
    setRevokeUpdate(false);
    setIsConfirmed(false);

    try {
      const info = await fetchTokenAuthorities(connection, mintAddress);
      setTokenInfo(info);
      // Auto-check revoke for active authorities
      setRevokeMint(info.mintAuthority !== null);
      setRevokeFreeze(info.freezeAuthority !== null);
      setRevokeUpdate(info.updateAuthority !== null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch token info. Check the mint address and network.');
    } finally {
      setLoading(false);
    }
  }, [mintAddress, connection]);

  const handleRevoke = async () => {
    if (!tokenInfo || !publicKey || !signTransaction) {
      setError('Please connect your wallet and ensure token info is loaded.');
      return;
    }

    // Check if at least one authority is selected to revoke
    if (!revokeMint && !revokeFreeze && !revokeUpdate) {
      setError('Please select at least one authority to revoke.');
      return;
    }

    setIsRevoking(true);
    setError('');
    setSuccess('');

    try {
      const signature = await revokeAuthorities({
        connection,
        wallet: publicKey,
        signTransaction,
        mint: tokenInfo.mint,
        revokeMint,
        revokeFreeze,
        revokeUpdate,
      });

      setTxSignature(signature);
      setSuccess(`Authorities revoked successfully!`);
      // Refresh token info
      const updated = await fetchTokenAuthorities(connection, tokenInfo.mint);
      setTokenInfo(updated);
    } catch (err: any) {
      setError(err.message || 'Revocation failed. Please try again.');
    } finally {
      setIsRevoking(false);
    }
  };

  const getExplorerUrl = (sig: string) => {
    const network = connection.rpcEndpoint.includes('devnet') ? 'devnet' : 'mainnet';
    return network === 'devnet' 
      ? `https://explorer.solana.com/tx/${sig}?cluster=devnet`
      : `https://solscan.io/tx/${sig}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">
              Authority Revocation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Revoke <span className="text-[#FF2D2D]">Authorities</span>
          </h1>
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            Permanently give up control over your token. This builds trust and proves you cannot manipulate the token.
          </p>
        </motion.div>

        {!connected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FF2D2D]/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-[#FF2D2D]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
            <p className="text-[#BDDBDB] mb-8 max-w-md mx-auto">
              Connect your wallet to check token authorities and revoke them.
            </p>
            <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-8 !py-3 !font-semibold !text-white !shadow-lg !shadow-[#FF2D2D]/25" />
          </motion.div>
        ) : (
          <>
            {/* Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6 mb-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-white font-medium mb-2">Token Mint Address</label>
                  <input
                    type="text"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.target.value)}
                    placeholder="Enter token mint address..."
                    className="w-full bg-[#050505] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleFetch}
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Checking...' : 'Check Token'}
                  </button>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-2xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
                  <p className="text-[#FF2D2D] text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {tokenInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Token Info */}
                <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Token Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#BDDBDB]">Name</span>
                      <p className="text-white font-medium">{tokenInfo.name}</p>
                    </div>
                    <div>
                      <span className="text-[#BDDBDB]">Symbol</span>
                      <p className="text-white font-medium">{tokenInfo.symbol}</p>
                    </div>
                    <div>
                      <span className="text-[#BDDBDB]">Decimals</span>
                      <p className="text-white font-medium">{tokenInfo.decimals}</p>
                    </div>
                    <div>
                      <span className="text-[#BDDBDB]">Mint</span>
                      <p className="text-white font-mono text-xs truncate">{tokenInfo.mint}</p>
                    </div>
                  </div>
                </div>

                {/* Authorities */}
                <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Current Authorities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                      <span className="text-white">✏️ Mint Authority</span>
                      <span className={tokenInfo.mintAuthority ? 'text-green-400' : 'text-[#BDDBDB]'}>
                        {tokenInfo.mintAuthority ? '✅ Active' : '❌ Revoked'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                      <span className="text-white">❄️ Freeze Authority</span>
                      <span className={tokenInfo.freezeAuthority ? 'text-green-400' : 'text-[#BDDBDB]'}>
                        {tokenInfo.freezeAuthority ? '✅ Active' : '❌ Revoked'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                      <span className="text-white">🔄 Update Authority</span>
                      <span className={tokenInfo.updateAuthority ? 'text-green-400' : 'text-[#BDDBDB]'}>
                        {tokenInfo.updateAuthority ? '✅ Active' : '❌ Revoked'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Revoke Selection */}
                <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Select Authorities to Revoke</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={revokeMint}
                        onChange={(e) => setRevokeMint(e.target.checked)}
                        disabled={!tokenInfo.mintAuthority}
                        className="accent-[#FF2D2D] w-4 h-4"
                      />
                      <span className="text-[#BDDBDB]">Revoke Mint Authority</span>
                      {!tokenInfo.mintAuthority && <span className="text-xs text-[#BDDBDB] opacity-50">(Already revoked)</span>}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={revokeFreeze}
                        onChange={(e) => setRevokeFreeze(e.target.checked)}
                        disabled={!tokenInfo.freezeAuthority}
                        className="accent-[#FF2D2D] w-4 h-4"
                      />
                      <span className="text-[#BDDBDB]">Revoke Freeze Authority</span>
                      {!tokenInfo.freezeAuthority && <span className="text-xs text-[#BDDBDB] opacity-50">(Already revoked)</span>}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={revokeUpdate}
                        onChange={(e) => setRevokeUpdate(e.target.checked)}
                        disabled={!tokenInfo.updateAuthority}
                        className="accent-[#FF2D2D] w-4 h-4"
                      />
                      <span className="text-[#BDDBDB]">Revoke Update Authority</span>
                      {!tokenInfo.updateAuthority && <span className="text-xs text-[#BDDBDB] opacity-50">(Already revoked)</span>}
                    </label>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      className="accent-[#FF2D2D] w-4 h-4 mt-1"
                    />
                    <span className="text-[#BDDBDB] text-sm">
                      I understand this is <span className="text-[#FF2D2D] font-semibold">permanent</span>. 
                      Revoking authorities cannot be undone.
                    </span>
                  </label>

                  <button
                    onClick={handleRevoke}
                    disabled={!isConfirmed || isRevoking || (!revokeMint && !revokeFreeze && !revokeUpdate)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-[#FF2D2D] hover:bg-[#B10000] text-white shadow-lg shadow-[#FF2D2D]/25"
                  >
                    {isRevoking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Revoking...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Revoke Selected Authorities
                      </>
                    )}
                  </button>
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-400">{success}</p>
                        {txSignature && (
                          <a
                            href={getExplorerUrl(txSignature)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#FF2D2D] hover:text-[#B10000] flex items-center gap-1 mt-1"
                          >
                            View transaction <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#BDDBDB] text-sm">
            Need help? <Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">Contact us</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
