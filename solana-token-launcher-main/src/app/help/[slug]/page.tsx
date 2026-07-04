'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Map slugs to component imports (lazy loaded)
// Includes aliases for common short slugs that the Help Center links to
const articleImports: Record<string, () => Promise<any>> = {
  // === Main entries (long slugs) ===
  'what-is-zrp': () => import('@/content/help/what-is-zrp'),
  'create-token-guide': () => import('@/content/help/create-token-guide'),
  'supported-wallets': () => import('@/content/help/supported-wallets'),
  'devnet-vs-mainnet': () => import('@/content/help/devnet-vs-mainnet'),
  'glossary': () => import('@/content/help/glossary'),
  'using-templates': () => import('@/content/help/templates'),
  'token-parameters-explained': () => import('@/content/help/token-parameters'),
  'authority-revocation': () => import('@/content/help/authority-revocation'),
  'security-settings': () => import('@/content/help/security-settings'),
  'connecting-your-wallet': () => import('@/content/help/connect-wallet'),
  'troubleshooting-connection-issues': () => import('@/content/help/connection-issues'),
  'viewing-your-token': () => import('@/content/help/view-token'),
  'sharing-your-token': () => import('@/content/help/share-token'),
  'adding-liquidity': () => import('@/content/help/add-liquidity'),
  'airdrop-distribution': () => import('@/content/help/airdrop'),
  'revoking-authorities-after-creation': () => import('@/content/help/revoke-after'),
  'burning-lp-tokens': () => import('@/content/help/burn-lp'),
  'understanding-token-authorities': () => import('@/content/help/token-authorities'),
  'rug-pull-prevention': () => import('@/content/help/rug-pull'),
  'security-checklist': () => import('@/content/help/security-checklist'),
  'reporting-suspicious-activity': () => import('@/content/help/report-suspicious'),
  'transaction-failed': () => import('@/content/help/transaction-failed'),
  'insufficient-sol-balance': () => import('@/content/help/insufficient-sol'),
  'rpc-connection-errors': () => import('@/content/help/rpc-errors'),
  'token-not-showing-in-wallet': () => import('@/content/help/token-not-showing'),
  'image-not-uploading': () => import('@/content/help/image-upload-issue'),
  'browser-compatibility': () => import('@/content/help/browser-compatibility'),
  'contact-support': () => import('@/content/help/contact-support'),
  'feature-requests': () => import('@/content/help/feature-requests'),
  'community-guidelines': () => import('@/content/help/community-guidelines'),
  'affiliate-program': () => import('@/content/help/affiliate-program'),
  'frequently-asked-questions': () => import('@/content/help/faq'),
  'our-mission': () => import('@/content/help/mission'),
  'open-source': () => import('@/content/help/open-source'),
  'privacy-policy': () => import('@/content/help/privacy'),
  'terms-of-service': () => import('@/content/help/terms'),

  // === Aliases (shorter slugs that the Help Center likely links to) ===
  'token-authorities': () => import('@/content/help/token-authorities'),
  'faq': () => import('@/content/help/faq'),
  'rpc-errors': () => import('@/content/help/rpc-errors'),
  'token-parameters': () => import('@/content/help/token-parameters'),
  'connect-wallet': () => import('@/content/help/connect-wallet'),
  'view-token': () => import('@/content/help/view-token'),
  'share-token': () => import('@/content/help/share-token'),
  'add-liquidity': () => import('@/content/help/add-liquidity'),
  'airdrop': () => import('@/content/help/airdrop'),
  'revoke-after': () => import('@/content/help/revoke-after'),
  'burn-lp': () => import('@/content/help/burn-lp'),
  'rug-pull': () => import('@/content/help/rug-pull'),
  'report-suspicious': () => import('@/content/help/report-suspicious'),
  'insufficient-sol': () => import('@/content/help/insufficient-sol'),
  'token-not-showing': () => import('@/content/help/token-not-showing'),
  'image-upload-issue': () => import('@/content/help/image-upload-issue'),
  'templates': () => import('@/content/help/templates'),
  'mission': () => import('@/content/help/mission'),
  // open-source is already defined above (no duplicate needed)
  'privacy': () => import('@/content/help/privacy'),
  'terms': () => import('@/content/help/terms'),
};

export default function HelpArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && articleImports[slug]) {
      articleImports[slug]()
        .then(mod => {
          setComponent(() => mod.default);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading article...</p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-[#BDDBDB] mb-6">The article you're looking for doesn't exist.</p>
        <Link
          href="/help"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        href="/help"
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-[#BDDBDB] hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Help
      </Link>
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-orbitron prose-p:text-[#BDDBDB] prose-a:text-[#FF2D2D] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-li:text-[#BDDBDB] prose-li:marker:text-[#FF2D2D] prose-table:text-[#BDDBDB] prose-th:text-white prose-th:font-orbitron prose-th:border-[#1a1a1a] prose-td:border-[#1a1a1a] prose-code:text-[#FF2D2D] prose-code:bg-[#1a1a1a] prose-code:rounded prose-blockquote:border-l-[#FF2D2D] prose-blockquote:bg-[#1a1a1a] prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl">
        <Component />
      </div>
    </div>
  );
}
