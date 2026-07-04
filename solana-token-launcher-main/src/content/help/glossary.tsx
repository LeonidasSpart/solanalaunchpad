import Link from 'next/link';

export default function GlossaryOfTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Getting Started</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Glossary of <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Terms</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          New to crypto or Solana? Here's a simple glossary of terms you'll encounter on ZRP.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* General Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">General Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Blockchain</span>
              <span className="text-[#BDDBDB] text-sm">A decentralized digital ledger that records transactions across many computers</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Cryptocurrency</span>
              <span className="text-[#BDDBDB] text-sm">Digital or virtual currency that uses cryptography for security</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Wallet</span>
              <span className="text-[#BDDBDB] text-sm">A digital tool that stores your private keys and lets you interact with blockchain</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Private Key</span>
              <span className="text-[#BDDBDB] text-sm">A secret number that allows you to spend tokens from your wallet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Public Key</span>
              <span className="text-[#BDDBDB] text-sm">Your wallet address — share this to receive tokens</span>
            </div>
          </div>
        </section>

        {/* Solana Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Solana Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">SOL</span>
              <span className="text-[#BDDBDB] text-sm">The native cryptocurrency of the Solana blockchain</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">SPL Token</span>
              <span className="text-[#BDDBDB] text-sm">The standard token format on Solana (like ERC-20 on Ethereum)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Devnet</span>
              <span className="text-[#BDDBDB] text-sm">A test network for developers with free SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Mainnet</span>
              <span className="text-[#BDDBDB] text-sm">The live Solana network where tokens have real value</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Transaction</span>
              <span className="text-[#BDDBDB] text-sm">A transfer of value or data on the blockchain</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Block</span>
              <span className="text-[#BDDBDB] text-sm">A group of transactions that are verified and added to the blockchain</span>
            </div>
          </div>
        </section>

        {/* Token Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Mint</span>
              <span className="text-[#BDDBDB] text-sm">The process of creating new tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Mint Address</span>
              <span className="text-[#BDDBDB] text-sm">The unique identifier of your token on Solana</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Supply</span>
              <span className="text-[#BDDBDB] text-sm">The total number of tokens that exist</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Decimals</span>
              <span className="text-[#BDDBDB] text-sm">How divisible your token is (0-9)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Metadata</span>
              <span className="text-[#BDDBDB] text-sm">Information about your token (name, symbol, logo, description)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">IPFS</span>
              <span className="text-[#BDDBDB] text-sm">InterPlanetary File System — decentralized storage for metadata</span>
            </div>
          </div>
        </section>

        {/* Authority Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Authority Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Mint Authority</span>
              <span className="text-[#BDDBDB] text-sm">Who can create more tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Freeze Authority</span>
              <span className="text-[#BDDBDB] text-sm">Who can freeze token accounts</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Update Authority</span>
              <span className="text-[#BDDBDB] text-sm">Who can change token metadata</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Revoke</span>
              <span className="text-[#BDDBDB] text-sm">Permanently giving up an authority</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Immutable</span>
              <span className="text-[#BDDBDB] text-sm">Cannot be changed or modified</span>
            </div>
          </div>
        </section>

        {/* Trading Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Trading Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">DEX</span>
              <span className="text-[#BDDBDB] text-sm">Decentralized Exchange — a peer-to-peer marketplace for trading tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Liquidity</span>
              <span className="text-[#BDDBDB] text-sm">How easily a token can be bought or sold without affecting its price</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">LP Token</span>
              <span className="text-[#BDDBDB] text-sm">Liquidity Provider token — represents your share of a liquidity pool</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Airdrop</span>
              <span className="text-[#BDDBDB] text-sm">A distribution of tokens to multiple wallet addresses</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Rug Pull</span>
              <span className="text-[#BDDBDB] text-sm">A scam where creators drain liquidity and abandon the project</span>
            </div>
          </div>
        </section>

        {/* Security Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security Terms</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Non-Custodial</span>
              <span className="text-[#BDDBDB] text-sm">You control your keys and tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Seed Phrase</span>
              <span className="text-[#BDDBDB] text-sm">A set of words that can restore your wallet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Phishing</span>
              <span className="text-[#BDDBDB] text-sm">A scam where attackers trick you into revealing private information</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
              <span className="text-white font-medium text-sm">Audit</span>
              <span className="text-[#BDDBDB] text-sm">A security review of code</span>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/create-token-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Now that you know the terms, launch your token in seconds.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
