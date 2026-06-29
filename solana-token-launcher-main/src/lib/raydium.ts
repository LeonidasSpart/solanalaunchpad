import {
  Connection,
  PublicKey,
} from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export async function getTokenBalance(
  connection: Connection,
  wallet: PublicKey,
  mint: PublicKey
): Promise<number> {
  try {
    const ata = await getAssociatedTokenAddress(mint, wallet);
    const balance = await connection.getTokenAccountBalance(ata);
    return balance.value.uiAmount || 0;
  } catch (error) {
    return 0;
  }
}

export async function getTokenDecimals(
  connection: Connection,
  mint: PublicKey
): Promise<number> {
  try {
    const mintInfo = await connection.getParsedAccountInfo(mint);
    if (mintInfo.value && mintInfo.value.data) {
      const data = mintInfo.value.data as any;
      if (data.parsed && data.parsed.info) {
        return data.parsed.info.decimals || 9;
      }
    }
    return 9;
  } catch (error) {
    return 9;
  }
}

export function getRaydiumUrl(mintAddress: string): string {
  return `https://raydium.io/liquidity/pool/create?mint=${mintAddress}`;
}
