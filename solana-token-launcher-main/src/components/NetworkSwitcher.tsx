'use client';

import { useContext } from 'react';
import { NetworkContext } from '@/providers/providers';

export default function NetworkSwitcher() {
  const { network, setNetwork } = useContext(NetworkContext);

  return (
    <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-zinc-800">
      <button
        onClick={() => setNetwork('devnet')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
          network === 'devnet'
            ? 'bg-purple-600 text-white'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
        }`}
      >
        🧪 Devnet
      </button>
      <button
        onClick={() => setNetwork('mainnet')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
          network === 'mainnet'
            ? 'bg-purple-600 text-white'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
        }`}
      >
        🔴 Mainnet
      </button>
    </div>
  );
}
