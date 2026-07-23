// src/app/ai-assistant/page.tsx
"use client";

import { useState } from "react";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const assistantMsg = { role: "assistant" as const, content: data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
        <img src="/AIZRP.PNG" alt="ZRP AI" className="h-10 w-auto" />
        ZRP AI Assistant
      </h1>
      <p className="text-[#BDDBDB] mb-8">
        Ask me anything about launching tokens, staking, NFTs, or growing your project.
      </p>

      <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] p-4 h-[400px] overflow-y-auto mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-32">
            <p>Ask me anything about ZRP, Solana, or crypto.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.role === "user" ? "bg-[#FF2D2D] text-white" : "bg-[#1a1a1a] text-[#BDDBDB]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg bg-[#1a1a1a] text-[#BDDBDB]">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything..."
          className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
