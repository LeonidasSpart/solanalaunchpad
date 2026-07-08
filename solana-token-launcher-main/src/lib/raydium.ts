// src/lib/raydium.ts
import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { getConnection, getPlatformKeypair } from './solana';

// Helper: get token decimals
async function getTokenDecimals(connection: Connection, mint: PublicKey): Promise<number> {
  const info = await connection.getParsedAccountInfo(mint);
  if (info.value && info.value.data) {
    const data = info.value.data as any;
    if (data.parsed && data.parsed.info) {
      return data.parsed.info.decimals || 9;
    }
  }
  return 9; // fallback
}

export async function buildCreatePoolAndLockTransaction(
  tokenMint: PublicKey,
  solAmount: number,        // in SOL (e.g., 50)
  tokenAmount: number,      // in token units (e.g., 1000000)
  creator: PublicKey,
  lockWallet: PublicKey,
  connection: Connection
): Promise<{ transaction: Transaction; poolAddress: PublicKey; lpMint: PublicKey }> {
  // 1. Initialize platform keypair and Raydium
  const platformKeypair = getPlatformKeypair();
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet' ? 'mainnet' : 'devnet';
  const raydium = await Raydium.load({
    connection,
    owner: platformKeypair,
    cluster: network,
  });

  // 2. Get decimals
  const decimals = await getTokenDecimals(connection, tokenMint);
  const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
  const solAmountRaw = solAmount * 1e9; // SOL has 9 decimals

  // 3. Prepare token objects for Raydium
  const wsolMint = new PublicKey('So11111111111111111111111111111111111111112');
  const solToken = new Token(connection, wsolMint, TOKEN_PROGRAM_ID, platformKeypair);
  const token = new Token(connection, tokenMint, TOKEN_PROGRAM_ID, platformKeypair);

  // 4. Create the pool using Raydium SDK
  // The SDK returns a transaction with all instructions and the pool info.
  const { tx: poolTx, poolId, lpMint, lpAmount } = await raydium.pool.create({
    baseToken: solToken,
    quoteToken: token,
    baseAmount: solAmountRaw,
    quoteAmount: tokenAmountRaw,
    startTime: Math.floor(Date.now() / 1000), // start immediately
  });

  // 5. Build transfer instruction to lock LP tokens
  const platformLpAta = await getAssociatedTokenAddress(lpMint, platformKeypair.publicKey);
  const lockLpAta = await getAssociatedTokenAddress(lpMint, lockWallet);

  // The pool creation transaction mints LP tokens to the platform's LP account.
  // We transfer the entire LP supply (lpAmount) to the lock wallet.
  const transferIx = createTransferInstruction(
    platformLpAta,
    lockLpAta,
    platformKeypair.publicKey,
    lpAmount,                 // amount of LP tokens minted
    [],
    TOKEN_PROGRAM_ID
  );

  // 6. Combine the pool transaction and the transfer instruction
  const tx = new Transaction();
  // Add all instructions from the pool transaction (they are in poolTx.instructions)
  tx.add(...poolTx.instructions);
  // Add the transfer instruction
  tx.add(transferIx);

  // Set recent blockhash and fee payer
  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = creator;

  return {
    transaction: tx,
    poolAddress: poolId,
    lpMint: lpMint,
  };
}
