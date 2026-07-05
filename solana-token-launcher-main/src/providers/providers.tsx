'use client';

import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TrustWalletAdapter,
  TorusWalletAdapter,
  CoinbaseWalletAdapter,
  // BackpackWalletAdapter, // ❌ Not available in this version – update package to use it
  AlphaWalletAdapter, // Fallback for any wallet
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
    const endpoints = RPC_ENDPOINTS[network as keyof typeof RPC_ENDPOINTS];
    return endpoints && endpoints.length > 0 ? endpoints[0] : 'https://api.devnet.solana.com';
  }, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new TrustWalletAdapter(),
      new TorusWalletAdapter(),
      new CoinbaseWalletAdapter(),
      // new BackpackWalletAdapter(), // Uncomment after updating the package
      new AlphaWalletAdapter(), // Fallback – works with Phantom, Solflare, etc.
    ],
    []
  );

  return (
    <NetworkContext.Provider value={{ network, setNetwork, endpoint }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NetworkContext.Provider>
  );
}
