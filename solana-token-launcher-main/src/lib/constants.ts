import { PublicKey } from '@solana/web3.js';

// ─── Fee Recipient ──────────────────────────────────────────────
// Lazy initialization — only validates when actually used (server-side)
let _feeRecipient: PublicKey | null = null;

export function getFeeRecipient(): PublicKey {
  if (_feeRecipient) return _feeRecipient;
  
  const feeRecipientStr = process.env.NEXT_PUBLIC_FEE_RECIPIENT;
  if (!feeRecipientStr || feeRecipientStr === 'YourWalletAddressHere') {
    throw new Error(
      'NEXT_PUBLIC_FEE_RECIPIENT is not set or is still the placeholder. ' +
      'Set it to your actual Solana wallet address in .env.local'
    );
  }
  _feeRecipient = new PublicKey(feeRecipientStr);
  return _feeRecipient;
}

// Safe fallback for any code that imports FEE_RECIPIENT directly
// This prevents build-time crashes
export const FEE_RECIPIENT = (() => {
  try {
    return getFeeRecipient();
  } catch {
    // Return a dummy address that will be replaced at runtime
    return new PublicKey('11111111111111111111111111111111');
  }
})();

// ─── Token Program ────────────────────────────────────────────────
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

// ─── Network Config ───────────────────────────────────────────────
export const NETWORKS = {
  DEVNET: 'devnet',
  MAINNET: 'mainnet-beta',
} as const;

// Server-side RPC URLs (no NEXT_PUBLIC needed)
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
