'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

interface WalletGuardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function WalletGuard({ 
  children, 
  title = 'Connect Your Wallet',
  description = 'Please connect your wallet to access this feature.',
  icon
}: WalletGuardProps) {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          {icon || <Wallet className="h-12 w-12 text-[#FF2D2D] mx-auto mb-4" />}
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-[#BDDBDB] mb-6">{description}</p>
          <div className="[&>button]:!bg-[#FF2D2D] [&>button]:hover:!bg-[#B10000] [&>button]:!rounded-xl [&>button]:!px-6 [&>button]:!py-3 [&>button]:!font-semibold [&>button]:!text-white">
            <WalletMultiButton />
          </div>
          <p className="text-[#BDDBDB] opacity-50 text-xs mt-4">
            Your wallet is only used to sign transactions. We never see or store your private keys.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
