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

// ─── Helius Config ───────────────────────────────────────────────

const HELIUS_KEY = (() => {
  const devnetUrl = process.env.RPC_URL_DEVNET || '';
  const mainnetUrl = process.env.RPC_URL_MAINNET || '';

  const extractKey = (url: string): string | null => {
    const match = url.match(/api-key=([a-f0-9-]+)/i);
    return match ? match[1] : null;
  };

  const key = extractKey(devnetUrl) || extractKey(mainnetUrl);

  if (!key) {
    throw new Error('Helius API key not found in RPC URLs. Check RPC_URL_DEVNET or RPC_URL_MAINNET.');
  }

  return key;
})();

const rpc = (net: 'devnet' | 'mainnet') => 
  `https://${net}.helius-rpc.com/?api-key=${HELIUS_KEY}`;

const api = (net: 'devnet' | 'mainnet') => 
  `https://api${net === 'devnet' ? '-devnet' : ''}.helius.xyz/v0`;

// ─── Types ────────────────────────────────────────────────────────

export interface LPToken {
  mint: string;
  name: string;
  symbol: string;
  balance: number;
  rawBalance: bigint;
  decimals: number;
  poolName: string;
  value: string;
  ata: string;
  logo?: string;
}

export interface BurnLPParams {
  connection: Connection;
  wallet: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  lpToken: LPToken;
}

// ─── LP Detection Patterns ────────────────────────────────────────

const LP_PATTERNS = [
  { regex: /raydium|ray/i, pool: 'Raydium' },
  { regex: /orca|whirlpool/i, pool: 'Orca' },
  { regex: /meteora/i, pool: 'Meteora' },
  { regex: /lifinity/i, pool: 'Lifinity' },
  { regex: /cropper/i, pool: 'Cropper' },
  { regex: /pool|lp|liquidity/i, pool: 'DEX Pool' },
  { regex: /pump/i, pool: 'Pump.fun' },
];

// ─── Helius: Fetch Token Metadata ─────────────────────────────────

async function heliusMetadata(mints: string[], network: 'devnet' | 'mainnet') {
  const res = await fetch(`${api(network)}/token-metadata?api-key=${HELIUS_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mintAccounts: mints }),
  });
  if (!res.ok) throw new Error('Helius metadata failed');
  return res.json();
}

// ─── Identify LP Token from Metadata ─────────────────────────────

function identifyLP(meta: any): { name: string; symbol: string; poolName: string } | null {
  const name = meta?.onChainData?.name || meta?.offChainData?.name || '';
  const symbol = meta?.onChainData?.symbol || meta?.offChainData?.symbol || '';

  for (const p of LP_PATTERNS) {
    if (p.regex.test(name) || p.regex.test(symbol)) {
      return {
        name: name || `${p.pool} LP`,
        symbol: symbol || 'LP',
        poolName: p.pool,
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
  const w = wallet.toBase58();

  const [t1, t2] = await Promise.all([
    fetch(rpc(network), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1,
        method: 'getTokenAccountsByOwner',
        params: [w, { programId: TOKEN_PROGRAM_ID.toBase58() }, { encoding: 'jsonParsed' }],
      }),
    }),
    fetch(rpc(network), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 2,
        method: 'getTokenAccountsByOwner',
        params: [w, { programId: TOKEN_2022_PROGRAM_ID.toBase58() }, { encoding: 'jsonParsed' }],
      }),
    }),
  ]);

  const [d1, d2] = await Promise.all([t1.json(), t2.json()]);
  const accounts = [...(d1.result?.value || []), ...(d2.result?.value || [])];

  const nonZero = accounts.filter((a: any) => 
    Number(a.account.data.parsed.info.tokenAmount.amount) > 0
  );

  if (nonZero.length === 0) return [];

  const mints = nonZero.map((a: any) => a.account.data.parsed.info.mint);
  const metadata = await heliusMetadata(mints, network);

  const results: LPToken[] = [];

  for (const item of nonZero) {
    const p = item.account.data.parsed.info;
    const meta = metadata.find((m: any) => m.mint === p.mint);
    if (!meta) continue;

    const lp = identifyLP(meta);
    if (!lp) continue;

    results.push({
      mint: p.mint,
      name: lp.name,
      symbol: lp.symbol,
      balance: Number(p.tokenAmount.uiAmount) || 0,
      rawBalance: BigInt(p.tokenAmount.amount),
      decimals: p.tokenAmount.decimals,
      poolName: lp.poolName,
      value: '~Value TBD',
      ata: item.pubkey,
      logo: meta.offChainData?.image,
    });
  }

  return results;
}

// ─── Burn LP Tokens ───────────────────────────────────────────────

export async function burnLPTokens({
  connection,
  wallet,
  signTransaction,
  lpToken,
}: BurnLPParams): Promise<string> {
  const mint = new PublicKey(lpToken.mint);
  const source = new PublicKey(lpToken.ata);
  const burnDest = mint;
  const burnATA = getAssociatedTokenAddressSync(mint, burnDest, true);

  const tx = new Transaction();

  try {
    await getAccount(connection, burnATA);
  } catch {
    tx.add(createAssociatedTokenAccountInstruction(wallet, burnATA, burnDest, mint));
  }

  tx.add(createTransferInstruction(source, burnATA, wallet, lpToken.rawBalance, [], TOKEN_PROGRAM_ID));

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet;

  const sim = await connection.simulateTransaction(tx);
  if (sim.value.err) throw new Error(`Sim failed: ${JSON.stringify(sim.value.err)}`);

  const signed = await signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });

  const conf = await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, 'confirmed');
  if (conf.value.err) throw new Error(`Tx failed: ${conf.value.err}`);

  return sig;
}
