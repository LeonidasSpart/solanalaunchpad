import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createInitializeMintInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID as SPL_TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  createUpdateMetadataAccountV2Instruction,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  getFeeRecipient,
  CREATION_FEE_SOL,
  NETWORKS,
  RPC_URLS,
} from "./constants";

const BURN_ADDRESS = new PublicKey(
  "1nc1nerator11111111111111111111111111111111"
);

// Direct connection for sends — bypasses proxy
function getDirectConnection(network: 'devnet' | 'mainnet'): Connection {
  return new Connection(
    network === 'mainnet' 
      ? RPC_URLS[NETWORKS.MAINNET] 
      : RPC_URLS[NETWORKS.DEVNET],
    'confirmed'
  );
}

interface CreateTokenParams {
  wallet: PublicKey;
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  supply: number;
  imageFile: File;
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  network?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export async function createToken({
  wallet,
  name,
  symbol,
  description,
  decimals,
  supply,
  imageFile,
  revokeMint,
  revokeFreeze,
  revokeUpdate,
  signTransaction,
  network = 'devnet',
  website,
  twitter,
  telegram,
  discord,
}: CreateTokenParams): Promise<{ txId: string; mintAddress: string }> {
  const net = network === 'mainnet' ? 'mainnet' : 'devnet';
  const connection = getDirectConnection(net);

  // ─── 1. Pre-flight checks ─────────────────
  const balance = await connection.getBalance(wallet);
  const feeLamports = CREATION_FEE_SOL * LAMPORTS_PER_SOL;
  const estimatedMintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  const estimatedMetadataRent = await connection.getMinimumBalanceForRentExemption(679);
  const estimatedAtaRent = await connection.getMinimumBalanceForRentExemption(165);
  const networkFeeBuffer = 0.01 * LAMPORTS_PER_SOL;

  const totalRequired = net === 'mainnet'
    ? feeLamports + estimatedMintRent + estimatedMetadataRent + estimatedAtaRent + networkFeeBuffer
    : estimatedMintRent + estimatedMetadataRent + estimatedAtaRent + networkFeeBuffer;

  if (balance < totalRequired) {
    const breakdown = net === 'mainnet'
      ? `  - Platform fee: ${CREATION_FEE_SOL} SOL\n  - Mint rent: ${(estimatedMintRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - Metadata rent: ${(estimatedMetadataRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - ATA rent: ${(estimatedAtaRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - Network fees: ~0.01 SOL`
      : `  - Mint rent: ${(estimatedMintRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - Metadata rent: ${(estimatedMetadataRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - ATA rent: ${(estimatedAtaRent / LAMPORTS_PER_SOL).toFixed(4)} SOL\n  - Network fees: ~0.01 SOL`;
    
    throw new Error(
      `Insufficient balance. Need at least ${(totalRequired / LAMPORTS_PER_SOL).toFixed(4)} SOL total:\n${breakdown}`
    );
  }

  // ─── 2. Validate fee recipient on mainnet ─────────────────
  let feeRecipient: PublicKey;
  if (net === 'mainnet') {
    try {
      feeRecipient = getFeeRecipient();
    } catch (e: any) {
      throw new Error(`Fee recipient not configured: ${e.message}`);
    }
  }

  // ─── 3. Upload to IPFS ─────────────────
  const { uploadTokenImage, uploadMetadata } = await import("./upload");
  const imageUrl = await uploadTokenImage(imageFile);

  const socialLinks: Record<string, string> = {};
  if (website) socialLinks.website = website;
  if (twitter) socialLinks.twitter = twitter;
  if (telegram) socialLinks.telegram = telegram;
  if (discord) socialLinks.discord = discord;

  const metadataUri = await uploadMetadata(
    name,
    symbol,
    description,
    imageUrl,
    undefined,
    website || undefined,
    Object.keys(socialLinks).length > 0 ? socialLinks : undefined
  );

  // ─── 4. Build transaction ─────────────────
  const transaction = new Transaction();
  transaction.feePayer = wallet;

  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 400000 })
  );

  if (net === 'mainnet') {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: feeRecipient!,
        lamports: feeLamports,
      })
    );
  }

  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;

  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: estimatedMintRent,
      programId: SPL_TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint,
      decimals,
      wallet,
      wallet,
      SPL_TOKEN_PROGRAM_ID
    )
  );

  const userAta = getAssociatedTokenAddressSync(
    mint,
    wallet,
    false,
    SPL_TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  transaction.add(
    createAssociatedTokenAccountInstruction(
      wallet,
      userAta,
      wallet,
      mint,
      SPL_TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  );

  const supplyInBaseUnits = BigInt(Math.round(supply * Math.pow(10, decimals)));
  transaction.add(
    createMintToInstruction(
      mint,
      userAta,
      wallet,
      supplyInBaseUnits,
      [],
      SPL_TOKEN_PROGRAM_ID
    )
  );

  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  transaction.add(
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: mint,
        mintAuthority: wallet,
        payer: wallet,
        updateAuthority: wallet,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name,
            symbol,
            uri: metadataUri,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: !revokeUpdate,
          collectionDetails: null,
        },
      }
    )
  );

  if (revokeMint) {
    transaction.add(
      createSetAuthorityInstruction(
        mint,
        wallet,
        AuthorityType.MintTokens,
        null,
        [],
        SPL_TOKEN_PROGRAM_ID
      )
    );
  }

  if (revokeFreeze) {
    transaction.add(
      createSetAuthorityInstruction(
        mint,
        wallet,
        AuthorityType.FreezeAccount,
        null,
        [],
        SPL_TOKEN_PROGRAM_ID
      )
    );
  }

  if (revokeUpdate) {
    transaction.add(
      createUpdateMetadataAccountV2Instruction(
        {
          metadata: metadataPDA,
          updateAuthority: wallet,
        },
        {
          updateMetadataAccountArgsV2: {
            data: null,
            updateAuthority: BURN_ADDRESS,
            primarySaleHappened: null,
            isMutable: false,
          },
        }
      )
    );
  }

  // ─── 5. Sign and send via DIRECT connection (not proxy) ─────────────────
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;
  transaction.partialSign(mintKeypair);

  const signedTransaction = await signTransaction(transaction);

  const txId = await connection.sendRawTransaction(signedTransaction.serialize(), {
    skipPreflight: false,
    maxRetries: 3,
    preflightCommitment: 'confirmed',
  });

  const confirmation = await connection.confirmTransaction({
    signature: txId,
    blockhash,
    lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
  }

  // 🔥 FIX: Return both txId AND mintAddress
  return {
    txId: txId,
    mintAddress: mint.toString(),
  };
}
