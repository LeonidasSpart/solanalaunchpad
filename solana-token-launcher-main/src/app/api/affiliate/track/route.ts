import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { referrer, referred, event } = await request.json();

    if (!referrer || !referred) {
      return NextResponse.json(
        { error: 'Referrer and referred wallet addresses are required' },
        { status: 400 }
      );
    }

    // Check if referral already exists
    const existing = await query(
      `SELECT * FROM referrals WHERE referrer_wallet = $1 AND referred_wallet = $2`,
      [referrer, referred]
    );

    if (existing.rows.length === 0) {
      // Create new referral
      await query(
        `INSERT INTO referrals (referrer_wallet, referred_wallet, status, created_at)
         VALUES ($1, $2, 'pending', NOW())`,
        [referrer, referred]
      );

      // Update referral stats
      await query(
        `INSERT INTO referral_stats (wallet, total_referrals, last_updated)
         VALUES ($1, 1, NOW())
         ON CONFLICT (wallet) DO UPDATE
         SET total_referrals = referral_stats.total_referrals + 1,
             last_updated = NOW()`,
        [referrer]
      );

      // Log event
      await query(
        `INSERT INTO referral_events (wallet, event_type, metadata, created_at)
         VALUES ($1, 'signup', $2::jsonb, NOW())`,
        [referrer, JSON.stringify({ referred, event })]
      );

      // Check milestone
      const statsRes = await query(
        `SELECT total_referrals FROM referral_stats WHERE wallet = $1`,
        [referrer]
      );
      const total = statsRes.rows[0]?.total_referrals || 0;

      let milestoneMessage = null;
      if (total === 5) milestoneMessage = '🎉 You reached 5 referrals! Bonus: 0.05 SOL';
      else if (total === 10) milestoneMessage = '🎉 You reached 10 referrals! Bonus: 0.10 SOL';
      else if (total === 25) milestoneMessage = '🎉 You reached 25 referrals! Bonus: 0.25 SOL';
      else if (total === 50) milestoneMessage = '🎉 You reached 50 referrals! Bonus: 0.50 SOL';
      else if (total === 100) milestoneMessage = '🎉 You reached 100 referrals! Bonus: 1.00 SOL';

      if (milestoneMessage) {
        // Log milestone event
        await query(
          `INSERT INTO referral_events (wallet, event_type, metadata, created_at)
           VALUES ($1, 'milestone', $2::jsonb, NOW())`,
          [referrer, JSON.stringify({ milestone: total, message: milestoneMessage })]
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Referral tracked successfully',
        milestone: milestoneMessage,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Referral already tracked',
    });
  } catch (error) {
    console.error('Track referral error:', error);
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    );
  }
}
