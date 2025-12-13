import { useState, useEffect } from "react";
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
  Zap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Lock,
  Star,
  Database,
  Brain,
  Briefcase,
  Coffee,
  Send,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const [courseRequest, setCourseRequest] = useState({ name: "", email: "", course: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);

  const careerPaths = [
    { title: "Data Science", link: "/curriculum" },
    { title: "AI Engineering", link: "#courses" },
    { title: "Product Management", link: "#courses" },
    { title: "Full Stack Dev", link: "#courses" },
    { title: "Python Developer", link: "#courses" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCareerIndex((prev) => (prev + 1) % careerPaths.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentCareer = careerPaths[activeCareerIndex];

  const courses = [
    {
      id: "data-scientist",
      title: "Data Scientist",
      icon: Database,
      duration: "60 Days",
      level: "Beginner to Advanced",
      description: "Master Python, ML, Deep Learning & get certified for internships.",
      topics: ["Python", "Pandas", "ML", "Deep Learning", "NLP"],
      color: "from-primary to-primary/70",
      isLocked: false,
      link: "/curriculum",
    },
    {
      id: "mern-fullstack",
      title: "Fullstack Development (MERN)",
      icon: Code,
      duration: "90 Days",
      level: "Beginner to Advanced",
      description: "Build full-stack web apps with MongoDB, Express, React & Node.js.",
      topics: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
      color: "from-blue-600 to-blue-400",
      isLocked: true,
      link: "#",
    },
    {
      id: "python-ai",
      title: "Python AI Engineer",
      icon: Brain,
      duration: "75 Days",
      level: "Intermediate",
      description: "Build AI applications with Python, LLMs, and cutting-edge AI tools.",
      topics: ["Python", "OpenAI", "LangChain", "RAG", "Agents"],
      color: "from-purple-600 to-purple-400",
      isLocked: true,
      link: "#",
    },
    {
      id: "product-management",
      title: "Product Management",
      icon: Briefcase,
      duration: "45 Days",
      level: "Beginner Friendly",
      description: "Learn to build and manage products from ideation to launch.",
      topics: ["Strategy", "Roadmaps", "Analytics", "Agile", "User Research"],
      color: "from-amber-600 to-amber-400",
      isLocked: true,
      link: "#",
    },
    {
      id: "java-fullstack",
      title: "Java Fullstack",
      icon: Coffee,
      duration: "90 Days",
      level: "Beginner to Advanced",
      description: "Enterprise-grade development with Java, Spring Boot & React.",
      topics: ["Java", "Spring Boot", "Hibernate", "React", "Microservices"],
      color: "from-red-600 to-red-400",
      isLocked: true,
      link: "#",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description: "Day-by-day learning paths designed by industry experts.",
    },
    {
      icon: Code,
      title: "Hands-On Projects",
      description: "Real-world projects to build your portfolio and skills.",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn certificates recognized by top companies.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Track your learning journey with visual dashboards.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Learn alongside peers and get mentor guidance.",
    },
    {
      icon: Zap,
      title: "Daily Challenges",
      description: "Reinforce learning with quizzes and coding challenges.",
    },
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

    // Validate inputs
    if (!courseRequest.name.trim() || !courseRequest.email.trim() || !courseRequest.course.trim()) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll notify you when your requested course is available.");
    setCourseRequest({ name: "", email: "", course: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Modern Gen EdTech */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground">New: AI Engineer Course Coming Soon</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Launch Your
              <span className="relative mx-3 inline-flex justify-center" style={{ width: '280px', minWidth: '280px' }}>
                {careerPaths.map((career, idx) => (
                  <span 
                    key={idx}
                    className={`absolute left-0 right-0 text-center text-primary transition-opacity duration-500 ${
                      idx === activeCareerIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {career.title}
                  </span>
                ))}
                <span className="invisible">{careerPaths[0].title}</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
              <br className="hidden md:block" />
              Career Today
            </h1>

            {/* Career path indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {careerPaths.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCareerIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeCareerIndex 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`View ${careerPaths[idx].title} career`}
                />
              ))}
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Master in-demand tech skills through structured, project-based learning. 
              Get certified and job-ready in weeks, not years.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to={currentCareer.link}>
                <Button size="xl" className="gap-2 w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all">
                  <BookOpen className="w-5 h-5" />
                  Start {currentCareer.title}
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto font-semibold border-2 hover:bg-primary/5">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <p className="text-3xl font-bold text-primary mb-1">5+</p>
                <p className="text-sm text-muted-foreground">Tech Courses</p>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <p className="text-3xl font-bold text-primary mb-1">10K+</p>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <p className="text-3xl font-bold text-primary mb-1">95%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <p className="text-3xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Students Placed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#courses" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
              <div className="w-1 h-2.5 bg-current rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Courses</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-designed programs to transform you from beginner to job-ready professional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className={`group relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  course.isLocked ? "opacity-90" : "hover:-translate-y-2"
                }`}
              >
                {course.isLocked && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className="gap-1">
                      <Lock className="w-3 h-3" />
                      Coming Soon
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <course.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {course.level}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  {course.isLocked ? (
                    <Button variant="secondary" className="w-full gap-2" disabled>
                      <Lock className="w-4 h-4" />
                      Launching Soon
                    </Button>
                  ) : (
                    <Link to={course.link}>
                      <Button className="w-full gap-2">
                        Start Learning
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Why Skill Mitra?</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to take you from complete beginner to job-ready
              professional with structured learning and hands-on practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
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

            <Card>
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
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                    <Send className="w-4 h-4" />
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Loved by Learners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card">
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary-foreground">
              Your Future Starts Today
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
              Join thousands of learners who transformed their careers with Skill Mitra.
              No prior experience needed – just bring your curiosity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="gap-2 font-semibold shadow-lg">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="heroOutline" size="xl" className="gap-2 font-medium">
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
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
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