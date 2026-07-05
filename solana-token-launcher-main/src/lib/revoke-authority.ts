import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
} from '@solana/web3.js';
import {
  getAccount,
  createSetAuthorityInstruction,
  AuthorityType,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from '@solana/spl-token';

export interface TokenAuthorityInfo {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  updateAuthority: string | null;
  programId: PublicKey;
}

export interface RevokeParams {
  connection: Connection;
  wallet: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  mint: string;
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
}

/**
 * Fetch token info and current authorities.
 */
export async function fetchTokenAuthorities(
  connection: Connection,
  mintAddress: string
): Promise<TokenAuthorityInfo> {
  const mintPubkey = new PublicKey(mintAddress);
  
  // Try to get the token account info to determine program ID
  let programId = TOKEN_PROGRAM_ID;
  try {
    const accountInfo = await connection.getAccountInfo(mintPubkey);
    if (accountInfo) {
      // Check if it's Token-2022
      if (accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
        programId = TOKEN_2022_PROGRAM_ID;
      }
    }
  } catch {
    // fallback
  }

  // Fetch mint info
  const mintInfo = await getAccount(connection, mintPubkey);
  
  // For metadata, we could query Helius or use a simple placeholder
  // We'll use basic info and let the user see the mint address
  const name = `Token ${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`;
  const symbol = '??';

  return {
    mint: mintAddress,
    name,
    symbol,
    decimals: mintInfo.decimals,
    mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
    freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
    updateAuthority: mintInfo.updateAuthority?.toBase58() || null,
    programId,
  };
}

/**
 * Revoke selected authorities.
 */
export async function revokeAuthorities({
  connection,
  wallet,
  signTransaction,
  mint,
  revokeMint,
  revokeFreeze,
  revokeUpdate,
}: RevokeParams): Promise<string> {
  const mintPubkey = new PublicKey(mint);
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  
  const tx = new Transaction();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet;

  // Determine which program ID to use
  let programId = TOKEN_PROGRAM_ID;
  try {
    const accountInfo = await connection.getAccountInfo(mintPubkey);
    if (accountInfo?.owner.equals(TOKEN_2022_PROGRAM_ID)) {
      programId = TOKEN_2022_PROGRAM_ID;
    }
  } catch {
    // fallback
  }

  // Revoke Mint Authority
  if (revokeMint) {
    tx.add(
      createSetAuthorityInstruction(
        mintPubkey,
        wallet,
        AuthorityType.MintTokens,
        null, // set to null to revoke
        [],
        programId
      )
    );
  }

  // Revoke Freeze Authority
  if (revokeFreeze) {
    tx.add(
      createSetAuthorityInstruction(
        mintPubkey,
        wallet,
        AuthorityType.FreezeAccount,
        null,
        [],
        programId
      )
    );
  }

  // Revoke Update Authority
  // Note: Update Authority is not a standard token authority; it's usually for metadata.
  // We'll handle it if the mint has an updateAuthority field (like from Metaplex)
  if (revokeUpdate) {
    // For standard SPL Token mint, updateAuthority is not present.
    // If we have one, we can try to revoke it.
    // We'll check if the mint has an updateAuthority field (Metaplex metadata).
    // For now, we'll skip this because it requires the metadata program.
    // We'll log a warning and not add an instruction.
    console.warn('Update authority revocation is not implemented for standard SPL tokens.');
  }

  // Simulate
  const sim = await connection.simulateTransaction(tx);
  if (sim.value.err) {
    throw new Error(`Simulation failed: ${JSON.stringify(sim.value.err)}`);
  }

  const signed = await signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });

  const conf = await connection.confirmTransaction(
    { signature: sig, blockhash, lastValidBlockHeight },
    'confirmed'
  );
  if (conf.value.err) {
    throw new Error(`Transaction failed: ${conf.value.err}`);
  }

  return sig;
}
