import { motion } from "framer-motion";
import { Star } from "lucide-react";

const instructors = [
  { name: "Robert David", role: "Senior UX Designer", rating: "4.9", reviews: "1.2K", gradient: "from-accent to-primary/20" },
  { name: "Sarah Mitchell", role: "Frontend Engineer", rating: "4.8", reviews: "980", gradient: "from-primary/10 to-secondary/20" },
  { name: "James Chen", role: "Data Scientist", rating: "4.9", reviews: "2.1K", gradient: "from-yellow-light to-secondary/20" },
  { name: "Emma Roberts", role: "Graphic Designer", rating: "4.7", reviews: "876", gradient: "from-green-light to-success/20" },
  { name: "Michael Park", role: "Full Stack Developer", rating: "4.8", reviews: "1.5K", gradient: "from-blue-light to-info/20" },
  { name: "Olivia Turner", role: "Marketing Strategist", rating: "4.9", reviews: "1.1K", gradient: "from-accent to-destructive/10" },
];

const InstructorsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
            MEET THE EXPERTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Experience The Best Talent
            <br />
            In The <span className="text-primary">Industry</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto">
            Our instructors are industry leaders with real-world experience who are passionate about teaching.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card border border-border rounded-xl overflow-hidden text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-[180px] bg-gradient-to-br ${instructor.gradient} flex items-center justify-center`}>
                <div className="w-20 h-20 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-2xl font-black text-primary font-sans">
                  {instructor.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-base font-extrabold text-foreground font-sans">{instructor.name}</h4>
                <p className="text-[13px] text-muted-foreground mb-2">{instructor.role}</p>
                <div className="flex items-center justify-center gap-1 text-[13px] font-bold text-secondary">
                  <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  {instructor.rating}
                  <span className="text-muted-foreground font-normal">({instructor.reviews} Reviews)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
