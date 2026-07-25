// src/app/api/token-count/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch tokens from the existing API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/tokens`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }

    const data = await response.json();

    // data is expected to be an array of tokens
    const count = Array.isArray(data) ? data.length : 0;

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
