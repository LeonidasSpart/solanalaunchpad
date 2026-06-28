import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createInitializeMintInstruction,
  MINT_SIZE,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { getConnection } from "./connection";
import {
  FEE_RECIPIENT,
  CREATION_FEE_SOL,
  TOKEN_PROGRAM_ID,
} from "./constants";

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
}: CreateTokenParams): Promise<string> {
  const connection = getConnection();

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
  const metadataUri = await uploadMetadata(name, symbol, description, imageUrl);

  // 3. Build the transaction
  const transaction = new Transaction();
  transaction.feePayer = wallet;

  // Step 3a: Pay the creation fee to your treasury
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: wallet,
      toPubkey: FEE_RECIPIENT,
      lamports: feeLamports,
    })
  );

  // Step 3b: Create the token mint
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;

  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint,
      decimals,
      wallet, // mint authority
      revokeFreeze ? null : wallet, // freeze authority
      TOKEN_PROGRAM_ID
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
  const supplyInBaseUnits = supply * Math.pow(10, decimals);
  transaction.add(
    createMintToInstruction(mint, userAta, wallet, supplyInBaseUnits, [], TOKEN_PROGRAM_ID)
  );

  // Step 3e: Add token metadata (name, symbol, URI)
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

  // 4. Sign and send the transaction
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.sign(mintKeypair); // Sign by the mint keypair

  const signedTransaction = await signTransaction(transaction);
  
  const txId = await connection.sendRawTransaction(signedTransaction.serialize());
  
  // 5. Confirm the transaction
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
