export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">About ZRP</h1>
      <p className="text-zinc-400 text-center mb-12">Premium AI experiences, built for the future.</p>
      
      <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
        <p className="text-zinc-300 leading-relaxed">
          ZRP is a no-code Solana token creation platform designed to make token launching 
          accessible to everyone. We believe that creating a token should be simple, fast, 
          and secure — without requiring any coding knowledge.
        </p>
        <p className="text-zinc-300 leading-relaxed mt-4">
          Our mission is to empower creators, communities, and projects to bring their ideas 
          to life on Solana. With features like free devnet testing, IPFS metadata storage, 
          and one-click mainnet deployment, we're building the easiest way to launch tokens.
        </p>
      </div>
    </div>
  );
}
