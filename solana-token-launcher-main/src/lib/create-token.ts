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
  const rpcUrl = network === 'mainnet'
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com';

  const connection = new Connection(rpcUrl, 'confirmed');

  // 1. Pre-flight checks
  const balance = await connection.getBalance(wallet);
  const feeLamports = CREATION_FEE_SOL * LAMPORTS_PER_SOL;
  const estimatedMintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  const estimatedMetadataRent = await connection.getMinimumBalanceForRentExemption(679);

  const totalRequired = network === 'mainnet' 
    ? feeLamports + estimatedMintRent + estimatedMetadataRent + 5000000
    : estimatedMintRent + estimatedMetadataRent + 5000000;

  if (balance < totalRequired) {
    throw new Error(`Insufficient balance. You need at least ${(totalRequired / LAMPORTS_PER_SOL).toFixed(2)} SOL to create a token.`);
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

  // Add compute budget for large transaction
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 400000,
    })
  );

  // Step 3a: Pay fee on mainnet
  if (network === 'mainnet') {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: getFeeRecipient(),
        lamports: feeLamports,
      })
    );
  }

  // Step 3b: Create mint
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
      revokeFreeze ? null : wallet,
      SPL_TOKEN_PROGRAM_ID
    )
  );

  // Step 3c: Create ATA
  const userAta = getAssociatedTokenAddressSync(mint, wallet);
  transaction.add(
    createAssociatedTokenAccountInstruction(wallet, userAta, wallet, mint)
  );

  // Step 3d: Mint supply
  const supplyInBaseUnits = BigInt(
    (supply * Math.pow(10, decimals)).toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 0,
    })
  );
  transaction.add(
    createMintToInstruction(mint, userAta, wallet, supplyInBaseUnits, [], SPL_TOKEN_PROGRAM_ID)
  );

  // Step 3e: Create metadata
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  // Check if metadata account already exists
  const metadataAccount = await connection.getAccountInfo(metadataPDA);
  if (!metadataAccount) {
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
  }

  // Step 3f: Revoke mint authority
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

  // Step 3g: Revoke freeze authority
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

  // Step 3h: Revoke update authority
  if (revokeUpdate && !metadataAccount) {
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

  // 4. Get blockhash and sign
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.sign(mintKeypair);

  // 5. Sign and send (skip preflight to bypass wallet simulation)
  const signedTransaction = await signTransaction(transaction);
  const txId = await connection.sendRawTransaction(signedTransaction.serialize(), {
    skipPreflight: true,
    maxRetries: 3,
  });

  // 6. Confirm
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
