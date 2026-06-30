import { PublicKey } from '@solana/web3.js';

// Validate fee recipient at startup
const feeRecipientStr = process.env.NEXT_PUBLIC_FEE_RECIPIENT;
if (!feeRecipientStr || feeRecipientStr === 'YourWalletAddressHere') {
  throw new Error(
    'NEXT_PUBLIC_FEE_RECIPIENT is not set or is still the placeholder. ' +
    'Set it to your actual Solana wallet address in .env.local'
  );
}

export const FEE_RECIPIENT = new PublicKey(feeRecipientStr);

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export const NETWORKS = {
  DEVNET: 'devnet',
  MAINNET: 'mainnet-beta',
} as const;

export const RPC_URLS = {
  [NETWORKS.DEVNET]: process.env.NEXT_PUBLIC_RPC_URL_DEVNET || 'https://api.devnet.solana.com',
  [NETWORKS.MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com',
};
