const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_RPC_DEVNET = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const HELIUS_RPC_MAINNET = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

export function getHeliusRpc(network: 'devnet' | 'mainnet' = 'mainnet'): string {
  return network === 'devnet' ? HELIUS_RPC_DEVNET : HELIUS_RPC_MAINNET;
}

// Helius Enhanced API endpoints
const HELIUS_API_BASE = 'https://api.helius.xyz/v0';

export async function heliusRequest<T>(
  endpoint: string,
  params: Record<string, any> = {},
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<T> {
  const url = new URL(`${HELIUS_API_BASE}${endpoint}`);
  url.searchParams.append('api-key', HELIUS_API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Helius API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get token metadata from Helius
export interface HeliusTokenMetadata {
  mint: string;
  onChainData?: {
    name?: string;
    symbol?: string;
    uri?: string;
    sellerFeeBasisPoints?: number;
    creators?: any[];
  };
  offChainData?: {
    name?: string;
    symbol?: string;
    description?: string;
    image?: string;
    attributes?: any[];
  };
  tokenStandard?: string;
}

export async function getTokenMetadata(
  mintAddresses: string[],
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<HeliusTokenMetadata[]> {
  const url = `${HELIUS_API_BASE}/token-metadata?api-key=${HELIUS_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mintAccounts: mintAddresses }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token metadata from Helius');
  }

  return response.json();
}

// Get token balances with metadata
export interface HeliusTokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  tokenAccount: string;
  metadata?: HeliusTokenMetadata;
}

export async function getTokenBalances(
  wallet: string,
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<HeliusTokenBalance[]> {
  const rpc = getHeliusRpc(network);
  
  const response = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'helius-token-balances',
      method: 'getTokenAccountsByOwner',
      params: [
        wallet,
        { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
        { encoding: 'jsonParsed' },
      ],
    }),
  });

  const data = await response.json();
  
  if (!data.result?.value) return [];

  return data.result.value.map((item: any) => ({
    mint: item.account.data.parsed.info.mint,
    amount: Number(item.account.data.parsed.info.tokenAmount.amount),
    decimals: item.account.data.parsed.info.tokenAmount.decimals,
    tokenAccount: item.pubkey,
  }));
}

// Get asset data (NFTs, tokens with full metadata)
export async function getAssetsByOwner(
  wallet: string,
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<any[]> {
  const url = `${HELIUS_API_BASE}/addresses/?api-key=${HELIUS_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      addresses: [wallet],
      includeMetadata: true,
    }),
  });

  if (!response.ok) return [];
  
  const data = await response.json();
  return data.result || [];
}
