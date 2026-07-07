import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET → list proposals (filter by status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'active';
    const res = await query(
      'SELECT * FROM dao_proposals WHERE status = $1 ORDER BY created_at DESC',
      [status]
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 });
  }
}

// POST → create a new proposal
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { creator_wallet, token_mint, title, description, start_time, end_time } = body;
    if (!creator_wallet || !token_mint || !title || !start_time || !end_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await query(
      `INSERT INTO dao_proposals (creator_wallet, token_mint, title, description, start_time, end_time, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING *`,
      [creator_wallet, token_mint, title, description, start_time, end_time]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
