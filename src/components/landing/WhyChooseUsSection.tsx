import { motion } from "framer-motion";
import { Target, CreditCard, Globe } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Target,
      title: "Expert-led Courses",
      description: "Gain valuable knowledge and skills from our experienced instructors who are leaders in their respective fields.",
      iconBg: "bg-accent",
    },
    {
      icon: CreditCard,
      title: "Affordable Pricing",
      description: "Invest in your education with our affordable pricing options and unlock access to premium learning resources.",
      iconBg: "bg-blue-light",
    },
    {
      icon: Globe,
      title: "Guided Internship",
      description: "Bridge the gap between theory and practice with our guided internship programs at top-tier companies.",
      iconBg: "bg-green-light",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20 bg-muted">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Choose Us Because Of
            <br />
            Our <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto">
            Embark on a transformative journey, where our expert-led courses, progressive curriculum and vibrant community will empower you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-[52px] h-[52px] rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}>
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-[17px] font-extrabold text-foreground mb-2.5 font-sans">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
