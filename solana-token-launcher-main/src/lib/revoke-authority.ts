import { 
  Connection, 
  PublicKey, 
  Transaction, 
} from '@solana/web3.js';
import {
  getMint,
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
  
  // Get mint info using getMint (which includes decimals, mintAuthority, freezeAuthority)
  const mintInfo = await getMint(connection, mintPubkey);
  
  // Determine program ID (Token or Token-2022)
  const accountInfo = await connection.getAccountInfo(mintPubkey);
  let programId = TOKEN_PROGRAM_ID;
  if (accountInfo && accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
    programId = TOKEN_2022_PROGRAM_ID;
  }

  // For metadata (name, symbol), we could query Helius, but we'll use placeholders
  const name = `Token ${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`;
  const symbol = '??';

  return {
    mint: mintAddress,
    name,
    symbol,
    decimals: mintInfo.decimals,
    mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
    freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
    updateAuthority: null, // standard SPL mint does not have update authority
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

  // Determine program ID
  const accountInfo = await connection.getAccountInfo(mintPubkey);
  let programId = TOKEN_PROGRAM_ID;
  if (accountInfo && accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
    programId = TOKEN_2022_PROGRAM_ID;
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

  // Revoke Update Authority – not standard for SPL Token, but we keep it for Metaplex metadata.
  // For now, we skip because it requires metadata program.
  if (revokeUpdate) {
    console.warn('Update authority revocation is not supported for standard SPL tokens.');
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
