// src/lib/token-check/risks.ts
import type { RiskDefinition, Risk, TokenCheckResult } from "@/types/token-check";

export const RISK_DEFINITIONS: RiskDefinition[] = [
  {
    id: "mint_authority_not_revoked",
    title: "Mint Authority Not Revoked",
    description: "The creator can still mint new tokens, potentially causing inflation.",
    level: "danger",
    weight: 3000,
    check: (data) => !data.mintAuthorityRevoked,
  },
  {
    id: "freeze_authority_not_revoked",
    title: "Freeze Authority Not Revoked",
    description: "The creator can freeze your tokens, locking your funds.",
    level: "danger",
    weight: 2500,
    check: (data) => !data.freezeAuthorityRevoked,
  },
  {
    id: "high_holder_concentration",
    title: "High Holder Concentration",
    description: "Top 10 holders own more than 70% of supply, indicating centralization.",
    level: "danger",
    weight: 3000,
    check: (data) => {
      const top10Percentage = data.topHolders
        .slice(0, 10)
        .reduce((sum: number, h: any) => sum + h.percentage, 0);
      return top10Percentage > 70;
    },
  },
  {
    id: "liquidity_not_locked",
    title: "Liquidity Not Locked",
    description: "Liquidity can be removed at any time, risking a rug pull.",
    level: "critical",
    weight: 4000,
    check: (data) => data.liquidityInfo && !data.liquidityInfo.isLocked,
  },
  {
    id: "no_liquidity",
    title: "No Liquidity Detected",
    description: "This token has no liquidity pool, making it impossible to trade.",
    level: "warning",
    weight: 1500,
    check: (data) => !data.liquidityInfo || data.liquidityInfo.totalLiquidity === 0,
  },
  {
    id: "low_holder_count",
    title: "Low Holder Count",
    description: "Very few holders, indicating low adoption and potential manipulation.",
    level: "warning",
    weight: 1000,
    check: (data) => data.topHolders.length < 50,
  },
];

export function calculateRiskScore(data: any): {
  score: number;
  level: "safe" | "medium" | "high" | "critical";
  risks: Risk[];
} {
  let totalScore = 0;
  const detectedRisks: Risk[] = [];

  for (const definition of RISK_DEFINITIONS) {
    const triggered = definition.check(data);
    if (triggered) {
      totalScore += definition.weight;
      detectedRisks.push({
        level: definition.level,
        title: definition.title,
        description: definition.description,
        score: definition.weight,
      });
    }
  }

  let level: "safe" | "medium" | "high" | "critical";
  if (totalScore === 0) level = "safe";
  else if (totalScore < 2000) level = "medium";
  else if (totalScore < 5000) level = "high";
  else level = "critical";

  return { score: totalScore, level, risks: detectedRisks };
}
