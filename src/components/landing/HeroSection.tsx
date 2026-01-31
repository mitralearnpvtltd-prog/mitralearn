import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Building2, Award } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/clerk-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouch) return;
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [isTouch]);

  useEffect(() => {
    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, isTouch]);

  const trustStats = [
    { icon: Users, value: "50K+", label: "Students" },
    { icon: Star, value: "4.8", label: "Rating" },
    { icon: Building2, value: "200+", label: "Hiring Partners" },
    { icon: Award, value: "95%", label: "Completion" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] pt-20 overflow-hidden flex items-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated blur blobs */}
      {!isTouch && (
        <>
          <motion.div
            className="pointer-events-none absolute rounded-full"
            animate={{
              x: mousePosition.x * 0.05 - 250,
              y: mousePosition.y * 0.05 - 100,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '10%',
              left: '5%',
            }}
          />
          <motion.div
            className="pointer-events-none absolute rounded-full"
            animate={{
              x: -mousePosition.x * 0.03 + 100,
              y: mousePosition.y * 0.04 - 50,
            }}
            transition={{ type: "spring", damping: 35, stiffness: 150 }}
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 70%)',
              filter: 'blur(70px)',
              top: '20%',
              right: '10%',
            }}
          />
          <motion.div
            className="pointer-events-none absolute rounded-full"
            animate={{
              x: mousePosition.x * 0.02,
              y: -mousePosition.y * 0.03 + 200,
            }}
            transition={{ type: "spring", damping: 40, stiffness: 100 }}
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, hsl(200 80% 50% / 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              bottom: '10%',
              left: '30%',
            }}
          />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              #1 EdTech Platform for Career Growth
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-foreground mb-4"
            >
              Transform Your{" "}
              <span className="text-gradient-primary">Career</span>
              <br />
              With Expert Training
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              Industry-leading courses with hands-on projects, expert mentorship, 
              and guaranteed career support. Land your dream job in tech.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button 
                onClick={() => navigate('/curriculum')}
                variant="hero"
                size="xl"
                className="group"
              >
                Explore Programs
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button 
                    variant="heroOutline"
                    size="xl"
                  >
                    Start Free
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="heroOutline"
                  size="xl"
                >
                  Go to Dashboard
                </Button>
              </SignedIn>
            </motion.div>

            {/* Trust Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 sm:gap-8"
            >
              {trustStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Floating Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main glass card */}
              <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-card/60 border border-border/50 shadow-2xl">
                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50" />
                
                <div className="relative z-10">
                  {/* Course preview card */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Data Engineering</p>
                        <p className="text-sm opacity-80">Certification</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className="h-full bg-primary-foreground rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Projects Built</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-xs text-muted-foreground">Weeks Left</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                🔥 Free Internship
              </motion.div>

              {/* Floating stars */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">4.8/5 Rating</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
