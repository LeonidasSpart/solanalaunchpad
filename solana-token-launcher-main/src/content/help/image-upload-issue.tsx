import Link from 'next/link';

export default function ImageNotUploadingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Image Not <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Uploading</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Having trouble uploading your token image? This guide covers common issues and solutions.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. File Size Too Large</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">File > 5MB</span>
              <span className="text-white text-sm font-medium">Compress the image</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Large resolution</span>
              <span className="text-white text-sm font-medium">Resize to smaller dimensions</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Wrong File Format</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Not PNG, JPEG, GIF, WebP</span>
              <span className="text-white text-sm font-medium">Convert to supported format</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Invalid file</span>
              <span className="text-white text-sm font-medium">Check file integrity</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Network Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Slow connection</span>
              <span className="text-white text-sm font-medium">Wait or try again</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">RPC error</span>
              <span className="text-white text-sm font-medium">Try again later</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">4. Pinata Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Pinata API error</span>
              <span className="text-white text-sm font-medium">Try again</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">API key invalid</span>
              <span className="text-white text-sm font-medium">Check configuration</span>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Supported Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">PNG</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Logos, transparency</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">Max 5MB</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">JPEG</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Photos, complex images</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">Max 5MB</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">GIF</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Animations</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">Max 5MB</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-lg">WebP</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Modern, efficient</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">Max 5MB</span>
            </div>
          </div>
        </section>

        {/* How to Fix */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Fix</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Check File Size</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Right-click your file</p>
                <p className="text-[#BDDBDB] text-sm">Open file properties</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Properties" or "Get Info"</p>
                <p className="text-[#BDDBDB] text-sm">View file details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Check the size</p>
                <p className="text-[#BDDBDB] text-sm">Must be under 5MB</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">If > 5MB, compress it</p>
                <p className="text-[#BDDBDB] text-sm">Use an image compressor</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Check File Format</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Check the file extension</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-green-400 text-sm">✅ .png</span>
                  <span className="text-green-400 text-sm">✅ .jpg / .jpeg</span>
                  <span className="text-green-400 text-sm">✅ .gif</span>
                  <span className="text-green-400 text-sm">✅ .webp</span>
                </div>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">If not supported, convert it</p>
                <p className="text-[#BDDBDB] text-sm">Use an image converter</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Compress Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌐 Online Tools</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li><a href="https://tinypng.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">TinyPNG</a></li>
                <li><a href="https://compressor.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">Compressor.io</a></li>
                <li><a href="https://iloveimg.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">ILoveIMG</a></li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💻 Desktop Tools</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Photoshop — Save for Web</li>
                <li>GIMP — Free alternative</li>
                <li>Preview — Mac built-in</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Try Again</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Refresh the page</p>
                <p className="text-[#BDDBDB] text-sm">Start fresh</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Re-upload your image</p>
                <p className="text-[#BDDBDB] text-sm">Select the compressed file</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Check for success</p>
                <p className="text-[#BDDBDB] text-sm">Preview should appear</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Image Specifications</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Format</span>
              <span className="text-white text-sm font-medium">PNG</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Resolution</span>
              <span className="text-white text-sm font-medium">512×512 or 256×256</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Size</span>
              <span className="text-white text-sm font-medium">Under 2MB for best results</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Background</span>
              <span className="text-white text-sm font-medium">Transparent</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Quality</span>
              <span className="text-white text-sm font-medium">High</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Tips</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Square images display best</li>
            <li>High contrast works well</li>
            <li>Simple designs are recognizable</li>
            <li>Transparent background looks professional</li>
          </ul>
        </section>

        {/* Error Messages */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Error Messages</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: File too large. Max size is 5MB.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Compress the image</li>
                  <li>Resize the image</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Invalid file type. Supported: PNG, JPEG, GIF, WebP.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Convert the file</li>
                  <li>Use a different format</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Upload failed. Please try again.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check your connection</li>
                  <li>Try again</li>
                  <li>Contact support if persistent</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">File Won't Upload</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Try a different browser</li>
                <li>Clear your cache</li>
                <li>Try a different image</li>
                <li>Check internet connection</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Image Shows After Creation</h3>
              <div className="space-y-2 mt-2">
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Not showing in wallet</span>
                  <span className="text-white text-xs font-medium">Wait for IPFS propagation</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Not showing on Solscan</span>
                  <span className="text-white text-xs font-medium">Check metadata URI</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Not showing on ZRP</span>
                  <span className="text-white text-xs font-medium">Refresh the page</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/uploading-images-to-ipfs" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🖼️ Uploading Images to IPFS</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to IPFS uploads</p>
            </Link>
            <Link href="/help/token-not-showing-in-wallet" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👀 Token Not Showing in Wallet</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to add your token</p>
            </Link>
            <Link href="/help/rpc-connection-errors" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔌 RPC Connection Errors</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fix connection issues</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Upload your image and go live in seconds.
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
