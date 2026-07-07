import { PublicKey } from '@solana/web3.js';
import { getTokenBalance } from './solana';

export async function getVotingPower(wallet: string, mint: string): Promise<number> {
  const owner = new PublicKey(wallet);
  const mintPubkey = new PublicKey(mint);
  return await getTokenBalance(owner, mintPubkey);
}
