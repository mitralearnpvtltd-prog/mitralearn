import { useState } from "react";
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
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            Learn Tech Skills • Get Certified • Land Your Dream Job
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Master{" "}
            <span className="text-gradient-secondary">Tech Skills</span>
            <br />That Get You Hired
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Industry-designed courses in Data Science, Full-Stack Development, AI, and more.
            Learn from scratch, build real projects, and earn verified certificates.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#courses">
              <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                <BookOpen className="w-5 h-5" />
                Explore Courses
              </Button>
            </a>
            <Link to="/auth">
              <Button variant="heroOutline" size="xl" className="gap-2 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/70 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>5+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Verified Certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Industry Projects</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
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
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Tech Career?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of learners who have transformed their careers with Skill Mitra.
            Start learning today – it's free to begin.
          </p>
          <Link to="/auth">
            <Button variant="hero" size="xl" className="gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Get Started Free
            </Button>
          </Link>
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