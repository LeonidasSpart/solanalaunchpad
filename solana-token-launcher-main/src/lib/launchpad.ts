import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

/**
 * Returns the launchpad keypair.
 * Must set LAUNCHPAD_PRIVATE_KEY in environment (base58 string).
 * Falls back to PLATFORM_PRIVATE_KEY if LAUNCHPAD_PRIVATE_KEY is not set.
 */
export function getLaunchpadKeypair(): Keypair {
  const privateKeyStr = process.env.LAUNCHPAD_PRIVATE_KEY || process.env.PLATFORM_PRIVATE_KEY;

  if (!privateKeyStr) {
    throw new Error(
      'Missing LAUNCHPAD_PRIVATE_KEY or PLATFORM_PRIVATE_KEY in environment.\n' +
      'Please set one of these variables to the base58 private key of the launchpad wallet.'
    );
  }

  // Clean the string – remove whitespace and newlines
  const clean = privateKeyStr.trim().replace(/\s/g, '');

  // Try to decode as base58 (most common)
  let secretKey: Uint8Array;
  try {
    secretKey = bs58.decode(clean);
    if (secretKey.length !== 64) {
      throw new Error(`Expected 64 bytes, got ${secretKey.length}`);
    }
    return Keypair.fromSecretKey(secretKey);
  } catch (e) {
    // If base58 fails, try base64
    try {
      const buffer = Buffer.from(clean, 'base64');
      if (buffer.length !== 64) {
        throw new Error(`Expected 64 bytes, got ${buffer.length}`);
      }
      secretKey = new Uint8Array(buffer);
      return Keypair.fromSecretKey(secretKey);
    } catch {
      // If base64 fails, try hex
      try {
        const buffer = Buffer.from(clean, 'hex');
        if (buffer.length !== 64) {
          throw new Error(`Expected 64 bytes, got ${buffer.length}`);
        }
        secretKey = new Uint8Array(buffer);
        return Keypair.fromSecretKey(secretKey);
      } catch (e2) {
        throw new Error(
          `Invalid private key format. Expected base58, base64, or hex (64 bytes).\n` +
          `Received: "${clean.slice(0, 20)}..."\n` +
          `Please ensure LAUNCHPAD_PRIVATE_KEY is set correctly in Railway environment variables.`
        );
      }
    }
  }
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
