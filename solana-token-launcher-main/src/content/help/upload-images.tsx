import Link from 'next/link';

export default function UploadingImagesToIPFSPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Uploading Images <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">to IPFS</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          When you create a token on ZRP, your image is uploaded to IPFS via Pinata. This guide explains the process.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why IPFS */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why IPFS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌐 Decentralized</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No single point of failure</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📁 Permanent</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Content is always available</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🛡️ Censorship-Resistant</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Cannot be removed</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">✅ Trusted</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Used by major projects</p>
            </div>
          </div>
        </section>

        {/* Image Requirements */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Image Requirements</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Formats</span>
              <span className="text-white font-medium">PNG, JPEG, GIF, WebP</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Max Size</span>
              <span className="text-white font-medium">5MB</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Recommended</span>
              <span className="text-white font-medium">512×512 or 256×256 pixels</span>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Supported Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">PNG</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Logos, transparent</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">High Quality</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">JPEG</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Photos, complex</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Medium Quality</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">GIF</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Animations</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Low Quality</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-lg">WebP</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Modern, smaller</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">High Quality</span>
            </div>
          </div>
        </section>

        {/* How to Upload */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Upload</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">1</span>
              <div>
                <p className="text-white font-semibold">Click "Choose File"</p>
                <p className="text-[#BDDBDB] text-sm">Select your image file</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">2</span>
              <div>
                <p className="text-white font-semibold">Select your image</p>
                <p className="text-[#BDDBDB] text-sm">Choose from your device</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">3</span>
              <div>
                <p className="text-white font-semibold">Preview appears</p>
                <p className="text-[#BDDBDB] text-sm">Verify your image looks correct</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">4</span>
              <div>
                <p className="text-white font-semibold">Auto-upload to IPFS</p>
                <p className="text-[#BDDBDB] text-sm">Image is uploaded when you create the token</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ "Invalid file type"</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Use PNG, JPEG, GIF, or WebP format.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ "File too large"</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Compress image to under 5MB.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ "Image not showing"</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Wait a moment for IPFS to propagate, then refresh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Image Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">⬜ Square image</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Displays correctly on all platforms</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🖼️ Transparent background</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Looks clean on dark/light modes</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📐 At least 200×200</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Maintains quality at different sizes</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🎯 Clear and simple</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Recognizable at small sizes</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">1</span>
              <div>
                <p className="text-white font-semibold">You upload</p>
                <p className="text-[#BDDBDB] text-sm">Image sent to Pinata</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">2</span>
              <div>
                <p className="text-white font-semibold">Pinata stores</p>
                <p className="text-[#BDDBDB] text-sm">Image added to IPFS</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">3</span>
              <div>
                <p className="text-white font-semibold">IPFS hash created</p>
                <p className="text-[#BDDBDB] text-sm">Unique identifier for your image</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">4</span>
              <div>
                <p className="text-white font-semibold">Gateway URL</p>
                <p className="text-[#BDDBDB] text-sm">Image accessible via gateway.pinata.cloud</p>
              </div>
            </div>
          </div>

          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] mt-4">
            <p className="text-[#BDDBDB] text-sm">Your image will be available at:</p>
            <code className="block mt-2 bg-[#050505] text-[#BDDBDB] font-mono text-sm p-3 rounded-lg border border-[#1a1a1a] break-all">
              https://gateway.pinata.cloud/ipfs/YOUR_CID
            </code>
          </div>
        </section>

        {/* View Your Image */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">View Your Image</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            After token creation, your image will be visible on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#FF2D2D]">✅</span>
              <span className="text-[#BDDBDB] text-sm">Solscan</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#FF2D2D]">✅</span>
              <span className="text-[#BDDBDB] text-sm">Phantom / Solflare wallet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#FF2D2D]">✅</span>
              <span className="text-[#BDDBDB] text-sm">Token Explorer</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#FF2D2D]">✅</span>
              <span className="text-[#BDDBDB] text-sm">Token Details page</span>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/create-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/token-parameters" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">⚙️ Token Parameters Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understanding name, symbol, supply, and more</p>
            </Link>
            <Link href="/help/image-upload-issue" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🖼️ Troubleshooting Image Issues</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Common image upload problems solved</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Upload your image and go live in seconds – no coding required.
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
