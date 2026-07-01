'use client';

import { useContext } from 'react';
import { NetworkContext } from '@/providers/providers';

export default function NetworkSwitcher() {
  const { network, setNetwork } = useContext(NetworkContext);

  return (
    <div className="flex items-center gap-1 bg-[#0D0D0D]/50 rounded-xl p-1 border border-[#1a1a1a]">
      <button
        onClick={() => setNetwork('devnet')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          network === 'devnet'
            ? 'bg-[#FF2D2D] text-white shadow-lg shadow-[#FF2D2D]/25'
            : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
        }`}
      >
        🧪 Devnet
      </button>
      <button
        onClick={() => setNetwork('mainnet')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          network === 'mainnet'
            ? 'bg-[#FF2D2D] text-white shadow-lg shadow-[#FF2D2D]/25'
            : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
        }`}
      >
        🔴 Mainnet
      </button>
    </div>
  );
}
