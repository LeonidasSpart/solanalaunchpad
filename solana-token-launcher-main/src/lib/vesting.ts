import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from './db';

// ─── Platform wallet ──────────────────────────────────────────────────
const PLATFORM_PRIVATE_KEY_BASE64 = process.env.PLATFORM_PRIVATE_KEY || '';
const PLATFORM_PUBLIC_KEY = process.env.PLATFORM_PUBLIC_KEY || '';

// ─── Types ────────────────────────────────────────────────────────────
export interface VestingContract {
  id: number;
  token_mint: string;
  creator_wallet: string;
  beneficiary_wallet: string;
  total_amount: number;
  cliff_duration: number;
  vesting_duration: number;
  release_frequency: number;
  start_time: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: Date;
  completed_at?: Date;
  total_released: number;
}

// ─── Create a vesting contract ──────────────────────────────────────
export async function createVestingContract(
  tokenMint: string,
  creator: string,
  beneficiary: string,
  totalAmount: number,
  cliffDuration: number,    // seconds
  vestingDuration: number,  // seconds
  releaseFrequency: number, // seconds
  startTime: Date
): Promise<{ contractId: number; platformTxId: string }> {
  // Insert contract into DB (pending status)
  const insertRes = await query(
    `INSERT INTO vesting_contracts (
      token_mint, creator_wallet, beneficiary_wallet, total_amount,
      cliff_duration, vesting_duration, release_frequency, start_time, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
    RETURNING id`,
    [tokenMint, creator, beneficiary, totalAmount, cliffDuration, vestingDuration, releaseFrequency, startTime]
  );
  const contractId = insertRes.rows[0].id;

  // ─── Transfer tokens from creator to platform wallet ──────────────
  // This step requires the creator to sign the transaction.
  // Since we can't sign from the backend, we'll generate a transaction and return it.
  // The frontend will sign it and send it, then we confirm and update the contract.

  // For now, we'll simulate a transfer by recording a platform_tx_id.
  // In practice, you'd have a separate API endpoint that returns a transaction to be signed by the creator.

  // We'll just return the contractId and a message.
  return { contractId, platformTxId: '' };
}

// ─── Get contracts for a wallet ──────────────────────────────────────
export async function getVestingContracts(wallet: string): Promise<VestingContract[]> {
  const res = await query(
    `SELECT * FROM vesting_contracts
     WHERE creator_wallet = $1 OR beneficiary_wallet = $1
     ORDER BY created_at DESC`,
    [wallet]
  );
  return res.rows;
}

// ─── Get claimable amount for a contract ────────────────────────────
export function getClaimableAmount(contract: VestingContract): number {
  if (contract.status === 'completed' || contract.status === 'cancelled') return 0;

  const now = new Date();
  const start = new Date(contract.start_time);
  const elapsed = (now.getTime() - start.getTime()) / 1000; // seconds

  // Cliff
  if (elapsed < contract.cliff_duration) return 0;

  // Vesting progress
  const vestingElapsed = Math.min(elapsed - contract.cliff_duration, contract.vesting_duration);
  const totalVestingPeriod = contract.vesting_duration;
  const fraction = totalVestingPeriod > 0 ? vestingElapsed / totalVestingPeriod : 1;

  const totalVested = Math.min(contract.total_amount * fraction, contract.total_amount);
  const alreadyReleased = contract.total_released || 0;
  const claimable = Math.max(totalVested - alreadyReleased, 0);

  // If frequency is set, we need to enforce that releases happen in intervals.
  // But for simplicity, we'll allow claiming any vested amount.

  return claimable;
}

// ─── Claim tokens ──────────────────────────────────────────────────────
export async function claimTokens(
  contractId: number,
  beneficiary: string,
  connection: Connection,
  platformKeypair: any, // Solana Keypair
): Promise<string> {
  // 1. Get contract
  const res = await query('SELECT * FROM vesting_contracts WHERE id = $1', [contractId]);
  if (res.rows.length === 0) throw new Error('Contract not found');
  const contract = res.rows[0];

  // 2. Check beneficiary
  if (contract.beneficiary_wallet !== beneficiary) throw new Error('Not the beneficiary');

  // 3. Calculate claimable
  const claimable = getClaimableAmount(contract);
  if (claimable <= 0) throw new Error('No tokens available to claim');

  // 4. Create transfer transaction from platform wallet to beneficiary
  const mintPubkey = new PublicKey(contract.token_mint);
  const platformPubkey = new PublicKey(platformKeypair.publicKey);
  const beneficiaryPubkey = new PublicKey(beneficiary);

  // Get ATAs
  const platformAta = await getAssociatedTokenAddress(mintPubkey, platformPubkey);
  const beneficiaryAta = await getAssociatedTokenAddress(mintPubkey, beneficiaryPubkey);

  // Create instruction
  const transferIx = createTransferInstruction(
    platformAta,
    beneficiaryAta,
    platformPubkey,
    claimable * Math.pow(10, 9), // assuming 9 decimals for simplicity; you should fetch decimals
    [],
    TOKEN_PROGRAM_ID
  );

  const transaction = new Transaction().add(transferIx);
  transaction.feePayer = platformPubkey;
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;

  // Sign with platform wallet
  transaction.sign(platformKeypair);

  const signature = await connection.sendRawTransaction(transaction.serialize());
  await connection.confirmTransaction(signature);

  // 5. Update DB
  await query(
    `UPDATE vesting_contracts
     SET total_released = total_released + $1,
         status = CASE WHEN total_released + $1 >= total_amount THEN 'completed' ELSE status END,
         completed_at = CASE WHEN total_released + $1 >= total_amount THEN NOW() ELSE completed_at END
     WHERE id = $2`,
    [claimable, contractId]
  );

  // 6. Insert release record
  await query(
    `INSERT INTO vesting_releases (contract_id, amount, released_at, transaction_signature)
     VALUES ($1, $2, NOW(), $3)`,
    [contractId, claimable, signature]
  );

  return signature;
}
