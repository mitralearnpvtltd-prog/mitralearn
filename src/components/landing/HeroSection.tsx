import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import heroMain from "@/assets/hero-main.jpg";
import heroCollage1 from "@/assets/hero-collage-1.jpg";
import heroCollage2 from "@/assets/hero-collage-2.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-28 pb-0 px-4 sm:px-10 lg:px-20 text-center" style={{ background: "linear-gradient(160deg, hsl(var(--background)) 55%, hsl(var(--accent)) 100%)" }}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-light text-secondary mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        World's #1 Online Learning Platform
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-4xl sm:text-5xl lg:text-[52px] font-display font-bold leading-tight text-foreground mb-5"
      >
        Creating A Better Future
        <br />
        By Enabling Minds
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto mb-8"
      >
        Build skills with courses, certificates, and degrees online from world-class universities and companies.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex gap-4 justify-center mb-0"
      >
        <SignedOut>
          <SignUpButton mode="modal">
            <Button className="font-bold text-sm bg-primary hover:bg-primary/90 shadow-glow px-6 py-3 h-auto">
              Get Started →
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Button
            onClick={() => navigate("/dashboard")}
            className="font-bold text-sm bg-primary hover:bg-primary/90 shadow-glow px-6 py-3 h-auto"
          >
            Go to Dashboard →
          </Button>
        </SignedIn>
        <Button
          variant="outline"
          onClick={() => navigate("/curriculum")}
          className="font-bold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 h-auto"
        >
          Find Courses
        </Button>
      </motion.div>

      {/* Hero Collage */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        className="mt-12 grid grid-cols-[180px_1fr_200px] gap-3 items-end px-0 sm:px-8 lg:px-16 max-w-5xl mx-auto"
      >
        {/* Left Column */}
        <div className="hidden sm:flex flex-col gap-3 pb-3">
          {/* Avatar + Students */}
          <div className="bg-card rounded-2xl p-4 shadow-md border border-border">
            <div className="flex -space-x-2 mb-2">
              {["bg-primary", "bg-info", "bg-success", "bg-secondary"].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-card flex items-center justify-center text-xs font-bold text-primary-foreground`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-xl font-black text-foreground leading-none">250K+</p>
            <p className="text-[11px] text-muted-foreground">Students Enrolled</p>
          </div>
          {/* Small Photo */}
          <div className="rounded-2xl overflow-hidden h-36">
            <img src={heroCollage1} alt="Student" className="w-full h-full object-cover" />
          </div>
          {/* Instructors stat */}
          <div className="rounded-2xl p-4 bg-green-light border-transparent">
            <p className="text-xl font-black text-foreground leading-none">50+</p>
            <p className="text-[11px] text-muted-foreground">Expert Instructors</p>
          </div>
        </div>

        {/* Center — Main Image */}
        <div className="rounded-t-[20px] overflow-hidden h-[300px] sm:h-[340px]">
          <img src={heroMain} alt="Instructor" className="w-full h-full object-cover" />
        </div>

        {/* Right Column */}
        <div className="hidden sm:flex flex-col gap-3 pb-3">
          {/* Courses stat */}
          <div className="rounded-2xl p-4 bg-yellow-light border-transparent">
            <p className="text-xl font-black text-foreground leading-none">5,000+</p>
            <p className="text-[11px] text-muted-foreground">Online Courses</p>
          </div>
          {/* Small Photo */}
          <div className="rounded-2xl overflow-hidden h-36">
            <img src={heroCollage2} alt="Student" className="w-full h-full object-cover" />
          </div>
          {/* Rating box */}
          <div className="rounded-2xl p-4 bg-accent border-transparent">
            <div className="text-lg mb-1">⭐⭐⭐⭐⭐</div>
            <p className="text-xl font-black text-foreground leading-none">4.9 / 5.0</p>
            <p className="text-[11px] text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
