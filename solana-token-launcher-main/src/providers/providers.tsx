'use client';

import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';

export interface ProvidersProps {
  children: React.ReactNode;
}

export const NetworkContext = React.createContext<{
  network: string;
  setNetwork: (network: string) => void;
  endpoint: string;
}>({
  network: 'devnet',
  setNetwork: () => {},
  endpoint: 'https://api.devnet.solana.com',
});

// Fallback RPC endpoints
const RPC_ENDPOINTS = {
  devnet: [
    process.env.NEXT_PUBLIC_RPC_URL_DEVNET,
    'https://api.devnet.solana.com',
  ].filter(Boolean) as string[],
  mainnet: [
    process.env.NEXT_PUBLIC_RPC_URL_MAINNET,
    'https://api.mainnet-beta.solana.com',
  ].filter(Boolean) as string[],
};

export function Providers({ children }: ProvidersProps) {
  const [network, setNetwork] = useState('devnet');

  const endpoint = useMemo(() => {
    return RPC_ENDPOINTS[network as keyof typeof RPC_ENDPOINTS][0];
  }, [network]);

  // Only non-custodial wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <NetworkContext.Provider value={{ network, setNetwork, endpoint }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={false}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NetworkContext.Provider>
  );
}
