import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

// ─── JWT Verification Helper ──────────────────────────────────────
async function verifyAdminToken(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// ─── POST – add wallet to whitelist ──────────────────────────────
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verify JWT
    const isAdmin = await verifyAdminToken(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get project ID and wallet
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    // 3. Insert into whitelist (conflict on unique constraint)
    await query(
      'INSERT INTO launchpad_whitelist (project_id, wallet) VALUES ($1, $2) ON CONFLICT (project_id, wallet) DO NOTHING',
      [projectId, wallet]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Whitelist add error:', error);
    return NextResponse.json({ error: 'Failed to add to whitelist' }, { status: 500 });
  }
}

// ─── DELETE – remove from whitelist ─────────────────────────────
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verify JWT
    const isAdmin = await verifyAdminToken(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get project ID and wallet
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    // 3. Delete from whitelist
    await query(
      'DELETE FROM launchpad_whitelist WHERE project_id = $1 AND wallet = $2',
      [projectId, wallet]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Whitelist remove error:', error);
    return NextResponse.json({ error: 'Failed to remove from whitelist' }, { status: 500 });
  }
}
