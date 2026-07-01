// src/app/blog/page.tsx
import Link from 'next/link';

// This would normally come from a database or CMS
const blogPosts = [
  {
    id: 1,
    category: 'Guides',
    title: 'How to Create a Solana Token in 2026',
    excerpt: 'A complete step-by-step guide to creating your own SPL token on Solana — no coding required. Learn about wallets, metadata, and mainnet deployment.',
    date: 'June 28, 2026',
    readTime: '5 min read',
    slug: '/guide',
    author: 'LeonidasSpart',
    featured: true,
  },
  {
    id: 2,
    category: 'Liquidity',
    title: 'How to Add Liquidity on Raydium',
    excerpt: 'Learn how to pair your token with SOL and create a liquidity pool on Raydium so your token becomes tradeable on the open market.',
    date: 'June 27, 2026',
    readTime: '4 min read',
    slug: '/add-liquidity',
    author: 'LeonidasSpart',
    featured: false,
  },
  {
    id: 3,
    category: 'Security',
    title: 'Revoke Authority: Why It Matters',
    excerpt: 'Understand why revoking Mint, Freeze, and Update authorities is crucial for building trust with your token holders and the wider community.',
    date: 'June 26, 2026',
    readTime: '3 min read',
    slug: '/revoke',
    author: 'LeonidasSpart',
    featured: false,
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Marketing Your Solana Token: A Guide',
    excerpt: 'Practical strategies to build a community, get your token noticed, and create a successful launch on Solana.',
    date: 'June 25, 2026',
    readTime: '6 min read',
    slug: '/guide#marketing',
    author: 'LeonidasSpart',
    featured: false,
  },
  {
    id: 5,
    category: 'Strategy',
    title: 'Tokenomics: Designing for Success',
    excerpt: 'How to design a token economy that works. We cover supply, distribution, vesting, and utility to align incentives with your community.',
    date: 'June 24, 2026',
    readTime: '7 min read',
    slug: '/guide#tokenomics',
    author: 'LeonidasSpart',
    featured: false,
  },
  {
    id: 6,
    category: 'Deployment',
    title: 'Devnet vs Mainnet: Testing Your Token',
    excerpt: 'Why testing on devnet is essential, and how to seamlessly deploy your token to mainnet when you are ready. Save SOL and avoid mistakes.',
    date: 'June 23, 2026',
    readTime: '3 min read',
    slug: '/guide#devnet',
    author: 'LeonidasSpart',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          ZRP Blog
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Practical guides for every stage of your token launch — from liquidity pools and DEX listings to building holder trust and getting listed on CoinGecko.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-sm font-semibold text-[#FF2D2D] uppercase tracking-wider mb-4">Featured Article</h2>
          <Link href={featuredPost.slug} className="block group">
            <div className="bg-[#0D0D0D] rounded-2xl p-6 md:p-8 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-1">
                  <span className="text-xs font-medium text-[#FF2D2D] uppercase tracking-wider">{featuredPost.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-[#FF2D2D] transition">
                    {featuredPost.title}
                  </h3>
                  <p className="text-[#BDDBDB] mt-2">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-[#BDDBDB]">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span>By {featuredPost.author}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 bg-[#FF2D2D]/10 rounded-xl px-4 py-2 border border-[#FF2D2D]/20">
                  <span className="text-[#FF2D2D] text-sm font-semibold">Featured</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category Filter (Placeholder) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 bg-[#FF2D2D] text-white text-sm rounded-full font-medium">All</button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] text-sm rounded-full font-medium transition">Guides</button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] text-sm rounded-full font-medium transition">Liquidity</button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] text-sm rounded-full font-medium transition">Security</button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] text-sm rounded-full font-medium transition">Marketing</button>
        <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] text-sm rounded-full font-medium transition">Strategy</button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <Link key={post.id} href={post.slug} className="group">
            <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition-all h-full flex flex-col">
              <span className="text-xs font-medium text-[#FF2D2D] uppercase tracking-wider">{post.category}</span>
              <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#FF2D2D] transition">
                {post.title}
              </h3>
              <p className="text-[#BDDBDB] text-sm mt-2 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#BDDBDB]">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-[#0D0D0D] rounded-2xl p-8 border border-[#1a1a1a] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📬 Stay Updated</h2>
        <p className="text-[#BDDBDB] mb-6">Get the latest guides and strategies delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
          />
          <button className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
