import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Course } from "@/hooks/useCourses";

interface CourseModule {
  module_id: string;
  course_id: string;
  module_order: number;
  title: string;
  description: string | null;
}

interface CourseLesson {
  lesson_id: string;
  module_id: string;
  lesson_order: number;
  title: string;
  lesson_type: string | null;
  duration_minutes: number | null;
}

interface LessonResource {
  resource_id: string;
  lesson_id: string;
  resource_type: string;
  resource_order: number | null;
  source: string | null;
  content: string | null;
  metadata: Record<string, unknown> | null;
}

const CourseCurriculum = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [resources, setResources] = useState<LessonResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchCourseData() {
      if (!courseId) return;

      try {
        setIsLoading(true);

        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("id", courseId)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData as Course);

        // Fetch modules
        const { data: modulesData, error: modulesError } = await supabase
          .from("course_modules")
          .select("*")
          .eq("course_id", courseId)
          .order("module_order", { ascending: true });

        if (modulesError) throw modulesError;
        setModules(modulesData || []);

        // Fetch lessons for all modules
        const moduleIds = modulesData?.map((m) => m.module_id) || [];
        if (moduleIds.length > 0) {
          const { data: lessonsData, error: lessonsError } = await supabase
            .from("course_lessons")
            .select("*")
            .in("module_id", moduleIds)
            .order("lesson_order", { ascending: true });

          if (lessonsError) throw lessonsError;
          setLessons(lessonsData || []);

          // Fetch resources for all lessons
          const lessonIds = lessonsData?.map((l) => l.lesson_id) || [];
          if (lessonIds.length > 0) {
            const { data: resourcesData, error: resourcesError } = await supabase
              .from("lesson_resources")
              .select("*")
              .in("lesson_id", lessonIds)
              .order("resource_order", { ascending: true });

            if (resourcesError) throw resourcesError;
            setResources((resourcesData || []) as LessonResource[]);
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId]);

  const getLessonsForModule = (moduleId: string) =>
    lessons.filter((l) => l.module_id === moduleId);

  const getResourcesForLesson = (lessonId: string) =>
    resources.filter((r) => r.lesson_id === lessonId);

  const totalLessons = lessons.length;
  const totalModules = modules.length;

  // Course includes data
  const courseIncludes = [
    { icon: Video, text: "Video content" },
    { icon: Award, text: "Career certificate" },
    { icon: Globe, text: "Lifetime access" },
    { icon: Briefcase, text: "Real-time projects" },
    { icon: FileText, text: "Hands-on projects" },
    { icon: Users, text: "1:1 mentorship sessions" },
    { icon: Laptop, text: "Internship opportunity" },
    { icon: CheckCircle2, text: "Globally recognized certificate" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Popular Badge */}
              {course.badge && (
                <Badge
                  className="border-0"
                  style={{
                    backgroundColor: `${course.badge_color}20`,
                    color: course.badge_color,
                  }}
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {course.badge}
                </Badge>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                {course.description}
              </p>

              {/* Ratings */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(course.rating || 0)
                            ? "fill-current"
                            : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">
                    {course.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({course.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    <strong className="text-foreground">
                      {course.students_count}
                    </strong>{" "}
                    enrolled
                  </span>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {course.duration}
                    </div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {totalModules} Modules
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {totalLessons} Lessons
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base truncate">
                      All Levels
                    </div>
                    <div className="text-xs text-muted-foreground">Beginner+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      Certificate
                    </div>
                    <div className="text-xs text-muted-foreground">Included</div>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <Card className="mt-4 sm:mt-6">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    This Course Includes:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {courseIncludes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
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
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: course.icon_bg }}
                    >
                      <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center cursor-pointer hover:bg-primary-foreground/30 transition-colors shadow-lg">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
                      Preview this course
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Price */}
                  {course.original_price && course.original_price > course.price && (
                    <div className="flex items-center gap-3">
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(
                          ((course.original_price - course.price) /
                            course.original_price) *
                            100
                        )}
                        % OFF
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Limited Time
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-foreground">
                      ₹{course.price.toLocaleString()}
                    </span>
                    {course.original_price && course.original_price > course.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{course.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    One-time payment • Lifetime access
                  </p>

                  {/* CTA Buttons */}
                  <SignedIn>
                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>
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
                    onClick={() =>
                      document
                        .getElementById("curriculum")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Curriculum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="bg-background py-6 sm:py-12 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="lg:max-w-3xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1 sm:mb-2">
                Course Curriculum
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {totalModules} modules • {totalLessons} lessons
              </p>
            </div>

            {modules.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Curriculum Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    The curriculum for this course is currently being prepared.
                    Check back soon!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Accordion
                type="single"
                collapsible
                value={openAccordion}
                onValueChange={setOpenAccordion}
                className="space-y-3"
              >
                {modules.map((mod) => {
                  const moduleLessons = getLessonsForModule(mod.module_id);
                  const lessonCount = moduleLessons.length;

                  return (
                    <AccordionItem
                      key={mod.module_id}
                      value={`module-${mod.module_id}`}
                      className="border-0 rounded-2xl overflow-hidden bg-card shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-4 hover:no-underline md:hover:bg-muted/30 active:bg-muted/50 transition-colors data-[state=open]:bg-muted/20">
                        <div className="flex items-center gap-3 sm:gap-4 text-left w-full">
                          {/* Module Icon */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-muted">
                              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Module {mod.module_order}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight">
                              {mod.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-4 pb-4">
                        {mod.description && (
                          <p className="text-sm text-muted-foreground mb-4 pl-16">
                            {mod.description}
                          </p>
                        )}

                        <div className="space-y-2 pl-4 sm:pl-16">
                          {moduleLessons.map((lesson) => {
                            const lessonResources = getResourcesForLesson(
                              lesson.lesson_id
                            );
                            const hasVideo = lessonResources.some(
                              (r) => r.resource_type === "Video"
                            );
                            const hasLink = lessonResources.some(
                              (r) => r.resource_type === "Link"
                            );

                            return (
                              <div
                                key={lesson.lesson_id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                  {hasVideo ? (
                                    <Video className="w-4 h-4 text-primary" />
                                  ) : (
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {lesson.lesson_type && (
                                      <span>{lesson.lesson_type}</span>
                                    )}
                                    {lesson.duration_minutes && (
                                      <span>• {lesson.duration_minutes} min</span>
                                    )}
                                  </div>
                                </div>
                                {hasLink && (
                                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCurriculum;
