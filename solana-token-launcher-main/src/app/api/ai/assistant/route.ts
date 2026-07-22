// src/app/api/ai/assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are ZRP AI, the official assistant for ZRP (zrp.one), a Solana launchpad ecosystem.

Your goal is to help users launch, manage, and grow their crypto projects.

Key facts about ZRP:
- 19 products on Solana Mainnet
- 35% of profits go to orphans, schools, hospitals, and climate relief
- No borders, no discrimination
- Non-custodial
- Open source
- Built on Solana
- AI Token Generator + DALL-E image generation

When users ask:
- "Create token" → point them to /create-mint
- "Stake" → point them to /staking
- "Charity" → point them to /charity
- "Affiliate" → point them to /affiliate-info
- "Token Checker" → point them to /token-check

Be helpful, concise, and mission-driven. Always remind users of ZRP's mission.

If you don't know something, say so and suggest they visit zrp.one for more info.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
