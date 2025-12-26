import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { modules, submodules, getSubmoduleContent } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Star,
  CheckCircle2,
  Play,
  Video,
  FileText,
  Briefcase,
  TrendingUp,
  Globe,
  Laptop,
  Zap,
  Target,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import dataEngineeringArticleImg from "@/assets/data-engineering-article.jpg";

const Curriculum = () => {
  const { progress } = useProgress();
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

  // Calculate totals
  const totalLessons = submodules.length;
  const totalProjects = modules.filter(m => m.assessment?.type === 'project').length + Math.floor(totalLessons / 3);

  // Course includes data
  const courseIncludes = [
    { icon: Video, text: "30+ hours of video content" },
    { icon: Award, text: "Career certificate" },
    { icon: Globe, text: "Lifetime access" },
    { icon: Briefcase, text: "Real-time projects" },
    { icon: FileText, text: "12 hands-on projects" },
    { icon: Users, text: "1:1 mentorship sessions" },
    { icon: Laptop, text: "Internship opportunity" },
    { icon: CheckCircle2, text: "Globally recognized certificate" },
  ];

  // What you'll get data
  const benefits = [
    { icon: Award, title: "Globally Accepted Certificate", description: "Earn a recognized certificate upon completion" },
    { icon: Briefcase, title: "Real-Time Projects", description: "Build 8 production-ready data engineering projects" },
    { icon: Users, title: "1:1 Mentorship", description: "Get personal guidance from industry experts throughout the course" },
    { icon: Globe, title: "Remote Learning", description: "Learn at your own pace from anywhere in the world" },
  ];

  // Career stats
  const careerStats = {
    growth: "97%",
    salary: "$120,000+",
    roles: ["Python", "Apache Airflow", "SQL", "Spark", "AWS"],
    industries: ["Finance", "Healthcare", "Technology", "E-commerce"],
    perfectFor: ["Career switchers", "Data analysts", "Software engineers"],
  };

  // Why take this course
  const whyTakeCourse = [
    { icon: Laptop, title: "Hands-on Experience", description: "Work with data ecosystems used by companies like Netflix, Uber, and Amazon" },
    { icon: TrendingUp, title: "In-Demand Career", description: "Data engineering is one of the fastest growing fields in tech" },
    { icon: Zap, title: "Industry Tools", description: "Master Python, SQL, Apache Spark, Apache Airflow, AWS, and more" },
    { icon: Target, title: "Portfolio Projects", description: "Build 8+ real-world projects to showcase to employers" },
  ];

  // Learner reviews with avatars
  const reviews = [
    { 
      name: "Arjun Mehta", 
      role: "Data Analyst", 
      text: "The curriculum is structured like real industry workflows. The data pipelines and cloud concepts were especially valuable.",
      rating: 4.8 
    },
    { 
      name: "Neha Kapoor", 
      role: "Backend Engineer", 
      text: "Clear explanations and hands-on projects helped me transition into data engineering within months.",
      rating: 5 
    },
    { 
      name: "Rahul Verma", 
      role: "Career Switcher", 
      text: "The mentorship and real-world projects gave me the confidence to apply for DE roles successfully.",
      rating: 4.9 
    },
  ];

  // Trust signals
  const trustSignals = [
    "Curriculum aligned with industry practices",
    "Designed by experienced data professionals",
    "Used by career switchers and working engineers",
  ];

  // Module descriptions for helper text
  const moduleDescriptions: Record<number, string> = {
    1: "Understand the fundamentals of data engineering, including core responsibilities and the data lifecycle.",
    2: "Learn how data pipelines are designed, built, and monitored at scale.",
    3: "Master database design principles and data modeling techniques for efficient storage.",
    4: "Process large-scale datasets using distributed computing frameworks.",
    5: "Automate and schedule complex data workflows using orchestration tools.",
    6: "Design and implement enterprise data warehouses for analytics.",
    7: "Handle real-time data streams and event-driven architectures.",
    8: "Implement data quality frameworks, governance policies, and security best practices.",
    9: "Apply everything you've learned in a comprehensive capstone project.",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Popular Badge */}
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Most Enrolled Program
              </Badge>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground leading-tight">
                Data Engineering Program
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Learn to build and manage data pipelines. Develop programs to gather, clean, analyze, and visualize data.
              </p>

              {/* Ratings */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">4.7</span>
                  <span className="text-muted-foreground">(342 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span><strong className="text-foreground">1,847</strong> enrolled</span>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">12 Hours</div>
                    <div className="text-xs">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Projects + Internship</div>
                    <div className="text-xs">Hands-on</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Beginner to Advanced</div>
                    <div className="text-xs">Level</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Certificate</div>
                    <div className="text-xs">Included</div>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">This Course Includes:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {courseIncludes.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg border-border">
                {/* Video Preview */}
                <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors shadow-lg">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
                      Preview this course
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive" className="text-xs">33% OFF</Badge>
                    <span className="text-xs text-muted-foreground">Limited Time</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-foreground">$399</span>
                    <span className="text-lg text-muted-foreground line-through">$599</span>
                  </div>
                  <p className="text-xs text-muted-foreground">One-time payment • Lifetime access</p>

                  {/* CTA Buttons */}
                  <SignedIn>
                    <Link to="/curriculum/submodule/1.1" className="block">
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  
                  <Button variant="outline" className="w-full">
                    Try Free Preview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Curriculum + Sidebar */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Curriculum Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
                  Course Curriculum
                </h2>
                <p className="text-muted-foreground">
                  Master data engineering in 12 intensive weeks. Dive into essential modules and learn core topics for building scalable data pipelines.
                </p>
              </div>

              {/* Accordion Curriculum */}
              <Accordion 
                type="single" 
                collapsible 
                value={openAccordion}
                onValueChange={setOpenAccordion}
                className="space-y-3"
              >
              {modules.map((mod) => {
                  const moduleSubmodules = submodules.filter(s => s.moduleNumber === mod.module);
                  const lessonCount = moduleSubmodules.length;
                  const hasProject = mod.assessment?.type === 'project';

                  return (
                    <AccordionItem 
                      key={mod.module} 
                      value={`module-${mod.module}`}
                      className="border border-border rounded-lg overflow-hidden bg-card"
                    >
                      <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 text-left w-full">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-sm lg:text-base">
                              {mod.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {lessonCount} lesson{lessonCount > 1 ? 's' : ''}{hasProject ? ' • Capstone Project' : ''}
                            </p>
                            <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-1">
                              {moduleDescriptions[mod.module]}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2 pt-2 border-t border-border">
                          {moduleSubmodules.map((sub) => {
                            const isCompleted = progress.completedSubmodules.includes(sub.submodule);
                            
                            return (
                              <SignedIn key={sub.submodule}>
                                <Link 
                                  to={`/curriculum/submodule/${sub.submodule}`}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                >
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    isCompleted 
                                      ? 'bg-success text-success-foreground' 
                                      : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                      <Play className="w-3 h-3 ml-0.5" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                      {sub.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                                      {sub.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                              </SignedIn>
                            );
                          })}
                          <SignedOut>
                            {moduleSubmodules.map((sub) => (
                              <SignInButton key={sub.submodule} mode="modal">
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Play className="w-3 h-3 ml-0.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                      {sub.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                                      {sub.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </SignInButton>
                            ))}
                          </SignedOut>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Stats Bar */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-display font-bold text-primary">{modules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-display font-bold text-primary">{totalLessons}+</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-display font-bold text-primary">{totalProjects}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>

              {/* Certificate Promo */}
              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Earn a Career Certificate</h4>
                      <p className="text-sm text-muted-foreground">Add this credential to your LinkedIn profile, resume, or CV.</p>
                    </div>
                  </div>
                  <Link to="/certificate" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                    See an example
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* What You'll Get */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">What You'll Get</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Scope */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">High Demand & Career Scope</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-display font-bold text-foreground">{careerStats.growth}</div>
                      <div className="text-sm text-muted-foreground">projected growth by 2030</div>
                    </div>
                    <div>
                      <div className="text-xl font-display font-bold text-success">{careerStats.salary}</div>
                      <div className="text-sm text-muted-foreground">average salary</div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Job Roles</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {careerStats.roles.map((role, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Industry Adoption</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {careerStats.industries.map((industry, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Perfect For</h4>
                      <ul className="space-y-1">
                        {careerStats.perfectFor.map((item, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Article Card */}
              <Card className="border-border overflow-hidden">
                <a 
                  href="https://www.longdom.org/open-access/an-overview-of-data-engineering-and-its-importance-100383.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <img 
                    src={dataEngineeringArticleImg} 
                    alt="Data Engineering Overview" 
                    className="w-full h-48 object-cover"
                  />
                </a>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-3 text-xs">Featured Article</Badge>
                  <h3 className="font-display font-semibold text-foreground mb-3">An Overview of Data Engineering and Its Importance</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Data engineering is foundational to modern analytics and AI. As organizations scale their data infrastructure, 
                    skilled professionals who can build reliable pipelines are in high demand. This article explores the core concepts, 
                    methodologies, and career opportunities in this rapidly growing field.
                  </p>
                  <a 
                    href="https://www.longdom.org/open-access/an-overview-of-data-engineering-and-its-importance-100383.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                  >
                    Read Full Article
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Take This Course */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3">
              Why You Should Take This Course
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain the skills and experience you need to launch or advance your career in data engineering and industry-ready knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyTakeCourse.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Affordable Learning</h4>
                <p className="text-sm text-muted-foreground">Build production-ready data pipelines</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Comprehensive Curriculum</h4>
                <p className="text-sm text-muted-foreground">Get personalized guidance from experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Lifetime Access</h4>
                <p className="text-sm text-muted-foreground">Learn at your own pace, forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex text-primary/80">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.8</span>
              <span className="text-muted-foreground text-sm">(217,728 reviews)</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-5">
                  {/* Avatar, Name, Role, Rating Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar - neutral professional illustration style */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex text-primary/70">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.rating}</span>
                    </div>
                  </div>
                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                </div>
              ))}
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground mb-4">
            What Are You Waiting For?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join 3,500+ students already building their data engineering careers. Start your journey today!
          </p>
          <SignedIn>
            <Link to="/curriculum/submodule/1.1">
              <Button variant="heroOutline" size="lg" className="gap-2">
                Register Now
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="heroOutline" size="lg" className="gap-2">
                Register Now
                <ChevronRight className="w-4 h-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <p className="text-primary-foreground/60 text-sm mt-4">
            🎓 3,500+ Students Already Registered
          </p>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
