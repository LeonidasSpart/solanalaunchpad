// src/lib/solana.ts
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { getMint, getAssociatedTokenAddress, getAccount } from '@solana/spl-token';

export function getConnection(): Connection {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const url = network === 'mainnet'
    ? process.env.RPC_URL_MAINNET
    : process.env.RPC_URL_DEVNET;
  if (!url) throw new Error(`RPC URL for ${network} not set`);
  return new Connection(url, 'confirmed');
}

export async function getDecimals(mint: PublicKey): Promise<number> {
  const connection = getConnection();
  const mintInfo = await getMint(connection, mint);
  return mintInfo.decimals;
}

export function getPlatformKeypair(): Keypair {
  const privateKeyBase64 = process.env.PLATFORM_PRIVATE_KEY!;
  const privateKeyBuffer = Buffer.from(privateKeyBase64, 'base64');
  return Keypair.fromSecretKey(privateKeyBuffer);
}

// optional: balance helper
export async function getTokenBalance(owner: PublicKey, mint: PublicKey): Promise<number> {
  const connection = getConnection();
  const ata = await getAssociatedTokenAddress(mint, owner);
  try {
    const account = await getAccount(connection, ata);
    const decimals = await getDecimals(mint);
    return Number(account.amount) / Math.pow(10, decimals);
  } catch {
    return 0;
  }
}
