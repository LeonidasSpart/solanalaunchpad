// src/app/api/ai/generate-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenGenerator } from "@/lib/ai/token-generator";

// Import image generator only if the file exists
// If not, we'll skip image generation
let generateTokenImage: (prompt: string) => Promise<string>;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const imageModule = require("@/lib/ai/image-generator");
  generateTokenImage = imageModule.generateTokenImage;
} catch {
  generateTokenImage = async () => ""; // fallback
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || prompt.length < 3) {
      return NextResponse.json(
        { error: "Please provide a clear token idea (min 3 characters)" },
        { status: 400 }
      );
    }

    // Step 1: Generate token config
    const generator = getTokenGenerator();
    const config = await generator.generateToken(prompt);

    // Step 2: Generate image from logoPrompt (if available)
    let imageUrl = null;
    if (config.logoPrompt) {
      try {
        imageUrl = await generateTokenImage(config.logoPrompt);
      } catch (imageError) {
        console.warn("Image generation failed, continuing without image:", imageError);
      }
    }

    return NextResponse.json({
      success: true,
      config: {
        ...config,
        imageUrl,
      },
      message: "Token configuration generated successfully.",
    });
  } catch (error) {
    console.error("AI Token Generation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate token" },
      { status: 500 }
    );
  }
}
