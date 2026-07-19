// src/lib/ai/token-generator.ts
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

const TokenConfigSchema = z.object({
  name: z.string().describe("Token name, max 32 characters"),
  symbol: z.string().describe("Token symbol, max 10 characters, uppercase"),
  supply: z.number().describe("Total token supply"),
  decimals: z.number().default(9),
  description: z.string().describe("Token description, max 200 characters"),
  logoPrompt: z.string().describe("Image generation prompt for logo"),
});

export class AITokenGenerator {
  private llm: ChatOpenAI;
  private parser: StructuredOutputParser<typeof TokenConfigSchema>;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.OPENAI_MODEL || "gpt-4o", // ✅ Updated to gpt-4o
      temperature: 0.7,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.parser = StructuredOutputParser.fromZodSchema(TokenConfigSchema);
  }

  async generateToken(prompt: string) {
    const formatInstructions = this.parser.getFormatInstructions();

    const promptTemplate = PromptTemplate.fromTemplate(`
You are a Solana token creation expert. Generate a complete token configuration based on the user's idea.

**User Idea:** {prompt}

**Requirements:**
- Token name: catchy, max 32 characters
- Token symbol: 3-10 characters, uppercase
- Supply: 1,000 to 10,000,000,000
- Description: clear, max 200 characters
- Logo prompt: detailed image generation prompt

{formatInstructions}
    `);

    const formattedPrompt = await promptTemplate.format({
      prompt,
      formatInstructions,
    });

    const response = await this.llm.invoke(formattedPrompt);
    const output = response.content as string;

    return this.parser.parse(output);
  }
}

export function getTokenGenerator() {
  return new AITokenGenerator();
}
