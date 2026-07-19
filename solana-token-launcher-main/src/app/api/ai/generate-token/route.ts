import { NextRequest, NextResponse } from "next/server";
import { getTokenGenerator } from "@/lib/ai/token-generator";
// import { ratelimit } from "@/lib/rate-limit"; // temporarily disabled

export async function POST(req: NextRequest) {
  try {
    // Rate limiting disabled temporarily to unblock build
    // const ip = req.headers.get("x-forwarded-for") || "unknown";
    // const { success } = await ratelimit(ip, "ai-generate", 10, 60);
    // if (!success) {
    //   return NextResponse.json(
    //     { error: "Rate limit exceeded. Please try again later." },
    //     { status: 429 }
    //   );
    // }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt || prompt.length < 3) {
      return NextResponse.json(
        { error: "Please provide a clear token idea (min 3 characters)" },
        { status: 400 }
      );
    }

    const generator = getTokenGenerator();
    const config = await generator.generateToken(prompt);

    return NextResponse.json({
      success: true,
      config,
      message: "Token configuration generated successfully. Review and confirm to mint.",
    });
  } catch (error) {
    console.error("AI Token Generation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate token" },
      { status: 500 }
    );
  }
}
