import { useEffect } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustStatsStrip from "@/components/landing/TrustStatsStrip";
import CoursesSection from "@/components/landing/CoursesSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import LearningJourneySection from "@/components/landing/LearningJourneySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import OutcomesMetricsStrip from "@/components/landing/OutcomesMetricsStrip";
import FinalCTASection from "@/components/landing/FinalCTASection";
import LandingFooter from "@/components/landing/LandingFooter";
import { captureUTMParams, persistUTMParams } from "@/hooks/useUTMTracking";

const Index = () => {
  // Capture and persist UTM parameters on landing page load
  useEffect(() => {
    const params = captureUTMParams();
    persistUTMParams(params);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust & Stats Strip */}
      <TrustStatsStrip />

      {/* Courses Section - Preserves existing course data logic */}
      <CoursesSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Learning Journey */}
      <LearningJourneySection />

      {/* Testimonials Carousel */}
      <TestimonialsSection />

      {/* Outcomes Metrics */}
      <OutcomesMetricsStrip />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;
