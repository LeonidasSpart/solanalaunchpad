import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getConnection, getPlatformKeypair } from '@/lib/solana';
import { buildTransferNftTransaction } from '@/lib/nft-staking';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, nftMintAddress } = await req.json();
    if (!poolId || !userWallet || !nftMintAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch pool
    const poolRes = await query('SELECT * FROM nft_staking_pools WHERE id = $1 AND is_active = true', [poolId]);
    const pool = poolRes.rows[0];
    if (!pool) {
      return NextResponse.json({ error: 'Pool not found or inactive' }, { status: 404 });
    }

    // Check if already staked
    const existing = await query(
      'SELECT * FROM nft_staking_positions WHERE pool_id = $1 AND nft_mint_address = $2 AND status = $3',
      [poolId, nftMintAddress, 'active']
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'NFT already staked in this pool' }, { status: 400 });
    }

    // Check user owns the NFT (optional, can be checked on-chain later)
    // We'll trust the frontend for now.

    const connection = getConnection();
    const userPubkey = new PublicKey(userWallet);
    const nftMint = new PublicKey(nftMintAddress);
    const tx = await buildTransferNftTransaction(nftMint, userPubkey, getPlatformKeypair().publicKey, connection);
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({ transaction: serialized });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to build stake transaction' }, { status: 500 });
  }
}
