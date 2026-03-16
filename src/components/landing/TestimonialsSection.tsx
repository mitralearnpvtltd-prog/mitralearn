import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import testimonialImg from "@/assets/testimonial-person.jpg";

const testimonials = [
  {
    quote: "The courses on LearnEdge are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
    name: "Sarah Davis",
    role: "Co-Founder",
    rating: 4,
  },
  {
    quote: "LearnEdge gave me the structured learning path I needed. The hands-on projects and mentorship helped me land my first data role within 3 months!",
    name: "Rahul Mehta",
    role: "Data Analyst at TechCorp",
    rating: 5,
  },
  {
    quote: "Best investment in my career. The certification helped me stand out in applications. Got multiple offers within weeks of completing!",
    name: "Ananya Kumar",
    role: "AI Engineer at StartupXYZ",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Choose Us Because Of
            <br />
            Our Experience
          </h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[520px] mx-auto">
            Foster growth and unlock potential by providing educational opportunities and collaborative platforms for a promising future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
            {/* Rating stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < testimonials[active].rating ? "fill-secondary text-secondary" : "text-border"}`} />
                ))}
              </div>
            </div>

            <p className="text-sm font-bold text-foreground mb-4">
              UI/UX bootcamp at LearnEdge
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-[14px] leading-relaxed text-muted-foreground mb-6">
                  "{testimonials[active].quote}"
                </blockquote>

                <div>
                  <h5 className="text-[15px] font-extrabold text-foreground font-sans">{testimonials[active].name}</h5>
                  <span className="text-[13px] text-muted-foreground">{testimonials[active].role}</span>
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
