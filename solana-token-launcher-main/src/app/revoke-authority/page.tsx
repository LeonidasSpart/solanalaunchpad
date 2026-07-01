// src/app/revoke-authority/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Wallet,
  ArrowRight,
  Sparkles,
  Eye,
  Zap
} from 'lucide-react';

export default function RevokeAuthorityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Security Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to Revoke Mint Authority <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">on Solana</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Revoking mint authority locks your token supply and builds holder trust. This guide covers mint, freeze, and update authority — what each one does, when to revoke, and how to give them up permanently on-chain.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Permanent on-chain proof</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Revoke during creation</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Verifiable on Solscan</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">~0.1 SOL</span>
            <span className="text-[#BDDBDB] ml-2">per authority</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why Authorities Matter */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Why Authorities Matter</h2>
          <p>
            When you create a Solana token, your wallet holds special powers called authorities. These let you control certain aspects of your token. But for serious projects, revoking these authorities builds trust and shows commitment.
          </p>
          <p className="mt-3">
            Revoking authority means permanently giving up these powers. Once revoked, you can't get them back. This might seem daunting, but it's a powerful signal — it shows you're serious and won't change the token later.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <CheckCircle className="h-5 w-5 text-[#FF2D2D] mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">Proves fixed supply</p>
              <p className="text-[#BDDBDB] text-xs">To holders</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <Shield className="h-5 w-5 text-[#FF2D2D] mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">Shows true decentralization</p>
              <p className="text-[#BDDBDB] text-xs">You can't control</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <Lock className="h-5 w-5 text-[#FF2D2D] mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">Locks metadata permanently</p>
              <p className="text-[#BDDBDB] text-xs">On-chain</p>
            </div>
          </div>
        </section>

        {/* What Are Token Authorities */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Are Token Authorities?</h2>
          <p className="mb-4">
            Authorities are special permissions that control what you can do with your token. When you create a token, you automatically hold three distinct types.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center mb-3">
                <Zap className="h-5 w-5 text-[#FF2D2D]" />
              </div>
              <h3 className="text-white font-semibold">Mint Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Lets you create more tokens. Revoking proves a fixed supply — no new tokens can ever be minted.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center mb-3">
                <Lock className="h-5 w-5 text-[#FF2D2D]" />
              </div>
              <h3 className="text-white font-semibold">Freeze Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Lets you freeze token accounts. Revoking proves you can never interfere with holder accounts.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center mb-3">
                <Eye className="h-5 w-5 text-[#FF2D2D]" />
              </div>
              <h3 className="text-white font-semibold">Update Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Lets you change metadata. Revoking locks name, logo, and description permanently on-chain.
              </p>
            </div>
          </div>

          {/* Detailed explanation */}
          <div className="mt-6 space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">🪙 Mint Authority</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Mint authority lets you create more tokens. With this authority, you can increase your token's supply at any time. This is powerful but also risky — holders worry you'll dilute their holdings by minting more.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-2">
                Most serious projects revoke mint authority. This proves the supply is fixed. No new tokens can ever be created. This builds confidence because holders know the supply won't change.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">❄️ Freeze Authority</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Freeze authority lets you freeze token accounts. When frozen, an account can't send or receive tokens. This is useful for security but also concerning — holders worry you'll freeze their accounts.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-2">
                Revoking freeze authority shows you can't interfere with holdings. People can freely trade without fear of being frozen. This is important for decentralized projects.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">✏️ Update Authority</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Update authority lets you change metadata. You can update the token's name, description, logo, and other details. This is useful for fixing mistakes but also risky — holders worry you'll change the token's identity.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-2">
                Revoking update authority locks the metadata permanently. The token's identity can never change. This builds trust by showing commitment to the original vision.
              </p>
            </div>
          </div>
        </section>

        {/* Why Revoke */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Revoke Authorities?</h2>
          <p className="mb-4">
            Giving up control permanently might seem risky — but for token holders, it's the strongest trust signal possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-[#FF2D2D]" />
                <h3 className="text-white font-semibold">Build Trust</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm">
                Revoking authorities shows you're serious. It proves you can't change the token later. This builds trust with holders — they know what they're getting and that it won't change.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-[#FF2D2D]" />
                <h3 className="text-white font-semibold">Prove Fixed Supply</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm">
                Revoking mint authority proves your supply is fixed. No new tokens can be created. This is important for tokens claiming scarcity — it's a verifiable promise that the supply won't increase.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-[#FF2D2D]" />
                <h3 className="text-white font-semibold">Show Decentralization</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm">
                Revoking authorities shows decentralization. You give up control voluntarily. This aligns with crypto's core values — decentralized projects are more trusted than centralized ones.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-[#FF2D2D]" />
                <h3 className="text-white font-semibold">Increase Holder Confidence</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm">
                Holders feel safer when authorities are revoked. They know you can't mint more tokens and dilute their holdings. They know you can't freeze their accounts. The metadata won't change.
              </p>
            </div>
          </div>
        </section>

        {/* Timing */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When Should You Revoke Authorities?</h2>
          <p className="mb-4">Deciding when to revoke depends on your project goals. Here's guidance for different situations.</p>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟢 Revoke Immediately</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Revoke during token creation for maximum trust from day one. Most platforms offer this as a checkbox — it's the simplest and most credible path.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟡 Revoke Later</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Keep authorities while you test and refine, then revoke when you're confident. This gives flexibility but may reduce initial trust. If you plan to revoke, early is better.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔵 Keep Some</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Many projects revoke mint authority but keep update authority. This proves fixed supply while allowing metadata updates. Find the balance that fits your project.
              </p>
            </div>
          </div>
          <p className="text-[#BDDBDB] text-xs mt-3">
            Consider your specific needs carefully. Do you need to update metadata later? Do you need to freeze accounts for compliance or security? These decisions affect which authorities to revoke.
          </p>
        </section>

        {/* How To */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Revoke Authority</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">During Creation</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                When creating your token on ZRP, you'll see checkboxes to revoke authorities. The platform handles the revocation as part of the creation process.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-1 pl-9">
                This is the easiest method. Everything happens in one transaction. You pay the extra fee and the authorities are revoked immediately — no additional steps required.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">After Creation</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                You can revoke authorities later using ZRP's <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">Revoke Authority Tool</Link>. This is simpler than using command-line tools.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-1 pl-9">
                Some platforms offer post-creation revocation tools. ZRP makes it easy with a user-friendly interface.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Verify Revocation</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                After revoking, verify on Solscan. Search for your token's mint address. Check the authority fields — mint authority, freeze authority, and update authority should all show as revoked or null.
              </p>
              <p className="text-[#BDDBDB] text-sm mt-1 pl-9">
                Share this verification with your community. Screenshots of revoked authorities build trust. Show that your promises are verifiable on-chain.
              </p>
            </div>
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cost of Revoking Authorities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-[#BDDBDB] text-sm">Per Authority</p>
              <p className="text-2xl font-bold text-[#FF2D2D]">0.1 SOL</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-[#BDDBDB] text-sm">Revoke All Three</p>
              <p className="text-2xl font-bold text-[#FF2D2D]">0.3 SOL</p>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-[#BDDBDB] text-sm">Total with Creation</p>
              <p className="text-2xl font-bold text-[#FF2D2D]">0.45 SOL</p>
            </div>
          </div>
          <p className="text-[#BDDBDB] text-xs mt-3 text-center">
            Revoking authorities costs extra. Each authority revocation typically costs 0.1 SOL — separate from the base token creation fee.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Important Warning — This Is Permanent</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Revoking authorities is permanent. Once revoked, you cannot get them back. You cannot mint more tokens. You cannot freeze accounts. You cannot update metadata. Make sure you're ready before revoking.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[#BDDBDB] text-sm">
              <li>Review all token metadata before revoking</li>
              <li>Verify logo and description are final</li>
              <li>Confirm total supply is correct</li>
              <li>Test with a small amount first if uncertain</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What does revoking authority mean?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Revoking authority means permanently removing your ability to perform certain actions on your token. Once revoked, you cannot mint more tokens, freeze accounts, or update metadata. This is permanent and cannot be undone.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Should I revoke all authorities?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                It depends on your project goals. Revoking authorities builds trust by showing you can't change the token later. However, you lose flexibility. Many serious projects revoke mint authority to prove fixed supply. Consider your needs carefully.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I revoke authority after creating my token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Yes, you can revoke authorities at any time after token creation, as long as you still hold the authority. You can revoke during creation or later using ZRP's <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">Revoke Authority Tool</Link>.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How much does it cost to revoke authorities?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Each authority revocation typically costs 0.1 SOL. So revoking all three authorities (mint, freeze, update) costs 0.3 SOL extra. This is in addition to the base token creation fee of 0.15 SOL.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I verify my authority was revoked?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Go to Solscan.io and search for your token's mint address. Look at the authority fields — mint authority, freeze authority, and update authority should all display as revoked or null. This is your verifiable on-chain proof.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Create Your Token with Authority Options</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Choose which authorities to revoke during creation for maximum trust and security. Our platform makes it a single checkbox — no code required.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-[#BDDBDB] text-sm">
              <CheckCircle className="h-4 w-4 text-[#FF2D2D]" />
              Revoke mint, freeze, or update authority
            </div>
            <div className="flex items-center gap-2 text-[#BDDBDB] text-sm">
              <CheckCircle className="h-4 w-4 text-[#FF2D2D]" />
              On-chain proof in seconds
            </div>
            <div className="flex items-center gap-2 text-[#BDDBDB] text-sm">
              <CheckCircle className="h-4 w-4 text-[#FF2D2D]" />
              Verifiable on Solscan instantly
            </div>
          </div>
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-[#FF2D2D] via-[#1a1a1a] to-[#BDDBDB] hover:from-[#B10000] hover:via-[#0D0D0D] hover:to-[#9a9a9a] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
