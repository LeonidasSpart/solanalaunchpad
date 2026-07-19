// src/lib/ai/image-generator.ts

export async function generateTokenImage(prompt: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate image");
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("DALL-E Image Generation Error:", error);
    throw error;
  }
}
