import { locales } from '@/i18n/config';
import HeroSection from '@/components/sections/HeroSection';
import FounderSection from '@/components/sections/FounderSection';
import OurSystemSection from '@/components/sections/OurSystemSection';
import ResultsSection from '@/components/sections/ResultsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import CTASection from '@/components/sections/CTASection';
import DigitalPresenceSection from '@/components/sections/DigitalPresenceSection';
import PartnersGridSection from '@/components/sections/PartnersGridSection';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <ScrollReveal variant="fadeUp">
        <OurSystemSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <FounderSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <ResultsSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <IndustriesSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <DigitalPresenceSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <CTASection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <PartnersGridSection />
      </ScrollReveal>
    </main>
  );
}
