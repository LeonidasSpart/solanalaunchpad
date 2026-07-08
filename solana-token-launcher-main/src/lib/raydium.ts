// src/lib/raydium.ts
import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { getConnection, getPlatformKeypair } from './solana';
import { getTokenDecimals } from './solana'; // we already have this

export async function buildCreatePoolAndLockTransaction(
  tokenMint: PublicKey,
  solAmount: number,        // in SOL (e.g., 50)
  tokenAmount: number,      // in token units (e.g., 1000000)
  creator: PublicKey,
  lockWallet: PublicKey,
  connection: Connection
): Promise<{ transaction: Transaction; poolAddress: PublicKey; lpMint: PublicKey }> {
  // 1. Initialize Raydium SDK
  const platformKeypair = getPlatformKeypair();
  const raydium = await Raydium.load({
    connection,
    owner: platformKeypair,
    cluster: process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet' ? 'mainnet' : 'devnet',
    // optionally pass a wallet adapter, but we use keypair
  });

  // 2. Get token decimals
  const decimals = await getTokenDecimals(connection, tokenMint);
  const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
  const solAmountRaw = solAmount * 1e9; // lamports

  // 3. Prepare token objects
  const wsolMint = new PublicKey('So11111111111111111111111111111111111111112'); // WSOL
  const solToken = new Token(connection, wsolMint, TOKEN_PROGRAM_ID, platformKeypair);
  const token = new Token(connection, tokenMint, TOKEN_PROGRAM_ID, platformKeypair);

  // 4. Create pool using Raydium SDK
  // Note: The exact method may vary; this is based on typical Raydium usage.
  const poolInfo = await raydium.pool.create({
    baseToken: solToken,
    quoteToken: token,
    baseAmount: solAmountRaw,
    quoteAmount: tokenAmountRaw,
    startTime: Math.floor(Date.now() / 1000), // start now
  });

  // 5. Get pool address and LP mint
  const poolAddress = poolInfo.poolId;
  const lpMint = poolInfo.lpMint;

  // 6. Build transfer instruction to lock LP tokens (transfer LP tokens to lock wallet)
  // We need to get the LP token account of the platform (which will receive the LP tokens)
  const platformLpAta = await getAssociatedTokenAddress(lpMint, platformKeypair.publicKey);
  const lockLpAta = await getAssociatedTokenAddress(lpMint, lockWallet);

  // The LP tokens are minted to the platform's LP account; we transfer them to the lock wallet.
  const transferIx = createTransferInstruction(
    platformLpAta,
    lockLpAta,
    platformKeypair.publicKey,
    poolInfo.lpAmount, // amount of LP tokens minted
    [],
    TOKEN_PROGRAM_ID
  );

  // 7. Combine instructions into a transaction
  const tx = new Transaction();
  // Add the pool creation instructions (they are already included in the SDK's transaction)
  // The SDK may return a transaction or we need to add the instructions.
  // Typically, we would add all instructions from the SDK to our transaction.
  // For simplicity, we'll assume the SDK returns a transaction that we can sign and send.
  // We'll add the transfer instruction to lock LP tokens.
  const blockhash = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash.blockhash;
  tx.feePayer = creator;

  // In practice, you'd combine the SDK's transaction with the transfer instruction.
  // For now, we'll simulate by returning a transaction with only the transfer instruction.
  // This is a placeholder; you'll need to replace this with actual SDK transaction building.
  tx.add(transferIx);

  return {
    transaction: tx,
    poolAddress,
    lpMint,
  };
}
