import { NextRequest, NextResponse } from "next/server";
import { getTokenGenerator } from "@/lib/ai/token-generator";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip || "unknown";
    const { success } = await rateLimit(ip, "ai-generate", 10, 60);
    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt || prompt.length < 3) {
      return NextResponse.json(
        { error: "Please provide a clear token idea" },
        { status: 400 }
      );
    }

    const generator = getTokenGenerator();
    const config = await generator.generateToken(prompt);

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("AI Token Generation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate token" },
      { status: 500 }
    );
  }
}
