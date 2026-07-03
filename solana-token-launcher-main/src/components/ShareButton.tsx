'use client';

interface ShareButtonProps {
  symbol: string;
  name?: string;
}

export default function ShareButton({ symbol, name }: ShareButtonProps) {
  const handleShare = () => {
    const tweetText = `🚀 I just launched $${symbol} on @ZRP_AI!\n\nCreate your own Solana token in 60 seconds → zrp.one\n\n#Solana #SPLToken #Crypto`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white text-sm px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      Share on X
    </button>
  );
}
