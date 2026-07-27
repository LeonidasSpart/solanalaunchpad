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

const FEE_RECIPIENT = process.env.FEE_RECIPIENT_WALLET || "";
const SERVICE_FEE_SOL = parseFloat(process.env.SERVICE_FEE_SOL || "0.15");
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, symbol, supply, decimals, walletAddress } = body;

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

    // ─── Build transaction ────────────────────────────────────────
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey;

    const [metadataPDA] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    const ataAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey
    );

    const rentExemption = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction();

    // Create mint account
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: userPublicKey,
        newAccountPubkey: mintPublicKey,
        lamports: rentExemption,
        space: 82,
        programId: TOKEN_PROGRAM_ID,
      })
    );

    // Initialize mint
    transaction.add(
      createInitializeMintInstruction(
        mintPublicKey,
        decimalsNum,
        userPublicKey,
        userPublicKey
      )
    );

    // Create associated token account
    transaction.add(
      createAssociatedTokenAccountInstruction(
        userPublicKey,
        ataAddress,
        userPublicKey,
        mintPublicKey
      )
    );

    // Mint tokens
    transaction.add(
      createMintToInstruction(
        mintPublicKey,
        ataAddress,
        userPublicKey,
        supplyNum * Math.pow(10, decimalsNum)
      )
    );

    // Create metadata
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
    transaction.add(
      createCreateMetadataAccountV3Instruction(accounts, args)
    );

    // Service fee transfer (if any)
    if (FEE_RECIPIENT && SERVICE_FEE_SOL > 0) {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: new PublicKey(FEE_RECIPIENT),
          lamports: SERVICE_FEE_SOL * LAMPORTS_PER_SOL,
        })
      );
    }

    transaction.feePayer = userPublicKey;
    const blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;

    // Partially sign with mint keypair (server)
    transaction.partialSign(mintKeypair);

    const serializedTx = transaction.serialize({
      requireAllSignatures: false,
    }).toString('base64');

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
