// src/app/api/ai/generate-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/ai/token-generator";
import { generateTokenImage } from "@/lib/ai/image-generator";

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
    const config = await generateToken(prompt);

    // Step 2: Generate image from logoPrompt
    let imageUrl = null;
    if (config.logoPrompt) {
      try {
        imageUrl = await generateTokenImage(config.logoPrompt);
      } catch (imageError) {
        console.error("Image generation failed, continuing without image:", imageError);
        // Don't fail the whole request – just skip the image
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
