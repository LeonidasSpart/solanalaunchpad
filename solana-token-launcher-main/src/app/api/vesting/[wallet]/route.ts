import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getClaimableAmount } from '@/lib/vesting';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  try {
    const { wallet } = await params;
    const res = await query(
      `SELECT * FROM vesting_contracts
       WHERE creator_wallet = $1 OR beneficiary_wallet = $1
       ORDER BY created_at DESC`,
      [wallet]
    );
    const contracts = res.rows.map((c: any) => ({
      ...c,
      claimable: getClaimableAmount(c),
    }));
    return NextResponse.json(contracts);
  } catch (error) {
    console.error('Fetch vesting error:', error);
    return NextResponse.json({ error: 'Failed to fetch vesting contracts' }, { status: 500 });
  }
}
