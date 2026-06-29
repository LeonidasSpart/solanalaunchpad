// src/app/security/page.tsx
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Security Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Solana Token Security: <br className="hidden sm:block" />
          <span className="text-purple-400">Complete Protection Guide</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn essential security practices for protecting your Solana token. From wallet security to authority management, discover how to safeguard your token from common threats.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Security is paramount when creating and managing Solana tokens. From protecting your wallet to securing your token's smart contract, every aspect requires careful attention. Poor security practices can lead to theft, rug pulls, or loss of funds.
          </p>
          <p className="mt-3">
            This comprehensive guide covers all aspects of Solana token security. You'll learn about wallet security, authority management, liquidity protection, smart contract security, and common threats to avoid. Security should be considered <span className="text-white font-medium">before</span> you create your token and maintained throughout your project's lifecycle.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">🔒 Start with Security</p>
            <p className="text-zinc-400 text-sm mt-1">
              Whether you're creating a token or holding tokens, understanding security best practices protects you and your community. Combine this with our <Link href="/revoke" className="text-purple-400 hover:underline">authority revocation guide</Link> and <Link href="/guide" className="text-purple-400 hover:underline">launch strategy</Link> for complete protection.
            </p>
          </div>
        </section>

        {/* Wallet Security Fundamentals */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Security Fundamentals</h2>
          <p className="mb-4">Your wallet is the foundation of your token's security. If it's compromised, your entire project is at risk.</p>

          <h3 className="text-white font-semibold mt-6 mb-3">Use Hardware Wallets</h3>
          <p className="mb-3">Hardware wallets (like Ledger or Trezor) provide the highest level of security. They store private keys offline, making them immune to online attacks. For serious projects, always use a hardware wallet.</p>
          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 text-sm font-semibold">Hardware Wallet Benefits:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-sm">
              <li>Private keys never leave the device</li>
              <li>Protected from malware and phishing</li>
              <li>Requires physical confirmation for transactions</li>
              <li>Best for managing large amounts or project wallets</li>
            </ul>
          </div>

          <h3 className="text-white font-semibold mt-6 mb-3">Secure Your Seed Phrase</h3>
          <p className="mb-3">Your seed phrase (recovery phrase) is the master key to your wallet. If someone gets it, they control everything. Protect it with extreme care.</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Never store digitally:</span> Don't save seed phrases on computers, phones, or cloud storage</li>
            <li><span className="text-white">Write it down:</span> Use pen and paper, store in a secure location</li>
            <li><span className="text-white">Use metal backups:</span> Fireproof and waterproof metal plates for long-term storage</li>
            <li><span className="text-white">Never share it:</span> Legitimate services never ask for your seed phrase</li>
            <li><span className="text-white">Multiple secure locations:</span> Store copies in different secure locations</li>
          </ul>

          <h3 className="text-white font-semibold mt-6 mb-3">Strong Passwords and 2FA</h3>
          <p>Use strong, unique passwords for all crypto-related accounts. Enable two-factor authentication (2FA) wherever possible. Use authenticator apps, not SMS-based 2FA.</p>
        </section>

        {/* Authority Management Security */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Authority Management Security</h2>
          <p className="mb-4">Token authorities give you control but also pose security risks. Manage them carefully.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Why Revoke Authorities</h3>
          <p className="mb-3">Authorities can be abused. Mint authority lets you create unlimited tokens. Freeze authority lets you lock accounts. Update authority lets you change metadata. These powers can be used maliciously.</p>
          <p className="mb-3">For serious projects, revoking authorities is a security best practice. It prevents you (or anyone who gains access to your wallet) from abusing these powers. This builds trust with holders.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Security Benefits of Revoking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold text-sm">🛑 Prevents Supply Manipulation</p>
              <p className="text-zinc-400 text-xs mt-1">Protects holders from dilution.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold text-sm">🛡️ Protects Against Hacks</p>
              <p className="text-zinc-400 text-xs mt-1">Attackers can't abuse revoked authorities.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold text-sm">🤝 Builds Holder Trust</p>
              <p className="text-zinc-400 text-xs mt-1">Shows you can't change token fundamentals.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold text-sm">🔍 Verifiable Security</p>
              <p className="text-zinc-400 text-xs mt-1">Revoked authorities are visible on-chain.</p>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mt-4">
            <p className="text-purple-300 text-sm font-semibold">💡 Best Practice</p>
            <p className="text-zinc-400 text-sm mt-1">
              For serious projects, revoking authorities is a security best practice. Learn how to do this on our <Link href="/revoke" className="text-purple-400 hover:underline">Revoke Authority page</Link>.
            </p>
          </div>
        </section>

        {/* Liquidity Protection */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Liquidity Pool Security</h2>
          <p className="mb-4">Liquidity pools are a common attack vector. Protect your community by securing liquidity properly.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Lock Your Liquidity</h3>
          <p className="mb-3">Locking liquidity prevents you (or anyone) from removing it. This is one of the strongest trust signals you can provide. Use services like Pump.fun or other liquidity locking mechanisms.</p>
          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4 mb-4">
            <p className="text-green-400 text-sm font-semibold">✅ Commitment Signal</p>
            <p className="text-zinc-400 text-sm mt-1">Locked liquidity proves you can't abandon the project and drain funds. Many successful projects lock liquidity for 6-12 months or longer.</p>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Adequate Liquidity Amounts</h3>
          <p className="text-zinc-400 text-sm">Too little liquidity creates poor trading experience and high slippage. Too much liquidity locks up unnecessary capital. Find the right balance for your project's needs.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Small projects:</span> 20-50 SOL</li>
            <li><span className="text-white">Medium projects:</span> 50-100 SOL</li>
            <li><span className="text-white">Large projects:</span> 100-500+ SOL</li>
          </ul>
        </section>

        {/* Common Threats */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Security Threats</h2>
          <p className="mb-4">Know your enemies. Understanding these attack vectors helps you stay protected.</p>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Rug Pulls</h3>
              <p className="text-zinc-400 text-sm mt-1">Creators drain liquidity pools or abandon projects, leaving holders with worthless tokens.</p>
              <p className="text-green-400 text-sm mt-2 font-medium">How to prevent:</p>
              <p className="text-zinc-400 text-sm">Revoke mint authority, lock liquidity, use audited contracts, and research project teams.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Phishing Attacks</h3>
              <p className="text-zinc-400 text-sm mt-1">Attackers trick you into revealing private keys or seed phrases via fake websites or malicious links.</p>
              <p className="text-green-400 text-sm mt-2 font-medium">How to prevent:</p>
              <p className="text-zinc-400 text-sm">Always verify URLs, never click suspicious links, use bookmarks for trusted sites, never share seed phrases.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Malware and Keyloggers</h3>
              <p className="text-zinc-400 text-sm mt-1">Malware can steal private keys or seed phrases from your computer.</p>
              <p className="text-green-400 text-sm mt-2 font-medium">How to prevent:</p>
              <p className="text-zinc-400 text-sm">Use hardware wallets, keep software updated, use antivirus, avoid suspicious downloads.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Smart Contract Exploits</h3>
              <p className="text-zinc-400 text-sm mt-1">Vulnerable smart contracts can be exploited to drain funds or manipulate token behavior.</p>
              <p className="text-green-400 text-sm mt-2 font-medium">How to prevent:</p>
              <p className="text-zinc-400 text-sm">Use audited contracts, verify contract code, test thoroughly, use reputable platforms like ZRP.</p>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security Best Practices Checklist</h2>
          <p className="text-zinc-400 text-sm mb-4">Run through this checklist before and after launching your token.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Use hardware wallet for project funds</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Store seed phrases offline and securely</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Revoke mint, freeze, and update authorities</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Lock liquidity pools for commitment</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Use strong, unique passwords everywhere</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Enable 2FA on all accounts</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Verify all URLs and transactions</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Never share private keys or seed phrases</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800 md:col-span-2">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Monitor for suspicious activity</span>
            </div>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800 md:col-span-2">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-zinc-300 text-sm">Use reputable, audited platforms</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do I secure my Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Use a hardware wallet, revoke dangerous authorities (mint, freeze, update), lock liquidity, verify smart contracts, use strong passwords, store seed phrases securely offline, and monitor for suspicious activity. See our <Link href="/revoke" className="text-purple-400 hover:underline">authority revocation guide</Link> for details.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What is a rug pull and how do I prevent it?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                A rug pull occurs when token creators drain liquidity pools or abandon projects. Prevent them by revoking mint authority, locking liquidity, using audited smart contracts, and researching project teams. As a creator, demonstrate commitment through these practices.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Should I revoke all token authorities?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                For serious projects, revoking authorities builds trust. Revoke mint authority to prove fixed supply, freeze authority to show decentralization, and update authority to lock metadata. However, revoking is permanent — only do this if you're certain you won't need these capabilities. Learn more on our <Link href="/revoke" className="text-purple-400 hover:underline">Revoke Authority page</Link>.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Is a hardware wallet necessary for token creation?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                While not strictly necessary, hardware wallets are highly recommended for serious projects. For projects managing significant funds or community assets, a hardware wallet is essential. For small test tokens, a software wallet may suffice, but always use best security practices.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
