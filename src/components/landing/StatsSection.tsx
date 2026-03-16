import { motion } from "framer-motion";
import statsCenterImg from "@/assets/stats-center.jpg";

const StatsSection = () => {
  const leftStats = [
    { title: "Unlimited Resources", desc: "Discover a treasure trove of courses, tools, and resources." },
    { title: "Diverse Course Library", desc: "Learn about hundreds of topics across multiple domains." },
    { title: "Schedule-flexible", desc: "Learn at your own pace with 24/7 access to all courses and materials." },
  ];

  const rightStats = [
    { title: "50+ Expert Instructors", desc: "Each instructor on our platform has years of experience." },
    { title: "Industry Certificates", desc: "Enhance your career prospects with recognized certifications." },
    { title: "Dedicated Support", desc: "Get assistance whenever you need it with our responsive support team." },
  ];

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Steady Progress,
            <br />
            Endless Potential
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {leftStats.map((stat) => (
              <div key={stat.title} className="text-right">
                <h4 className="text-[15px] font-extrabold text-foreground mb-1 font-sans">{stat.title}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[250px] ml-auto">{stat.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Center — Oval Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-[200px] sm:w-[240px] h-[240px] sm:h-[280px] rounded-[140px] overflow-hidden border-4 border-accent shadow-lg">
              <img src={statsCenterImg} alt="Learner" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {rightStats.map((stat) => (
              <div key={stat.title} className="text-left">
                <h4 className="text-[15px] font-extrabold text-foreground mb-1 font-sans">{stat.title}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[250px]">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
