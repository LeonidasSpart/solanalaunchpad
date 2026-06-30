import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network');

    let query = 'SELECT COUNT(*) FROM tokens';
    const params: string[] = [];

    if (network) {
      query += ' WHERE network = $1';
      params.push(network);
    }

    const result = await pool.query(query, params);
    return NextResponse.json({ count: parseInt(result.rows[0].count) }, { status: 200 });
  } catch (error) {
    console.error('Error counting tokens:', error);
    return NextResponse.json({ error: 'Failed to count tokens' }, { status: 500 });
  }
}
