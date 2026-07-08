// src/lib/token-helpers.ts
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

/**
 * Get token decimals for a given mint
 */
export async function getTokenDecimals(
  connection: Connection,
  mint: PublicKey
): Promise<number> {
  try {
    const info = await connection.getParsedAccountInfo(mint);
    if (info.value && info.value.data) {
      const data = info.value.data as any;
      if (data.parsed && data.parsed.info) {
        return data.parsed.info.decimals || 9;
      }
    }
    return 9;
  } catch {
    return 9;
  }
}

/**
 * Get token balance of a wallet for a given mint
 */
export async function getTokenBalance(
  connection: Connection,
  wallet: PublicKey,
  mint: PublicKey
): Promise<number> {
  try {
    const ata = await getAssociatedTokenAddress(mint, wallet);
    const balance = await connection.getTokenAccountBalance(ata);
    return balance.value.uiAmount || 0;
  } catch {
    return 0;
  }
}

/**
 * Generate a Raydium URL for creating a pool with the given token mint
 */
export function getRaydiumUrl(mintAddress: string): string {
  return `https://raydium.io/liquidity/pool/create?mint=${mintAddress}`;
}
