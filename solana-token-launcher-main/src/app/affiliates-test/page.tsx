'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function AffiliatesTestPage() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const walletAddress = publicKey?.toBase58() || '';

  useEffect(() => {
    if (connected && walletAddress) {
      fetch(`/api/affiliate/stats?wallet=${walletAddress}`)
        .then(res => res.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setData(null);
      setLoading(false);
    }
  }, [connected, walletAddress]);

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Affiliate Program</h1>
        <button
          onClick={() => setVisible(true)}
          className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-white mb-4">Affiliate Dashboard</h1>
      <pre className="bg-[#0D0D0D] p-4 rounded-xl text-[#BDDBDB] text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
