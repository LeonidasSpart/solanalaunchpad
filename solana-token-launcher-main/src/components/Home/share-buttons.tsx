'use client';

import { FaXTwitter } from 'react-icons/fa6';
import { Send, Share2 } from 'lucide-react';

export default function ShareButtons() {
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const text = '🚀 Create your own Solana token in under 2 minutes with ZRP! No coding required. Test for FREE on devnet.';

  const shareOnX = () => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-zinc-500 text-sm">Share:</span>
      <button
        onClick={shareOnX}
        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
        aria-label="Share on X"
      >
        <FaXTwitter className="h-4 w-4" />
      </button>
      <button
        onClick={shareOnTelegram}
        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
        aria-label="Share on Telegram"
      >
        <Send className="h-4 w-4" />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
        aria-label="Copy link"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
