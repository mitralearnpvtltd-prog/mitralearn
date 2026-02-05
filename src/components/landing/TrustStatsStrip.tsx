import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Building2, Star } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const TrustStatsStrip = () => {
  const stats = [
    { icon: Users, value: 50000, suffix: "+", label: "Students Trained", color: "primary" },
    { icon: Award, value: 95, suffix: "%", label: "Completion Rate", color: "secondary" },
    { icon: Building2, value: 200, suffix: "+", label: "Hiring Partners", color: "primary" },
    { icon: Star, value: 4.8, suffix: "", label: "Average Rating", color: "secondary", isDecimal: true },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
      
      {/* Animated gradient overlay */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Trusted by <span className="text-gradient-primary">Thousands</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join our growing community of successful tech professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-${stat.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-7 w-7 text-${stat.color}`} />
                  </div>
                  
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    {stat.isDecimal ? (
                      <AnimatedCounter end={48} suffix="" duration={2} />
                    ) : (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                    )}
                    {stat.isDecimal && <span className="text-2xl">.{String(stat.value).split('.')[1]}</span>}
                  </p>
                  
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* College Partners Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-border/50"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Students from top colleges trust us
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {[
              { name: "IIT Delhi", short: "IITD" },
              { name: "IIT Bombay", short: "IITB" },
              { name: "NIT Trichy", short: "NITT" },
              { name: "BITS Pilani", short: "BITS" },
              { name: "VIT Vellore", short: "VIT" },
              { name: "SRM Chennai", short: "SRM" },
            ].map((college, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <span className="text-sm sm:text-base font-bold text-primary">{college.short}</span>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">{college.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStatsStrip;
