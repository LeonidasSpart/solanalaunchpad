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
import { getConnection } from "./connection";
import {
  getFeeRecipient,
  TOKEN_PROGRAM_ID,
  NETWORKS,
  RPC_URLS,
} from "./constants";

const BURN_ADDRESS = new PublicKey(
  "1nc1nerator11111111111111111111111111111111"
);

const CREATION_FEE_SOL = 0.15;

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
}: CreateTokenParams): Promise<string> {
  const connection = getConnection(network === 'mainnet' ? 'mainnet' : 'devnet', 'confirmed');

  // 1. Pre-flight checks
  const balance = await connection.getBalance(wallet);
  const feeLamports = CREATION_FEE_SOL * LAMPORTS_PER_SOL;
  const estimatedMintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  const estimatedMetadataRent = await connection.getMinimumBalanceForRentExemption(679);
  const estimatedAtaRent = await connection.getMinimumBalanceForRentExemption(165);

  const totalRequired = network === 'mainnet'
    ? feeLamports + estimatedMintRent + estimatedMetadataRent + estimatedAtaRent + 10000000
    : estimatedMintRent + estimatedMetadataRent + estimatedAtaRent + 10000000;

  if (balance < totalRequired) {
    throw new Error(
      `Insufficient balance. You need at least ${(totalRequired / LAMPORTS_PER_SOL).toFixed(3)} SOL to create a token.`
    );
  }

  // 2. Upload image to IPFS
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

  // 3. Build the transaction
  const transaction = new Transaction();
  transaction.feePayer = wallet;

  // Compute budget for large transaction
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 400000,
    })
  );

  // Step 3a: Pay fee on mainnet only
  if (network === 'mainnet') {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: getFeeRecipient(),
        lamports: feeLamports,
      })
    );
  }

  // Step 3b: Create mint account
  // IMPORTANT: Always initialize with wallet as freeze authority.
  // If revokeFreeze is true, we revoke it in step 3g AFTER mint is created.
  // Never pass null here — you can't revoke an authority that was never set.
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
      wallet, // always set freeze authority to wallet first
      SPL_TOKEN_PROGRAM_ID
    )
  );

  // Step 3c: Create associated token account
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

  // Step 3d: Mint supply to ATA
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

  // Step 3e: Create on-chain metadata
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
          isMutable: true,
          collectionDetails: null,
        },
      }
    )
  );

  // Step 3f: Revoke mint authority (optional)
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

  // Step 3g: Revoke freeze authority (optional)
  // This works now because we always initialize freeze authority to wallet above
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

  // Step 3h: Revoke update authority / make metadata immutable (optional)
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

  // 4. Get latest blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;

  // 5. Partial sign with mint keypair first
  transaction.partialSign(mintKeypair);

  // 6. Send to wallet for user signature
  const signedTransaction = await signTransaction(transaction);

  // 7. Submit — skip preflight since wallet already simulated
  const txId = await connection.sendRawTransaction(signedTransaction.serialize(), {
    skipPreflight: true,
    maxRetries: 3,
    preflightCommitment: 'confirmed',
  });

  // 8. Confirm transaction
  const confirmation = await connection.confirmTransaction({
    signature: txId,
    blockhash,
    lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
  }

  return txId;
}
