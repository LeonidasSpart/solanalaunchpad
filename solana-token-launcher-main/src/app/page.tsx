import HeroSection from '@/components/Home/hero-section';
import HowItWorks from '@/components/Home/how-it-works';
import FeaturedTokens from '@/components/Home/featured-tokens';
import FeaturesSection from '@/components/Home/features-section';
import CtaSection from '@/components/Home/cta-section';
import TokensSection from '@/components/Home/tokens-section';
// IMPORTANT: These must be imported
import TokenCounter from '@/components/Home/token-counter';
import FAQ from '@/components/Home/faq';
import WhyUs from '@/components/Home/why-us';
import DemoSection from '@/components/Home/demo-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TokenCounter />        {/* Is this here? */}
      <HowItWorks />
      <DemoSection />         {/* Is this here? */}
      <WhyUs />               {/* Is this here? */}
      <FeaturesSection />
      <FeaturedTokens />
      <TokensSection />
      <FAQ />                 {/* Is this here? */}
      <CtaSection />
    </div>
  );
}
