import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getConnection, getPlatformKeypair } from '@/lib/solana';
import { transferNftFromPlatform } from '@/lib/nft-staking';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, positionId } = await req.json();
    if (!poolId || !userWallet || !positionId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Get position
    const posRes = await query(
      'SELECT * FROM nft_staking_positions WHERE id = $1 AND pool_id = $2 AND user_wallet = $3 AND status = $4',
      [positionId, poolId, userWallet, 'active']
    );
    if (posRes.rows.length === 0) {
      return NextResponse.json({ error: 'No active position' }, { status: 404 });
    }
    const position = posRes.rows[0];

    // Check lock period
    if (position.unlocked_at && new Date(position.unlocked_at) > new Date()) {
      return NextResponse.json({ error: 'NFT is still locked' }, { status: 400 });
    }

    const connection = getConnection();
    const nftMint = new PublicKey(position.nft_mint_address);
    const userPubkey = new PublicKey(userWallet);

    // Transfer NFT back to user
    const signature = await transferNftFromPlatform(nftMint, userPubkey, connection);

    // Update position
    await query(
      `UPDATE nft_staking_positions SET status = 'unstaked' WHERE id = $1`,
      [positionId]
    );

    await query(
      'UPDATE nft_staking_pools SET total_staked = total_staked - 1 WHERE id = $1',
      [poolId]
    );

    await query(
      `INSERT INTO nft_staking_transactions (user_wallet, pool_id, nft_mint_address, type, tx_signature)
       VALUES ($1, $2, $3, 'unstake', $4)`,
      [userWallet, poolId, position.nft_mint_address, signature]
    );

    return NextResponse.json({ success: true, signature });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unstake failed' }, { status: 500 });
  }
}
