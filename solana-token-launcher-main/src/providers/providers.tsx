'use client';

import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

export interface ProvidersProps {
  children: React.ReactNode;
}

export const NetworkContext = React.createContext({
  network: 'devnet',
  setNetwork: (network: string) => {},
  endpoint: 'https://api.devnet.solana.com',
});

export function Providers({ children }: ProvidersProps) {
  const [network, setNetwork] = useState('devnet');

  const endpoint = useMemo(() => {
    if (network === 'mainnet') {
      return process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com';
    }
    return process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://api.devnet.solana.com';
  }, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
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
