import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// PUT – update a farming pool
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const poolId = parseInt(id);
    const body = await req.json();
    const {
      lp_mint,
      reward_mint,
      token_symbol,
      token_name,
      apy,
      lock_duration,
      min_stake,
      max_stake,
      is_active,
    } = body;

    const result = await query(
      `UPDATE farming_pools SET
        lp_mint = $1,
        reward_mint = $2,
        token_symbol = $3,
        token_name = $4,
        apy = $5,
        lock_duration = $6,
        min_stake = $7,
        max_stake = $8,
        is_active = $9,
        updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [
        lp_mint,
        reward_mint,
        token_symbol || '',
        token_name || '',
        parseFloat(apy),
        parseInt(lock_duration) || 0,
        parseFloat(min_stake) || 0,
        parseFloat(max_stake) || 0,
        is_active !== undefined ? is_active : true,
        poolId,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update pool' }, { status: 500 });
  }
}

// DELETE – delete a farming pool
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const poolId = parseInt(id);
    await query('DELETE FROM farming_pools WHERE id = $1', [poolId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete pool' }, { status: 500 });
  }
}
