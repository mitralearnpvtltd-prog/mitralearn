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
    salary: "₹15,00,000+",
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
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Popular Badge */}
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Most Enrolled Program
              </Badge>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground leading-tight">
                Data Engineering Program
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
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
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base">12 Hours</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base truncate">Projects</div>
                    <div className="text-xs text-muted-foreground">Hands-on</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base truncate">All Levels</div>
                    <div className="text-xs text-muted-foreground">Beginner+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base">Certificate</div>
                    <div className="text-xs text-muted-foreground">Included</div>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <Card className="mt-4 sm:mt-6">
                <CardContent className="p-4 sm:p-6">
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
                    <span className="text-3xl font-display font-bold text-foreground">₹4,999</span>
                    <span className="text-lg text-muted-foreground line-through">₹7,499</span>
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
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Curriculum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Curriculum + Sidebar */}
      <section id="curriculum" className="bg-background py-6 sm:py-12 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Curriculum Section */}
            <div className="lg:col-span-2">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1 sm:mb-2">
                  Course Curriculum
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Master data engineering in 12 intensive weeks.
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
                  const completedInModule = moduleSubmodules.filter(s => 
                    progress.completedSubmodules.includes(s.submodule)
                  ).length;
                  const moduleProgress = lessonCount > 0 ? Math.round((completedInModule / lessonCount) * 100) : 0;
                  const isModuleComplete = completedInModule === lessonCount && lessonCount > 0;

                  return (
                    <AccordionItem 
                      key={mod.module} 
                      value={`module-${mod.module}`}
                      className="border-0 rounded-2xl overflow-hidden bg-card shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-4 hover:no-underline md:hover:bg-muted/30 active:bg-muted/50 transition-colors data-[state=open]:bg-muted/20">
                        <div className="flex items-center gap-3 sm:gap-4 text-left w-full">
                          {/* Module Icon with Progress Ring */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                              isModuleComplete 
                                ? 'bg-success/15' 
                                : moduleProgress > 0 
                                  ? 'bg-primary/10' 
                                  : 'bg-muted'
                            }`}>
                              {isModuleComplete ? (
                                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-success" />
                              ) : (
                                <BookOpen className={`w-5 h-5 sm:w-6 sm:h-6 ${moduleProgress > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                              )}
                            </div>
                            {/* Progress indicator badge */}
                            {moduleProgress > 0 && !isModuleComplete && (
                              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {moduleProgress}%
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Module {mod.module}
                              </span>
                              {hasProject && (
                                <Badge variant="secondary" className="text-[9px] sm:text-[10px] px-1.5 py-0 h-4">
                                  Capstone
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight">
                              {mod.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {completedInModule}/{lessonCount} lessons
                              </span>
                              {/* Mini progress bar */}
                              <div className="flex-1 max-w-[60px] h-1 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all ${isModuleComplete ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${moduleProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4">
                        <div className="space-y-1.5 pt-2">
                          {moduleSubmodules.map((sub, index) => {
                            const isCompleted = progress.completedSubmodules.includes(sub.submodule);
                            const isFirst = index === 0;
                            const isLast = index === moduleSubmodules.length - 1;
                            
                            return (
                              <SignedIn key={sub.submodule}>
                                <Link 
                                  to={`/curriculum/submodule/${sub.submodule}`}
                                  className={`flex items-center gap-3 p-3 min-h-[60px] rounded-xl bg-background border border-border/50 md:hover:border-primary/30 md:hover:bg-primary/5 active:bg-primary/10 active:scale-[0.98] active:border-primary/50 transition-all duration-100 touch-manipulation select-none group ${
                                    isCompleted ? 'border-success/30 bg-success/5' : ''
                                  }`}
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  {/* Lesson number/status indicator */}
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-100 font-semibold text-sm ${
                                    isCompleted 
                                      ? 'bg-success text-success-foreground' 
                                      : 'bg-muted text-muted-foreground md:group-hover:bg-primary md:group-hover:text-primary-foreground group-active:bg-primary group-active:text-primary-foreground'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                      <span>{index + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium leading-tight ${isCompleted ? 'text-success' : 'text-foreground'}`}>
                                      {sub.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                      {sub.description}
                                    </p>
                                  </div>
                                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                                    isCompleted ? 'text-success' : 'text-muted-foreground'
                                  } md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0.5 group-active:opacity-100`} />
                                </Link>
                              </SignedIn>
                            );
                          })}
                          <SignedOut>
                            {moduleSubmodules.map((sub, index) => (
                              <SignInButton key={sub.submodule} mode="modal">
                                <div 
                                  className="flex items-center gap-3 p-3 min-h-[60px] rounded-xl bg-background border border-border/50 md:hover:border-primary/30 md:hover:bg-primary/5 active:bg-primary/10 active:scale-[0.98] active:border-primary/50 transition-all duration-100 touch-manipulation select-none cursor-pointer group"
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 transition-colors duration-100 font-semibold text-sm md:group-hover:bg-primary md:group-hover:text-primary-foreground group-active:bg-primary group-active:text-primary-foreground">
                                    <span>{index + 1}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground leading-tight">
                                      {sub.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                      {sub.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0.5 group-active:opacity-100 transition-all" />
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
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-card rounded-xl border border-border">
                  <div className="text-xl sm:text-2xl font-display font-bold text-primary">{modules.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Modules</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-xl border border-border">
                  <div className="text-xl sm:text-2xl font-display font-bold text-primary">{totalLessons}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-xl border border-border">
                  <div className="text-xl sm:text-2xl font-display font-bold text-primary">{totalProjects}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projects</div>
                </div>
              </div>

              {/* Certificate Promo */}
              <Card className="mt-5 sm:mt-6 bg-primary/5 border-primary/20">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">Earn a Career Certificate</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Add this credential to your LinkedIn profile, resume, or CV.</p>
                    </div>
                  </div>
                  <Link to="/certificate" className="text-sm text-primary font-medium hover:underline flex items-center gap-1 whitespace-nowrap">
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
      <section className="bg-muted/30 py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-2 sm:mb-3">
              Why You Should Take This Course
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Gain the skills and experience you need to launch or advance your career in data engineering and industry-ready knowledge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {whyTakeCourse.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border sm:p-0 sm:bg-transparent sm:border-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base">Affordable Learning</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Build production-ready data pipelines</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border sm:p-0 sm:bg-transparent sm:border-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base">Comprehensive Curriculum</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Get personalized guidance from experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border sm:p-0 sm:bg-transparent sm:border-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base">Lifetime Access</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Learn at your own pace, forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-background py-10 sm:py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <div className="flex text-primary/80">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.8</span>
              <span className="text-muted-foreground text-xs sm:text-sm">(217,728 reviews)</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-4 sm:p-5">
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
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-x-6 sm:gap-y-2 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-1.5 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-primary py-10 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary-foreground mb-3 sm:mb-4">
            What Are You Waiting For?
          </h2>
          <p className="text-primary-foreground/80 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
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
