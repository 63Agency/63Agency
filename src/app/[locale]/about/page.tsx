import AboutIntroSection from "@/components/sections/AboutIntroSection";
import AboutFAQSection from "@/components/sections/AboutFAQSection";
import AboutServicesSection from "@/components/sections/AboutServicesSection";
import ShapeFutureSection from "@/components/sections/ShapeFutureSection";

export default function AboutPage() {
  return (
    <>
      <div className="bg-black">
        <ShapeFutureSection />
      </div>
      <AboutIntroSection />
      <AboutServicesSection />
      <AboutFAQSection />
    </>
  );
}
