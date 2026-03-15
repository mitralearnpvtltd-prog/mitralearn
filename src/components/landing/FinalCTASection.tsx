import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-10 lg:px-20 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto rounded-3xl p-10 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-10"
        style={{ background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.85) 100%)" }}
      >
        {/* Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-background mb-3">
            Do You Want To Transform
            <br />
            Your Career?
          </h2>
          <p className="text-background/60 text-[15px] leading-relaxed max-w-[460px] mb-7">
            Join over 250,000 students worldwide who are already learning and growing with Mitra Learn. Start your journey today.
          </p>
          <div className="flex gap-3">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="bg-primary hover:bg-primary/90 font-bold text-sm shadow-glow">
                  Start Learning →
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-primary/90 font-bold text-sm shadow-glow"
              >
                Continue Learning →
              </Button>
            </SignedIn>
            <Button
              variant="outline"
              onClick={() => navigate("/curriculum")}
              className="border-2 border-background/20 text-background hover:bg-background/10 font-bold text-sm"
            >
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[13px] text-background/50">Join thousands of learners</p>
          <div className="flex -space-x-3">
            {["bg-primary", "bg-info", "bg-success", "bg-secondary", "bg-destructive"].map((bg, i) => (
              <div key={i} className={`w-11 h-11 rounded-full ${bg} border-[3px] border-foreground flex items-center justify-center text-primary-foreground font-bold text-sm`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="bg-background/10 rounded-xl px-6 py-4 text-center mt-2">
            <p className="text-[28px] font-black text-background">250K+</p>
            <p className="text-[12px] text-background/50">Active Students</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
