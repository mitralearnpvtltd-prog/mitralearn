import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  Code,
  Award,
  Users,
  Clock,
  ArrowRight,
  Star,
  Database,
  Brain,
  Briefcase,
  Rocket,
  TrendingUp,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const careerPaths = ["Expert Training", "Data Science", "AI Engineering", "Full Stack Dev"];

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Typing effect
  useEffect(() => {
    const targetText = careerPaths[activeCareerIndex];
    let currentIndex = 0;
    setIsTyping(true);
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayedText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [activeCareerIndex]);

  // Auto-rotate careers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCareerIndex((prev) => (prev + 1) % careerPaths.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouch) return;
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    }
  }, [isTouch]);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  const courses = [
    {
      category: "DATA ENGINEERING",
      title: "Data Engineer",
      description: "Build scalable data pipelines and infrastructures for big data processing.",
      concepts: ["ETL Pipelines", "Data Warehousing", "Apache Spark", "SQL & NoSQL", "Cloud Platforms"],
      duration: "5 Months",
      status: "active",
      badge: "Advanced",
      badgeColor: "#7C3AED",
      iconBg: "#7C3AED",
      icon: Database,
    },
    {
      category: "ARTIFICIAL INTELLIGENCE",
      title: "AI Engineer",
      description: "Master NLP, chatbots, and build intelligent systems with cutting-edge technologies.",
      concepts: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
      duration: "6 Months",
      status: "coming",
      badge: "Advanced",
      badgeColor: "#7C3AED",
      iconBg: "#F97316",
      icon: Brain,
    },
    {
      category: "WEB DEVELOPMENT",
      title: "Fullstack Developer",
      description: "Build complete web applications from frontend to backend with modern frameworks.",
      concepts: ["React", "Node.js", "REST APIs", "Databases"],
      duration: "5 Months",
      status: "coming",
      badge: "Interactive",
      badgeColor: "#06B6D4",
      iconBg: "#06B6D4",
      icon: Code,
    },
    {
      category: "AI & PYTHON",
      title: "Python AI Engineer",
      description: "Specialize in Python for AI, machine learning, and data science applications.",
      concepts: ["Python Programming", "TensorFlow", "PyTorch", "Data Analysis", "Model Deployment"],
      duration: "6 Months",
      status: "coming",
      badge: "Advanced",
      badgeColor: "#7C3AED",
      iconBg: "#6366F1",
      icon: Brain,
    },
    {
      category: "ENTERPRISE DEVELOPMENT",
      title: "Java Fullstack",
      description: "Build enterprise-grade applications with Java and Spring ecosystem.",
      concepts: ["Java", "Spring Boot", "Microservices", "Hibernate", "Angular/React"],
      duration: "5 Months",
      status: "coming",
      badge: "Intermediate",
      badgeColor: "#F97316",
      iconBg: "#F97316",
      icon: Code,
    },
    {
      category: "MARKETING & GROWTH",
      title: "Product Marketing",
      description: "Drive product adoption, market positioning, and growth strategies.",
      concepts: ["Go-to-Market Strategy", "Customer Research", "Positioning", "Content Marketing", "Analytics"],
      duration: "4 Months",
      status: "coming",
      badge: "Beginner",
      badgeColor: "#EC4899",
      iconBg: "#EC4899",
      icon: TrendingUp,
    },
  ];

  const features = [
    { icon: BookOpen, title: "Structured Courses", bgColor: "#F1F5F9", iconColor: "#475569" },
    { icon: Rocket, title: "Beginner to Expert", bgColor: "#FFF7ED", iconColor: "#F97316" },
    { icon: Award, title: "Completion Certificate", bgColor: "#ECFEFF", iconColor: "#06B6D4" },
    { icon: Briefcase, title: "Internship Opportunity", bgColor: "#F5F3FF", iconColor: "#7C3AED" },
    { icon: Users, title: "Expert Mentorship", bgColor: "#FDF2F8", iconColor: "#EC4899" },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      role: "Data Analyst at TechCorp",
      content: "Skill Mitra gave me the structured learning path I needed. Got my first data role within 3 months!",
      rating: 5,
      bgColor: "#7C3AED",
    },
    {
      name: "Rahul M.",
      role: "AI Engineer Intern",
      content: "The hands-on projects and daily challenges really prepared me for real-world problems.",
      rating: 5,
      bgColor: "#F97316",
    },
    {
      name: "Ananya K.",
      role: "Data Science Student",
      content: "Best investment in my career. The certification helped me stand out in applications.",
      rating: 5,
      bgColor: "#06B6D4",
    },
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Course request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
            >
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold" style={{ color: '#0F172A' }}>Skill Mitra</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/auth" 
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#475569' }}
            >
              <Users className="w-4 h-4" />
              Login
            </Link>
            <Button 
              onClick={() => navigate('/auth')}
              className="text-white px-6 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: '#7C3AED' }}
            >
              Register Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[650px] pt-16 overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)',
        }}
      >
        {/* Cursor following gradient */}
        {!isTouch && (
          <div
            className="pointer-events-none absolute transition-all duration-300 ease-out"
            style={{
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(99,102,241,0.12) 30%, rgba(6,182,212,0.10) 50%, transparent 70%)`,
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
              filter: 'blur(40px)',
            }}
          />
        )}
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 
              className="text-5xl md:text-7xl mb-2 leading-tight italic"
              style={{ color: '#FFFFFF', fontWeight: 800 }}
            >
              Transform Your
            </h1>
            <h1 
              className="text-5xl md:text-7xl mb-4 leading-tight italic"
              style={{ color: '#FFFFFF', fontWeight: 800 }}
            >
              Future
            </h1>
            <h2 
              className="text-4xl md:text-6xl mb-8 leading-tight"
              style={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #7C3AED, #6366F1, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              With {displayedText}
              <span 
                className={`inline-block w-[3px] h-[0.8em] ml-1 align-middle ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
                style={{ backgroundColor: '#7C3AED' }}
              />
            </h2>
            
            <p 
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Industry-leading courses with hands-on projects, expert mentorship, and guaranteed career support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => navigate('/curriculum')}
                className="px-8 py-6 rounded-full text-lg font-semibold transition-all duration-200 flex items-center gap-2"
                style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}
              >
                Explore Courses <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
                className="px-8 py-6 rounded-full text-lg font-semibold transition-all duration-200 flex items-center gap-2"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#0F172A',
                  border: '1px solid #E5E7EB'
                }}
              >
                {user ? 'Go to Dashboard' : 'Register Now'} <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Special Offer Badge */}
            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#F97316', color: '#FFFFFF' }}
            >
              <span>🎉</span>
              <span>Special Offer: Get 30 Days Real-Time Project Internship, FREE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl mb-4"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Choose Your Courses
            </h2>
            <div 
              className="w-32 h-1 mx-auto rounded-full mb-4"
              style={{ background: 'linear-gradient(90deg, #7C3AED, #6366F1, #06B6D4)' }}
            />
            <p style={{ color: '#64748B', fontSize: '18px' }}>
              Select from our comprehensive range of industry-focused courses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course, index) => (
              <div 
                key={index}
                className="group bg-white p-6 relative cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                style={{ 
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                }}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span 
                    className="text-white text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: course.badgeColor }}
                  >
                    {course.badge}
                  </span>
                </div>
                
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: course.iconBg }}
                >
                  <course.icon className="h-6 w-6 text-white" />
                </div>
                
                <p 
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#64748B' }}
                >
                  {course.category}
                </p>
                <h3 
                  className="text-xl mb-3"
                  style={{ color: '#0F172A', fontWeight: 700 }}
                >
                  {course.title}
                </h3>
                <p 
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: '#475569' }}
                >
                  {course.description}
                </p>
                
                <div className="mb-4">
                  <p 
                    className="text-xs font-semibold uppercase mb-2"
                    style={{ color: '#64748B' }}
                  >
                    Key Concepts:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.concepts.slice(0, 4).map((concept, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: '#F1F5F9', color: '#475569' }}
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid #E5E7EB' }}
                >
                  <div className="flex items-center gap-2" style={{ color: '#64748B' }}>
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  {course.status === 'active' ? (
                    <Link 
                      to="/curriculum" 
                      className="text-sm font-semibold flex items-center gap-1 transition-colors"
                      style={{ color: '#0F172A' }}
                    >
                      Start Learning Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span 
                      className="text-sm flex items-center gap-1"
                      style={{ color: '#64748B' }}
                    >
                      <Clock className="h-4 w-4" /> Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Get Section */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl mb-4"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              What You Will Get
            </h2>
            <div 
              className="w-32 h-1 mx-auto rounded-full"
              style={{ background: 'linear-gradient(90deg, #7C3AED, #6366F1, #06B6D4)' }}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  <feature.icon className="h-8 w-8" style={{ color: feature.iconColor }} />
                </div>
                <p 
                  className="text-sm font-semibold"
                  style={{ color: '#0F172A' }}
                >
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Course Section */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span 
              className="inline-block text-sm font-medium px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}
            >
              Request a Course
            </span>
            <h2 
              className="text-3xl mb-4"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Can't Find What You're Looking For?
            </h2>
            <p style={{ color: '#64748B' }}>
              Tell us what course you'd like to see and we'll notify you when it's available.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmitRequest} 
            className="max-w-2xl mx-auto p-8 rounded-2xl"
            style={{ backgroundColor: '#F8FAFC' }}
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#0F172A' }}
                >
                  Your Name
                </label>
                <Input 
                  placeholder="John Doe" 
                  className="bg-white rounded-xl"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#0F172A' }}
                >
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="bg-white rounded-xl"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>
            <div className="mb-6">
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: '#0F172A' }}
              >
                What Course Would You Like?
              </label>
              <Textarea 
                placeholder="e.g., DevOps Engineering, Mobile App Development with Flutter, Cybersecurity..." 
                className="bg-white rounded-xl min-h-[100px]"
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full py-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: '#F97316', color: '#FFFFFF' }}
            >
              Submit Request <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span 
              className="inline-block text-sm font-medium px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: '#FFF7ED', color: '#F97316' }}
            >
              Testimonials
            </span>
            <h2 
              className="text-4xl"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Loved by Learners
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-6"
                style={{ backgroundColor: testimonial.bgColor }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-white fill-current" />
                  ))}
                </div>
                <p 
                  className="mb-6 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p 
                    className="text-sm"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto rounded-3xl p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)',
            }}
          >
            <h2 
              className="text-4xl mb-4"
              style={{ color: '#FFFFFF', fontWeight: 700 }}
            >
              Your Future Starts Today
            </h2>
            <p 
              className="mb-8 max-w-xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Join thousands of learners who transformed their careers with Skill Mitra. No prior experience needed — just bring your curiosity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
                className="px-8 py-6 rounded-full text-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: '#F97316', color: '#FFFFFF' }}
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="px-8 py-6 rounded-full text-lg font-semibold"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                Already have an account? Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8"
        style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E5E7EB' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
              >
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span 
                className="text-xl font-bold"
                style={{ color: '#0F172A' }}
              >
                Skill Mitra
              </span>
            </div>
            <div className="flex gap-6">
              <Link 
                to="/verify" 
                className="text-sm transition-colors"
                style={{ color: '#64748B' }}
              >
                Verify Certificate
              </Link>
              <Link 
                to="/curriculum" 
                className="text-sm transition-colors"
                style={{ color: '#64748B' }}
              >
                Courses
              </Link>
            </div>
            <p 
              className="text-sm"
              style={{ color: '#64748B' }}
            >
              © 2024 Skill Mitra by Innosphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
