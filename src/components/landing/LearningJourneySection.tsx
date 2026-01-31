import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code2, 
  FolderGit2, 
  Award, 
  Briefcase,
  CheckCircle2
} from "lucide-react";

const LearningJourneySection = () => {
  const steps = [
    {
      step: 1,
      icon: BookOpen,
      title: "Learn Fundamentals",
      description: "Master core concepts through structured lessons and video tutorials",
      color: "primary",
    },
    {
      step: 2,
      icon: Code2,
      title: "Practice Challenges",
      description: "Sharpen your skills with hands-on coding exercises and quizzes",
      color: "secondary",
    },
    {
      step: 3,
      icon: FolderGit2,
      title: "Build Projects",
      description: "Create real-world projects to build your professional portfolio",
      color: "primary",
    },
    {
      step: 4,
      icon: Award,
      title: "Get Certified",
      description: "Earn industry-recognized certificates upon successful completion",
      color: "secondary",
    },
    {
      step: 5,
      icon: Briefcase,
      title: "Career Support",
      description: "Get placement assistance and land your dream job in tech",
      color: "primary",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-4"
          >
            Your Journey
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Your Path to <span className="text-gradient-primary">Success</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Follow our proven 5-step learning journey designed for career transformation
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary -translate-y-1/2 rounded-full" />
          
          {/* Animated progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary -translate-y-1/2 rounded-full origin-left"
            style={{ filter: "brightness(1.3)" }}
          />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative ${index % 2 === 0 ? 'pt-24' : 'pb-24 flex flex-col-reverse'}`}
              >
                {/* Content */}
                <div className={`text-center ${index % 2 === 0 ? 'mb-8' : 'mt-8'}`}>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Icon node */}
                <div className="relative mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color} to-${step.color}/70 flex items-center justify-center shadow-lg relative z-10`}
                  >
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.step}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden relative max-w-md mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 items-start pl-4"
              >
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${step.color} to-${step.color}/70 flex items-center justify-center shadow-lg z-10 relative`}>
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Join 50,000+ successful learners</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningJourneySection;
