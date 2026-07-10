import { Keypair, PublicKey } from '@solana/web3.js';

export function getLaunchpadKeypair(): Keypair {
  const privateKeyStr = process.env.PLATFORM_PRIVATE_KEY;
  if (!privateKeyStr) {
    throw new Error('PLATFORM_PRIVATE_KEY is missing');
  }
  
  // Try hex format first (128 chars, no special characters)
  const clean = privateKeyStr.replace(/\s/g, '');
  if (clean.length === 128) {
    const buffer = Buffer.from(clean, 'hex');
    if (buffer.length === 64) {
      return Keypair.fromSecretKey(new Uint8Array(buffer));
    }
  }
  
  // Try JSON array format
  try {
    const arr = JSON.parse(privateKeyStr);
    if (Array.isArray(arr) && arr.length === 64) {
      return Keypair.fromSecretKey(new Uint8Array(arr));
    }
  } catch {
    // Not JSON
  }
  
  // Try base64
  const b64Buffer = Buffer.from(clean, 'base64');
  if (b64Buffer.length === 64) {
    return Keypair.fromSecretKey(new Uint8Array(b64Buffer));
  }
  
  throw new Error(`Invalid private key length: ${clean.length} chars (hex should be 128, base64 should be 88)`);
}

export function getFeeWalletPubkey(): PublicKey {
  const pubkeyStr = process.env.NEXT_PUBLIC_FEE_REC;
  if (!pubkeyStr) throw new Error('NEXT_PUBLIC_FEE_REC missing');
  return new PublicKey(pubkeyStr);
}
