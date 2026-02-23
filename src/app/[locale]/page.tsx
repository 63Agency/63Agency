import { locales } from '@/i18n/config';
import HeroSection from '@/components/sections/HeroSection';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
    </main>
  );
}
