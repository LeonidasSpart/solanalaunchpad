import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
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

// ─── Burn Address for Revoking Authorities ────────────────────────
// CORRECT: Solana incinerator address (NOT the System Program ID)
const BURN_ADDRESS = new PublicKey(
  "1nc1nerator11111111111111111111111111111111"
);

// Fee amount (hardcoded)
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
  // Use network-specific RPC
    const rpcUrl = network === 'mainnet'
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com';


  const connection = new Connection(rpcUrl, 'confirmed');

  // 1. Pre-flight checks
  const balance = await connection.getBalance(wallet);
  const feeLamports = CREATION_FEE_SOL * LAMPORTS_PER_SOL;
  const estimatedRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

  if (balance < feeLamports + estimatedRent + 5000000) {
    throw new Error(`Insufficient balance. You need at least ${CREATION_FEE_SOL + 0.05} SOL to create a token.`);
  }

  // 2. Upload image to IPFS
  const { uploadTokenImage, uploadMetadata } = await import("./upload");
  const imageUrl = await uploadTokenImage(imageFile);

  // Build social links for metadata
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

  // Step 3a: Pay the creation fee to your treasury (SKIP on devnet)
  if (network === 'mainnet') {
    transaction.add(
            SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: getFeeRecipient(),
        lamports: feeLamports,
      })
    );
  }

  // Step 3b: Create the token mint
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;

  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
      programId: SPL_TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint,
      decimals,
      wallet, // mint authority (temporarily)
      revokeFreeze ? null : wallet, // freeze authority
      SPL_TOKEN_PROGRAM_ID
    )
  );

  // Step 3c: Create the user's associated token account
  const userAta = getAssociatedTokenAddressSync(mint, wallet);
  transaction.add(
    createAssociatedTokenAccountInstruction(
      wallet,
      userAta,
      wallet,
      mint
    )
  );

  // Step 3d: Mint the initial supply to the user's ATA
  // FIXED #3: Use string-based conversion to avoid Number precision loss
  const supplyInBaseUnits = BigInt(
    (supply * Math.pow(10, decimals)).toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 0,
    })
  );
  transaction.add(
    createMintToInstruction(mint, userAta, wallet, supplyInBaseUnits, [], SPL_TOKEN_PROGRAM_ID)
  );

  // Step 3e: Add token metadata (ALWAYS mutable initially)
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
          // Always create as mutable so we can revoke update authority later
          isMutable: true,
          collectionDetails: null,
        },
      }
    )
  );

  // Step 3f: Revoke mint authority if requested
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

  // Step 3g: Revoke freeze authority if requested
  // FIXED #2: This block was missing — freeze authority was never revoked!
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

  // Step 3h: Revoke update authority if requested (make metadata immutable)
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

  // 4. Get blockhash and set it
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.sign(mintKeypair);

  // FIXED #4: SIMULATE the transaction first (prevents losing fee on failed tx)
  const simulation = await connection.simulateTransaction(transaction);
  if (simulation.value.err) {
    console.error("Transaction simulation failed:", simulation.value.err);
    throw new Error(
      `Transaction simulation failed: ${JSON.stringify(simulation.value.err)}. ` +
      `This means the transaction would fail on-chain and your fee would be lost. ` +
      `Please check your wallet balance and token parameters.`
    );
  }

  // 5. Sign and send
  const signedTransaction = await signTransaction(transaction);

  const txId = await connection.sendRawTransaction(signedTransaction.serialize());

  // 6. Confirm the transaction
  const confirmation = await connection.confirmTransaction({
    signature: txId,
    blockhash,
    lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
  }

  return txId;
}
