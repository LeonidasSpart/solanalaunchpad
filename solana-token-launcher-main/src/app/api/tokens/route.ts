import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      mint_address,
      name,
      symbol,
      description,
      image_url,
      metadata_uri,
      network,
      creator_wallet,
      supply,
      decimals,
      revoke_mint,
      revoke_freeze,
      revoke_update,
    } = body;

    const query = `
      INSERT INTO tokens (
        mint_address, name, symbol, description, image_url, metadata_uri,
        network, creator_wallet, supply, decimals,
        revoke_mint, revoke_freeze, revoke_update
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (mint_address) DO NOTHING
      RETURNING *
    `;

    const values = [
      mint_address,
      name,
      symbol,
      description,
      image_url,
      metadata_uri,
      network,
      creator_wallet,
      supply,
      decimals,
      revoke_mint,
      revoke_freeze,
      revoke_update,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Token already exists' }, { status: 409 });
    }

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ error: 'Failed to save token' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network') || 'devnet';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const query = `
      SELECT * FROM tokens
      WHERE network = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [network, limit, offset]);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}
