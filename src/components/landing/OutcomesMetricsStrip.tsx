import { motion } from "framer-motion";
import { FolderGit2, Award, Building2, Star } from "lucide-react";

const OutcomesMetricsStrip = () => {
  const metrics = [
    { icon: FolderGit2, value: "500+", label: "Projects Built", glow: "primary" },
    { icon: Award, value: "10K+", label: "Certifications Issued", glow: "secondary" },
    { icon: Building2, value: "200+", label: "Hiring Partners", glow: "primary" },
    { icon: Star, value: "4.8/5", label: "Learner Rating", glow: "secondary" },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-secondary" />
      
      {/* Animated glow overlay */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block"
              >
                {/* Icon with glow */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors duration-300">
                  <metric.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary-foreground/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.p
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2"
              >
                {metric.value}
              </motion.p>
              
              <p className="text-sm sm:text-base text-primary-foreground/80 font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesMetricsStrip;
