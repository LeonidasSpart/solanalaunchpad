import { 
  Connection, 
  PublicKey, 
  Transaction,
} from '@solana/web3.js';
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAccount,
} from '@solana/spl-token';

// ─── Helius Integration ─────────────────────────────────────────────

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
if (!HELIUS_API_KEY) {
  throw new Error('NEXT_PUBLIC_HELIUS_API_KEY is required');
}

const HELIUS_RPC_DEVNET = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const HELIUS_RPC_MAINNET = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

function getHeliusRpc(network: 'devnet' | 'mainnet' = 'mainnet'): string {
  return network === 'devnet' ? HELIUS_RPC_DEVNET : HELIUS_RPC_MAINNET;
}

interface HeliusTokenMetadata {
  mint: string;
  onChainData?: {
    name?: string;
    symbol?: string;
    uri?: string;
  };
  offChainData?: {
    name?: string;
    symbol?: string;
    image?: string;
  };
}

async function getHeliusTokenMetadata(
  mints: string[],
  network: 'devnet' | 'mainnet'
): Promise<HeliusTokenMetadata[]> {
  const baseUrl = network === 'devnet' 
    ? 'https://api-devnet.helius.xyz/v0'
    : 'https://api.helius.xyz/v0';
    
  const response = await fetch(`${baseUrl}/token-metadata?api-key=${HELIUS_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mintAccounts: mints }),
  });

  if (!response.ok) {
    throw new Error(`Helius metadata error: ${response.status}`);
  }

  return response.json();
}

// ─── Types ────────────────────────────────────────────────────────

export interface LPToken {
  mint: string;
  name: string;
  symbol: string;
  balance: number;
  rawBalance: bigint;        // ← Added: precise BigInt for tx
  decimals: number;
  poolName: string;
  value: string;
  ata: string;
  logo?: string;
}

export interface BurnLPParams {
  connection: Connection;
  wallet: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  lpToken: LPToken;
}

// ─── LP Token Detection ───────────────────────────────────────────

const LP_PATTERNS = [
  { regex: /raydium|ray/i, pool: 'Raydium' },
  { regex: /orca|whirlpool/i, pool: 'Orca' },
  { regex: /meteora/i, pool: 'Meteora' },
  { regex: /lifinity/i, pool: 'Lifinity' },
  { regex: /cropper/i, pool: 'Cropper' },
  { regex: /pool|lp|liquidity/i, pool: 'DEX Pool' },
  { regex: /pump/i, pool: 'Pump.fun' },
];

function identifyLPToken(meta: HeliusTokenMetadata): { 
  name: string; 
  symbol: string; 
  poolName: string 
} | null {
  const name = meta.onChainData?.name || meta.offChainData?.name || '';
  const symbol = meta.onChainData?.symbol || meta.offChainData?.symbol || '';

  for (const pattern of LP_PATTERNS) {
    if (pattern.regex.test(name) || pattern.regex.test(symbol)) {
      return {
        name: name || `${pattern.pool} LP`,
        symbol: symbol || 'LP',
        poolName: pattern.pool,
      };
    }
  }

  return null;
}

// ─── Fetch LP Tokens ──────────────────────────────────────────────

export async function fetchLPTokens(
  connection: Connection,
  wallet: PublicKey,
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<LPToken[]> {
  const walletStr = wallet.toBase58();

  try {
    // Use Helius RPC for faster token account fetching
    const rpc = getHeliusRpc(network);
    
    const [tokenResponse, token2022Response] = await Promise.all([
      fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'token-accounts',
          method: 'getTokenAccountsByOwner',
          params: [
            walletStr,
            { programId: TOKEN_PROGRAM_ID.toBase58() },
            { encoding: 'jsonParsed' },
          ],
        }),
      }),
      fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'token2022-accounts',
          method: 'getTokenAccountsByOwner',
          params: [
            walletStr,
            { programId: TOKEN_2022_PROGRAM_ID.toBase58() },
            { encoding: 'jsonParsed' },
          ],
        }),
      }),
    ]);

    const [tokenData, token2022Data] = await Promise.all([
      tokenResponse.json(),
      token2022Response.json(),
    ]);

    const allAccounts = [
      ...(tokenData.result?.value || []),
      ...(token2022Data.result?.value || []),
    ];

    // Filter non-zero balances
    const nonZeroAccounts = allAccounts.filter((item: any) => {
      const amount = Number(item.account.data.parsed.info.tokenAmount.amount);
      return amount > 0;
    });

    if (nonZeroAccounts.length === 0) return [];

    // Fetch metadata in batch via Helius
    const mints = nonZeroAccounts.map((item: any) => 
      item.account.data.parsed.info.mint
    );
    
    const metadata = await getHeliusTokenMetadata(mints, network);

    const lpTokens: LPToken[] = [];

    for (const item of nonZeroAccounts) {
      const parsed = item.account.data.parsed.info;
      const mint = parsed.mint;
      const decimals = parsed.tokenAmount.decimals;
      const rawAmount = BigInt(parsed.tokenAmount.amount);
      const uiAmount = Number(parsed.tokenAmount.uiAmount) || 0;

      const meta = metadata.find((m) => m.mint === mint);
      if (!meta) continue;

      const lpInfo = identifyLPToken(meta);
      if (!lpInfo) continue;

      lpTokens.push({
        mint,
        name: lpInfo.name,
        symbol: lpInfo.symbol,
        balance: uiAmount,
        rawBalance: rawAmount,        // ← Precise BigInt from RPC
        decimals,
        poolName: lpInfo.poolName,
        value: '~Value TBD',          // ← Fetch from DEX API in v2
        ata: item.pubkey,
        logo: meta.offChainData?.image,
      });
    }

    return lpTokens;
  } catch (error: any) {
    console.error('Error fetching LP tokens:', error);
    throw new Error(error.message || 'Failed to fetch LP tokens');
  }
}

// ─── Burn LP Tokens ───────────────────────────────────────────────

export async function burnLPTokens({
  connection,
  wallet,
  signTransaction,
  lpToken,
}: BurnLPParams): Promise<string> {
  try {
    const mint = new PublicKey(lpToken.mint);
    const sourceATA = new PublicKey(lpToken.ata);
    
    // Burn destination: the token mint itself (no one can access)
    const burnDestination = mint;
    const burnATA = getAssociatedTokenAddressSync(mint, burnDestination, true);

    const transaction = new Transaction();

    // Create burn ATA if it doesn't exist
    try {
      await getAccount(connection, burnATA);
    } catch {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          wallet,        // payer
          burnATA,
          burnDestination,
          mint
        )
      );
    }

    // Transfer ALL LP tokens using rawBalance (precise BigInt)
    transaction.add(
      createTransferInstruction(
        sourceATA,
        burnATA,
        wallet,
        lpToken.rawBalance,     // ← Uses precise BigInt, no float conversion
        [],
        TOKEN_PROGRAM_ID
      )
    );

    // Get fresh blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet;

    // Simulate first (catches errors before wallet popup)
    const simulation = await connection.simulateTransaction(transaction);
    if (simulation.value.err) {
      throw new Error(`Simulation failed: ${JSON.stringify(simulation.value.err)}`);
    }

    // Sign & send
    const signed = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize(), {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Confirm
    const confirmation = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      'confirmed'
    );

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
    }

    return signature;
  } catch (error: any) {
    console.error('Burn LP error:', error);
    throw new Error(error.message || 'Failed to burn LP tokens');
  }
}
