import { motion } from "framer-motion";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";
import instructor5 from "@/assets/instructor-5.jpg";
import instructor6 from "@/assets/instructor-6.jpg";

const instructors = [
  { name: "Arjun Mehta", role: "Founder & CEO", img: instructor1 },
  { name: "Sarah Mitchell", role: "Frontend Engineer", img: instructor2 },
  { name: "James Chen", role: "Data Scientist", img: instructor3 },
  { name: "Emma Roberts", role: "UX Designer", img: instructor4 },
  { name: "Michael Park", role: "Full Stack Developer", img: instructor5 },
  { name: "Priya Sharma", role: "AI Engineer", img: instructor6 },
];

const InstructorsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20 bg-muted">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Experience The Best Talent
            <br />
            In The Industry
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4 pb-0">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                  <img
                    src={instructor.img}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Orange + badge */}
                  <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <span className="text-primary-foreground text-sm font-bold">+</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-3">
                <h4 className="text-[15px] font-extrabold text-foreground font-sans">{instructor.name}</h4>
                <p className="text-[12px] text-muted-foreground">{instructor.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
