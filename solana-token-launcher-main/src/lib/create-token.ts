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
import {
  FEE_RECIPIENT,
  TOKEN_PROGRAM_ID,
  NETWORKS,
  RPC_URLS,
} from "./constants";

// ─── Pricing Constants (Hardcoded — Must Match Frontend) ──────────
const BASE_FEE_SOL = 0.15;
const REVOKE_MINT_FEE_SOL = 0.15;
const REVOKE_FREEZE_FEE_SOL = 0.15;
const REVOKE_UPDATE_FEE_SOL = 0.15;

// ─── Burn Address for Revoking Authorities ────────────────────────
// CORRECT: Solana incinerator address (NOT the System Program ID)
const BURN_ADDRESS = new PublicKey(
  "1nc1nerator11111111111111111111111111111111"
);

// ─── Interfaces ───────────────────────────────────────────────────
export interface CreateTokenParams {
  wallet: PublicKey;
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  supply: string; // CHANGED: string instead of number for precision
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
  onStatusUpdate?: (message: string) => void; // NEW: proper status callback
}

// ─── Validation ───────────────────────────────────────────────────
const MAX_NAME_LENGTH = 32;
const MAX_SYMBOL_LENGTH = 10;
const MAX_DECIMALS = 18;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_SUPPLY_STRING_LENGTH = 20; // u64 max is ~20 digits

function validateTokenParams(params: CreateTokenParams): void {
  // Name validation
  if (!params.name || params.name.trim().length === 0) {
    throw new Error("Token name is required");
  }
  if (params.name.length > MAX_NAME_LENGTH) {
    throw new Error(
      `Token name must be ≤ ${MAX_NAME_LENGTH} characters (got ${params.name.length})`
    );
  }

  // Symbol validation
  if (!params.symbol || params.symbol.trim().length === 0) {
    throw new Error("Token symbol is required");
  }
  if (params.symbol.length > MAX_SYMBOL_LENGTH) {
    throw new Error(
      `Token symbol must be ≤ ${MAX_SYMBOL_LENGTH} characters (got ${params.symbol.length})`
    );
  }

  // Decimals validation
  if (
    typeof params.decimals !== "number" ||
    params.decimals < 0 ||
    params.decimals > MAX_DECIMALS
  ) {
    throw new Error(
      `Decimals must be between 0 and ${MAX_DECIMALS} (got ${params.decimals})`
    );
  }

  // Supply validation (string-based for precision)
  if (!params.supply || params.supply.trim().length === 0) {
    throw new Error("Token supply is required");
  }
  if (!/^\d+$/.test(params.supply)) {
    throw new Error("Supply must be a positive integer (no decimals)");
  }
  if (params.supply.length > MAX_SUPPLY_STRING_LENGTH) {
    throw new Error(
      `Supply exceeds maximum u64 value (${MAX_SUPPLY_STRING_LENGTH} digits max)`
    );
  }
  if (params.supply === "0") {
    throw new Error("Supply must be greater than 0");
  }

  // Image validation
  if (!params.imageFile) {
    throw new Error("Token image is required");
  }
  if (params.imageFile.size > MAX_FILE_SIZE) {
    throw new Error(
      `Image must be under ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  // Network validation
  if (params.network && params.network !== "devnet" && params.network !== "mainnet") {
    throw new Error('Network must be "devnet" or "mainnet"');
  }
}

function validateNetwork(network: string): asserts network is "devnet" | "mainnet" {
  if (network !== "devnet" && network !== "mainnet") {
    throw new Error(
      `Invalid network: "${network}". Must be "devnet" or "mainnet".`
    );
  }
}

function calculateFee(options: {
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
  network: string;
}): number {
  if (options.network === "devnet") return 0;

  let total = BASE_FEE_SOL;
  if (options.revokeMint) total += REVOKE_MINT_FEE_SOL;
  if (options.revokeFreeze) total += REVOKE_FREEZE_FEE_SOL;
  if (options.revokeUpdate) total += REVOKE_UPDATE_FEE_SOL;

  return total;
}

// ─── Main Token Creation Function ─────────────────────────────────
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
  network = "devnet",
  website,
  twitter,
  telegram,
  discord,
  onStatusUpdate,
}: CreateTokenParams): Promise<string> {
  // 0. Validate all inputs
  validateTokenParams({
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
    network,
    website,
    twitter,
    telegram,
    discord,
    onStatusUpdate,
  });
  validateNetwork(network);

  const updateStatus = (msg: string) => {
    console.log(msg);
    onStatusUpdate?.(msg);
  };

  // 1. Setup connection
  const rpcUrl =
    network === "mainnet"
      ? RPC_URLS[NETWORKS.MAINNET]
      : RPC_URLS[NETWORKS.DEVNET];

  const connection = new Connection(rpcUrl, "confirmed");

  // 2. Calculate fee
  const totalFeeSol = calculateFee({
    revokeMint,
    revokeFreeze,
    revokeUpdate,
    network,
  });
  const feeLamports = totalFeeSol * LAMPORTS_PER_SOL;

  // 3. Pre-flight balance check
  updateStatus("💰 Checking wallet balance...");
  const balance = await connection.getBalance(wallet);

  // Calculate exact costs
  const mintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  const metadataRent = await connection.getMinimumBalanceForRentExemption(679);
  const txFeeBuffer = 0.01 * LAMPORTS_PER_SOL;

  const totalRequiredLamports = feeLamports + mintRent + metadataRent + txFeeBuffer;
  const totalRequiredSol = totalRequiredLamports / LAMPORTS_PER_SOL;

  if (balance < totalRequiredLamports) {
    throw new Error(
      `Insufficient balance. You need at least ${totalRequiredSol.toFixed(
        3
      )} SOL ` +
        `(fee: ${totalFeeSol} SOL + rent: ${(
          (mintRent + metadataRent) /
          LAMPORTS_PER_SOL
        ).toFixed(4)} SOL + tx fees). ` +
        `Your balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL.`
    );
  }

  // 4. Upload image to IPFS
  updateStatus("⏳ Uploading image to IPFS...");
  const { uploadTokenImage, uploadMetadata } = await import("./upload");
  const imageUrl = await uploadTokenImage(imageFile);

  // Build social links for metadata
  const socialLinks: Record<string, string> = {};
  if (website) socialLinks.website = website;
  if (twitter) socialLinks.twitter = twitter;
  if (telegram) socialLinks.telegram = telegram;
  if (discord) socialLinks.discord = discord;

  updateStatus("⏳ Uploading metadata to IPFS...");
  const metadataUri = await uploadMetadata(
    name,
    symbol,
    description,
    imageUrl,
    undefined, // attributes
    website || undefined,
    socialLinks
  );

  // 5. Build the transaction
  updateStatus("🔨 Building transaction...");
  const transaction = new Transaction();
  transaction.feePayer = wallet;

  // Step 5a: Pay the creation fee (SKIP on devnet)
  if (network === "mainnet" && feeLamports > 0) {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: FEE_RECIPIENT,
        lamports: feeLamports,
      })
    );
  }

  // Step 5b: Create the token mint
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;

  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: mintRent,
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

  // Step 5c: Create the user's associated token account
  const userAta = getAssociatedTokenAddressSync(mint, wallet);
  transaction.add(
    createAssociatedTokenAccountInstruction(
      wallet,
      userAta,
      wallet,
      mint
    )
  );

  // Step 5d: Mint the initial supply to the user's ATA
  // FIXED: Use BigInt arithmetic with string supply for precision
  const supplyInBaseUnits =
    BigInt(supply) * BigInt(10 ** decimals);

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

  // Step 5e: Add token metadata (ALWAYS mutable initially)
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
          // FIXED: Always create as mutable so we can revoke update authority later
          isMutable: true,
          collectionDetails: null,
        },
      }
    )
  );

  // Step 5f: Revoke mint authority if requested
  if (revokeMint) {
    transaction.add(
      createSetAuthorityInstruction(
        mint,
        wallet,
        AuthorityType.MintTokens,
        null, // Revoke by setting to null
        [],
        SPL_TOKEN_PROGRAM_ID
      )
    );
  }

  // Step 5g: Revoke update authority if requested (make metadata immutable)
  if (revokeUpdate) {
    transaction.add(
      createUpdateMetadataAccountV2Instruction(
        {
          metadata: metadataPDA,
          updateAuthority: wallet,
        },
        {
          updateMetadataAccountArgsV2: {
            data: null, // Don't change data
            updateAuthority: BURN_ADDRESS, // Transfer to burn address
            primarySaleHappened: null,
            isMutable: false, // Ensure immutable
          },
        }
      )
    );
  }

  // 6. Get fresh blockhash and simulate before signing
  updateStatus("🔍 Simulating transaction...");
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.sign(mintKeypair);

  // SIMULATE first to catch errors before wallet popup
  const simulation = await connection.simulateTransaction(transaction);
  if (simulation.value.err) {
    console.error("Simulation failed:", simulation.value.err);
    throw new Error(
      `Transaction simulation failed: ${JSON.stringify(
        simulation.value.err
      )}. ` +
        `This usually means insufficient balance or invalid parameters.`
    );
  }

  // 7. Sign and send
  updateStatus("✍️ Waiting for wallet signature...");
  const signedTransaction = await signTransaction(transaction);

  updateStatus("🚀 Sending transaction...");
  const txId = await connection.sendRawTransaction(
    signedTransaction.serialize(),
    {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    }
  );

  // 8. Confirm the transaction
  updateStatus("⏳ Confirming transaction...");
  const confirmation = await connection.confirmTransaction(
    {
      signature: txId,
      blockhash,
      lastValidBlockHeight,
    },
    "confirmed"
  );

  if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
  }

  // 9. SAVE TO DATABASE (best effort — don't fail if DB save fails)
  updateStatus("💾 Saving token record...");
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mint_address: mint.toBase58(),
        name,
        symbol,
        description,
        image_url: imageUrl,
        metadata_uri: metadataUri,
        network,
        creator_wallet: wallet.toBase58(),
        supply: Number(supplyInBaseUnits),
        decimals,
        revoke_mint: revokeMint,
        revoke_freeze: revokeFreeze,
        revoke_update: revokeUpdate,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error("DB save failed with status:", response.status);
    }
  } catch (err) {
    console.error("Failed to save token to DB:", err);
  }

  updateStatus("✅ Token created successfully!");
  return txId;
}
