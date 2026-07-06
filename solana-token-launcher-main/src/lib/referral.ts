import { query } from './db';

export async function trackTokenCreation(
  referrer: string,
  referred: string,
  commission: number,
  mintAddress: string
) {
  // Update referral record
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

  if (updateRes.rows.length === 0) return;

  // Update referrer stats
  await query(
    `INSERT INTO referral_stats (wallet, total_commission, last_updated)
     VALUES ($1, $2, NOW())
     ON CONFLICT (wallet) DO UPDATE
     SET total_commission = referral_stats.total_commission + $2,
         last_updated = NOW()`,
    [referrer, commission]
  );

  // Log event
  await query(
    `INSERT INTO referral_events (wallet, event_type, metadata, created_at)
     VALUES ($1, 'token_created', $2::jsonb, NOW())`,
    [
      referrer,
      JSON.stringify({ referred, mintAddress, commission }),
    ]
  );
}
