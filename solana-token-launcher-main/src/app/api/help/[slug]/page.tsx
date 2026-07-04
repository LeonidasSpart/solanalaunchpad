'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Map slugs to component imports (lazy loaded)
const articleImports: Record<string, () => Promise<any>> = {
  'what-is-zrp': () => import('@/content/help/what-is-zrp'),
  'create-token-guide': () => import('@/content/help/create-token-guide'),
  'supported-wallets': () => import('@/content/help/supported-wallets'),
  'devnet-vs-mainnet': () => import('@/content/help/devnet-vs-mainnet'),
  'glossary': () => import('@/content/help/glossary'),
  'using-templates': () => import('@/content/help/using-templates'),
  'token-parameters-explained': () => import('@/content/help/token-parameters-explained'),
  'authority-revocation': () => import('@/content/help/authority-revocation'),
  'security-settings': () => import('@/content/help/security-settings'),
  'connecting-your-wallet': () => import('@/content/help/connecting-your-wallet'),
  'troubleshooting-connection-issues': () => import('@/content/help/troubleshooting-connection-issues'),
  'viewing-your-token': () => import('@/content/help/viewing-your-token'),
  'sharing-your-token': () => import('@/content/help/sharing-your-token'),
  'adding-liquidity': () => import('@/content/help/adding-liquidity'),
  'airdrop-distribution': () => import('@/content/help/airdrop-distribution'),
  'revoking-authorities-after-creation': () => import('@/content/help/revoking-authorities-after-creation'),
  'burning-lp-tokens': () => import('@/content/help/burning-lp-tokens'),
  'understanding-token-authorities': () => import('@/content/help/understanding-token-authorities'),
  'rug-pull-prevention': () => import('@/content/help/rug-pull-prevention'),
  'security-checklist': () => import('@/content/help/security-checklist'),
  'reporting-suspicious-activity': () => import('@/content/help/reporting-suspicious-activity'),
  'transaction-failed': () => import('@/content/help/transaction-failed'),
  'insufficient-sol-balance': () => import('@/content/help/insufficient-sol-balance'),
  'rpc-connection-errors': () => import('@/content/help/rpc-connection-errors'),
  'token-not-showing-in-wallet': () => import('@/content/help/token-not-showing-in-wallet'),
  'image-not-uploading': () => import('@/content/help/image-not-uploading'),
  'browser-compatibility': () => import('@/content/help/browser-compatibility'),
  'contact-support': () => import('@/content/help/contact-support'),
  'feature-requests': () => import('@/content/help/feature-requests'),
  'community-guidelines': () => import('@/content/help/community-guidelines'),
  'affiliate-program': () => import('@/content/help/affiliate-program'),
  'frequently-asked-questions': () => import('@/content/help/frequently-asked-questions'),
  'our-mission': () => import('@/content/help/our-mission'),
  'open-source': () => import('@/content/help/open-source'),
  'privacy-policy': () => import('@/content/help/privacy-policy'),
  'terms-of-service': () => import('@/content/help/terms-of-service'),
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
      <Component />
    </div>
  );
}
