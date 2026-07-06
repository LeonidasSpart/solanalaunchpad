import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    // 1. Get user's stats
    const statsRes = await query(
      `SELECT * FROM referral_stats WHERE wallet = $1`,
      [wallet]
    );

    const stats = statsRes.rows[0] || {
      wallet,
      total_referrals: 0,
      total_commission: 0,
      claimed_commission: 0,
    };

    // 2. Get recent referrals
    const referralsRes = await query(
      `SELECT referred_wallet, status, commission_earned, created_at, completed_at
       FROM referrals
       WHERE referrer_wallet = $1
       ORDER BY created_at DESC
       LIMIT 20`,
      [wallet]
    );

    // 3. Get analytics
    const analyticsRes = await query(
      `SELECT 
        COUNT(*) FILTER (WHERE event_type = 'click') as total_clicks,
        COUNT(DISTINCT metadata->>'referred') FILTER (WHERE event_type = 'signup') as unique_signups,
        COUNT(*) FILTER (WHERE event_type = 'token_created') as total_conversions
       FROM referral_events
       WHERE wallet = $1`,
      [wallet]
    );

    const analytics = analyticsRes.rows[0] || {
      total_clicks: 0,
      unique_signups: 0,
      total_conversions: 0,
    };

    // 4. Get leaderboard
    const leaderboardRes = await query(
      `SELECT wallet, total_referrals, total_commission
       FROM referral_stats
       WHERE total_referrals > 0
       ORDER BY total_referrals DESC, total_commission DESC
       LIMIT 50`
    );

    // 5. Calculate conversion rate
    const uniqueSignups = Number(analytics.unique_signups) || 0;
    const conversions = Number(analytics.total_conversions) || 0;
    const conversionRate = uniqueSignups > 0 ? (conversions / uniqueSignups) * 100 : 0;

    // 6. Milestones
    const totalReferrals = Number(stats.total_referrals) || 0;
    const milestones = [
      { target: 5, label: '🚀 5 referrals', unlocked: totalReferrals >= 5, bonus: '0.05 SOL' },
      { target: 10, label: '⭐ 10 referrals', unlocked: totalReferrals >= 10, bonus: '0.10 SOL' },
      { target: 25, label: '🏆 25 referrals', unlocked: totalReferrals >= 25, bonus: '0.25 SOL' },
      { target: 50, label: '👑 50 referrals', unlocked: totalReferrals >= 50, bonus: '0.50 SOL' },
      { target: 100, label: '💎 100 referrals', unlocked: totalReferrals >= 100, bonus: '1.00 SOL' },
    ];

    // 7. ✅ CONVERT EVERYTHING TO NUMBERS
    const response = {
      stats: {
        total_referrals: Number(stats.total_referrals) || 0,
        total_commission: Number(stats.total_commission) || 0,
        claimed_commission: Number(stats.claimed_commission) || 0,
      },
      recentReferrals: referralsRes.rows.map((row: any) => ({
        referred_wallet: row.referred_wallet,
        status: row.status,
        commission_earned: Number(row.commission_earned) || 0,
        created_at: row.created_at,
        completed_at: row.completed_at,
      })),
      leaderboard: leaderboardRes.rows.map((row: any) => ({
        wallet: row.wallet,
        total_referrals: Number(row.total_referrals) || 0,
        total_commission: Number(row.total_commission) || 0,
      })),
      referrallink: `https://zrp.one/ref/${wallet}`,
      milestones,
      rank: leaderboardRes.rows.findIndex((r: any) => r.wallet === wallet) + 1 || 0,
      analytics: {
        totalclicks: Number(analytics.total_clicks) || 0,
        uniqueSignups,
        conversions,
        conversionRate: Number(conversionRate.toFixed(1)),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Affiliate stats error:', error);
    return NextResponse.json(
      { error: 'Failed to load affiliate stats' },
      { status: 500 }
    );
  }
}
