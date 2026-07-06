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

    // 3. 📊 Get Analytics from referral_events
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

    // Calculate conversion rate (unique signups -> conversions)
    const conversionRate = analytics.unique_signups > 0
      ? (analytics.total_conversions / analytics.unique_signups) * 100
      : 0;

    // 4. Get leaderboard
    const leaderboardRes = await query(
      `SELECT wallet, total_referrals, total_commission
       FROM referral_stats
       WHERE total_referrals > 0
       ORDER BY total_referrals DESC, total_commission DESC
       LIMIT 50`
    );

    // 5. Get referral link
    const referralLink = `https://zrp.one/ref/${wallet}`;

    // 6. Milestones
    const milestones = [
      { target: 5, label: '🚀 5 referrals', unlocked: stats.total_referrals >= 5, bonus: '0.05 SOL' },
      { target: 10, label: '⭐ 10 referrals', unlocked: stats.total_referrals >= 10, bonus: '0.10 SOL' },
      { target: 25, label: '🏆 25 referrals', unlocked: stats.total_referrals >= 25, bonus: '0.25 SOL' },
      { target: 50, label: '👑 50 referrals', unlocked: stats.total_referrals >= 50, bonus: '0.50 SOL' },
      { target: 100, label: '💎 100 referrals', unlocked: stats.total_referrals >= 100, bonus: '1.00 SOL' },
    ];

    return NextResponse.json({
      stats,
      recentReferrals: referralsRes.rows,
      leaderboard: leaderboardRes.rows,
      referralLink,
      milestones,
      rank: leaderboardRes.rows.findIndex((r: any) => r.wallet === wallet) + 1 || 0,
      // 📊 New Analytics Field
      analytics: {
        totalClicks: parseInt(analytics.total_clicks) || 0,
        uniqueSignups: parseInt(analytics.unique_signups) || 0,
        conversions: parseInt(analytics.total_conversions) || 0,
        conversionRate: conversionRate,
      },
    });
  } catch (error) {
    console.error('Affiliate stats error:', error);
    return NextResponse.json(
      { error: 'Failed to load affiliate stats' },
      { status: 500 }
    );
  }
}
