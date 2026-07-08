// src/lib/raydium.ts
import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { getConnection, getPlatformKeypair } from './solana';

async function getTokenDecimals(connection: Connection, mint: PublicKey): Promise<number> {
  const info = await connection.getParsedAccountInfo(mint);
  if (info.value && info.value.data) {
    const data = info.value.data as any;
    if (data.parsed && data.parsed.info) {
      return data.parsed.info.decimals || 9;
    }
  }
  return 9;
}

export async function buildCreatePoolAndLockTransaction(
  tokenMint: PublicKey,
  solAmount: number,
  tokenAmount: number,
  creator: PublicKey,
  lockWallet: PublicKey,
  connection: Connection
): Promise<{ transaction: Transaction; poolAddress: PublicKey; lpMint: PublicKey }> {
  // Dynamic import to avoid build-time resolution issues
  const { Raydium } = await import('@raydium-io/raydium-sdk-v2');

  const platformKeypair = getPlatformKeypair();
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet' ? 'mainnet' : 'devnet';
  const raydium = await Raydium.load({
    connection,
    owner: platformKeypair,
    cluster: network,
  });

  const decimals = await getTokenDecimals(connection, tokenMint);
  const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
  const solAmountRaw = solAmount * 1e9;

  const wsolMint = new PublicKey('So11111111111111111111111111111111111111112');
  const solToken = new Token(connection, wsolMint, TOKEN_PROGRAM_ID, platformKeypair);
  const token = new Token(connection, tokenMint, TOKEN_PROGRAM_ID, platformKeypair);

  const { tx: poolTx, poolId, lpMint, lpAmount } = await raydium.pool.create({
    baseToken: solToken,
    quoteToken: token,
    baseAmount: solAmountRaw,
    quoteAmount: tokenAmountRaw,
    startTime: Math.floor(Date.now() / 1000),
  });

  const platformLpAta = await getAssociatedTokenAddress(lpMint, platformKeypair.publicKey);
  const lockLpAta = await getAssociatedTokenAddress(lpMint, lockWallet);

  const transferIx = createTransferInstruction(
    platformLpAta,
    lockLpAta,
    platformKeypair.publicKey,
    lpAmount,
    [],
    TOKEN_PROGRAM_ID
  );

  const tx = new Transaction();
  tx.add(...poolTx.instructions);
  tx.add(transferIx);

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = creator;

  return {
    transaction: tx,
    poolAddress: poolId,
    lpMint: lpMint,
  };
}
