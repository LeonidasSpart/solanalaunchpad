import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

// ─── HARDCODED FALLBACK (Devnet only) ──────────────────────────────────
// This private key corresponds to the public key:
// HkkXDw3RJC1GpJCC4wYKUMfeHYyX8yPKzh2g0Hk1knPM
// Use this only for testing – in production, set LAUNCHPAD_PRIVATE_KEY in Railway.
const FALLBACK_PRIVATE_KEY = '47Vw7k5W3h2TZfEeGdWvWxSdxJYaSXPemqXDCGqEUatS9nu6dhxG95LYUpVXJdFnhsnqp2p8wk1GsFvyJZxxgb';

/**
 * Returns the launchpad keypair.
 * Priority:
 * 1. LAUNCHPAD_PRIVATE_KEY (base58 string) from env
 * 2. PLATFORM_PRIVATE_KEY (base58 string) from env
 * 3. Hardcoded fallback (for testing only)
 */
export function getLaunchpadKeypair(): Keypair {
  // Read private key from environment
  let privateKeyStr = process.env.LAUNCHPAD_PRIVATE_KEY || process.env.PLATFORM_PRIVATE_KEY;

  // If no env var, use the hardcoded fallback
  if (!privateKeyStr) {
    console.warn('⚠️ No LAUNCHPAD_PRIVATE_KEY or PLATFORM_PRIVATE_KEY found in env. Using hardcoded fallback (Devnet only).');
    privateKeyStr = FALLBACK_PRIVATE_KEY;
  }

  // Clean the string (remove whitespace, newlines, etc.)
  const clean = privateKeyStr.trim().replace(/\s/g, '');

  // Try to decode as base58 (most common)
  let secretKey: Uint8Array;
  try {
    secretKey = bs58.decode(clean);
    if (secretKey.length === 64) {
      return Keypair.fromSecretKey(secretKey);
    }
  } catch {
    // fall through
  }

  // Try base64
  try {
    const buffer = Buffer.from(clean, 'base64');
    if (buffer.length === 64) {
      secretKey = new Uint8Array(buffer);
      return Keypair.fromSecretKey(secretKey);
    }
  } catch {
    // fall through
  }

  // Try hex
  try {
    const buffer = Buffer.from(clean, 'hex');
    if (buffer.length === 64) {
      secretKey = new Uint8Array(buffer);
      return Keypair.fromSecretKey(secretKey);
    }
  } catch {
    // fall through
  }

  // If all fail, throw with a clear message
  throw new Error(
    `Invalid private key format. Expected base58, base64, or hex (64 bytes). Received: "${clean.slice(0, 20)}..."`
  );
}

/**
 * Returns the fee wallet public key.
 * Uses NEXT_PUBLIC_FEE_REC from environment.
 */
export function getFeeWalletPubkey(): PublicKey {
  const pubkeyStr = process.env.NEXT_PUBLIC_FEE_REC;
  if (!pubkeyStr) {
    throw new Error('NEXT_PUBLIC_FEE_REC environment variable is missing');
  }
  return new PublicKey(pubkeyStr);
}
