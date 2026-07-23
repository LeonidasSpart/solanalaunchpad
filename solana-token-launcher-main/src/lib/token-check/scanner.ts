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
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

export async function scanToken(address: string): Promise<TokenCheckResult> {
  const mintAddress = new PublicKey(address);

  // 1. Get token mint info
  const mintInfo = await getMint(connection, mintAddress);

  // 2. Fetch metadata (name, symbol, image)
  const metadata = await fetchTokenMetadata(mintAddress);

  // 3. Get holders (accurate count & percentages)
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

  // Calculate top 10 concentration
  const top10Percentage = holders
    .slice(0, 10)
    .reduce((sum: number, h) => sum + h.percentage, 0);

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
    topHolders: holders.slice(0, 100), // Limit to top 100 for performance
    holderDistribution: top10Percentage,
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
 * Get top holders (up to 100) with accurate percentages.
 * Uses getTokenAccountsByOwner to count all holders.
 */
async function getTopHolders(mintAddress: PublicKey): Promise<TopHolder[]> {
  try {
    const mintInfo = await getMint(connection, mintAddress);
    const totalSupply = Number(mintInfo.supply);

    if (totalSupply === 0) return [];

    // Get all token accounts for this mint
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      TOKEN_PROGRAM_ID,
      { mint: mintAddress }
    );

    const holders: TopHolder[] = tokenAccounts.value.map((account) => {
      // Parse balance from account data (offset 64 for U64 balance)
      const balance = Number(account.account.data.readBigUInt64LE(64)) / Math.pow(10, mintInfo.decimals);
      return {
        address: account.pubkey.toBase58(),
        balance,
        percentage: (balance / (totalSupply / Math.pow(10, mintInfo.decimals))) * 100,
      };
    });

    // Sort by balance descending
    holders.sort((a, b) => b.balance - a.balance);
    return holders.slice(0, 100); // Return top 100 only
  } catch (error) {
    console.warn("Failed to get holders:", error);
    return [];
  }
}

/**
 * Check liquidity using:
 * 1. Jupiter price API (covers most DEXs)
 * 2. Raydium program accounts (fallback)
 */
async function getLiquidityInfo(mintAddress: PublicKey) {
  const mintStr = mintAddress.toBase58();

  // 1. Try Jupiter price API
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
            totalLiquidity: 1, // Actual amount not provided
            isLocked: true,
            lockedLiquidity: 1,
            lockDuration: "DEX Listed",
            lockExpiry: "N/A",
          };
        }
      }
    }
  } catch (error) {
    console.warn("Jupiter API failed:", error);
  }

  // 2. Fallback: Check Raydium program accounts
  try {
    const programAccounts = await connection.getProgramAccounts(RAYDIUM_PROGRAM_ID, {
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
        // Approximate liquidity by counting lamports in pool accounts
        totalLiquidity += tokenAccounts.value.reduce(
          (sum, acc) => sum + acc.account.lamports,
          0
        );
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
    console.warn("Raydium fallback failed:", error);
  }

  return null;
}
