import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { PublicKey } from "@solana/web3.js";

// ─── Database Connection ────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// ─── Rate Limiting (Simple In-Memory) ─────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  rateLimitMap.set(ip, [...recentRequests, now]);
  return recentRequests.length >= RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Input Validation ─────────────────────────────────────────────
const MAX_NAME_LENGTH = 32;
const MAX_SYMBOL_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_URL_LENGTH = 500;

interface TokenData {
  mint_address: string;
  name: string;
  symbol: string;
  description?: string;
  image_url?: string;
  metadata_uri?: string;
  network: string;
  creator_wallet: string;
  supply: number;
  decimals: number;
  revoke_mint: boolean;
  revoke_freeze: boolean;
  revoke_update: boolean;
}

function validateTokenData(body: any): { valid: boolean; error?: string } {
  if (!body.mint_address) return { valid: false, error: "mint_address is required" };
  if (!body.name) return { valid: false, error: "name is required" };
  if (!body.symbol) return { valid: false, error: "symbol is required" };
  if (!body.creator_wallet) return { valid: false, error: "creator_wallet is required" };
  if (body.supply === undefined) return { valid: false, error: "supply is required" };
  if (body.decimals === undefined) return { valid: false, error: "decimals is required" };

  try {
    new PublicKey(body.mint_address);
  } catch {
    return { valid: false, error: "Invalid mint_address format" };
  }
  try {
    new PublicKey(body.creator_wallet);
  } catch {
    return { valid: false, error: "Invalid creator_wallet format" };
  }

  if (body.name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `name must be ≤ ${MAX_NAME_LENGTH} characters` };
  }
  if (body.symbol.length > MAX_SYMBOL_LENGTH) {
    return { valid: false, error: `symbol must be ≤ ${MAX_SYMBOL_LENGTH} characters` };
  }
  if (body.description && body.description.length > MAX_DESCRIPTION_LENGTH) {
    return { valid: false, error: `description must be ≤ ${MAX_DESCRIPTION_LENGTH} characters` };
  }

  const urlFields = ["image_url", "metadata_uri", "website", "twitter", "telegram", "discord"];
  for (const field of urlFields) {
    if (body[field] && body[field].length > MAX_URL_LENGTH) {
      return { valid: false, error: `${field} must be ≤ ${MAX_URL_LENGTH} characters` };
    }
  }

  if (!["devnet", "mainnet"].includes(body.network)) {
    return { valid: false, error: 'network must be "devnet" or "mainnet"' };
  }
  if (typeof body.decimals !== "number" || body.decimals < 0 || body.decimals > 18) {
    return { valid: false, error: "decimals must be between 0 and 18" };
  }
  if (typeof body.supply !== "number" || body.supply <= 0) {
    return { valid: false, error: "supply must be a positive number" };
  }

  const boolFields = ["revoke_mint", "revoke_freeze", "revoke_update"];
  for (const field of boolFields) {
    if (body[field] !== undefined && typeof body[field] !== "boolean") {
      return { valid: false, error: `${field} must be a boolean` };
    }
  }

  return { valid: true };
}

// ─── POST: Save Token ─────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const validation = validateTokenData(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const {
      mint_address,
      name,
      symbol,
      description,
      image_url,
      metadata_uri,
      network,
      creator_wallet,
      supply,
      decimals,
      revoke_mint,
      revoke_freeze,
      revoke_update,
    } = body;

    const query = `
      INSERT INTO tokens (
        mint_address, name, symbol, description, image_url, metadata_uri,
        network, creator_wallet, supply, decimals,
        revoke_mint, revoke_freeze, revoke_update
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (mint_address) DO NOTHING
      RETURNING *
    `;

    const values = [
      mint_address,
      name,
      symbol,
      description || "",
      image_url || "",
      metadata_uri || "",
      network,
      creator_wallet,
      supply,
      decimals,
      revoke_mint ?? false,
      revoke_freeze ?? false,
      revoke_update ?? false,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Token already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ token: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error saving token:", error);
    return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
  }
}

// ─── GET: Fetch Tokens ────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get("network") || "devnet";
    const wallet = searchParams.get("wallet");

    const rawLimit = parseInt(searchParams.get("limit") || "50");
    const limit = Math.min(Math.max(rawLimit, 1), 100);

    const rawOffset = parseInt(searchParams.get("offset") || "0");
    const offset = Math.max(rawOffset, 0);

    if (!["devnet", "mainnet"].includes(network)) {
      return NextResponse.json(
        { error: 'Invalid network. Must be "devnet" or "mainnet"' },
        { status: 400 }
      );
    }

    // Validate wallet if provided
    if (wallet) {
      try {
        new PublicKey(wallet);
      } catch {
        return NextResponse.json(
          { error: "Invalid wallet address" },
          { status: 400 }
        );
      }
    }

    let query: string;
    let values: any[];

    if (wallet) {
      // Filter by both network and creator_wallet
      query = `
        SELECT * FROM tokens
        WHERE network = $1 AND creator_wallet = $2
        ORDER BY created_at DESC
        LIMIT $3 OFFSET $4
      `;
      values = [network, wallet, limit, offset];
    } else {
      // Return all tokens for the network (public explorer use)
      query = `
        SELECT * FROM tokens
        WHERE network = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      `;
      values = [network, limit, offset];
    }

    const result = await pool.query(query, values);

    // Always return { tokens: [] } shape so dashboard can do data.tokens
    return NextResponse.json({ tokens: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 });
  }
}
