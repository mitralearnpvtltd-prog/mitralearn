import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import testimonialImg from "@/assets/testimonial-person.jpg";

const testimonials = [
  {
    quote: "The courses on Mitra Learn are the best in industry. I was able to transition from a junior developer to a senior engineer in just 8 months. The platform is outstanding.",
    name: "Priya Sharma",
    role: "Software Engineer at Google",
  },
  {
    quote: "Mitra Learn gave me the structured learning path I needed. The hands-on projects and mentorship helped me land my first data role within 3 months!",
    name: "Rahul Mehta",
    role: "Data Analyst at TechCorp",
  },
  {
    quote: "Best investment in my career. The certification helped me stand out in applications. Got multiple offers within weeks of completing!",
    name: "Ananya Kumar",
    role: "AI Engineer at StartupXYZ",
  },
  {
    quote: "From zero coding experience to a full-time developer role in 6 months. The curriculum is well-structured and industry-relevant.",
    name: "Sneha Patel",
    role: "Backend Developer",
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20 bg-muted">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[20px] h-[350px] sm:h-[400px] overflow-hidden"
        >
          <img src={testimonialImg} alt="Student success" className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
            STUDENT STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Choose Us Because Of
            <br />
            Our <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md mb-6">
            1,400+ learners helped by Mitra Learn, transforming career paths globally.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-base leading-relaxed text-muted-foreground italic border-l-4 border-primary pl-5 mb-6">
                "{testimonials[active].quote}"
              </blockquote>

              <div className="flex items-center gap-3.5">
                <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonials[active].name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h5 className="text-[15px] font-extrabold text-foreground font-sans">{testimonials[active].name}</h5>
                  <span className="text-[13px] text-muted-foreground">{testimonials[active].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-1.5 mt-7">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === active ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
