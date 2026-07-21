// src/lib/token-check/scanner.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { getAccount, getMint } from "@solana/spl-token";
import type { TokenCheckResult, TopHolder } from "@/types/token-check";
import { calculateRiskScore } from "./risks";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL);

export async function scanToken(address: string): Promise<TokenCheckResult> {
  const mintAddress = new PublicKey(address);

  // 1. Get token metadata
  const mintInfo = await getMint(connection, mintAddress);

  // 2. Get holders
  const holders = await getTopHolders(mintAddress);

  // 3. Get liquidity info
  const liquidityInfo = await getLiquidityInfo(mintAddress);

  // 4. Build result
  const rawData = {
    mintAuthorityRevoked: mintInfo.mintAuthority === null,
    freezeAuthorityRevoked: mintInfo.freezeAuthority === null,
    topHolders: holders,
    liquidityInfo,
  };

  const { score, level, risks } = calculateRiskScore(rawData);

  const result: TokenCheckResult = {
    address,
    name: "Unknown", // You can fetch from Metaplex metadata
    symbol: "Unknown",
    decimals: mintInfo.decimals,
    supply: Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals),
    mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
    freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
    mintAuthorityRevoked: mintInfo.mintAuthority === null,
    freezeAuthorityRevoked: mintInfo.freezeAuthority === null,
    topHolders: holders,
    holderDistribution: holders.length > 0
      ? holders.slice(0, 10).reduce((sum, h) => sum + h.percentage, 0)
      : 0,
    liquidityInfo,
    riskScore: score,
    riskLevel: level,
    risks,
    createdAt: new Date().toISOString(),
  };

  return result;
}

async function getTopHolders(mintAddress: PublicKey): Promise<TopHolder[]> {
  // Implementation: Fetch token accounts and calculate percentages
  // This is a simplified version – you may need to use Helius or DAS API
  const tokenAccounts = await connection.getTokenLargestAccounts(mintAddress);
  const totalSupply = await getMint(connection, mintAddress).then(m => Number(m.supply));

  return tokenAccounts.value.map((account) => ({
    address: account.address.toBase58(),
    balance: account.uiAmount || 0,
    percentage: (account.uiAmount || 0) / (totalSupply / 1e9) * 100,
  }));
}

async function getLiquidityInfo(mintAddress: PublicKey) {
  // Implementation: Check Raydium/Jupiter liquidity pools
  // For now, return null (you can expand this)
  return null;
}
