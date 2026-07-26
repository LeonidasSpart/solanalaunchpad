'use client';

// src/app/dex/[chain]/[address]/CopyAddress.tsx
import { useState } from 'react';

export default function CopyAddress({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied or unavailable, ignore
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
      <p className="mb-2 text-xs text-white/40">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <p className="break-all font-mono text-sm text-white/70">{value}</p>
        <button
          onClick={handleCopy}
          className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
