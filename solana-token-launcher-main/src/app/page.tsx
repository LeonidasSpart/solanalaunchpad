import HeroSection from '@/components/Home/hero-section';
import HowItWorks from '@/components/Home/how-it-works';
import FeaturedTokens from '@/components/Home/featured-tokens';
import FeaturesSection from '@/components/Home/features-section';
import CtaSection from '@/components/Home/cta-section';
// REMOVE THIS LINE:
// import TokensSection from '@/components/Home/tokens-section';
import TokenCounter from '@/components/Home/token-counter';
import FAQ from '@/components/Home/faq';
import WhyUs from '@/components/Home/why-us';
import DemoSection from '@/components/Home/demo-section';
import TrustBadges from '@/components/Home/trust-badges';
import PricingTable from '@/components/Home/pricing-table';
import TokenFeed from '@/components/Home/token-feed';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustBadges />
      <TokenCounter />
      <HowItWorks />
      <DemoSection />
      <WhyUs />
      <FeaturesSection />
      <PricingTable />
      <FeaturedTokens />
      {/* REMOVE THIS LINE: */}
      {/* <TokensSection /> */}
      <TokenFeed />
      <FAQ />
      <CtaSection />
    </div>
  );
}
