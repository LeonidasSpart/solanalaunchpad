export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Terms of Service</h1>
      <p className="text-zinc-400 text-center mb-12">Last updated: June 2026</p>
      
      <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Use of Platform</h2>
          <p className="text-zinc-300">You agree to use ZRP solely for lawful purposes and in accordance with these terms.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Token Creation</h2>
          <p className="text-zinc-300">You are solely responsible for the tokens you create. ZRP does not endorse or verify any token created on the platform.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Risk Acknowledgement</h2>
          <p className="text-zinc-300">Blockchain transactions are irreversible. You acknowledge and accept all risks associated with token creation and blockchain interactions.</p>
        </div>
      </div>
    </div>
  );
}
