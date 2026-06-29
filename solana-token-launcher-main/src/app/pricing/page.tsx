export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Pricing</h1>
      <p className="text-zinc-400 text-center mb-12">Simple, transparent pricing for everyone</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-xl font-bold text-white">Free</h3>
          <p className="text-3xl font-bold text-white mt-4">$0</p>
          <p className="text-zinc-400 text-sm">Test on devnet</p>
          <ul className="mt-6 space-y-3">
            <li className="text-zinc-300 text-sm">✅ Devnet Testing</li>
            <li className="text-zinc-300 text-sm">✅ Test SOL Faucet</li>
            <li className="text-zinc-300 text-sm">✅ Token Creation</li>
            <li className="text-zinc-500 text-sm">❌ Mainnet Launch</li>
          </ul>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-8 border border-purple-500 shadow-lg shadow-purple-500/10">
          <div className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Popular</div>
          <h3 className="text-xl font-bold text-white">Standard</h3>
          <p className="text-3xl font-bold text-white mt-4">0.15 SOL</p>
          <p className="text-zinc-400 text-sm">Launch on mainnet</p>
          <ul className="mt-6 space-y-3">
            <li className="text-zinc-300 text-sm">✅ Devnet Testing</li>
            <li className="text-zinc-300 text-sm">✅ Mainnet Launch</li>
            <li className="text-zinc-300 text-sm">✅ Token Creation</li>
            <li className="text-zinc-500 text-sm">❌ Revoke Authorities</li>
          </ul>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-xl font-bold text-white">Premium</h3>
          <p className="text-3xl font-bold text-white mt-4">0.5 SOL</p>
          <p className="text-zinc-400 text-sm">Everything included</p>
          <ul className="mt-6 space-y-3">
            <li className="text-zinc-300 text-sm">✅ Devnet Testing</li>
            <li className="text-zinc-300 text-sm">✅ Mainnet Launch</li>
            <li className="text-zinc-300 text-sm">✅ Revoke Authorities</li>
            <li className="text-zinc-300 text-sm">✅ Social Links</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
