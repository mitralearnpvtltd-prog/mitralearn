import { useEffect } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustStatsStrip from "@/components/landing/TrustStatsStrip";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import CoursesSection from "@/components/landing/CoursesSection";
import StatsSection from "@/components/landing/StatsSection";
import InstructorsSection from "@/components/landing/InstructorsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import BlogSection from "@/components/landing/BlogSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import LandingFooter from "@/components/landing/LandingFooter";
import { captureUTMParams, persistUTMParams } from "@/hooks/useUTMTracking";

const Index = () => {
  useEffect(() => {
    const params = captureUTMParams();
    persistUTMParams(params);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <TrustStatsStrip />
      <WhyChooseUsSection />
      <CoursesSection />
      <StatsSection />
      <InstructorsSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <FinalCTASection />
      <LandingFooter />
    </div>
  );
};

export default Index;
