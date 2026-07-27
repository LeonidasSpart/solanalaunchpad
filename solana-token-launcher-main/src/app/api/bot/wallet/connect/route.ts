import { NextRequest, NextResponse } from "next/server";

// This endpoint is called by Phantom after user approves connection
// Phantom redirects to: https://zrp.one/api/bot/wallet/connect?session=sessionId&address=walletAddress

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session');
    const address = req.nextUrl.searchParams.get('address');

    if (!sessionId || !address) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Verify session (optional) – check if session exists
    // Store wallet address in your database
    // Example: await db.wallets.create({ sessionId, address })

    // Redirect user back to Telegram (or a success page)
    return NextResponse.redirect(
      `https://t.me/ZRPAIBOT?start=connected-${address}`
    );
  } catch (error) {
    console.error("❌ Connection error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
