import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
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
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";
import courseDataEngineering from "@/assets/course-cover-data-engineering.jpg";
import courseAiEngineer from "@/assets/course-cover-ai-engineer.png";
import courseFullstack from "@/assets/course-cover-fullstack.png";
import coursePythonAi from "@/assets/course-cover-python-ai.png";
import courseJavaFullstack from "@/assets/course-cover-java-fullstack.png";
import courseMarketing from "@/assets/course-cover-marketing.png";

const Index = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const careerPaths = ["Expert Training", "Data Science", "AI Engineering", "Full Stack Dev"];

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
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
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY + window.scrollY,
      });
    });
  }, [isTouch]);

  useEffect(() => {
    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, isTouch]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    sectionRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
    }
  }, []);

  const getSectionClasses = (id: string) => {
    const isVisible = visibleSections.has(id);
    return `transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`;
  };

  const courses = [
    {
      category: "DATA ENGINEERING",
      categoryBadge: "Tech Fundamentals",
      title: "Data Engineering",
      description: "Build scalable data pipelines and infrastructures for big data processing.",
      concepts: ["Python", "SQL", "ETL"],
      extraConceptsCount: 1,
      duration: "12 weeks",
      students: "12,543",
      rating: 4.8,
      reviews: "2.4k",
      level: "Beginner",
      status: "active",
      badge: "Project + Internship",
      badgeColor: "#7C3AED",
      iconBg: "#7C3AED",
      icon: Database,
      image: courseDataEngineering,
    },
    {
      category: "ARTIFICIAL INTELLIGENCE",
      categoryBadge: "AI & ML",
      title: "AI Engineer",
      description: "Master NLP, chatbots, and build intelligent systems with cutting-edge technologies.",
      concepts: ["ML", "DL", "NLP"],
      extraConceptsCount: 2,
      duration: "16 weeks",
      students: "8,234",
      rating: 4.7,
      reviews: "1.8k",
      level: "Intermediate",
      status: "coming",
      badge: "Project + Internship",
      badgeColor: "#7C3AED",
      iconBg: "#F97316",
      icon: Brain,
      image: courseAiEngineer,
    },
    {
      category: "WEB DEVELOPMENT",
      categoryBadge: "Full Stack",
      title: "Fullstack Developer",
      description: "Build complete web applications from frontend to backend with modern frameworks.",
      concepts: ["React", "Node.js", "APIs"],
      extraConceptsCount: 1,
      duration: "14 weeks",
      students: "15,678",
      rating: 4.9,
      reviews: "3.2k",
      level: "Beginner",
      status: "coming",
      badge: "Project + Internship",
      badgeColor: "#7C3AED",
      iconBg: "#06B6D4",
      icon: Code,
      image: courseFullstack,
    },
    {
      category: "AI & PYTHON",
      categoryBadge: "Python",
      title: "Python AI Engineer",
      description: "Specialize in Python for AI, machine learning, and data science applications.",
      concepts: ["Python", "TensorFlow", "PyTorch"],
      extraConceptsCount: 2,
      duration: "16 weeks",
      students: "9,456",
      rating: 4.6,
      reviews: "2.1k",
      level: "Intermediate",
      status: "coming",
      badge: "Project + Internship",
      badgeColor: "#7C3AED",
      iconBg: "#6366F1",
      icon: Brain,
      image: coursePythonAi,
    },
    {
      category: "ENTERPRISE DEVELOPMENT",
      categoryBadge: "Enterprise",
      title: "Java Fullstack",
      description: "Build enterprise-grade applications with Java and Spring ecosystem.",
      concepts: ["Java", "Spring", "Microservices"],
      extraConceptsCount: 2,
      duration: "18 weeks",
      students: "6,789",
      rating: 4.5,
      reviews: "1.4k",
      level: "Advanced",
      status: "coming",
      badge: "Advanced",
      badgeColor: "#7C3AED",
      iconBg: "#F97316",
      icon: Code,
      image: courseJavaFullstack,
    },
    {
      category: "MARKETING & GROWTH",
      categoryBadge: "Marketing",
      title: "Product Marketing",
      description: "Drive product adoption, market positioning, and growth strategies.",
      concepts: ["GTM", "Research", "Positioning"],
      extraConceptsCount: 2,
      duration: "10 weeks",
      students: "5,123",
      rating: 4.4,
      reviews: "1.1k",
      level: "Beginner",
      status: "coming",
      badge: "Project + Internship",
      badgeColor: "#7C3AED",
      iconBg: "#EC4899",
      icon: TrendingUp,
      image: courseMarketing,
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
      content: "Mitra Learn gave me the structured learning path I needed. Got my first data role within 3 months!",
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
    <div ref={pageRef} className="min-h-screen bg-white relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Global cursor following effect with animated color bubble */}
      {!isTouch && (
        <>
          <div
            className="pointer-events-none fixed z-0"
            style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)`,
              left: mousePosition.x - 200,
              top: mousePosition.y - window.scrollY - 200,
              filter: 'blur(40px)',
              transition: 'left 0.15s ease-out, top 0.15s ease-out',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <div
            className="pointer-events-none fixed z-0"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)`,
              left: mousePosition.x - 150,
              top: mousePosition.y - window.scrollY - 150,
              filter: 'blur(30px)',
              transition: 'left 0.25s ease-out, top 0.25s ease-out',
              animation: 'pulse-glow 2.5s ease-in-out infinite reverse',
            }}
          />
          <div
            className="pointer-events-none fixed z-0"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)`,
              left: mousePosition.x - 100,
              top: mousePosition.y - window.scrollY - 100,
              filter: 'blur(25px)',
              transition: 'left 0.35s ease-out, top 0.35s ease-out',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
        </>
      )}
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={mitraLearnLogo} 
              alt="Mitra Learn" 
              className="h-20 sm:h-24 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-colors"
                  style={{ color: '#475569' }}
                >
                  <Users className="w-4 h-4 hidden sm:block" />
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button 
                  className="text-white px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold"
                  style={{ backgroundColor: '#7C3AED' }}
                >
                  Register
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="text-xs sm:text-sm font-medium transition-colors"
                style={{ color: '#475569' }}
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] pt-16 overflow-hidden flex items-center"
        style={{
          background: '#FFFFFF',
        }}
      >
        {/* Hero cursor-following blurred color blobs - static positions that follow cursor */}
        {!isTouch && (
          <>
            {/* Primary purple blob - top left area */}
            <div
              className="pointer-events-none absolute z-0"
              style={{
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(139,92,246,0.2) 30%, rgba(196,181,253,0.1) 50%, transparent 70%)`,
                left: `calc(10% + ${(mousePosition.x - window.innerWidth / 2) * 0.08}px)`,
                top: `calc(80px + ${(mousePosition.y - window.scrollY - 300) * 0.06}px)`,
                filter: 'blur(80px)',
                transition: 'left 0.4s ease-out, top 0.4s ease-out',
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />
            {/* Secondary teal/cyan blob - top right area */}
            <div
              className="pointer-events-none absolute z-0"
              style={{
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(34,211,238,0.18) 30%, rgba(103,232,249,0.08) 50%, transparent 70%)`,
                right: `calc(5% + ${(window.innerWidth / 2 - mousePosition.x) * 0.06}px)`,
                top: `calc(120px + ${(mousePosition.y - window.scrollY - 300) * 0.05}px)`,
                filter: 'blur(70px)',
                transition: 'right 0.6s ease-out, top 0.6s ease-out',
                animation: 'pulse-glow 2.5s ease-in-out infinite reverse',
              }}
            />
            {/* Third orange/amber blob - bottom left area */}
            <div
              className="pointer-events-none absolute z-0"
              style={{
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(251,146,60,0.3) 0%, rgba(249,115,22,0.15) 30%, rgba(254,215,170,0.08) 50%, transparent 70%)`,
                left: `calc(25% + ${(mousePosition.x - window.innerWidth / 2) * 0.04}px)`,
                bottom: `calc(50px + ${(400 - mousePosition.y + window.scrollY) * 0.04}px)`,
                filter: 'blur(60px)',
                transition: 'left 0.8s ease-out, bottom 0.8s ease-out',
                animation: 'pulse-glow 3.5s ease-in-out infinite',
              }}
            />
          </>
        )}
        
        {/* Grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)',
          }}
        />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 
              className="text-3xl sm:text-5xl md:text-7xl leading-tight"
              style={{ color: '#0F172A', fontWeight: 800 }}
            >
              Transform Your
            </h1>
            <h1 
              className="text-3xl sm:text-5xl md:text-7xl mb-4 leading-tight"
              style={{ color: '#0F172A', fontWeight: 800 }}
            >
              Future
            </h1>
            <h2 
              className="text-2xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 leading-tight"
              style={{
                fontWeight: 800,
                fontStyle: 'italic',
                background: 'linear-gradient(90deg, #7C3AED 0%, #4F46E5 50%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              With Expert Training
            </h2>
            
            <p 
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
              style={{ color: '#64748B' }}
            >
              Industry-leading courses with hands-on projects, expert mentorship, and guaranteed career support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4 sm:px-0">
              <Button 
                onClick={() => navigate('/curriculum')}
                className="px-6 sm:px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-90 w-full sm:w-auto"
                style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}
              >
                Explore Courses <ArrowRight className="h-5 w-5" />
              </Button>
              <SignedIn>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="px-6 sm:px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-50 w-full sm:w-auto"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    color: '#0F172A',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button 
                    className="px-6 sm:px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-50 w-full sm:w-auto"
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      color: '#0F172A',
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    Register Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
            
            {/* Special Offer Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mx-4 sm:mx-0 text-center"
              style={{ backgroundColor: '#F97316', color: '#FFFFFF' }}
            >
              <span>🎁</span>
              <span className="hidden sm:inline">Special Offer: Get 30 Days Real-Time Project Internship, FREE</span>
              <span className="sm:hidden">30 Days Free Internship!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section 
        id="courses-section"
        ref={setSectionRef('courses-section')}
        className={`py-12 sm:py-14 ${getSectionClasses('courses-section')}`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 
              className="text-2xl sm:text-4xl mb-2 relative inline-block"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Choose Your Courses
              {/* Curved underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                height="12" 
                viewBox="0 0 200 12" 
                fill="none"
                preserveAspectRatio="none"
              >
                <path 
                  d="M2 8 Q 50 2, 100 6 T 198 4" 
                  stroke="#F97316" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="195,2 202,5 195,8" fill="#F97316" />
              </svg>
            </h2>
            <p className="mt-6 text-sm sm:text-lg px-4 sm:px-0" style={{ color: '#64748B' }}>
              Select from our comprehensive range of industry-focused courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto px-1 sm:px-0">
            {courses.map((course, index) => (
              <div 
                key={index}
                className="group bg-white relative cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                style={{ 
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                }}
              >
                {/* Image Section */}
                <div 
                  className="relative h-48 w-full overflow-hidden"
                  style={{ 
                    backgroundColor: course.iconBg,
                  }}
                >
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${course.iconBg}cc 0%, ${course.iconBg} 100%)`,
                      }}
                    />
                  )}
                  {/* Icon as placeholder when no image - moved inside the else branch above */}
                  
                  {/* Original Badge Style */}
                  <div className="absolute top-3 left-3">
                    <span 
                      className="text-white text-xs font-semibold px-3 py-1.5 rounded-md"
                      style={{ backgroundColor: course.badgeColor }}
                    >
                      {course.badge}
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-5">
                  {/* Title */}
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ color: '#0F172A' }}
                  >
                    {course.title}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.concepts.map((concept, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: '#E5E7EB', color: '#475569' }}
                      >
                        {concept}
                      </span>
                    ))}
                    {course.extraConceptsCount && course.extraConceptsCount > 0 && (
                      <span 
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: '#E5E7EB', color: '#475569' }}
                      >
                        +{course.extraConceptsCount}
                      </span>
                    )}
                  </div>
                  
                  {/* Duration & Students */}
                  <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#64748B' }}>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  {/* Rating & Level */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold" style={{ color: '#0F172A' }}>{course.rating}</span>
                      <span className="text-sm" style={{ color: '#64748B' }}>({course.reviews})</span>
                    </div>
                    <span 
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ 
                        backgroundColor: '#EDE9FE',
                        color: '#7C3AED',
                      }}
                    >
                      Beginner to Advanced
                    </span>
                  </div>
                  
                  {/* CTA Button */}
                  {course.status === 'active' ? (
                    <Link to="/curriculum" className="block">
                      <button 
                        className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ 
                          background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)',
                        }}
                      >
                        Explore Course <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  ) : (
                    <button 
                      className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: '#F1F5F9',
                        color: '#64748B',
                      }}
                      disabled
                    >
                      <Clock className="h-4 w-4" /> Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Get Section */}
      <section 
        id="features-section"
        ref={setSectionRef('features-section')}
        className={`py-10 sm:py-14 ${getSectionClasses('features-section')}`}
        style={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 
              className="text-2xl sm:text-4xl mb-2 relative inline-block"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              What You Will Get
              {/* Curved underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                height="12" 
                viewBox="0 0 200 12" 
                fill="none"
                preserveAspectRatio="none"
              >
                <path 
                  d="M2 8 Q 50 2, 100 6 T 198 4" 
                  stroke="#F97316" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="195,2 202,5 195,8" fill="#F97316" />
              </svg>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-5 md:gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col items-center text-center group ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  <feature.icon className="h-7 w-7 sm:h-8 sm:w-8" style={{ color: feature.iconColor }} />
                </div>
                <p 
                  className="text-sm sm:text-sm font-semibold leading-tight"
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
      <section 
        id="request-section"
        ref={setSectionRef('request-section')}
        className={`py-10 sm:py-14 ${getSectionClasses('request-section')}`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="container mx-auto px-4 sm:px-4">
          <div className="text-center mb-8">
            <span 
              className="inline-block text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}
            >
              Request a Course
            </span>
            <h2 
              className="text-2xl sm:text-3xl mb-4"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Can't Find What You're Looking For?
            </h2>
            <p className="text-sm sm:text-base px-4 sm:px-0" style={{ color: '#64748B' }}>
              Tell us what course you'd like to see and we'll notify you when it's available.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmitRequest} 
            className="max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl"
            style={{ backgroundColor: '#F8FAFC' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
        id="testimonials-section"
        ref={setSectionRef('testimonials-section')}
        className={`py-10 sm:py-14 ${getSectionClasses('testimonials-section')}`}
        style={{
          background: 'linear-gradient(180deg, rgba(236,254,255,0.4) 0%, rgba(245,243,255,0.3) 50%, #FFFFFF 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span 
              className="inline-block text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full"
              style={{ backgroundColor: '#F97316', color: '#FFFFFF' }}
            >
              Testimonials
            </span>
            <h2 
              className="text-2xl sm:text-4xl relative inline-block"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Loved by Learners
              {/* Curved underline */}
              <svg 
                className="absolute -bottom-2 right-0" 
                width="140"
                height="12" 
                viewBox="0 0 140 12" 
                fill="none"
              >
                <path 
                  d="M2 8 Q 35 2, 70 6 T 135 4" 
                  stroke="#F97316" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="132,2 140,5 132,8" fill="#F97316" />
              </svg>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 max-w-5xl mx-auto px-1 sm:px-0">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" style={{ color: '#F97316' }} />
                  ))}
                </div>
                <p 
                  className="mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base"
                  style={{ color: '#475569' }}
                >
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold" style={{ color: '#0F172A' }}>{testimonial.name}</p>
                  <p 
                    className="text-sm"
                    style={{ color: '#64748B' }}
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
      <section 
        id="cta-section"
        ref={setSectionRef('cta-section')}
        className={`py-14 ${getSectionClasses('cta-section')}`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center"
            style={{
              backgroundColor: '#F1F5F9',
            }}
          >
            {/* Checkmark icon */}
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.97 0 3.79.63 5.27 1.7" />
              </svg>
            </div>
            
            <h2 
              className="text-2xl sm:text-4xl mb-2 relative inline-block"
              style={{ color: '#0F172A', fontWeight: 700 }}
            >
              Your Future Starts Today
              {/* Curved underline */}
              <svg 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2" 
                width="180"
                height="12" 
                viewBox="0 0 180 12" 
                fill="none"
              >
                <path 
                  d="M2 8 Q 45 2, 90 6 T 175 4" 
                  stroke="#7C3AED" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="172,2 180,5 172,8" fill="#7C3AED" />
              </svg>
            </h2>
            
            <p 
              className="mt-4 sm:mt-6 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-4 sm:px-0"
              style={{ color: '#64748B' }}
            >
              Join thousands of learners who transformed their careers with Mitra Learn. No prior experience needed – just bring your curiosity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button 
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
                className="px-6 sm:px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 w-full sm:w-auto"
                style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="px-6 sm:px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-50 w-full sm:w-auto"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#0F172A',
                  border: '1px solid #E5E7EB'
                }}
              >
                <span className="hidden sm:inline">Already have an account? Login</span>
                <span className="sm:hidden">Login</span>
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <img 
                src={mitraLearnLogo} 
                alt="Mitra Learn" 
                className="h-8 w-auto"
              />
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
              © 2025 Mitra Learn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
