// src/app/api/token-count/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Count total tokens from your database
    const result = await db.query("SELECT COUNT(*) FROM tokens");
    const count = parseInt(result.rows[0].count, 10);

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Error fetching token count:", error);
    return NextResponse.json(
      { success: false, count: 0 },
      { status: 500 }
    );
  }
}
