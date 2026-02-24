import { locales } from '@/i18n/config';
import HeroSection from '@/components/sections/HeroSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FounderSection from '@/components/sections/FounderSection';
import OurSystemSection from '@/components/sections/OurSystemSection';
import ResultsSection from '@/components/sections/ResultsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import CTASection from '@/components/sections/CTASection';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <FounderSection />
      <OurSystemSection />
      <ResultsSection />
      <IndustriesSection />
      <CTASection />
    </main>
  );
}
