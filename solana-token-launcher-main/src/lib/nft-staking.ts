import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getConnection, getPlatformKeypair } from './solana';

export async function buildTransferNftTransaction(
  nftMint: PublicKey,
  fromOwner: PublicKey,
  toOwner: PublicKey,
  connection: Connection
): Promise<Transaction> {
  const fromAta = await getAssociatedTokenAddress(nftMint, fromOwner);
  const toAta = await getAssociatedTokenAddress(nftMint, toOwner);
  const { blockhash } = await connection.getLatestBlockhash();
  const transferIx = createTransferInstruction(
    fromAta,
    toAta,
    fromOwner,
    1, // NFTs have supply 1
    [],
    TOKEN_PROGRAM_ID
  );
  const tx = new Transaction({ feePayer: fromOwner, recentBlockhash: blockhash }).add(transferIx);
  return tx;
}

export async function transferNftFromPlatform(
  nftMint: PublicKey,
  toOwner: PublicKey,
  connection: Connection
): Promise<string> {
  const platformKeypair = getPlatformKeypair();
  const platformAta = await getAssociatedTokenAddress(nftMint, platformKeypair.publicKey);
  const toAta = await getAssociatedTokenAddress(nftMint, toOwner);
  const { blockhash } = await connection.getLatestBlockhash();
  const transferIx = createTransferInstruction(
    platformAta,
    toAta,
    platformKeypair.publicKey,
    1,
    [],
    TOKEN_PROGRAM_ID
  );
  const tx = new Transaction({ feePayer: platformKeypair.publicKey, recentBlockhash: blockhash }).add(transferIx);
  tx.sign(platformKeypair);
  const signature = await connection.sendRawTransaction(tx.serialize());
  await connection.confirmTransaction(signature);
  return signature;
}
