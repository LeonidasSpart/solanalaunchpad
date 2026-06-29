// src/app/no-code-creator/page.tsx
import Link from 'next/link';

export default function NoCodeCreatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">No-Code Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          No-Code Solana <br className="hidden sm:block" />
          <span className="text-purple-400">Token Creator</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Create Solana tokens without writing a single line of code. No-code platforms make token creation accessible to everyone, regardless of technical skills.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-zinc-300 ml-2">No Coding Required</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-zinc-300 ml-2">Connect Your Wallet</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-zinc-300 ml-2">Launch in Minutes</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-green-400 font-bold">✓</span>
            <span className="text-zinc-300 ml-2">Test for Free on Devnet</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Creating a Solana token used to require coding skills. You needed to understand blockchain programming, handle complex transactions, and debug errors. Not anymore. No-code platforms changed everything.
          </p>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mt-4">
            <p className="text-purple-300 text-sm font-semibold">🚀 No-Code = Accessible for Everyone</p>
            <p className="text-zinc-400 text-sm mt-1">
              No-code token creators let anyone create tokens. No programming knowledge. No technical expertise. Just fill in forms, click buttons, and your token is live. This guide explains how they work and why they're the best choice for most people.
            </p>
          </div>
        </section>

        {/* What is a No-Code Token Creator */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is a No-Code Token Creator?</h2>
          <p>
            A no-code token creator is a web platform that handles all the technical work. Instead of writing code, you use a visual interface. Forms, buttons, and dropdowns replace programming languages.
          </p>
          <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 mt-4">
            <p className="text-zinc-400 text-sm">💡 <span className="text-white font-medium">Think of it like</span> building a website with WordPress instead of HTML. You don't need to know HTML to create a website. Similarly, you don't need Solana programming knowledge to create tokens.</p>
          </div>
          <h3 className="text-white font-semibold mt-6 mb-3">How No-Code Platforms Work</h3>
          <p>
            When you use a no-code platform like ZRP, you connect your wallet. The platform can't access your funds. It just facilitates transactions.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-sm">
            <li>You fill in a form with your token details (name, symbol, supply, decimals)</li>
            <li>You upload a logo and choose optional features</li>
            <li>The platform validates everything and shows you what will happen</li>
            <li>When you confirm, your wallet asks for approval</li>
            <li>The platform sends the transaction to Solana and your token is created</li>
          </ul>
        </section>

        {/* Benefits of No-Code */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Benefits of No-Code Token Creation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🎯 Accessibility</h3>
              <p className="text-zinc-400 text-sm mt-1">Anyone can create tokens. You don't need a computer science degree. If you can use a website, you can create a token.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">⚡ Speed</h3>
              <p className="text-zinc-400 text-sm mt-1">Create a token in minutes, not hours or days. Speed matters when you want to launch quickly or test ideas.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🛡️ Safety</h3>
              <p className="text-zinc-400 text-sm mt-1">Platforms validate your inputs, warn about permanent decisions, and prevent common mistakes. This protection is invaluable.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">💰 Cost Efficiency</h3>
              <p className="text-zinc-400 text-sm mt-1">No need to hire developers. Just pay the platform fee and create your token — fractions of developer cost.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 md:col-span-2">
              <h3 className="text-white font-semibold">📚 Support and Guidance</h3>
              <p className="text-zinc-400 text-sm mt-1">Platforms provide tutorials, guides, FAQs, and support teams to help when you're stuck.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Use a No-Code Token Creator</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Connect Your Wallet</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Start by connecting your Solana wallet. ZRP supports Phantom, Solflare, Torus, and Ledger. The platform can't access your funds, just facilitate transactions.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Fill in Token Details</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Enter your token information: name, symbol, supply, decimals. The platform shows you what each field means. Fill them in carefully — some details can't be changed after creation.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Add Optional Features</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Upload a logo. Add a description. Include website and social links. Choose authority revocation options. These features make your token more professional and trustworthy.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Review and Confirm</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Review everything carefully. Check the total fee. Make sure all details are correct. When ready, click create. Your wallet will ask for approval. Approve the transaction and wait for confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* Who Should Use */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Who Should Use No-Code Platforms?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">👤 Non-Technical Creators</h3>
              <p className="text-zinc-400 text-sm mt-1">If you don't know how to code, no-code platforms are essential. They're your only practical option. Don't let technical barriers stop your ideas.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">⚡ Fast Launchers</h3>
              <p className="text-zinc-400 text-sm mt-1">Need to launch quickly? No-code platforms are fastest. You can go from idea to token in minutes. Perfect for testing concepts or market opportunities.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">💰 Budget-Conscious Projects</h3>
              <p className="text-zinc-400 text-sm mt-1">Hiring developers is expensive. No-code platforms cost fractions of developer fees. If budget matters, platforms offer better value with professional results.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🌱 First-Time Creators</h3>
              <p className="text-zinc-400 text-sm mt-1">Creating your first token? Start with no-code. Learn the process without technical complexity before deciding if you need custom solutions later.</p>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Limitations of No-Code Platforms</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🔧 Limited Customization</h3>
              <p className="text-zinc-400 text-sm mt-1">Platforms offer predefined features. You can't add custom functionality. For most projects, this isn't a problem.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🔗 Platform Dependency</h3>
              <p className="text-zinc-400 text-sm mt-1">You rely on the platform being available. But once your token is created, it exists independently. You're not locked to the platform forever.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📋 Feature Constraints</h3>
              <p className="text-zinc-400 text-sm mt-1">Platforms add features based on common needs. If you need something unusual, it might not be available. But most projects don't need unusual features.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Do I need to know programming to use no-code platforms?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No. That's the whole point. If you can use a website and fill in forms, you can create tokens. The platform handles all technical work.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Are no-code platforms less secure than coding myself?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Reputable platforms like ZRP are just as secure. They don't store your private keys. Transactions happen directly between your wallet and blockchain. Platforms often include safety features that prevent mistakes.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I customize my token beyond platform features?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Once your token is created, you can interact with it using any tool. But the creation process is limited to platform features. Most projects don't need custom features during creation.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I test my token before launching on mainnet?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes! ZRP offers <span className="text-white font-medium">FREE devnet testing</span>. Create tokens on devnet with zero cost, then launch on mainnet when you're ready. This is a unique feature that most platforms don't offer.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Create */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            No coding required. Test for free on devnet, then launch on mainnet in under 60 seconds.
          </p>
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
