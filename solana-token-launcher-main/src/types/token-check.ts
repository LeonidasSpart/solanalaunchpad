// src/types/token-check.ts

export interface TokenCheckResult {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  mintAuthorityRevoked: boolean;
  freezeAuthorityRevoked: boolean;
  topHolders: TopHolder[];
  holderDistribution: number;
  liquidityInfo: LiquidityInfo | null;
  riskScore: number;
  riskLevel: "safe" | "medium" | "high" | "critical";
  risks: Risk[];
  imageUrl?: string | null; // ✅ Added
  createdAt: string;
}

export interface TopHolder {
  address: string;
  balance: number;
  percentage: number;
}

export interface LiquidityInfo {
  totalLiquidity: number;
  lockedLiquidity: number;
  isLocked: boolean;
  lockDuration?: string;
  lockExpiry?: string;
}

export interface Risk {
  level: "info" | "warning" | "danger" | "critical";
  title: string;
  description: string;
  score: number;
}

export interface RiskDefinition {
  id: string;
  title: string;
  description: string;
  level: Risk["level"];
  weight: number;
  check: (data: any) => boolean | number;
}
