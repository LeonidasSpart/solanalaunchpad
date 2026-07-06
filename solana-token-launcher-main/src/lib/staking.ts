import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from './db';

const PLATFORM_PRIVATE_KEY_BASE64 = process.env.PLATFORM_PRIVATE_KEY || '';
const PLATFORM_PUBLIC_KEY = process.env.PLATFORM_PUBLIC_KEY || '';

export interface StakingPool {
  id: number;
  token_mint: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
  min_stake: number;
  max_stake: number;
  total_staked: number;
  total_rewards_paid: number;
  is_active: boolean;
}

export interface StakingPosition {
  id: number;
  pool_id: number;
  user_wallet: string;
  amount: number;
  reward_earned: number;
  reward_claimed: number;
  staked_at: Date;
  last_reward_calc: Date;
  unlocked_at: Date | null;
  status: string;
}

export async function getStakingPools(): Promise<StakingPool[]> {
  const res = await query('SELECT * FROM staking_pools WHERE is_active = true ORDER BY created_at DESC');
  return res.rows;
}

export async function getStakingPool(mintAddress: string): Promise<StakingPool | null> {
  const res = await query('SELECT * FROM staking_pools WHERE token_mint = $1', [mintAddress]);
  return res.rows[0] || null;
}

export async function getStakingPosition(poolId: number, userWallet: string): Promise<StakingPosition | null> {
  const res = await query(
    'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2',
    [poolId, userWallet]
  );
  return res.rows[0] || null;
}

export async function getUserStakingPositions(userWallet: string): Promise<any[]> {
  const res = await query(
    `SELECT sp.*, p.token_symbol, p.token_name, p.apy, p.lock_duration
     FROM staking_positions sp
     JOIN staking_pools p ON sp.pool_id = p.id
     WHERE sp.user_wallet = $1 AND sp.status = 'active'`,
    [userWallet]
  );
  return res.rows;
}

export async function calculateRewards(position: StakingPosition, pool: StakingPool): Promise<number> {
  const now = new Date();
  const lastCalc = new Date(position.last_reward_calc);
  const secondsElapsed = (now.getTime() - lastCalc.getTime()) / 1000;
  const hoursElapsed = secondsElapsed / 3600;
  
  // APY is annual percentage yield (e.g., 10 = 10%)
  const apyDecimal = pool.apy / 100;
  const rewardsPerHour = (position.amount * apyDecimal) / 8760; // 8760 hours in a year
  
  return rewardsPerHour * hoursElapsed;
}

export async function updateRewards(poolId: number, userWallet: string): Promise<void> {
  const pool = await getStakingPool(poolId.toString());
  if (!pool) return;
  
  const position = await getStakingPosition(poolId, userWallet);
  if (!position) return;
  
  const newRewards = await calculateRewards(position, pool);
  const totalReward = position.reward_earned + newRewards;
  
  await query(
    `UPDATE staking_positions
     SET reward_earned = $1, last_reward_calc = NOW()
     WHERE id = $2`,
    [totalReward, position.id]
  );
}

export async function stakeTokens(
  poolId: number,
  userWallet: string,
  amount: number,
  connection: Connection,
  platformKeypair: Keypair
): Promise<string> {
  const pool = await getStakingPool(poolId.toString());
  if (!pool) throw new Error('Pool not found');
  if (amount < pool.min_stake) throw new Error(`Minimum stake is ${pool.min_stake}`);
  if (amount > pool.max_stake) throw new Error(`Maximum stake is ${pool.max_stake}`);

  // Transfer tokens from user to platform wallet
  const mintPubkey = new PublicKey(pool.token_mint);
  const userPubkey = new PublicKey(userWallet);
  const platformPubkey = platformKeypair.publicKey;

  const userAta = await getAssociatedTokenAddress(mintPubkey, userPubkey);
  const platformAta = await getAssociatedTokenAddress(mintPubkey, platformPubkey);

  const transferIx = createTransferInstruction(
    userAta,
    platformAta,
    userPubkey,
    amount * Math.pow(10, 9), // Assuming 9 decimals
    [],
    TOKEN_PROGRAM_ID
  );

  const transaction = new Transaction().add(transferIx);
  transaction.feePayer = userPubkey;
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;

  // This is signed by the user's wallet on the frontend
  // Return the transaction to be signed and sent

  // For now, we'll return a dummy signature
  return 'tx_signature_placeholder';
}
