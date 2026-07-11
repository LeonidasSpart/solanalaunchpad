import type { Metadata } from "next";
import HeroSection from '@/components/Home/hero-section';
import HowItWorks from '@/components/Home/how-it-works';
import FeaturedTokens from '@/components/Home/featured-tokens';
import FeaturesSection from '@/components/Home/features-section';
import CtaSection from '@/components/Home/cta-section';
import TokenCounter from '@/components/Home/token-counter';
import FAQ from '@/components/Home/faq';
import WhyUs from '@/components/Home/why-us';
import DemoSection from '@/components/Home/demo-section';
import TrustBadges from '@/components/Home/trust-badges';
import PricingTable from '@/components/Home/pricing-table';
import TokenFeed from '@/components/Home/token-feed';
import WelcomePopup from '@/components/Home/welcome-popup';
import CookieBanner from '@/components/cookie-banner';
import AffiliateCTA from '@/components/Home/affiliate-cta';

// Homepage uses layout.tsx default title — no title override needed
export const metadata: Metadata = {
  description:
    "Create Solana SPL tokens in 60 seconds with ZRP. Free devnet testing, 0.15 SOL mainnet launch, IPFS metadata, authority revocation. No coding required. Open-source and non-custodial.",
  alternates: {
    canonical: "https://zrp.one",
  },
  openGraph: {
    title: "ZRP - Create Solana Tokens in 60 Seconds",
    description: "Free devnet testing. Launch SPL tokens with no coding. Open-source, non-custodial, under 60 seconds.",
    url: "https://zrp.one",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <WelcomePopup />
      <CookieBanner />
      <HeroSection />
      <TrustBadges />
      <TokenCounter />
      <HowItWorks />
      <DemoSection />
      <WhyUs />
      <FeaturesSection />
      <PricingTable />
      <FeaturedTokens />
      <TokenFeed />
      <AffiliateCTA />
      <FAQ />
      <CtaSection />
    </div>
  );
}
