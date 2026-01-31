import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  course: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Data Analyst at TechCorp",
    course: "Data Engineering",
    avatar: "PS",
    content: "Mitra Learn gave me the structured learning path I needed. The hands-on projects and mentorship helped me land my first data role within 3 months!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "AI Engineer at StartupXYZ",
    course: "AI Engineering",
    avatar: "RM",
    content: "The project-based approach is exactly what the industry needs. I built 12+ projects during the course that I proudly showcase in my portfolio.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Kumar",
    role: "Software Developer",
    course: "Full Stack Development",
    avatar: "AK",
    content: "Best investment in my career. The certification helped me stand out in applications. Got multiple offers within weeks of completing!",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Data Scientist at FinTech",
    course: "Data Science",
    avatar: "VS",
    content: "The mentors are incredibly supportive. They went above and beyond to help me understand complex ML concepts. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Patel",
    role: "Backend Developer",
    course: "Python Development",
    avatar: "SP",
    content: "From zero coding experience to a full-time developer role in 6 months. The curriculum is well-structured and industry-relevant.",
    rating: 5,
  },
  {
    id: 6,
    name: "Arjun Reddy",
    role: "ML Engineer Intern",
    course: "Machine Learning",
    avatar: "AR",
    content: "The internship opportunity included in the program was a game-changer. Got real-world experience while still learning.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 mx-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
    {/* Quote icon */}
    <div className="flex justify-between items-start mb-4">
      <Quote className="h-8 w-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
      <div className="flex gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
        ))}
      </div>
    </div>

    {/* Content */}
    <p className="text-foreground/90 leading-relaxed mb-6 min-h-[80px]">
      "{testimonial.content}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
        {testimonial.avatar}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
        {testimonial.course}
      </span>
    </div>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
  </div>
);

const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Double the testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const startAnimation = async () => {
      if (!isPaused) {
        await controls.start({
          x: [0, -50 * testimonials.length + "%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          },
        });
      }
    };

    startAnimation();
  }, [controls, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 px-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-4"
          >
            Testimonials
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our <span className="text-gradient-primary">Learners Say</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of successful graduates who transformed their careers with us
          </p>
        </motion.div>

        {/* Carousel container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={controls}
            className="flex py-4"
            style={{ width: "fit-content" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <span className="text-sm text-muted-foreground">
              Paused - move mouse away to resume
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
