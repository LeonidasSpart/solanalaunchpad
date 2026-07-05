import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Helper to measure response time
async function measure<T>(fn: () => Promise<T>): Promise<{ data: T; latency: number }> {
  const start = Date.now();
  const data = await fn();
  return { data, latency: Date.now() - start };
}

// Service status types
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

  // 1. Database check
  try {
    const { latency } = await measure(() => query('SELECT 1'));
    checks.push({
      name: 'Database',
      status: 'operational',
      latency,
      checkedAt: now,
    });
  } catch (err: any) {
    checks.push({
      name: 'Database',
      status: 'down',
      latency: 0,
      message: err.message || 'Connection failed',
      checkedAt: now,
    });
  }

  // 2. Helius RPC check
  const heliusKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
  if (heliusKey) {
    try {
      const { latency } = await measure(async () => {
        const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getHealth',
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data;
      });
      checks.push({
        name: 'Helius RPC',
        status: 'operational',
        latency,
        checkedAt: now,
      });
    } catch (err: any) {
      checks.push({
        name: 'Helius RPC',
        status: 'down',
        latency: 0,
        message: err.message || 'RPC unreachable',
        checkedAt: now,
      });
    }
  } else {
    checks.push({
      name: 'Helius RPC',
      status: 'degraded',
      latency: 0,
      message: 'API key not configured',
      checkedAt: now,
    });
  }

  // 3. Pinata check (optional – just check gateway)
  try {
    const { latency } = await measure(() =>
      fetch('https://gateway.pinata.cloud/ipfs/bafkreih5b7...', {
        method: 'HEAD',
        signal: AbortSignal.timeout(3000),
      }).then(res => {
        if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
        return res;
      })
    );
    checks.push({
      name: 'Pinata Gateway',
      status: 'operational',
      latency,
      checkedAt: now,
    });
  } catch (err: any) {
    checks.push({
      name: 'Pinata Gateway',
      status: 'degraded',
      latency: 0,
      message: err.message || 'Gateway slow or unreachable',
      checkedAt: now,
    });
  }

  // 4. Resend (optional)
  const resendKey = process.env.RESEND_API_KEY || '';
  if (resendKey) {
    try {
      const { latency } = await measure(() =>
        fetch('https://api.resend.com/domains', {
          headers: { Authorization: `Bearer ${resendKey}` },
        }).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res;
        })
      );
      checks.push({
        name: 'Resend Email',
        status: 'operational',
        latency,
        checkedAt: now,
      });
    } catch (err: any) {
      checks.push({
        name: 'Resend Email',
        status: 'degraded',
        latency: 0,
        message: err.message || 'API key invalid or service down',
        checkedAt: now,
      });
    }
  }

  // 5. Overall status
  const overall = checks.some(c => c.status === 'down')
    ? 'down'
    : checks.some(c => c.status === 'degraded')
    ? 'degraded'
    : 'operational';

  return NextResponse.json({
    overall,
    lastUpdated: now,
    services: checks,
  });
}
