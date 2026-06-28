import HeroSection from '@/components/Home/hero-section';
import HowItWorks from '@/components/Home/how-it-works';
import FeaturedTokens from '@/components/Home/featured-tokens';
import FeaturesSection from '@/components/Home/features-section';
import CtaSection from '@/components/Home/cta-section';
import TokensSection from '@/components/Home/tokens-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedTokens />
      <FeaturesSection />
      <CtaSection />
      <TokensSection />
    </div>
  );
}
