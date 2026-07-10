import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

// ─── JWT Verification Helper ──────────────────────────────────────
async function verifyAdminToken(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// ─── GET ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'active';

  try {
    let res;
    if (status === 'all') {
      const isAdmin = await verifyAdminToken(req);
      if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      res = await query('SELECT * FROM launchpad_projects ORDER BY id DESC');
    } else {
      res = await query(
        `SELECT * FROM launchpad_projects 
         WHERE status = $1 
         ORDER BY created_at DESC`,
        [status]
      );
    }
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// ─── POST ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();

    // ─── Log the full request body for debugging ────────────────────
    console.log('📥 Launchpad project creation request body:', JSON.stringify(body, null, 2));

    const {
      creator_wallet,
      token_mint,
      token_symbol,
      token_name,
      token_supply,
      token_price,
      hard_cap,
      soft_cap,
      start_time,
      end_time,
      min_contribution,
      max_contribution,
      fee_percentage,
      description,
      website,
      twitter,
      telegram,
      discord,
      logo_url,
      whitelist_enabled,
      kyc_enabled,
      tiered,
      rounds,
      tier_config,
      // fee_tx_signature, // ← uncomment if your frontend sends it
    } = body;

    // ─── Basic validation ────────────────────────────────────────────
    if (!creator_wallet || !token_mint || !hard_cap || !start_time || !end_time) {
      console.error('❌ Missing required fields:', { creator_wallet, token_mint, hard_cap, start_time, end_time });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ─── Convert numeric fields (DB expects numbers) ────────────────
    const tokenSupplyNum = token_supply ? parseFloat(token_supply) : null;
    const tokenPriceNum = token_price ? parseFloat(token_price) : null;
    const hardCapNum = parseFloat(hard_cap);
    const softCapNum = soft_cap ? parseFloat(soft_cap) : 0;
    const minContributionNum = min_contribution ? parseFloat(min_contribution) : 0;
    const maxContributionNum = max_contribution ? parseFloat(max_contribution) : null;
    const feePercentageNum = fee_percentage ? parseFloat(fee_percentage) : null;

    // ─── Insert into DB ──────────────────────────────────────────────
    const result = await query(
      `INSERT INTO launchpad_projects (
        creator_wallet, token_mint, token_symbol, token_name,
        token_supply, token_price, hard_cap, soft_cap,
        start_time, end_time, min_contribution, max_contribution,
        fee_percentage, description, website, twitter, telegram, discord, logo_url,
        whitelist_enabled, kyc_enabled, tiered, rounds, tier_config,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 'pending')
      RETURNING *`,
      [
        creator_wallet,
        token_mint,
        token_symbol,
        token_name,
        tokenSupplyNum,
        tokenPriceNum,
        hardCapNum,
        softCapNum,
        start_time,
        end_time,
        minContributionNum,
        maxContributionNum,
        feePercentageNum,
        description || null,
        website || null,
        twitter || null,
        telegram || null,
        discord || null,
        logo_url || null,
        whitelist_enabled ?? false,
        kyc_enabled ?? false,
        tiered ?? false,
        rounds ?? null,
        tier_config ?? null,
      ]
    );

    console.log('✅ Project created:', result.rows[0].id);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('❌ Project creation error:');
    console.error('  Message:', error.message);
    console.error('  Stack:', error.stack);
    console.error('  Request body:', JSON.stringify(body, null, 2));
    return NextResponse.json(
      { error: 'Failed to create project', details: error.message },
      { status: 500 }
    );
  }
}
