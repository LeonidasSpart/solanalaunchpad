// src/app/api/token-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { scanToken } from "@/lib/token-check/scanner";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: "Token address is required" },
        { status: 400 }
      );
    }

    // Validate address format
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
      return NextResponse.json(
        { error: "Invalid Solana token address" },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `token-check:${address}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      // ✅ Fix: handle cached value safely
      const data = typeof cached === "string" ? JSON.parse(cached) : cached;
      return NextResponse.json({
        success: true,
        data,
        cached: true,
      });
    }

    // Scan token
    const result = await scanToken(address);

    // Cache for 1 hour
    await redis.set(cacheKey, JSON.stringify(result), "EX", 3600);

    return NextResponse.json({
      success: true,
      data: result,
      cached: false,
    });

  } catch (error) {
    console.error("Token check error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to check token" },
      { status: 500 }
    );
  }
}
