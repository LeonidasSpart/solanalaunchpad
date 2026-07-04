
    <h1>ZRP — No-Code Solana Token Creator</h1>
    
    <div class="center">
        <a href="https://zrp.one"><img src="https://img.shields.io/badge/🔗_Live_Demo-zrp.one-9945FF?style=for-the-badge&logo=solana&logoColor=white" alt="Live Demo"></a>
        <a href="https://github.com/LeonidasSpart/solanalaunchpad/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"></a>
        <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
        <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    </div>

    <p class="center"><strong>Create, test, and launch SPL tokens on Solana in under 60 seconds — no coding required.</strong></p>

    <hr>

    <h2>Overview</h2>
    <p>ZRP is a production-ready, open-source platform for creating and deploying custom SPL tokens on the Solana blockchain. Built for founders, creators, and developers who want to launch tokens without writing a single line of code.</p>

    <p><strong>Key differentiators:</strong></p>
    <ul>
        <li><strong>Free devnet testing</strong> — Experiment with zero cost and zero risk before going live</li>
        <li><strong>Non-custodial by design</strong> — We never see or store your private keys</li>
        <li><strong>Open source &amp; auditable</strong> — Fully transparent codebase</li>
        <li><strong>Under 60 seconds</strong> — From wallet connection to live token on-chain</li>
    </ul>

    <p class="center">🔗 <strong>Live:</strong> <a href="https://zrp.one">https://zrp.one</a></p>

    <hr>

    <h2>Features</h2>
    <h3>Core</h3>
    <ul>
        <li>🪙 <strong>One-Click Token Creation</strong> — Launch SPL tokens via simple form</li>
        <li>🖼️ <strong>IPFS Metadata Storage</strong> — Upload token images and metadata via Pinata</li>
        <li>👛 <strong>Wallet Integration</strong> — Phantom, Solflare, Backpack, and all Solana wallets</li>
        <li>🔒 <strong>Authority Revocation</strong> — Revoke mint, freeze, and update authorities for maximum trust</li>
        <li>⚡ <strong>Sub-60-Second Minting</strong> — Lightning-fast deployment on Solana</li>
        <li>🧪 <strong>Free Devnet Testing</strong> — Test tokens with zero cost before mainnet launch</li>
    </ul>

    <h3>Platform</h3>
    <ul>
        <li>📱 <strong>Fully Responsive</strong> — Desktop, tablet, and mobile optimized</li>
        <li>🎨 <strong>Modern UI/UX</strong> — Tailwind CSS with Framer Motion animations</li>
        <li>📚 <strong>25+ Educational Guides</strong> — Tokenomics, marketing, security, DEX listings, and more</li>
        <li>🔍 <strong>Token Explorer</strong> — Browse tokens created through the platform</li>
        <li>🌐 <strong>SEO Optimized</strong> — Sitemap, structured data, and keyword-rich content</li>
    </ul>

    <hr>

    <h2>Tech Stack</h2>
    <table>
        <tr><th>Technology</th><th>Purpose</th></tr>
        <tr><td><a href="https://nextjs.org/">Next.js 15</a></td><td>React framework with App Router</td></tr>
        <tr><td><a href="https://www.typescriptlang.org/">TypeScript</a></td><td>Type safety</td></tr>
        <tr><td><a href="https://solana-labs.github.io/solana-web3.js/">Solana Web3.js</a></td><td>Blockchain interaction</td></tr>
        <tr><td><a href="https://metaplex.com/">Metaplex</a></td><td>Token metadata standards</td></tr>
        <tr><td><a href="https://www.pinata.cloud/">Pinata</a></td><td>IPFS uploads</td></tr>
        <tr><td><a href="https://helius.xyz/">Helius</a></td><td>Reliable RPC infrastructure</td></tr>
        <tr><td><a href="https://tailwindcss.com/">Tailwind CSS</a></td><td>Styling</td></tr>
        <tr><td><a href="https://www.framer.com/motion/">Framer Motion</a></td><td>Animations</td></tr>
    </table>

    <hr>

    <h2>Quick Start</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js 18+</li>
        <li>npm or yarn</li>
        <li>A Solana wallet (Phantom, Solflare, etc.)</li>
        <li>Pinata API key</li>
        <li>Helius RPC URL</li>
    </ul>

    <h3>Installation</h3>
    <pre><code># Clone the repository
git clone https://github.com/LeonidasSpart/solanalaunchpad.git
cd solanalaunchpad

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local</code></pre>

    <h3>Run Development Server</h3>
    <pre><code>npm run dev</code></pre>
    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> to view the app.</p>

    <hr>

    <h2>Environment Variables</h2>
    <p>Create a <code>.env.local</code> file with the following:</p>
    <pre><code># Pinata API key for IPFS uploads (JWT)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt

# Helius RPC URL for reliable Solana connection
NEXT_PUBLIC_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_key

# Wallet address to receive creation fees
NEXT_PUBLIC_FEE_RECIPIENT=your_wallet_address</code></pre>

    <hr>

    <h2>Token Creation Flow</h2>
    <ol>
        <li><strong>Connect Wallet</strong> — User connects their Solana wallet</li>
        <li><strong>Fill Token Details</strong> — Enter name, symbol, description, decimals, and supply</li>
        <li><strong>Upload Image</strong> — Upload token logo to IPFS via Pinata</li>
        <li><strong>Configure Authorities</strong> — Optionally revoke mint, freeze, and update authorities</li>
        <li><strong>Review &amp; Confirm</strong> — Transaction is simulated; user approves in wallet</li>
        <li><strong>Token Minted</strong> — Token is live on-chain in under 60 seconds</li>
    </ol>

    <hr>

    <h2>Pricing</h2>
    <table>
        <tr><th>Plan</th><th>Cost</th><th>Features</th></tr>
        <tr><td><strong>Free</strong></td><td>$0</td><td>Devnet testing, token creation, IPFS storage, social links &amp; branding</td></tr>
        <tr><td><strong>Basic</strong></td><td>0.15 SOL (~$25)</td><td>Everything in Free + Mainnet launch</td></tr>
        <tr><td><strong>Secure</strong></td><td>0.60 SOL (~$100)</td><td>Everything in Basic + Revoke all authorities + Immutable metadata</td></tr>
    </table>

    <hr>

    <h2>Security</h2>
    <ul>
        <li><strong>Non-Custodial</strong> — We never see or store private keys.</li>
        <li><strong>Wallet-Signed</strong> — Every transaction is signed directly in your wallet.</li>
        <li><strong>Open Source</strong> — Fully auditable code.</li>
        <li><strong>IPFS Storage</strong> — Decentralized, censorship-resistant metadata via Pinata.</li>
    </ul>

    <hr>

    <h2>Acknowledgments</h2>
    <ul>
        <li><a href="https://solana.com/">Solana Foundation</a> — Blockchain infrastructure</li>
        <li><a href="https://metaplex.com/">Metaplex</a> — Token metadata standards</li>
        <li><a href="https://www.pinata.cloud/">Pinata</a> — IPFS storage</li>
        <li><a href="https://helius.xyz/">Helius</a> — RPC infrastructure</li>
        <li><a href="https://railway.app/">Railway</a> — Hosting</li>
        <li><a href="https://vercel.com/">Vercel</a> — Deployment platform</li>
    </ul>

    <hr>

    <p class="center" style="margin-top: 60px;">
        Made with ❤️ by <a href="https://github.com/LeonidasSpart">LeonidasSpart</a><br><br>
        <a href="https://zrp.one">🚀 Try it now at zrp.one</a>
    </p>
</body>
</html>
