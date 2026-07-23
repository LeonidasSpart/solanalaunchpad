// src/lib/token-check/scanner.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import type { TokenCheckResult, TopHolder } from "@/types/token-check";
import { calculateRiskScore } from "./risks";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL);

// Raydium program IDs
const RAYDIUM_PROGRAM_ID = new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9e24yF4cUCDk");
const RAYDIUM_POOL_VAULT = new PublicKey("5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1");

export async function scanToken(address: string): Promise<TokenCheckResult> {
  const mintAddress = new PublicKey(address);

  // 1. Get token metadata (mint info)
  const mintInfo = await getMint(connection, mintAddress);

  // 2. Fetch name, symbol, image from Metaplex
  const metadata = await fetchTokenMetadata(mintAddress);

  // 3. Get holders
  const holders = await getTopHolders(mintAddress);

  // 4. Get liquidity info
  const liquidityInfo = await getLiquidityInfo(mintAddress);

  // 5. Build raw data for risk calculation
  const rawData = {
    mintAuthorityRevoked: mintInfo.mintAuthority === null,
    freezeAuthorityRevoked: mintInfo.freezeAuthority === null,
    topHolders: holders,
    liquidityInfo,
  };

  const { score, level, risks } = calculateRiskScore(rawData);

  const result: TokenCheckResult = {
    address,
    name: metadata.name,
    symbol: metadata.symbol,
    decimals: mintInfo.decimals,
    supply: Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals),
    mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
    freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
    mintAuthorityRevoked: mintInfo.mintAuthority === null,
    freezeAuthorityRevoked: mintInfo.freezeAuthority === null,
    topHolders: holders,
    holderDistribution: holders.length > 0
      ? holders.slice(0, 10).reduce((sum: number, h) => sum + h.percentage, 0)
      : 0,
    liquidityInfo,
    riskScore: score,
    riskLevel: level,
    risks,
    imageUrl: metadata.image, // ✅ Added
    createdAt: new Date().toISOString(),
  };

  return result;
}

/**
 * Fetch token metadata from Metaplex (name, symbol, image URI)
 */
async function fetchTokenMetadata(mintAddress: PublicKey) {
  const metaplex = new Metaplex(connection);

  try {
    const metadata = await metaplex.nfts().findByMint({ mintAddress });
    const json = await fetch(metadata.uri).then(res => res.json()).catch(() => ({}));

    return {
      name: metadata.name || "Unknown",
      symbol: metadata.symbol || "Unknown",
      image: json.image || null,
    };
  } catch (error) {
    console.warn("Failed to fetch Metaplex metadata:", error);
    return {
      name: "Unknown",
      symbol: "Unknown",
      image: null,
    };
  }
}

/**
 * Get top holders for a token
 */
async function getTopHolders(mintAddress: PublicKey): Promise<TopHolder[]> {
  try {
    const tokenAccounts = await connection.getTokenLargestAccounts(mintAddress);
    const totalSupply = await getMint(connection, mintAddress).then(m => Number(m.supply));

    // if total supply is zero, avoid division by zero
    if (totalSupply === 0) return [];

    return tokenAccounts.value.map((account) => ({
      address: account.address.toBase58(),
      balance: account.uiAmount || 0,
      percentage: (account.uiAmount || 0) / (totalSupply / 1e9) * 100,
    }));
  } catch (error) {
    console.warn("Failed to get top holders:", error);
    return [];
  }
}

/**
 * Check liquidity on Raydium pools
 */
async function getLiquidityInfo(mintAddress: PublicKey) {
  try {
    // Get all token accounts owned by the Raydium program that hold this mint
    // Raydium pools store token accounts in a specific format, but we can search for any account
    // that has the mint and is owned by the Raydium program.
    const filters = [
      { dataSize: 165 }, // Raydium pool account size (varies, but this is common)
    ];

    const programAccounts = await connection.getProgramAccounts(RAYDIUM_PROGRAM_ID, {
      filters,
      commitment: "confirmed",
    });

    // Check each account to see if it holds the mint
    let totalLiquidity = 0;
    let isLocked = false;

    for (const accountInfo of programAccounts) {
      // Parse the account data to extract mint and balance (simplified)
      // In production, use proper Raydium SDK or decode the account layout
      // Here we just check if the account's owner is the mint address
      // This is a simplification; for real detection, we would decode the pool account.
      // Instead, we can simply check if any token account of this mint is owned by Raydium program.
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        accountInfo.pubkey,
        { mint: mintAddress }
      );
      if (tokenAccounts.value.length > 0) {
        totalLiquidity += tokenAccounts.value.reduce((sum, acc) => sum + acc.account.lamports, 0);
        isLocked = true;
      }
    }

    // If no liquidity found, return null
    if (totalLiquidity === 0) {
      return null;
    }

    return {
      totalLiquidity,
      isLocked,
      lockedLiquidity: totalLiquidity,
      lockDuration: isLocked ? "Permanent (Raydium)" : "None",
      lockExpiry: isLocked ? "N/A" : "N/A",
    };
  } catch (error) {
    console.warn("Liquidity check failed:", error);
    return null;
  }
}
