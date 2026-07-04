import Link from 'next/link';

export default function HowToCreateATokenOnZRPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to Create <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">a Token on ZRP</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Creating a token on ZRP is designed to be simple and fast. This guide walks you through every step.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Quick Overview */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Step</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Action</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">1</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Connect wallet</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">2</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Choose template</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">3</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Fill token details</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">20 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">4</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Upload image</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">5</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Configure security</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">6</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Create token</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">60 seconds</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-white text-sm font-bold border border-[#1a1a1a]">Total</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]"></td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">~2 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 1: Connect Your Wallet */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 1: Connect Your Wallet</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to ZRP Create Token</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://zrp.one/create-mint" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">zrp.one/create-mint</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right corner</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Choose your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Phantom, Solflare, or Backpack</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet extension</p>
              </div>
            </div>
          </div>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Tip</p>
            <p className="text-[#BDDBDB] text-sm mt-1">Make sure you have at least 0.05 SOL for Devnet or 0.2 SOL for Mainnet.</p>
          </div>
        </section>

        {/* Step 2: Choose a Template */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 2: Choose a Template (Optional)</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">You'll see four templates to choose from:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Template</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Supply</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Decimals</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Meme Coin</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1,000,000,000</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">0</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Viral community tokens</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Utility Token</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10,000,000</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">6</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Governance & utility</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Governance DAO</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">100,000,000</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">6</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Voting and delegation</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Simple Token</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1,000,000</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">9</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Testing and private use</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#BDDBDB] text-sm mt-3">You can also click <span className="text-white font-medium">"Start from Scratch"</span> for full customization.</p>
        </section>

        {/* Step 3: Fill Token Details */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 3: Fill Token Details</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Name</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Max 32 characters</li>
            <li>Example: <span className="text-white font-medium">"Pepe Coin"</span>, <span className="text-white font-medium">"Solana Cat"</span>, <span className="text-white font-medium">"My Project"</span></li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Symbol (Ticker)</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Max 10 characters (usually 3-5)</li>
            <li>Example: <span className="text-white font-medium">"PEPE"</span>, <span className="text-white font-medium">"CAT"</span>, <span className="text-white font-medium">"MPT"</span></li>
            <li>Use uppercase letters only</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Description</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Optional but recommended</li>
            <li>Explain what your token does</li>
            <li>Keep it clear and concise</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Total Supply</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>For memecoins: <span className="text-white font-medium">1,000,000,000</span> (1 billion)</li>
            <li>For utility tokens: <span className="text-white font-medium">10,000,000</span> (10 million)</li>
            <li>For DAOs: <span className="text-white font-medium">100,000,000</span> (100 million)</li>
            <li>For testing: <span className="text-white font-medium">1,000,000</span> (1 million)</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Decimals</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">0</span> — For memecoins (no fractions)</li>
            <li><span className="text-white font-medium">6</span> — For utility tokens and DAOs</li>
            <li><span className="text-white font-medium">9</span> — For standard tokens (Solana default)</li>
          </ul>
        </section>

        {/* Step 4: Upload Image */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 4: Upload Image</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Image Requirements</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Format:</span> PNG, JPEG, GIF, or WebP</li>
            <li><span className="text-white font-medium">Size:</span> Max 5MB</li>
            <li><span className="text-white font-medium">Resolution:</span> At least 200×200 pixels recommended</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Upload</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Choose File"</p>
                <p className="text-[#BDDBDB] text-sm">Select your image file</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Select your image</p>
                <p className="text-[#BDDBDB] text-sm">Choose from your device</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Preview will appear</p>
                <p className="text-[#BDDBDB] text-sm">Verify your image looks correct</p>
              </div>
            </div>
          </div>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Tip</p>
            <p className="text-[#BDDBDB] text-sm mt-1">For best results, use a square image with a transparent background.</p>
          </div>
        </section>

        {/* Step 5: Configure Security */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 5: Configure Security</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Security Options</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Option</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">What It Does</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Revoke Mint</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">No more tokens can be minted</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Revoke Freeze</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">No accounts can be frozen</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Revoke Update</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Metadata becomes permanent</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Recommended Settings</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Token Type</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Mint</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Freeze</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Update</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Meme Coin</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Utility Token</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Governance DAO</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Simple Token</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 6: Create Token */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 6: Create Token</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Review all details</p>
                <p className="text-[#BDDBDB] text-sm">Double-check everything</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Check the fee</p>
                <p className="text-[#BDDBDB] text-sm">FREE on Devnet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Create & Mint Token"</p>
                <p className="text-[#BDDBDB] text-sm">Start the creation process</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Confirm the transaction in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Approve in your wallet</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Wait for confirmation</p>
                <p className="text-[#BDDBDB] text-sm">Usually 30-60 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: What Happens Next */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step 7: What Happens Next</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">After creation, you'll see:</p>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Your token's mint address</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Your token details (name, symbol, supply)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Links to view on Solscan</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Option to share on X (Twitter)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Your token appears in the Token Explorer</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Next Steps</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Share your token on social media</li>
            <li>Add liquidity on Raydium</li>
            <li>Build your community</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/using-templates" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📋 Using Templates</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the templates</p>
            </Link>
            <Link href="/help/token-parameters-explained" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">⚙️ Token Parameters Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understanding name, symbol, supply, and more</p>
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
            Follow this guide and launch your token in minutes.
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
