import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/create-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, symbol, supply, decimals, wallet } = body;

    // ─── Validation ──────────────────────────────────────────────
    if (!name || !symbol || !supply) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, symbol, supply" },
        { status: 400 }
      );
    }

    if (symbol.length > 10) {
      return NextResponse.json(
        { success: false, error: "Symbol must be 10 characters or less" },
        { status: 400 }
      );
    }

    if (supply <= 0 || !Number.isInteger(supply)) {
      return NextResponse.json(
        { success: false, error: "Supply must be a positive integer" },
        { status: 400 }
      );
    }

    const decimalsNum = decimals || 9;
    if (decimalsNum < 0 || decimalsNum > 9) {
      return NextResponse.json(
        { success: false, error: "Decimals must be between 0 and 9" },
        { status: 400 }
      );
    }

    // ─── Get fee payer wallet ────────────────────────────────────
    const privateKey = process.env.TOKEN_CREATION_PRIVATE_KEY;
    if (!privateKey) {
      console.error("❌ TOKEN_CREATION_PRIVATE_KEY not set");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const feePayer = Keypair.fromSecretKey(
      Buffer.from(JSON.parse(privateKey))
    );

    const connection = new Connection(
      process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com"
    );

    // ─── Create the token ────────────────────────────────────────
    try {
      const result = await createToken({
        connection,
        feePayer,
        name,
        symbol,
        supply,
        decimals: decimalsNum,
        // If wallet is provided, mint to that address, otherwise mint to feePayer
        mintTo: wallet ? new PublicKey(wallet) : feePayer.publicKey,
      });

      return NextResponse.json({
        success: true,
        mintAddress: result.mintAddress,
        txId: result.txId,
        fee: 0.15, // SOL fee (optional, for display)
      });
    } catch (solanaError: any) {
      console.error("❌ Solana error:", solanaError);
      return NextResponse.json(
        { success: false, error: solanaError.message || "Token creation failed on Solana" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
