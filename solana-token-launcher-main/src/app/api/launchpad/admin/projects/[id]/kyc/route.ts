import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

// POST – mark KYC as verified (Admin only)
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verify JWT
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
      jwt.verify(token, secret);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get project ID and wallet
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    // 3. Upsert KYC record
    await query(
      `INSERT INTO launchpad_kyc (project_id, wallet, verified, verified_at)
       VALUES ($1, $2, true, NOW()) 
       ON CONFLICT (project_id, wallet) DO UPDATE 
       SET verified = true, verified_at = NOW()`,
      [projectId, wallet]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('KYC error:', error);
    return NextResponse.json({ error: 'Failed to verify KYC' }, { status: 500 });
  }
}
