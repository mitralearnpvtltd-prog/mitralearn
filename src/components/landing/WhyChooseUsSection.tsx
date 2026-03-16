import { motion } from "framer-motion";
import { Target, ShoppingBag, Globe } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Target,
      title: "Expert-led courses",
      description: "Gain insights from industry leaders in areas such as technology, business, and creative arts.",
      iconBg: "bg-accent",
      iconColor: "text-primary",
    },
    {
      icon: ShoppingBag,
      title: "Purchase Course",
      description: "Unlock new career opportunities by learning from industry experts in various fields, including technology and business.",
      iconBg: "bg-accent",
      iconColor: "text-primary",
    },
    {
      icon: Globe,
      title: "Interactive learning",
      description: "Engage with seasoned experts in diverse fields such as marketing, design, development, finance, and more.",
      iconBg: "bg-accent",
      iconColor: "text-primary",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Choose Us Because Of
            <br />
            Our Experience
          </h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mx-auto">
            Let's nurture potential, empower minds, and foster growth through education and collaboration to shape a brighter future.
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
              className="bg-card rounded-2xl p-8 border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-5 mx-auto`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
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
