import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { wallet } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Get unclaimed commissions
    const unclaimedRes = await query(
      `SELECT SUM(commission_earned) as total
       FROM referrals
       WHERE referrer_wallet = $1 AND status = 'completed' AND claimed_at IS NULL`,
      [wallet]
    );

    const totalUnclaimed = parseFloat(unclaimedRes.rows[0]?.total || 0);

    if (totalUnclaimed === 0) {
      return NextResponse.json({
        success: false,
        message: 'No unclaimed commissions available',
      });
    }

    // Mark as claimed
    await query(
      `UPDATE referrals
       SET claimed_at = NOW(), status = 'claimed'
       WHERE referrer_wallet = $1 AND status = 'completed' AND claimed_at IS NULL`,
      [wallet]
    );

    // Update stats
    await query(
      `UPDATE referral_stats
       SET claimed_commission = claimed_commission + $1,
           last_updated = NOW()
       WHERE wallet = $2`,
      [totalUnclaimed, wallet]
    );

    return NextResponse.json({
      success: true,
      message: `Claimed ${totalUnclaimed.toFixed(6)} SOL!`,
      amount: totalUnclaimed,
    });
  } catch (error) {
    console.error('Claim commission error:', error);
    return NextResponse.json(
      { error: 'Failed to claim commission' },
      { status: 500 }
    );
  }
}
