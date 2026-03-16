import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import heroMain from "@/assets/hero-main.jpg";
import heroCollage1 from "@/assets/hero-collage-1.jpg";
import heroCollage2 from "@/assets/hero-collage-2.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative pt-28 pb-0 px-4 sm:px-10 lg:px-20 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)) 60%, hsl(var(--background)) 100%)" }}
    >
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-24 left-[8%] text-4xl sm:text-5xl hidden sm:block"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎓
      </motion.div>
      <motion.div
        className="absolute top-32 right-[10%] text-3xl sm:text-4xl hidden sm:block"
        animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        ✏️
      </motion.div>

      {/* Rating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-card border border-border text-foreground mb-5 shadow-sm"
      >
        <span className="text-secondary">★★★★★</span>
        <span>4.9</span>
        <span className="text-muted-foreground">(120K review)</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold leading-[1.15] text-foreground mb-5"
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
        className="text-muted-foreground text-[15px] leading-relaxed max-w-[540px] mx-auto mb-8"
      >
        Let's nurture potential, empower minds, and foster growth through education and collaboration to shape a brighter future.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex gap-4 justify-center items-center mb-0"
      >
        <SignedOut>
          <SignUpButton mode="modal">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-6 py-3 h-auto gap-2 shadow-md">
              Get Started Now
              <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
              </span>
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-6 py-3 h-auto gap-2 shadow-md"
          >
            Go to Dashboard
            <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
            </span>
          </Button>
        </SignedIn>
        <Button
          variant="ghost"
          onClick={() => navigate("/curriculum")}
          className="font-bold text-sm text-foreground hover:text-primary px-4 py-3 h-auto"
        >
          View Courses
        </Button>
      </motion.div>

      {/* Hero Collage Grid - matching reference exactly */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        className="mt-12 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-[160px_120px_1fr_180px] gap-3 items-end px-0 sm:px-4">
          {/* Left photos */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden h-28 sm:h-32">
              <img src={heroCollage1} alt="Student" className="w-full h-full object-cover" />
            </div>
            {/* Avatar stack + students stat */}
            <div className="bg-card rounded-2xl p-3 shadow-md border border-border">
              <div className="flex -space-x-2 mb-1.5">
                {["bg-primary", "bg-info", "bg-success"].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-lg font-black text-foreground leading-none">50+</p>
              <p className="text-[10px] text-muted-foreground">Worldwide students</p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden h-32">
              <img src={heroCollage2} alt="Student" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl bg-primary/10 p-3 flex items-center justify-center">
              <button className="text-xs font-bold text-foreground bg-card rounded-full px-4 py-2 border border-border shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Center — Main Image with play button */}
          <div className="col-span-2 sm:col-span-1 rounded-t-[20px] overflow-hidden h-[250px] sm:h-[320px] relative">
            <img src={heroMain} alt="Instructor" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-lg cursor-pointer">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-foreground border-b-[6px] border-b-transparent ml-1" />
            </div>
          </div>

          {/* Right stats column */}
          <div className="hidden sm:flex flex-col gap-3">
            <div className="rounded-2xl p-4 bg-success/15">
              <p className="text-xl font-black text-foreground leading-none">50+</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Worldwide students</p>
              <p className="text-[10px] text-foreground font-bold mt-2">Automobile Engineering</p>
            </div>
            <div className="rounded-2xl p-4 bg-secondary/15">
              <p className="text-[11px] font-bold text-foreground mb-2">Learn To Code</p>
              <div className="flex flex-wrap gap-1">
                {["Happy Students", "Best Mentors", "24/7 Availability", "Learning"].map((tag) => (
                  <span key={tag} className="text-[9px] font-semibold bg-card border border-border rounded-full px-2 py-0.5 text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
