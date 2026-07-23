// src/app/api/matrix/login/route.ts
import { Connection, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { publicKey, signature, message } = await req.json();

    if (!publicKey || !signature || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(signature),
      new PublicKey(publicKey).toBytes()
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Generate a Matrix access token
    // This should be a real token issued by your Matrix server
    const token = `syt_${Buffer.from(publicKey).toString("base64")}_${Date.now()}`;

    return NextResponse.json({
      access_token: token,
      user_id: `@${publicKey}:chat.zrp.one`,
      device_id: "ZRP_WEB",
    });
  } catch (error) {
    console.error("Matrix login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
