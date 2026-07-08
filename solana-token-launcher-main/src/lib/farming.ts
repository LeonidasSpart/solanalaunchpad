import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getConnection, getPlatformKeypair } from './solana';

export async function buildTransferLpTransaction(
  lpMint: PublicKey,
  fromOwner: PublicKey,
  toOwner: PublicKey,
  amount: number,
  decimals: number
): Promise<Transaction> {
  const fromAta = await getAssociatedTokenAddress(lpMint, fromOwner);
  const toAta = await getAssociatedTokenAddress(lpMint, toOwner);
  const rawAmount = amount * Math.pow(10, decimals);
  const connection = getConnection();
  const { blockhash } = await connection.getLatestBlockhash();
  const transferIx = createTransferInstruction(
    fromAta,
    toAta,
    fromOwner,
    rawAmount,
    [],
    TOKEN_PROGRAM_ID
  );
  const tx = new Transaction({ feePayer: fromOwner, recentBlockhash: blockhash }).add(transferIx);
  return tx;
}

export async function transferLpFromPlatform(
  lpMint: PublicKey,
  toOwner: PublicKey,
  amount: number,
  decimals: number
): Promise<string> {
  const platformKeypair = getPlatformKeypair();
  const platformAta = await getAssociatedTokenAddress(lpMint, platformKeypair.publicKey);
  const toAta = await getAssociatedTokenAddress(lpMint, toOwner);
  const rawAmount = amount * Math.pow(10, decimals);
  const connection = getConnection();
  const { blockhash } = await connection.getLatestBlockhash();
  const transferIx = createTransferInstruction(
    platformAta,
    toAta,
    platformKeypair.publicKey,
    rawAmount,
    [],
    TOKEN_PROGRAM_ID
  );
  const tx = new Transaction({ feePayer: platformKeypair.publicKey, recentBlockhash: blockhash }).add(transferIx);
  tx.sign(platformKeypair);
  const signature = await connection.sendRawTransaction(tx.serialize());
  await connection.confirmTransaction(signature);
  return signature;
}
