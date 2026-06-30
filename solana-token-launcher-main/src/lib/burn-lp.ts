import { 
  Connection, 
  PublicKey, 
  Transaction,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  getAccount,
  getMint
} from '@solana/spl-token';

// Known LP token programs / common LP token mints
// Raydium LP tokens use the standard SPL token program
// Orca LP tokens also use standard SPL token program
const KNOWN_LP_PROGRAMS = [
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // SPL Token
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', // Token-2022
];

// Common DEX LP token identifiers (by pool program or known patterns)
// In production, you'd use a more robust method (Jupiter API, Helius, etc.)
const KNOWN_POOL_PROGRAMS = [
  '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8', // Raydium AMM
  '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P', // Pump.fun
  'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc', // Orca Whirlpool
];

export interface LPToken {
  mint: string;
  name: string;
  symbol: string;
  balance: number;
  poolName: string;
  value: string;
  decimals: number;
  ata: string; // Associated token account address
}

// Burn address - no one has the private key
const BURN_ADDRESS = new PublicKey('11111111111111111111111111111111');

// Alternative: Use the token mint itself as burn destination (more reliable)
// const getBurnDestination = (mint: PublicKey) => mint;

/**
 * Fetch LP tokens from wallet
 * This checks all token accounts and filters for likely LP tokens
 */
export async function fetchLPTokens(
  connection: Connection,
  wallet: PublicKey
): Promise<LPToken[]> {
  const lpTokens: LPToken[] = [];

  try {
    // Get all token accounts for this wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      wallet,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Also check Token-2022
    const token2022Accounts = await connection.getParsedTokenAccountsByOwner(
      wallet,
      { programId: new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb') }
    );

    const allAccounts = [...tokenAccounts.value, ...token2022Accounts.value];

    for (const accountInfo of allAccounts) {
      const parsed = accountInfo.account.data.parsed;
      const mint = parsed.info.mint;
      const balance = Number(parsed.info.tokenAmount.amount);
      const decimals = parsed.info.tokenAmount.decimals;
      const uiBalance = parsed.info.tokenAmount.uiAmount || 0;

      // Skip zero balance accounts
      if (balance === 0) continue;

      // Check if this looks like an LP token
      const isLPToken = await checkIfLPToken(connection, new PublicKey(mint));

      if (isLPToken) {
        const lpToken: LPToken = {
          mint,
          name: isLPToken.name,
          symbol: isLPToken.symbol,
          balance: uiBalance,
          poolName: isLPToken.poolName,
          value: '~Calculating...', // You'd fetch real value from pool data
          decimals,
          ata: accountInfo.pubkey.toBase58(),
        };

        lpTokens.push(lpToken);
      }
    }

    return lpTokens;
  } catch (error) {
    console.error('Error fetching LP tokens:', error);
    throw new Error('Failed to fetch LP tokens from wallet');
  }
}

/**
 * Check if a token mint is an LP token
 * This uses heuristics and known patterns. In production, use a DEX API or indexing service.
 */
async function checkIfLPToken(
  connection: Connection,
  mint: PublicKey
): Promise<{ name: string; symbol: string; poolName: string } | null> {
  try {
    // Method 1: Check if mint is in a known LP token list (you'd maintain this)
    // For now, we'll use a heuristic approach

    // Get mint info
    const mintInfo = await getMint(connection, mint);
    
    // LP tokens typically have 6 or 9 decimals
    if (mintInfo.decimals !== 6 && mintInfo.decimals !== 9) {
      return null;
    }

    // Try to fetch metadata (Metaplex)
    const metadata = await fetchTokenMetadata(connection, mint);
    
    if (metadata) {
      const name = metadata.name || '';
      const symbol = metadata.symbol || '';
      
      // Check if name/symbol indicates LP token
      const lpIndicators = ['LP', 'lp', 'Liquidity', 'RAY', 'ORCA', 'Whirlpool'];
      const isLP = lpIndicators.some(ind => 
        name.includes(ind) || symbol.includes(ind)
      );

      if (isLP) {
        let poolName = 'Unknown DEX';
        if (name.includes('RAY') || symbol.includes('RAY')) poolName = 'Raydium';
        else if (name.includes('ORCA') || symbol.includes('ORCA')) poolName = 'Orca';
        else if (name.includes('Whirlpool')) poolName = 'Orca Whirlpool';
        else if (name.includes('Pump')) poolName = 'Pump.fun';

        return { name, symbol, poolName };
      }
    }

    // Method 2: Check if token is associated with known pool programs
    // This requires more complex account analysis - simplified here
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch Metaplex metadata for a token
 */
async function fetchTokenMetadata(connection: Connection, mint: PublicKey) {
  try {
    const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(metadataPDA);
    if (!accountInfo) return null;

    // Parse metadata (simplified - use @metaplex-foundation/mpl-token-metadata in production)
    const data = accountInfo.data;
    
    // Skip header (1 byte key + 1 byte update auth + 32 bytes mint + ...)
    let offset = 1 + 1 + 32;
    
    // Read name length and name
    const nameLen = data.readUInt32LE(offset);
    offset += 4;
    const name = data.slice(offset, offset + nameLen).toString('utf8').replace(/\0/g, '');
    offset += nameLen;
    
    // Read symbol length and symbol
    const symbolLen = data.readUInt32LE(offset);
    offset += 4;
    const symbol = data.slice(offset, offset + symbolLen).toString('utf8').replace(/\0/g, '');

    return { name: name.trim(), symbol: symbol.trim() };
  } catch (error) {
    return null;
  }
}

/**
 * Burn LP tokens by transferring to burn address
 */
export interface BurnLPParams {
  connection: Connection;
  wallet: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  lpToken: LPToken;
}

export async function burnLPTokens({
  connection,
  wallet,
  signTransaction,
  lpToken,
}: BurnLPParams): Promise<string> {
  try {
    const mint = new PublicKey(lpToken.mint);
    const sourceATA = new PublicKey(lpToken.ata);
    
    // Use the token mint itself as burn destination (most reliable)
    // No one can access tokens at the mint address
    const burnDestination = mint;

    // Get the burn destination ATA (may not exist)
    const burnATA = getAssociatedTokenAddressSync(mint, burnDestination, true);

    const transaction = new Transaction();
    
    // Check if burn ATA exists, if not create it
    try {
      await getAccount(connection, burnATA);
    } catch {
      // ATA doesn't exist, create it
      transaction.add(
        createAssociatedTokenAccountInstruction(
          wallet, // payer
          burnATA,
          burnDestination,
          mint
        )
      );
    }

    // Add transfer instruction - send ALL LP tokens
    const balance = BigInt(Math.floor(lpToken.balance * Math.pow(10, lpToken.decimals)));
    
    transaction.add(
      createTransferInstruction(
        sourceATA,
        burnATA,
        wallet,
        balance,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    // Get fresh blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet;

    // Simulate first
    const simulation = await connection.simulateTransaction(transaction);
    if (simulation.value.err) {
      throw new Error(`Simulation failed: ${JSON.stringify(simulation.value.err)}`);
    }

    // Sign
    const signed = await signTransaction(transaction);

    // Send
    const signature = await connection.sendRawTransaction(signed.serialize(), {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Confirm
    const confirmation = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      'confirmed'
    );

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
    }

    return signature;
  } catch (error: any) {
    console.error('Burn LP error:', error);
    throw new Error(error.message || 'Failed to burn LP tokens');
  }
}
