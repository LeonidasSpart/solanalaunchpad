import { Keypair, PublicKey } from '@solana/web3.js';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getLaunchpadKeypair(): Keypair {
  // Try multiple possible paths for the key file
  const possiblePaths = [
    '/app/.secrets/platform_key.hex',
    join(process.cwd(), '.secrets', 'platform_key.hex'),
    join(process.cwd(), '..', '.secrets', 'platform_key.hex'),
  ];

  for (const keyPath of possiblePaths) {
    try {
      const hexStr = readFileSync(keyPath, 'utf-8').replace(/\s/g, '');
      if (hexStr.length === 128) {
        const buffer = Buffer.from(hexStr, 'hex');
        if (buffer.length === 64) {
          return Keypair.fromSecretKey(new Uint8Array(buffer));
        }
      }
    } catch {
      // File not found at this path, try next
    }
  }

  // Fallback to env var
  const privateKeyStr = process.env.PLATFORM_PRIVATE_KEY;
  if (!privateKeyStr) {
    throw new Error('PLATFORM_PRIVATE_KEY is missing and .secrets/platform_key.hex not found');
  }

  const clean = privateKeyStr.replace(/\s/g, '');
  
  if (clean.length === 128) {
    const buffer = Buffer.from(clean, 'hex');
    if (buffer.length === 64) {
      return Keypair.fromSecretKey(new Uint8Array(buffer));
    }
  }

  try {
    const arr = JSON.parse(privateKeyStr);
    if (Array.isArray(arr) && arr.length === 64) {
      return Keypair.fromSecretKey(new Uint8Array(arr));
    }
  } catch {
    // Not JSON
  }

  const b64Buffer = Buffer.from(clean, 'base64');
  if (b64Buffer.length === 64) {
    return Keypair.fromSecretKey(new Uint8Array(b64Buffer));
  }

  throw new Error(`Invalid private key length: ${clean.length} chars`);
}

export function getFeeWalletPubkey(): PublicKey {
  const pubkeyStr = process.env.NEXT_PUBLIC_FEE_REC;
  if (!pubkeyStr) throw new Error('NEXT_PUBLIC_FEE_REC missing');
  return new PublicKey(pubkeyStr);
}
