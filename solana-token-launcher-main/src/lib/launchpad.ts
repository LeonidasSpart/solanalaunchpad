import { Keypair, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

export function getLaunchpadKeypair(): Keypair {
  const privateKeyStr = process.env.PLATFORM_PRIVATE_KEY;
  if (!privateKeyStr) {
    throw new Error('PLATFORM_PRIVATE_KEY is missing');
  }
  const clean = privateKeyStr.replace(/\s/g, '');
  const buffer = Buffer.from(clean, 'base64');
  if (buffer.length !== 64) {
    throw new Error(`Invalid private key length: ${buffer.length} bytes (expected 64)`);
  }
  return Keypair.fromSecretKey(new Uint8Array(buffer));
}

export function getFeeWalletPubkey(): PublicKey {
  const pubkeyStr = process.env.NEXT_PUBLIC_FEE_REC;
  if (!pubkeyStr) throw new Error('NEXT_PUBLIC_FEE_REC missing');
  return new PublicKey(pubkeyStr);
}
