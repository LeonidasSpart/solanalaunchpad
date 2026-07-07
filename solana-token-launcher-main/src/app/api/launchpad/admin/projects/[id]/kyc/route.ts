import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST – mark KYC as verified
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    await query(
      `INSERT INTO launchpad_kyc (project_id, wallet, verified, verified_at)
       VALUES ($1, $2, true, NOW()) ON CONFLICT (project_id, wallet) DO UPDATE SET verified = true, verified_at = NOW()`,
      [projectId, wallet]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to verify KYC' }, { status: 500 });
  }
}
