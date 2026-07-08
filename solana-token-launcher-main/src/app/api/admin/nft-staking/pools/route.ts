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

// GET – list all pools
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await query('SELECT * FROM nft_staking_pools ORDER BY id DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch pools' }, { status: 500 });
  }
}

// POST – create a new pool
export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const {
      collection_mint,
      reward_mint,
      token_symbol,
      token_name,
      apy,
      lock_duration,
      min_stake,
      max_stake,
      is_active,
    } = body;

    if (!collection_mint || !reward_mint || apy === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO nft_staking_pools 
       (collection_mint, reward_mint, token_symbol, token_name, apy, lock_duration, min_stake, max_stake, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        collection_mint,
        reward_mint,
        token_symbol || '',
        token_name || '',
        parseFloat(apy),
        parseInt(lock_duration) || 0,
        parseInt(min_stake) || 1,
        parseInt(max_stake) || 0,
        is_active !== undefined ? is_active : true,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create pool' }, { status: 500 });
  }
}
