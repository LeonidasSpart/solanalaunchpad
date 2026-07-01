'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle, 
  Lock,
  Info,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { burnLPTokens, fetchLPTokens, LPToken } from '@/lib/burn-lp';

export default function BurnLPPage() {
  const { connected, publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  const [network, setNetwork] = useState<'devnet' | 'mainnet'>('mainnet');
  
  useEffect(() => {
    const rpcUrl = connection.rpcEndpoint;
    if (rpcUrl.includes('devnet')) {
      setNetwork('devnet');
    } else {
      setNetwork('mainnet');
    }
  }, [connection]);
  
  const [lpTokens, setLpTokens] = useState<LPToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<LPToken | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [burnComplete, setBurnComplete] = useState(false);
  const [txSignature, setTxSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const loadLPTokens = useCallback(async () => {
    if (!publicKey || !connection) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const tokens = await fetchLPTokens(connection, publicKey, network);
      setLpTokens(tokens);
    } catch (err: any) {
      setError(err.message || 'Failed to load LP tokens.');
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, network]);

  useEffect(() => {
    if (connected && publicKey) {
      loadLPTokens();
    } else {
      setLpTokens([]);
      setSelectedToken(null);
    }
  }, [connected, publicKey, network, loadLPTokens]);

  const handleBurn = async () => {
    if (!selectedToken || !isConfirmed || !publicKey || !signTransaction) {
      setError('Please connect your wallet and confirm the burn.');
      return;
    }

    setIsBurning(true);
    setError('');

    try {
      const signature = await burnLPTokens({
        connection,
        wallet: publicKey,
        signTransaction,
        lpToken: selectedToken,
      });

      setTxSignature(signature);
      setBurnComplete(true);
      await loadLPTokens();
    } catch (err: any) {
      setError(err.message || 'Transaction failed. Please try again.');
    } finally {
      setIsBurning(false);
    }
  };

  const resetForm = () => {
    setSelectedToken(null);
    setIsConfirmed(false);
    setBurnComplete(false);
    setTxSignature('');
    setError('');
  };

  const getExplorerUrl = (sig: string) => {
    return network === 'devnet' 
      ? `https://explorer.solana.com/tx/${sig}?cluster=devnet`
      : `https://solscan.io/tx/${sig}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Flame className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">
              Liquidity Locker
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Burn Your <span className="text-[#FF2D2D]">LP Tokens</span>
          </h1>
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            Permanently lock your liquidity by burning LP tokens. The ultimate trust signal for your community.
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#FF2D2D] font-semibold mb-2">This is irreversible</h3>
              <p className="text-[#BDDBDB] text-sm leading-relaxed">
                Burning LP tokens destroys them permanently. The liquidity stays locked in the pool forever. 
                No one — including you — can ever withdraw it. This is the strongest possible signal that you cannot rug pull.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-2xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
                <p className="text-[#FF2D2D] text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!connected ? (
          /* Wallet Not Connected */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FF2D2D]/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-[#FF2D2D]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
            <p className="text-[#BDDBDB] mb-8 max-w-md mx-auto">
              Connect your wallet to see your LP tokens and burn them permanently.
            </p>
            <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-8 !py-3 !font-semibold !text-white !shadow-lg !shadow-[#FF2D2D]/25" />
          </motion.div>
        ) : burnComplete ? (
          /* Burn Complete */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D0D0D] border border-[#FF2D2D]/20 rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#FF2D2D]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#FF2D2D]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">LP Tokens Burned!</h2>
            <p className="text-[#BDDBDB] mb-2">
              Your <span className="text-white font-semibold">{selectedToken?.name}</span> LP tokens have been permanently destroyed.
            </p>
            <p className="text-[#FF2D2D] text-sm mb-8">
              Liquidity is now locked forever. Your community can trust you.
            </p>
            
            <div className="bg-[#050505] rounded-xl p-4 mb-8 max-w-md mx-auto text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#BDDBDB]">Transaction</span>
                <a 
                  href={getExplorerUrl(txSignature)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF2D2D] hover:text-[#B10000] font-mono flex items-center gap-1 transition"
                >
                  {txSignature.slice(0, 4)}...{txSignature.slice(-4)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#BDDBDB]">Tokens Burned</span>
                <span className="text-white">{selectedToken?.balance.toLocaleString()} LP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#BDDBDB]">Pool</span>
                <span className="text-white">{selectedToken?.poolName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
              >
                Burn Another LP
              </button>
              <Link
                href="/tokens"
                className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] font-medium rounded-xl border border-[#1a1a1a] transition"
              >
                View Your Tokens
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Burn Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Step 1: Select LP Token */}
            <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center">
                    <span className="text-[#FF2D2D] font-bold">1</span>
                  </div>
                  <h3 className="text-white font-semibold">Select LP Token</h3>
                </div>
                <button
                  onClick={loadLPTokens}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-sm text-[#BDDBDB] hover:text-white transition"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[#BDDBDB]">Loading LP tokens...</p>
                </div>
              ) : lpTokens.length === 0 ? (
                <div className="text-center py-8 text-[#BDDBDB]">
                  <p>No LP tokens found in your wallet.</p>
                  <p className="text-sm mt-2">Add liquidity first on Raydium or Orca to see your LP tokens here.</p>
                  <div className="flex gap-3 justify-center mt-4">
                    <a 
                      href="https://raydium.io/liquidity-pools/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF2D2D] hover:text-[#B10000] text-sm flex items-center gap-1 transition"
                    >
                      Raydium <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://orca.so/pools" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF2D2D] hover:text-[#B10000] text-sm flex items-center gap-1 transition"
                    >
                      Orca <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {lpTokens.map((token) => (
                    <button
                      key={token.mint}
                      onClick={() => {
                        setSelectedToken(token);
                        setIsConfirmed(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedToken?.mint === token.mint
                          ? 'bg-[#FF2D2D]/10 border-[#FF2D2D]/50'
                          : 'bg-[#050505] border-[#1a1a1a] hover:border-[#FF2D2D]/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {token.logo ? (
                          <img 
                            src={token.logo} 
                            alt={token.symbol} 
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF2D2D]/20 to-[#FF2D2D]/20 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{token.symbol[0]}</span>
                          </div>
                        )}
                        <div className="text-left">
                          <div className="text-white font-medium">{token.name}</div>
                          <div className="text-[#BDDBDB] text-sm">{token.poolName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{token.balance.toLocaleString()} LP</div>
                        <div className="text-[#BDDBDB] text-sm">{token.value}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2: Confirm */}
            <AnimatePresence>
              {selectedToken && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center">
                      <span className="text-[#FF2D2D] font-bold">2</span>
                    </div>
                    <h3 className="text-white font-semibold">Confirm Burn</h3>
                  </div>

                  <div className="bg-[#050505] rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#BDDBDB] text-sm">LP Token</span>
                      <span className="text-white font-medium">{selectedToken.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#BDDBDB] text-sm">Balance</span>
                      <span className="text-white font-medium">{selectedToken.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#BDDBDB] text-sm">Pool</span>
                      <span className="text-white font-medium">{selectedToken.poolName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#BDDBDB] text-sm">Estimated Value</span>
                      <span className="text-[#FF2D2D] font-medium">{selectedToken.value}</span>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer mb-6">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded border border-[#1a1a1a] peer-checked:bg-[#FF2D2D] peer-checked:border-[#FF2D2D] transition-all flex items-center justify-center">
                        {isConfirmed && <CheckCircle className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </div>
                    <span className="text-[#BDDBDB] text-sm">
                      I understand this is <span className="text-[#FF2D2D] font-semibold">irreversible</span>. 
                      Once burned, these LP tokens are destroyed forever and the liquidity cannot be withdrawn by anyone.
                    </span>
                  </label>

                  <button
                    onClick={handleBurn}
                    disabled={!isConfirmed || isBurning}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                      isConfirmed && !isBurning
                        ? 'bg-[#FF2D2D] hover:bg-[#B10000] text-white shadow-lg shadow-[#FF2D2D]/25'
                        : 'bg-[#1a1a1a] text-[#BDDBDB] cursor-not-allowed'
                    }`}
                  >
                    {isBurning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Burning LP Tokens...
                      </>
                    ) : (
                      <>
                        <Flame className="h-5 w-5" />
                        Burn LP Tokens Permanently
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Box */}
            <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-2">What are LP tokens?</h4>
                  <p className="text-[#BDDBDB] text-sm leading-relaxed mb-3">
                    When you add liquidity to a pool (e.g., on Raydium or Orca), the pool gives you LP tokens 
                    that act as a claim ticket on the SOL and tokens held in the pool. Whoever holds them can withdraw that liquidity.
                  </p>
                  <p className="text-[#BDDBDB] text-sm leading-relaxed">
                    <span className="text-[#FF2D2D] font-semibold">Burning them destroys the ticket</span>, so the liquidity stays 
                    locked in the pool permanently. This is the strongest trust signal you can give your community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
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
