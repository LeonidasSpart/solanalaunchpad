<div className="bg-zinc-900 p-6 rounded-xl text-center border border-purple-500/20">
  <div className="text-3xl font-bold text-purple-400">
    {network === 'devnet' ? 'FREE' : network === 'mainnet' ? '0.15 SOL' : '0.5 SOL'}
  </div>
  <p className="text-sm text-zinc-400">
    {network === 'devnet' 
      ? 'Free testing on Devnet • No SOL required' 
      : network === 'mainnet' 
      ? 'Launch on Mainnet • Network rent included' 
      : 'Total fee • Network rent included'}
  </p>
  {network === 'devnet' && (
    <div className="mt-2 inline-block bg-green-900/30 text-green-400 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30">
      🧪 Free Devnet Testing
    </div>
  )}
  {network === 'mainnet' && (
    <div className="mt-2 inline-block bg-purple-900/30 text-purple-400 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
      🔴 Live on Mainnet
    </div>
  )}
</div>
