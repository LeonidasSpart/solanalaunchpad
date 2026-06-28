import { PublicKey } from '@solana/web3.js';

export const FEE_RECIPIENT = new PublicKey(
  process.env.NEXT_PUBLIC_FEE_RECIPIENT || 'YourWalletAddressHere'
);

export const CREATION_FEE_SOL = 0.5;

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export const NETWORKS = {
  DEVNET: 'devnet',
  MAINNET: 'mainnet-beta',
};

export const RPC_URLS = {
  [NETWORKS.DEVNET]: process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://api.devnet.solana.com',
  [NETWORKS.MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com',
};
