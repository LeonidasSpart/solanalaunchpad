export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Privacy Policy</h1>
      <p className="text-zinc-400 text-center mb-12">Last updated: June 2026</p>
      
      <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Information We Collect</h2>
          <p className="text-zinc-300">We do not collect or store any personal information. All transactions are processed through your wallet.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Wallet Data</h2>
          <p className="text-zinc-300">We only access your wallet public address to interact with the Solana blockchain. We never have access to your private keys.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Cookies</h2>
          <p className="text-zinc-300">We use minimal cookies for functionality. No tracking or analytics cookies are used.</p>
        </div>
      </div>
    </div>
  );
}
