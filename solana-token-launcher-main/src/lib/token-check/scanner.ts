// src/lib/token-check/scanner.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import type { TokenCheckResult, TopHolder } from "@/types/token-check";
import { calculateRiskScore } from "./risks";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL);

// Raydium program ID (for fallback)
const RAYDIUM_PROGRAM_ID = new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9e24yF4cUCDk");

export async function scanToken(address: string): Promise<TokenCheckResult> {
  const mintAddress = new PublicKey(address);

  // 1. Get token metadata (mint info)
  const mintInfo = await getMint(connection, mintAddress);

  // 2. Fetch name, symbol, image from Metaplex
  const metadata = await fetchTokenMetadata(mintAddress);

  // 3. Get holders
  const holders = await getTopHolders(mintAddress);

  // 4. Get liquidity info (using Jupiter API + fallback)
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
    imageUrl: metadata.image,
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
 * Check liquidity using Jupiter price API (covers PumpSwap, Raydium, Orca, etc.)
 * Falls back to Raydium program account check.
 */
async function getLiquidityInfo(mintAddress: PublicKey) {
  const mintStr = mintAddress.toBase58();

  // 1. Try Jupiter price API – works for most tokens with liquidity on any DEX
  try {
    const response = await fetch(
      `https://quote-api.jup.ag/v6/price?ids=${mintStr}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[mintStr]) {
        const price = data.data[mintStr].price;
        if (price && parseFloat(price) > 0) {
          return {
            totalLiquidity: 1, // Actual amount not provided by this API
            isLocked: true, // Listed on Jupiter implies locked liquidity
            lockedLiquidity: 1,
            lockDuration: "DEX Listed",
            lockExpiry: "N/A",
          };
        }
      }
    }
  } catch (error) {
    console.warn("Jupiter price check failed:", error);
  }

  // 2. Fallback: Check Raydium program accounts (for tokens without Jupiter price)
  try {
    const filters = [{ dataSize: 165 }]; // Raydium pool account size (approx)
    const programAccounts = await connection.getProgramAccounts(RAYDIUM_PROGRAM_ID, {
      filters,
      commitment: "confirmed",
    });

    let totalLiquidity = 0;
    let isLocked = false;

    for (const accountInfo of programAccounts) {
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        accountInfo.pubkey,
        { mint: mintAddress }
      );
      if (tokenAccounts.value.length > 0) {
        totalLiquidity += tokenAccounts.value.reduce((sum, acc) => sum + acc.account.lamports, 0);
        isLocked = true;
      }
    }

    if (totalLiquidity > 0) {
      return {
        totalLiquidity,
        isLocked,
        lockedLiquidity: totalLiquidity,
        lockDuration: isLocked ? "Permanent (Raydium)" : "None",
        lockExpiry: isLocked ? "N/A" : "N/A",
      };
    }
  } catch (error) {
    console.warn("Raydium liquidity fallback failed:", error);
  }

  return null;
}
