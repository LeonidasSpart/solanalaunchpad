import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { mintAddress: string } }
) {
  try {
    const { mintAddress } = params;
    
    const result = await pool.query(
      `SELECT * FROM tokens WHERE mint_address = $1`,
      [mintAddress]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    );
  }
}
