import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code2, 
  FolderGit2, 
  Award, 
  Briefcase,
  ArrowRight,
  Sparkles,
  Rocket,
  UserCheck
} from "lucide-react";

const LearningJourneySection = () => {
  const steps = [
    {
      step: 1,
      icon: BookOpen,
      title: "Learn Fundamentals",
      description: "Master core concepts through structured lessons and video tutorials from industry experts",
      features: ["Video Lectures", "Reading Materials", "Live Sessions"],
    },
    {
      step: 2,
      icon: Code2,
      title: "Practice & Build",
      description: "Sharpen your skills with hands-on coding exercises, quizzes, and real challenges",
      features: ["Coding Challenges", "Weekly Quizzes", "Peer Reviews"],
    },
    {
      step: 3,
      icon: FolderGit2,
      title: "Create Projects",
      description: "Build real-world projects that showcase your skills and grow your portfolio",
      features: ["Capstone Projects", "GitHub Portfolio", "Code Reviews"],
    },
    {
      step: 4,
      icon: Award,
      title: "Get Certified",
      description: "Earn industry-recognized certificates that validate your expertise",
      features: ["Skill Badges", "Certificates", "LinkedIn Ready"],
    },
    {
      step: 5,
      icon: Rocket,
      title: "Real-Time Projects",
      description: "Start working on real-time industry projects that simulate actual production environments",
      features: ["Live Projects", "Production Systems", "Team Collaboration"],
    },
    {
      step: 6,
      icon: UserCheck,
      title: "Get Mentored",
      description: "Work 1-on-1 with senior tech engineers who guide you through real-world challenges",
      features: ["1-on-1 Sessions", "Senior Engineers", "Code Reviews"],
    },
    {
      step: 7,
      icon: Briefcase,
      title: "Land Your Job",
      description: "Get placement assistance and career support to land your dream tech role",
      features: ["Resume Building", "Mock Interviews", "Job Referrals"],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Your Learning Journey
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Your Path to <span className="text-gradient-primary">Success</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A structured 5-step learning journey designed to transform you into a job-ready professional
          </p>
        </motion.div>

        {/* Journey Cards - Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative ${index === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
            >
              {/* Card */}
              <div className="relative h-full p-6 sm:p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-border/50">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-card" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Join 50,000+ learners</p>
              <p className="text-xs text-muted-foreground">Start your journey today</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningJourneySection;
