import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createVestingContract } from '@/lib/vesting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tokenMint,
      creator,
      beneficiary,
      totalAmount,
      cliffDuration,
      vestingDuration,
      releaseFrequency,
      startTime,
    } = body;

    // Validation
    if (!tokenMint || !creator || !beneficiary || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert contract (status = pending)
    const result = await query(
      `INSERT INTO vesting_contracts (
        token_mint, creator_wallet, beneficiary_wallet, total_amount,
        cliff_duration, vesting_duration, release_frequency, start_time, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
      RETURNING id`,
      [tokenMint, creator, beneficiary, totalAmount, cliffDuration || 0, vestingDuration || 0, releaseFrequency || 0, startTime || new Date()]
    );

    return NextResponse.json({
      success: true,
      contractId: result.rows[0].id,
      message: 'Vesting contract created. Please transfer tokens to the platform wallet to activate.'
    });
  } catch (error) {
    console.error('Create vesting error:', error);
    return NextResponse.json({ error: 'Failed to create vesting contract' }, { status: 500 });
  }
}
