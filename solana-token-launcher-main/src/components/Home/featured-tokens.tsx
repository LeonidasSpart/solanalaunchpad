'use client';

const FeaturedTokens = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Featured Tokens</h2>
        <p className="text-center text-zinc-400 mb-12">Popular tokens launched on ZRP</p>

        <div className="grid md:grid-cols-3 gap-6">
          {["SolToken", "LunaToken", "StarToken"].map((token, i) => (
            <div key={i} className="bg-zinc-900 rounded-3xl p-8 text-center">
              <div className="text-2xl font-bold mb-2">{token}</div>
              <div className="text-purple-400">$1.23</div>
              <div className="text-sm text-zinc-500">Symbol: {token.slice(0,4)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTokens;
