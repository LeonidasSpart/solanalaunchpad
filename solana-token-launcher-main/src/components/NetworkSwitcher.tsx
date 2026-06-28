'use client';

import { useContext } from 'react';
import { NetworkContext } from '@/providers/providers';

export default function NetworkSwitcher() {
  const { network, setNetwork } = useContext(NetworkContext);

  return (
    <div className="flex items-center gap-2 bg-zinc-900 rounded-xl p-1 border border-zinc-800">
      <button
        onClick={() => setNetwork('devnet')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          network === 'devnet'
            ? 'bg-purple-600 text-white'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        🧪 Devnet
      </button>
      <button
        onClick={() => setNetwork('mainnet')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          network === 'mainnet'
            ? 'bg-purple-600 text-white'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        🔴 Mainnet
      </button>
    </div>
  );
}
