import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  GraduationCap,
  BookOpen,
  Code,
  Award,
  Users,
  Clock,
  ArrowRight,
  Lock,
  Star,
  Database,
  Brain,
  Briefcase,
  Coffee,
  Sparkles,
  Rocket,
  Trophy,
  Target,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const [courseRequest, setCourseRequest] = useState({ name: "", email: "", course: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const careerPaths = ["Expert Training", "Data Science", "AI Engineering", "Full Stack Dev", "Product Management"];

  // Cursor follow effect - smooth transition
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
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

  const courses = [
    {
      id: "data-engineer",
      category: "DATA ENGINEERING",
      title: "Data Engineer",
      icon: Database,
      iconBg: "bg-primary",
      duration: "5 Months",
      level: "Advanced",
      description: "Build scalable data pipelines and infrastructures for big data processing.",
      topics: ["ETL Pipelines", "Data Warehousing", "Apache Spark", "SQL & NoSQL", "Cloud Platforms"],
      isLocked: false,
      link: "/curriculum",
    },
    {
      id: "ai-engineer",
      category: "ARTIFICIAL INTELLIGENCE",
      title: "AI Engineer",
      icon: Brain,
      iconBg: "bg-secondary",
      duration: "6 Months",
      level: "Advanced",
      description: "Master NLU, engineering and build intelligent systems with cutting-edge technologies.",
      topics: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
      isLocked: true,
      link: "#",
    },
    {
      id: "fullstack-developer",
      category: "WEB DEVELOPMENT",
      title: "Fullstack Developer",
      icon: Code,
      iconBg: "bg-[hsl(180_60%_45%)]",
      duration: "5 Months",
      level: "Intermediate",
      description: "Build complete web applications from frontend to backend with modern frameworks.",
      topics: ["React", "Node.js", "REST APIs", "Databases", "DevOps Basics"],
      isLocked: true,
      link: "#",
    },
    {
      id: "python-ai-engineer",
      category: "AI & PYTHON",
      title: "Python AI Engineer",
      icon: Brain,
      iconBg: "bg-primary",
      duration: "6 Months",
      level: "Advanced",
      description: "Specialize in Python for AI, machine learning, and data science applications.",
      topics: ["Python Programming", "TensorFlow", "PyTorch", "Data Analysis", "Model Deployment"],
      isLocked: true,
      link: "#",
    },
    {
      id: "java-fullstack",
      category: "ENTERPRISE DEVELOPMENT",
      title: "Java Fullstack",
      icon: Coffee,
      iconBg: "bg-secondary",
      duration: "5 Months",
      level: "Intermediate",
      description: "Build enterprise-grade applications with Java and Spring ecosystem.",
      topics: ["Java", "Spring Boot", "Microservices", "Hibernate", "Angular/React"],
      isLocked: true,
      link: "#",
    },
    {
      id: "product-marketing",
      category: "MARKETING & GROWTH",
      title: "Product Marketing",
      icon: Briefcase,
      iconBg: "bg-[hsl(0_75%_55%)]",
      duration: "4 Months",
      level: "Beginner",
      description: "Drive product adoption, market positioning, and growth strategies.",
      topics: ["Go-to-Market Strategy", "Customer Research", "Positioning", "Content Marketing", "Analytics"],
      isLocked: true,
      link: "#",
    },
  ];

  const benefits = [
    { icon: BookOpen, title: "Structured Courses", color: "bg-primary" },
    { icon: Rocket, title: "Beginner to Expert", color: "bg-secondary" },
    { icon: Award, title: "Completion Certificate", color: "bg-[hsl(180_60%_45%)]" },
    { icon: Target, title: "Internship Opportunity", color: "bg-primary" },
    { icon: Trophy, title: "Expert Mentorship", color: "bg-[hsl(0_75%_55%)]" },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      role: "Data Analyst at TechCorp",
      quote: "Skill Mitra gave me the structured learning path I needed. Got my first data job within 3 months!",
      rating: 5,
    },
    {
      name: "Rahul M.",
      role: "ML Engineer Intern",
      quote: "The hands-on projects and daily challenges really prepared me for real-world problems.",
      rating: 5,
    },
    {
      name: "Ananya K.",
      role: "Data Science Student",
      quote: "Best investment in my career. The certification helped me stand out in applications.",
      rating: 5,
    },
  ];

  const handleCourseRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!courseRequest.name.trim() || !courseRequest.email.trim() || !courseRequest.course.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll notify you when your requested course is available.");
    setCourseRequest({ name: "", email: "", course: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Dark Purple Gradient with Cursor Effect */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(270 50% 15%) 0%, hsl(280 45% 20%) 40%, hsl(270 35% 18%) 100%)"
        }}
      >
        {/* Cursor follow glow effect - smooth transition */}
        <div 
          className="pointer-events-none absolute w-[800px] h-[800px] rounded-full transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(circle, hsl(270 80% 60% / 0.25) 0%, hsl(300 70% 50% / 0.15) 30%, hsl(35 95% 55% / 0.08) 50%, transparent 70%)`,
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            filter: "blur(40px)",
          }}
        />
        
        {/* Secondary cursor glow */}
        <div 
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, hsl(35 95% 55% / 0.2) 0%, transparent 60%)`,
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            filter: "blur(30px)",
          }}
        />
        
        {/* Static gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Hero Typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-[1.1] italic">
            <span className="text-[hsl(0_0%_100%)]">Transform Your</span>
            <br />
            <span className="text-[hsl(0_0%_100%)]">Future</span>
          </h1>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
            <span className="text-gradient-secondary">With </span>
            <span className="text-gradient-primary">
              {displayedText}
              <span className={`inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle ${isTyping ? "animate-pulse" : "opacity-0"}`} />
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[hsl(0_0%_100%_/_0.7)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Industry-leading courses with hands-on projects, expert mentorship, and guaranteed career support
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/curriculum">
              <Button size="xl" className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-all bg-[hsl(270_10%_15%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(270_10%_20%)] px-8">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl" className="gap-2 font-semibold border-2 border-[hsl(0_0%_100%_/_0.3)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_0%_100%_/_0.1)] bg-transparent px-8">
                Register Now
                <Users className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Special Offer Banner */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            <Sparkles className="w-5 h-5" />
            <span>Special Offer: Get 30 Days Real-Time Project Internship, FREE</span>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Choose Your Courses
            </h2>
            <div className="w-40 h-1 bg-gradient-secondary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select from our comprehensive range of industry-focused courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className={`group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card ${
                  course.isLocked ? "" : "hover:-translate-y-2"
                }`}
              >
                <CardContent className="p-6">
                  {/* Icon and Badge Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${course.iconBg} flex items-center justify-center shadow-lg`}>
                      <course.icon className="w-7 h-7 text-[hsl(0_0%_100%)]" />
                    </div>
                    <Badge 
                      variant={course.level === "Advanced" ? "default" : course.level === "Intermediate" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  {/* Category */}
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {course.category}
                  </p>
                  
                  <h3 className="text-xl font-display font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  {/* Key Concepts */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-foreground mb-2">KEY CONCEPTS:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.topics.slice(0, 4).map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                  {/* CTA */}
                  {course.isLocked ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </div>
                  ) : (
                    <Link to={course.link} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      Start Learning Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              What You Will Get
            </h2>
            <div className="w-32 h-1 bg-gradient-secondary mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-[140px]">
                <div className={`w-16 h-16 rounded-2xl ${benefit.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <benefit.icon className="w-8 h-8 text-[hsl(0_0%_100%)]" />
                </div>
                <p className="text-sm font-medium">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Course Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">Request a Course</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-muted-foreground">
                Tell us what course you'd like to see and we'll notify you when it's available.
              </p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <form onSubmit={handleCourseRequest} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="request-name">Your Name</Label>
                      <Input
                        id="request-name"
                        placeholder="John Doe"
                        value={courseRequest.name}
                        onChange={(e) => setCourseRequest({ ...courseRequest, name: e.target.value })}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-email">Email Address</Label>
                      <Input
                        id="request-email"
                        type="email"
                        placeholder="you@example.com"
                        value={courseRequest.email}
                        onChange={(e) => setCourseRequest({ ...courseRequest, email: e.target.value })}
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-course">What Course Would You Like?</Label>
                    <Textarea
                      id="request-course"
                      placeholder="e.g., DevOps Engineering, Mobile App Development with Flutter, Cybersecurity..."
                      value={courseRequest.course}
                      onChange={(e) => setCourseRequest({ ...courseRequest, course: e.target.value })}
                      required
                      maxLength={500}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2 bg-secondary hover:bg-secondary/90" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-secondary">Loved</span> by Learners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-display font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(270 50% 15%) 0%, hsl(280 45% 22%) 50%, hsl(270 35% 18%) 100%)"
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-8">
              <GraduationCap className="w-10 h-10 text-[hsl(0_0%_100%)]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[hsl(0_0%_100%)]">
              Your Future Starts Today
            </h2>
            <p className="text-lg text-[hsl(0_0%_100%_/_0.7)] mb-10 leading-relaxed">
              Join thousands of learners who transformed their careers with Skill Mitra.
              No prior experience needed – just bring your curiosity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="xl" className="gap-2 font-semibold shadow-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl" className="gap-2 font-medium border-2 border-[hsl(0_0%_100%_/_0.3)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_0%_100%_/_0.1)] bg-transparent">
                  Already have an account? Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[hsl(0_0%_100%)]" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">Skill Mitra</span>
                <span className="text-xs text-muted-foreground block">By Innovkaro</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/verify" className="hover:text-foreground transition-colors">
                Verify Certificate
              </Link>
              <a href="#courses" className="hover:text-foreground transition-colors">
                Courses
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Skill Mitra by Innovkaro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
