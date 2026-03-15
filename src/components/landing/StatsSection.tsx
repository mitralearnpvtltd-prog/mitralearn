import { motion } from "framer-motion";
import { BookOpen, Video, Mic, UserCheck, Award, MessageCircle } from "lucide-react";
import statsCenterImg from "@/assets/stats-center.jpg";

const StatsSection = () => {
  const leftStats = [
    { icon: BookOpen, title: "Collected Resources", desc: "Access our vast library of carefully curated learning materials.", iconBg: "bg-accent" },
    { icon: Video, title: "Diverse Course Library", desc: "Choose from hundreds of courses across every discipline.", iconBg: "bg-blue-light" },
    { icon: Mic, title: "Premium Podcast", desc: "Learn on the go with our curated podcast episodes from experts.", iconBg: "bg-yellow-light" },
  ];

  const rightStats = [
    { icon: UserCheck, title: "50+ Expert Instructors", desc: "Learn from the best — professionals and academics combined.", iconBg: "bg-green-light" },
    { icon: Award, title: "Industry Certificates", desc: "Earn recognized certificates that employers truly value.", iconBg: "bg-accent" },
    { icon: MessageCircle, title: "Dedicated Support", desc: "Our team is here 24/7 to help you succeed every step of the way.", iconBg: "bg-blue-light" },
  ];

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20" style={{ background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--background)) 100%)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full">
            OUR PROGRESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Steady Progress,
            <br />
            Endless <span className="text-primary">Potential</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md">
            Join thousands of learners who are building real-world skills and advancing their careers.
          </p>
          <div className="space-y-6">
            {leftStats.map((stat) => (
              <div key={stat.title} className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-[15px] font-extrabold text-foreground mb-1 font-sans">{stat.title}</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center — Image + Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-[220px] sm:w-[260px] h-[260px] sm:h-[300px] mx-auto rounded-[140px] overflow-hidden mb-5">
            <img src={statsCenterImg} alt="Learner" className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-center gap-6">
            {[
              { value: "250K+", label: "Students" },
              { value: "50+", label: "Instructors" },
              { value: "5K+", label: "Courses" },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <p className="text-xl sm:text-2xl font-black text-foreground">{c.value}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{c.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {rightStats.map((stat) => (
            <div key={stat.title} className="flex items-start gap-3.5 lg:flex-row-reverse lg:text-right">
              <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-[15px] font-extrabold text-foreground mb-1 font-sans">{stat.title}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
