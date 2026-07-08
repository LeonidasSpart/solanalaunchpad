// src/app/api/raydium/create-pool/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { getConnection, getPlatformKeypair } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokenMint, solAmount, tokenAmount, creator, lockWallet } = body;

    // Dynamic import of Raydium SDK (only inside this route)
    const { Raydium } = await import('@raydium-io/raydium-sdk-v2');

    const connection = getConnection();
    const platformKeypair = getPlatformKeypair();
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet' ? 'mainnet' : 'devnet';

    const raydium = await Raydium.load({
      connection,
      owner: platformKeypair,
      cluster: network,
    });

    // Get token decimals
    const mintInfo = await connection.getParsedAccountInfo(new PublicKey(tokenMint));
    let decimals = 9;
    if (mintInfo.value && mintInfo.value.data) {
      const data = mintInfo.value.data as any;
      if (data.parsed && data.parsed.info) {
        decimals = data.parsed.info.decimals || 9;
      }
    }

    const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
    const solAmountRaw = solAmount * 1e9;

    const wsolMint = new PublicKey('So11111111111111111111111111111111111111112');
    const solToken = new Token(connection, wsolMint, TOKEN_PROGRAM_ID, platformKeypair);
    const token = new Token(connection, new PublicKey(tokenMint), TOKEN_PROGRAM_ID, platformKeypair);

    const { tx: poolTx, poolId, lpMint, lpAmount } = await raydium.pool.create({
      baseToken: solToken,
      quoteToken: token,
      baseAmount: solAmountRaw,
      quoteAmount: tokenAmountRaw,
      startTime: Math.floor(Date.now() / 1000),
    });

    // Build lock transfer
    const platformLpAta = await getAssociatedTokenAddress(lpMint, platformKeypair.publicKey);
    const lockLpAta = await getAssociatedTokenAddress(lpMint, new PublicKey(lockWallet));
    const transferIx = createTransferInstruction(
      platformLpAta,
      lockLpAta,
      platformKeypair.publicKey,
      lpAmount,
      [],
      TOKEN_PROGRAM_ID
    );

    const tx = new Transaction();
    tx.add(...poolTx.instructions);
    tx.add(transferIx);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = new PublicKey(creator);

    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({
      transaction: serialized,
      poolAddress: poolId.toBase58(),
      lpMint: lpMint.toBase58(),
    });
  } catch (error) {
    console.error('Raydium API error:', error);
    return NextResponse.json({ error: 'Failed to create pool' }, { status: 500 });
  }
}
