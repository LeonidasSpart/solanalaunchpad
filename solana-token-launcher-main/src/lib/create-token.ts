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

// Pricing constants (must match frontend)
const BASE_FEE_SOL = 0.15;
const REVOKE_MINT_FEE_SOL = 0.15;
const REVOKE_FREEZE_FEE_SOL = 0.15;
const REVOKE_UPDATE_FEE_SOL = 0.15;

// Burn address for revoking authorities permanently
const BURN_ADDRESS = new PublicKey("11111111111111111111111111111111");

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

function calculateFee(options: {
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
  network: string;
}): number {
  if (options.network === 'devnet') return 0;
  
  let total = BASE_FEE_SOL;
  if (options.revokeMint) total += REVOKE_MINT_FEE_SOL;
  if (options.revokeFreeze) total += REVOKE_FREEZE_FEE_SOL;
  if (options.revokeUpdate) total += REVOKE_UPDATE_FEE_SOL;
  
  return total;
}

function validateNetwork(network: string): asserts network is 'devnet' | 'mainnet' {
  if (network !== 'devnet' && network !== 'mainnet') {
    throw new Error(`Invalid network: "${network}". Must be "devnet" or "mainnet".`);
  }
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
  
  // 0. Validate network
  validateNetwork(network);
  
  // 1. Setup connection
  const rpcUrl = network === 'mainnet' 
    ? RPC_URLS[NETWORKS.MAINNET] 
    : RPC_URLS[NETWORKS.DEVNET];
  
  const connection = new Connection(rpcUrl, 'confirmed');

  // 2. Calculate fee
  const totalFeeSol = calculateFee({ revokeMint, revokeFreeze, revokeUpdate, network });
  const feeLamports = totalFeeSol * LAMPORTS_PER_SOL;

  // 3. Pre-flight checks
  const balance = await connection.getBalance(wallet);
  
  // Calculate exact costs
  const mintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  const metadataRent = await connection.getMinimumBalanceForRentExemption(679); // ~metadata account size
  const ataRent = await connection.getMinimumBalanceForRentExemption(165); // ATA size
  
  // Buffer for transaction fees (0.01 SOL = 10M lamports)
  const txFeeBuffer = 0.01 * LAMPORTS_PER_SOL;
  
  const totalRequiredLamports = feeLamports + mintRent + metadataRent + ataRent + txFeeBuffer;
  const totalRequiredSol = totalRequiredLamports / LAMPORTS_PER_SOL;

  if (balance < totalRequiredLamports) {
    throw new Error(
      `Insufficient balance. You need at least ${totalRequiredSol.toFixed(3)} SOL ` +
      `(fee: ${totalFeeSol} SOL + rent: ${((mintRent + metadataRent + ataRent) / LAMPORTS_PER_SOL).toFixed(4)} SOL + tx fees). ` +
      `Your balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL.`
    );
  }

  // 4. Upload image to IPFS
  setStatus?.('⏳ Uploading image to IPFS...');
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
    undefined, // attributes
    website || undefined,
    socialLinks
  );

  // 5. Build the transaction
  const transaction = new Transaction();
  transaction.feePayer = wallet;

  // Step 5a: Pay the creation fee (SKIP on devnet)
  if (network === 'mainnet' && feeLamports > 0) {
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
  const supplyInBaseUnits = BigInt(Math.floor(supply * Math.pow(10, decimals)));
  transaction.add(
    createMintToInstruction(mint, userAta, wallet, supplyInBaseUnits, [], SPL_TOKEN_PROGRAM_ID)
  );

  // Step 5e: Add token metadata
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
          isMutable: !revokeUpdate, // false = immutable metadata
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

  // Step 5g: Revoke update authority if requested (make metadata truly immutable)
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
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.sign(mintKeypair);

  // SIMULATE first to catch errors before wallet popup
  const simulation = await connection.simulateTransaction(transaction);
  if (simulation.value.err) {
    console.error('Simulation failed:', simulation.value.err);
    throw new Error(
      `Transaction simulation failed: ${JSON.stringify(simulation.value.err)}. ` +
      `This usually means insufficient balance or invalid parameters.`
    );
  }

  // 7. Sign and send
  const signedTransaction = await signTransaction(transaction);
  
  const txId = await connection.sendRawTransaction(signedTransaction.serialize(), {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });
  
  // 8. Confirm the transaction
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

// Helper for status updates (optional — remove if not used)
function setStatus(msg: string) {
  console.log(msg);
}
