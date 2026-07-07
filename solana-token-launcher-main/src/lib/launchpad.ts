import { Keypair, PublicKey } from '@solana/web3.js';

export function getLaunchpadKeypair(): Keypair {
  const privateKeyBase64 = process.env.LAUNCHPAD_PRIVATE_KEY!;
  const secretKey = Buffer.from(privateKeyBase64, 'base64');
  return Keypair.fromSecretKey(secretKey);
}

export function getFeeWalletPubkey(): PublicKey {
  return new PublicKey(process.env.NEXT_PUBLIC_FEE_REC!);
}
