import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { referrer, referred, commission, mintAddress } = await request.json();

    if (!referrer || !referred || commission === undefined || !mintAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Update the referral record
    const updateRes = await query(
      `UPDATE referrals 
       SET status = 'completed', 
           commission_earned = $1, 
           completed_at = NOW() 
       WHERE referrer_wallet = $2 
         AND referred_wallet = $3 
         AND status = 'pending'
       RETURNING id`,
      [commission, referrer, referred]
    );

    if (updateRes.rows.length === 0) {
      // No pending referral – nothing to track
      return NextResponse.json({ message: 'No pending referral found' }, { status: 200 });
    }

    // 2. Update the referrer's total commission
    await query(
      `INSERT INTO referral_stats (wallet, total_commission, last_updated)
       VALUES ($1, $2, NOW())
       ON CONFLICT (wallet) DO UPDATE
       SET total_commission = referral_stats.total_commission + $2,
           last_updated = NOW()`,
      [referrer, commission]
    );

    // 3. Log the analytics event
    await query(
      `INSERT INTO referral_events (wallet, event_type, metadata, created_at)
       VALUES ($1, 'token_created', $2::jsonb, NOW())`,
      [
        referrer,
        JSON.stringify({ referred, mintAddress, commission }),
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking token creation:', error);
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    );
  }
}
