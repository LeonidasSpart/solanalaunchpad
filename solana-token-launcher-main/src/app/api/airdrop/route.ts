import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// Maximum number of recipients allowed per airdrop
const MAX_RECIPIENTS = parseInt(process.env.MAX_AIRDROP_RECIPIENTS || '100', 10);

export async function POST(request: NextRequest) {
  try {
    const { mintAddress, recipients, amount } = await request.json();

    // Validate input
    if (!mintAddress || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Mint address and recipients list are required.' },
        { status: 400 }
      );
    }

    // ✅ Enforce recipient limit
    if (recipients.length > MAX_RECIPIENTS) {
      return NextResponse.json(
        { 
          error: `Too many recipients. Maximum allowed is ${MAX_RECIPIENTS}.`,
          max: MAX_RECIPIENTS,
          received: recipients.length,
        },
        { status: 400 }
      );
    }

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0.' },
        { status: 400 }
      );
    }

    // ... rest of your airdrop logic (build transactions, send, etc.)

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Airdrop sent to ${recipients.length} wallets.`,
      recipients: recipients.length,
    });
  } catch (error) {
    console.error('Airdrop error:', error);
    return NextResponse.json(
      { error: 'Failed to process airdrop.' },
      { status: 500 }
    );
  }
}
