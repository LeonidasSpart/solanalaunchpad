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
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2,
  PROGRAM_ID as METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

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

    // 1. Generate a new mint keypair
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey;

    // 2. Get metadata PDA
    const [metadataPDA] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    // 3. Get associated token account address for user
    const ataAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey
    );

    // 4. Get rent exemption for mint account
    const rentExemption = await getMinimumBalanceForRentExemptMint(connection);

    // 5. Create the transaction
    const transaction = new Transaction();

    // Instruction 1: Create mint account
    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: userPublicKey,
      newAccountPubkey: mintPublicKey,
      lamports: rentExemption,
      space: 82,
      programId: TOKEN_PROGRAM_ID,
    });
    transaction.add(createAccountIx);

    // Instruction 2: Initialize mint
    const initMintIx = createInitializeMintInstruction(
      mintPublicKey,
      decimalsNum,
      userPublicKey,
      userPublicKey
    );
    transaction.add(initMintIx);

    // Instruction 3: Create associated token account for user
    const createAtaIx = createAssociatedTokenAccountInstruction(
      userPublicKey,
      ataAddress,
      userPublicKey,
      mintPublicKey
    );
    transaction.add(createAtaIx);

    // Instruction 4: Mint tokens to user's ATA
    const mintTokensIx = createMintToInstruction(
      mintPublicKey,
      ataAddress,
      userPublicKey,
      supplyNum * Math.pow(10, decimalsNum)
    );
    transaction.add(mintTokensIx);

    // Instruction 5: Create metadata account
    const metadataData: DataV2 = {
      name,
      symbol,
      uri: "",
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

    // Instruction 6: Transfer service fee to your wallet
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

    // ─── Partially sign with the mint keypair ──────────────────────
    transaction.partialSign(mintKeypair);

    // ─── Serialize ──────────────────────────────────────────────
    const serializedTx = transaction.serialize({
      requireAllSignatures: false,
    }).toString('base64');

    // ─── Return to bot ────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      mintAddress: mintPublicKey.toBase58(),
      unsignedTransaction: serializedTx,
    });

  } catch (error: any) {
    console.error("❌ Token creation API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
