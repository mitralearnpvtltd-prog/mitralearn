import { motion } from "framer-motion";
import { 
  Rocket, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Map, 
  Award 
} from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Rocket,
      title: "Project-Based Learning",
      description: "Build real-world projects that you can showcase in your portfolio",
      gradient: "from-primary to-primary/70",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals with years of experience",
      gradient: "from-secondary to-secondary/70",
    },
    {
      icon: Briefcase,
      title: "Internship Opportunities",
      description: "Gain hands-on experience with our partner companies",
      gradient: "from-primary to-secondary",
    },
    {
      icon: GraduationCap,
      title: "Career Support",
      description: "Resume reviews, mock interviews, and job placement assistance",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Map,
      title: "Structured Roadmap",
      description: "Follow a clear learning path from beginner to job-ready",
      gradient: "from-primary/80 to-primary",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn industry-recognized certifications upon completion",
      gradient: "from-secondary/80 to-secondary",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4"
          >
            Why Mitra Learn
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Why <span className="text-gradient-primary">Choose Us</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We provide everything you need to transition into a successful tech career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
