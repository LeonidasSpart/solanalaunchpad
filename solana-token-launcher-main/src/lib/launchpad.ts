import { Keypair, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

export function getLaunchpadKeypair(): Keypair {
  const privateKeyStr = process.env.LAUNCHPAD_PRIVATE_KEY || process.env.PLATFORM_PRIVATE_KEY;
  if (!privateKeyStr) {
    throw new Error('Missing LAUNCHPAD_PRIVATE_KEY or PLATFORM_PRIVATE_KEY');
  }

  // Remove all whitespace (spaces, newlines, tabs)
  const clean = privateKeyStr.replace(/\s/g, '');
  
  // Log the length for debugging – you'll see this in Railway logs
  console.log('Private key length (chars):', clean.length);
  console.log('First 20 chars:', clean.slice(0, 20));

  // Decode from base64 (this is what you have in Railway)
  const buffer = Buffer.from(clean, 'base64');
  console.log('Decoded buffer length (bytes):', buffer.length);

  if (buffer.length !== 64) {
    throw new Error(`Invalid private key length: ${buffer.length} bytes, expected 64.`);
  }

  return Keypair.fromSecretKey(new Uint8Array(buffer));
}

export function getFeeWalletPubkey(): PublicKey {
  const pubkeyStr = process.env.NEXT_PUBLIC_FEE_REC;
  if (!pubkeyStr) throw new Error('NEXT_PUBLIC_FEE_REC missing');
  return new PublicKey(pubkeyStr);
}
