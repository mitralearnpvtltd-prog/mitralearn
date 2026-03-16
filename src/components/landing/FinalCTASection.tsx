import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";
import instructor5 from "@/assets/instructor-5.jpg";
import instructor6 from "@/assets/instructor-6.jpg";

const avatars = [instructor1, instructor2, instructor3, instructor4, instructor5, instructor6];

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Circular avatar arrangement */}
        <div className="relative w-[280px] h-[200px] mx-auto mb-8">
          {avatars.map((src, i) => {
            const positions = [
              { top: "0%", left: "15%" },
              { top: "0%", right: "15%" },
              { top: "35%", left: "0%" },
              { top: "35%", right: "0%" },
              { top: "70%", left: "20%" },
              { top: "70%", right: "20%" },
            ];
            return (
              <div
                key={i}
                className="absolute w-12 h-12 rounded-full overflow-hidden border-2 border-card shadow-md"
                style={positions[i]}
              >
                <img src={src} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          Do You Want To Transform
          <br />
          Your Career?
        </h2>
        <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[460px] mx-auto mb-8">
          Enhance your career prospects with Courses. Access expert instruction and a wide range of courses to boost your skills.
        </p>

        <div className="flex gap-3 justify-center">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-6 py-3 h-auto gap-2">
                Explore Courses
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-6 py-3 h-auto gap-2"
            >
              Continue Learning
              <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
            </Button>
          </SignedIn>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
