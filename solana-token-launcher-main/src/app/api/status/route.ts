import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Helper to measure latency
async function measure<T>(fn: () => Promise<T>): Promise<{ data: T; latency: number }> {
  const start = Date.now();
  const data = await fn();
  return { data, latency: Date.now() - start };
}

type ServiceStatus = 'operational' | 'degraded' | 'down';

interface ServiceCheck {
  name: string;
  status: ServiceStatus;
  latency: number;
  message?: string;
  checkedAt: string;
}

export async function GET() {
  const checks: ServiceCheck[] = [];
  const now = new Date().toISOString();

  // ─── 1. Database ───────────────────────────────────────────────
  try {
    const { latency } = await measure(() => query('SELECT 1'));
    checks.push({ name: 'Database', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Database', status: 'down', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 2. Helius RPC ─────────────────────────────────────────────
  const heliusKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
  if (heliusKey) {
    try {
      const { latency } = await measure(async () => {
        const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getHealth' }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data;
      });
      checks.push({ name: 'Helius RPC', status: 'operational', latency, checkedAt: now });
    } catch (err: any) {
      checks.push({ name: 'Helius RPC', status: 'down', latency: 0, message: err.message, checkedAt: now });
    }
  } else {
    checks.push({ name: 'Helius RPC', status: 'degraded', latency: 0, message: 'API key not configured', checkedAt: now });
  }

  // ─── 3. Solana Network (public RPC) ──────────────────────────
  try {
    const { latency } = await measure(async () => {
      const res = await fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getHealth' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      return data;
    });
    checks.push({ name: 'Solana Network (Public)', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Solana Network (Public)', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 4. Pinata Gateway ─────────────────────────────────────────
  try {
    const cid = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco';
    const { latency } = await measure(async () => {
      const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    });
    checks.push({ name: 'Pinata Gateway', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Pinata Gateway', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 5. Resend Email ──────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY || '';
  if (resendKey) {
    try {
      const { latency } = await measure(async () => {
        const res = await fetch('https://api.resend.com/domains', {
          headers: { Authorization: `Bearer ${resendKey}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
      });
      checks.push({ name: 'Resend Email', status: 'operational', latency, checkedAt: now });
    } catch (err: any) {
      checks.push({ name: 'Resend Email', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
    }
  } else {
    checks.push({ name: 'Resend Email', status: 'degraded', latency: 0, message: 'API key not configured', checkedAt: now });
  }

  // ─── 6. Phantom Wallet ──────────────────────────────────────────
  try {
    const { latency } = await measure(() =>
      fetch('https://phantom.app', { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    );
    checks.push({ name: 'Phantom Wallet', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Phantom Wallet', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 7. Solflare Wallet ─────────────────────────────────────────
  try {
    const { latency } = await measure(() =>
      fetch('https://solflare.com', { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    );
    checks.push({ name: 'Solflare Wallet', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Solflare Wallet', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 8. Backpack Wallet ─────────────────────────────────────────
  try {
    const { latency } = await measure(() =>
      fetch('https://backpack.app', { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    );
    checks.push({ name: 'Backpack Wallet', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Backpack Wallet', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 9. Jupiter API ────────────────────────────────────────────
  try {
    const { latency } = await measure(async () => {
      const res = await fetch('https://quote-api.jup.ag/v6/price?ids=So11111111111111111111111111111111111111112', {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
    checks.push({ name: 'Jupiter API', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Jupiter API', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 10. Raydium API ───────────────────────────────────────────
  try {
    const { latency } = await measure(async () => {
      const res = await fetch('https://api.raydium.io/v2/main/price', {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
    checks.push({ name: 'Raydium API', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Raydium API', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── 11. Orca API ──────────────────────────────────────────────
  try {
    const { latency } = await measure(async () => {
      const res = await fetch('https://api.orca.so/public/pools', {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
    checks.push({ name: 'Orca API', status: 'operational', latency, checkedAt: now });
  } catch (err: any) {
    checks.push({ name: 'Orca API', status: 'degraded', latency: 0, message: err.message, checkedAt: now });
  }

  // ─── Overall Status ─────────────────────────────────────────────
  const overall = checks.some(c => c.status === 'down')
    ? 'down'
    : checks.some(c => c.status === 'degraded')
    ? 'degraded'
    : 'operational';

  return NextResponse.json({ overall, lastUpdated: now, services: checks });
}
