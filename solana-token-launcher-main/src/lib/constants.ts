import { PublicKey } from '@solana/web3.js';

// ─── Fee Recipient ──────────────────────────────────────────────
// This is PUBLIC by design — users need to verify where fees go
const feeRecipientStr = process.env.NEXT_PUBLIC_FEE_RECIPIENT;
if (!feeRecipientStr || feeRecipientStr === 'YourWalletAddressHere') {
  throw new Error(
    'NEXT_PUBLIC_FEE_RECIPIENT is not set or is still the placeholder. ' +
    'Set it to your actual Solana wallet address in .env.local'
  );
}
export const FEE_RECIPIENT = new PublicKey(feeRecipientStr);

// ─── Token Program ────────────────────────────────────────────────
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

// ─── Network Config ───────────────────────────────────────────────
export const NETWORKS = {
  DEVNET: 'devnet',
  MAINNET: 'mainnet-beta',
} as const;

// Use server-side env vars (not NEXT_PUBLIC) for RPC URLs
// These are read at build time for SSR, or server-side for API routes
export const RPC_URLS = {
  [NETWORKS.DEVNET]:
    process.env.RPC_URL_DEVNET ||
    process.env.NEXT_PUBLIC_RPC_URL_DEVNET ||
    'https://api.devnet.solana.com',
  [NETWORKS.MAINNET]:
    process.env.RPC_URL_MAINNET ||
    process.env.NEXT_PUBLIC_RPC_URL_MAINNET ||
    'https://api.mainnet-beta.solana.com',
};

// ─── Default Network ────────────────────────────────────────────
export const DEFAULT_NETWORK =
  process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'devnet';
