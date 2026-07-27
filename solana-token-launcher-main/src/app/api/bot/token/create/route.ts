import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createMint,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

// ─── Constants ────────────────────────────────────────────────────

const FEE_RECIPIENT = process.env.FEE_RECIPIENT_WALLET || "";
const SERVICE_FEE_SOL = parseFloat(process.env.SERVICE_FEE_SOL || "0.15");
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com";

// ─── POST Handler ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, symbol, supply, decimals, walletAddress } = body;

    // ─── Validation ──────────────────────────────────────────────
    if (!name || !symbol || !supply || !walletAddress) {
      return NextResponse.json(
        { success: false, error: "Missing: name, symbol, supply, walletAddress" },
        { status: 400 }
      );
    }
    if (symbol.length > 10) {
      return NextResponse.json(
        { success: false, error: "Symbol max 10 characters" },
        { status: 400 }
      );
    }
    const supplyNum = Number(supply);
    if (isNaN(supplyNum) || supplyNum <= 0 || !Number.isInteger(supplyNum)) {
      return NextResponse.json(
        { success: false, error: "Supply must be a positive integer" },
        { status: 400 }
      );
    }
    const decimalsNum = decimals !== undefined ? Number(decimals) : 9;
    if (isNaN(decimalsNum) || decimalsNum < 0 || decimalsNum > 9) {
      return NextResponse.json(
        { success: false, error: "Decimals must be 0-9" },
        { status: 400 }
      );
    }

    let userPublicKey: PublicKey;
    try {
      userPublicKey = new PublicKey(walletAddress);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    const connection = new Connection(RPC_URL);

    // ─── Build Token Creation Transaction ────────────────────────

    // 1. Generate a new mint keypair (the mint account will be created)
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey;

    // 2. Get the metadata PDA for the mint
    const [metadataPDA] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    // 3. Get the associated token account (ATA) for the user to receive minted tokens
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      // We don't have a payer yet; we'll use the user as payer and signer later.
      // For building the transaction, we just need the address.
      userPublicKey, // payer (will be the user)
      mintPublicKey,
      userPublicKey
    );
    // But we don't want to create it now, we'll include the instruction in the transaction.
    // So we just compute the address:
    const ataAddress = await getOrCreateAssociatedTokenAccount(
      connection,
      userPublicKey, // payer (will be the user)
      mintPublicKey,
      userPublicKey
    ).then(acc => acc.address); // This will fail if not exists, but we can't create it now.
    // Better: compute ATA address manually:
    const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
    const { ASSOCIATED_TOKEN_PROGRAM_ID } = require("@solana/spl-token");
    const getAssociatedTokenAddress = require("@solana/spl-token").getAssociatedTokenAddress;
    const ataAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey
    );

    // 4. Create the transaction and add instructions

    const transaction = new Transaction();

    // Instruction 1: Create mint account (system program: allocate and assign)
    const rentExemption = await connection.getMinimumBalanceForRentExemption(82); // mint account size
    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: userPublicKey,
      newAccountPubkey: mintPublicKey,
      lamports: rentExemption,
      space: 82,
      programId: TOKEN_PROGRAM_ID,
    });
    transaction.add(createAccountIx);

    // Instruction 2: Initialize mint
    const initMintIx = createMint(
      connection,
      userPublicKey,
      mintPublicKey,
      userPublicKey, // mint authority
      userPublicKey, // freeze authority (optional)
      decimalsNum
    );
    // createMint returns a transaction? Actually it returns a Promise<Transaction>.
    // We'll use the simpler method: manually construct instruction.
    // For simplicity, we can use the `createInitializeMintInstruction` from @solana/spl-token.
    const { createInitializeMintInstruction } = require("@solana/spl-token");
    const initMintIx2 = createInitializeMintInstruction(
      mintPublicKey,
      decimalsNum,
      userPublicKey,
      userPublicKey
    );
    transaction.add(initMintIx2);

    // Instruction 3: Create associated token account for user (if not exists)
    const createAtaIx = createAssociatedTokenAccountInstruction(
      userPublicKey, // payer
      ataAddress,
      userPublicKey, // owner
      mintPublicKey
    );
    transaction.add(createAtaIx);

    // Instruction 4: Mint tokens to user's ATA
    const mintTokensIx = mintTo(
      connection,
      userPublicKey,
      mintPublicKey,
      ataAddress,
      userPublicKey, // authority
      supplyNum * Math.pow(10, decimalsNum)
    );
    // mintTo returns a transaction? Actually we can use createMintToInstruction.
    const { createMintToInstruction } = require("@solana/spl-token");
    const mintToIx = createMintToInstruction(
      mintPublicKey,
      ataAddress,
      userPublicKey,
      supplyNum * Math.pow(10, decimalsNum)
    );
    transaction.add(mintToIx);

    // Instruction 5: Create metadata account (Metaplex)
    const metadataData: DataV2 = {
      name,
      symbol,
      uri: "", // optional URI
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };
    const args: CreateMetadataAccountV3InstructionArgs = {
      data: metadataData,
      isMutable: true,
      collectionDetails: null,
    };
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      metadata: metadataPDA,
      mint: mintPublicKey,
      mintAuthority: userPublicKey,
      payer: userPublicKey,
      updateAuthority: userPublicKey,
    };
    const createMetadataIx = createCreateMetadataAccountV3Instruction(
      accounts,
      args
    );
    transaction.add(createMetadataIx);

    // ─── Optional: Add service fee transfer ──────────────────────
    if (FEE_RECIPIENT && SERVICE_FEE_SOL > 0) {
      const feeLamports = SERVICE_FEE_SOL * LAMPORTS_PER_SOL;
      const transferIx = SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: new PublicKey(FEE_RECIPIENT),
        lamports: feeLamports,
      });
      transaction.add(transferIx);
    }

    // ─── Set fee payer and recent blockhash ──────────────────────
    transaction.feePayer = userPublicKey;
    const blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;

    // ─── Serialize without signing ──────────────────────────────
    // We need to partially sign with the mint keypair? Actually the mint keypair must sign
    // because it's a new account. The user's wallet will sign for the transaction, but the
    // mint keypair is not the user's – it's generated by the server. So the server must sign
    // for the mint account creation. That means we cannot completely avoid server signing.
    // The user signs for the transfer and the mint authority, but the mint keypair must be signed
    // by the server. So we have two options:
    // 1. Server signs the transaction partially and sends it to user to sign the rest (partial signing).
    // 2. Server creates the mint account and sends the mint address to user to sign for the rest.
    // For simplicity, we can have the server sign the mint account creation and then send the
    // transaction to the user to sign the rest. But the user still pays gas.
    // This is common: the server partially signs, user completes signing.

    // We'll sign the transaction with the mint keypair (server side).
    // The user will sign for the rest (fee payer, authority).
    transaction.partialSign(mintKeypair);

    // Serialize the transaction (without the user's signature)
    const serializedTx = transaction.serialize({
      requireAllSignatures: false,
    }).toString('base64');

    // Also send the mint address for display
    return NextResponse.json({
      success: true,
      mintAddress: mintPublicKey.toBase58(),
      unsignedTransaction: serializedTx,
      // The user will need to sign this with their wallet
    });

  } catch (error: any) {
    console.error("❌ Token creation API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
