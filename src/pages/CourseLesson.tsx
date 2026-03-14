import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { DynamicCourseSidebar } from "@/components/DynamicCourseSidebar";
import { MinimalYouTubePlayer } from "@/components/MinimalYouTubePlayer";
import { LessonOverviewSection } from "@/components/LessonOverviewSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  BookOpen,
  Play,
  FileText,
  Video,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";

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

interface CourseData {
  id: string;
  title: string;
}

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const CourseLesson = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [allLessons, setAllLessons] = useState<CourseLesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [resources, setResources] = useState<LessonResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchData() {
      if (!courseId || !lessonId) return;

      try {
        setIsLoading(true);

        // Fetch course
        const { data: courseData } = await supabase
          .from("courses")
          .select("id, title")
          .eq("id", courseId)
          .single();

        setCourse(courseData);

        // Fetch modules
        const { data: modulesData } = await supabase
          .from("course_modules")
          .select("*")
          .eq("course_id", courseId)
          .order("module_order", { ascending: true });

        setModules(modulesData || []);

        // Fetch all lessons
        const moduleIds = modulesData?.map((m) => m.module_id) || [];
        if (moduleIds.length > 0) {
          const { data: lessonsData } = await supabase
            .from("course_lessons")
            .select("*")
            .in("module_id", moduleIds)
            .order("lesson_order", { ascending: true });

          setAllLessons(lessonsData || []);

          const lesson = lessonsData?.find((l) => l.lesson_id === lessonId);
          setCurrentLesson(lesson || null);
        }

        // Fetch resources for current lesson
        const { data: resourcesData } = await supabase
          .from("lesson_resources")
          .select("*")
          .eq("lesson_id", lessonId)
          .order("resource_order", { ascending: true });

        setResources((resourcesData || []) as LessonResource[]);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    setActiveTab("overview");
  }, [courseId, lessonId]);

  // Get next/prev lesson
  const currentIndex = allLessons.findIndex((l) => l.lesson_id === lessonId);
  const nextLesson = currentIndex >= 0 ? allLessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  // Separate resources by type
  const videoResources = resources.filter((r) => r.resource_type === "Video");
  const markdownResources = resources.filter(
    (r) => r.resource_type === "Markdown" && r.source !== "Manual"
  );
  const linkResources = resources.filter((r) => r.resource_type === "Link");
  const imageResources = resources.filter((r) => r.resource_type === "Image");
  const otherResources = resources.filter(
    (r) =>
      !["Video", "Markdown", "Link", "Image"].includes(r.resource_type)
  );

  const resourceCount = linkResources.length + otherResources.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return <Navigate to={`/course/${courseId}`} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <SignedOut>
        <main className="flex-1 flex items-center justify-center px-3 sm:px-4">
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-3xl font-display font-bold mb-3 sm:mb-4 px-2">
              {currentLesson.title}
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
              Sign in to access this lesson and start learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Register Now
                </Button>
              </SignUpButton>
            </div>
          </div>
        </main>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DynamicCourseSidebar
            courseId={courseId!}
            courseTitle={course.title}
            modules={modules}
            lessons={allLessons}
            currentLessonId={lessonId}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] w-full">
            {/* Video Section */}
            <div className="bg-[#1a1a2e] w-full py-3 sm:py-4">
              <div className="max-w-2xl mx-auto px-2 sm:px-4">
                {videoResources.length > 0 ? (
                  videoResources.map((resource) => {
                    const videoUrl =
                      resource.content ||
                      (resource.metadata as any)?.url ||
                      "";
                    const videoId = getYouTubeVideoId(videoUrl);

                    if (videoId) {
                      return (
                        <MinimalYouTubePlayer
                          key={resource.resource_id}
                          videoId={videoId}
                          title={currentLesson.title}
                        />
                      );
                    }

                    return (
                      <a
                        key={resource.resource_id}
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 py-12 text-white/80 hover:text-white transition-colors"
                      >
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                          <Play className="w-7 h-7" />
                        </div>
                      </a>
                    );
                  })
                ) : (
                  <div className="bg-white/5 rounded-xl flex flex-col items-center justify-center text-white/60 py-12">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 mb-3">
                      <Play className="w-7 h-7" />
                    </div>
                    <span className="text-sm">No video available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs Section */}
            <div className="border-b border-border bg-card overflow-x-auto">
              <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="h-12 bg-transparent border-0 p-0 gap-2 sm:gap-4 md:gap-6 w-max min-w-full sm:w-auto">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-2 sm:px-0 text-sm sm:text-base min-h-[48px]"
                    >
                      Overview
                    </TabsTrigger>
                    {resourceCount > 0 && (
                      <TabsTrigger
                        value="resources"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-2 sm:px-0 gap-1 sm:gap-2 text-sm sm:text-base min-h-[48px]"
                      >
                        Resources
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs px-1.5 sm:px-2 py-0.5"
                        >
                          {resourceCount}
                        </Badge>
                      </TabsTrigger>
                    )}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
              {activeTab === "overview" && (
                <div>
                  {/* Lesson Overview from DB (admin-editable) */}
                  <LessonOverviewSection directLessonId={lessonId!} />

                  {/* Markdown content from resources */}
                  {markdownResources.length > 0 ? (
                    <div className="space-y-6">
                      {markdownResources.map((resource) => (
                        <div
                          key={resource.resource_id}
                          className="prose prose-sm sm:prose max-w-none 
                            prose-headings:text-foreground prose-p:text-muted-foreground 
                            prose-strong:text-foreground prose-li:text-muted-foreground
                            prose-table:border-border prose-th:border-border prose-td:border-border
                            prose-a:text-primary"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(resource.content || ""),
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {currentLesson.title}
                      </h3>
                      <p className="text-muted-foreground">
                        Content for this lesson is being prepared.
                      </p>
                    </div>
                  )}

                  {/* Images */}
                  {imageResources.length > 0 && (
                    <div className="mt-8 space-y-4">
                      {imageResources.map((resource) => (
                        <div key={resource.resource_id} className="flex justify-center">
                          <img
                            src={resource.content || (resource.metadata as any)?.url || ""}
                            alt="Lesson illustration"
                            className="w-full max-w-2xl rounded-lg border border-border"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Additional Resources
                  </h3>
                  {[...linkResources, ...otherResources].map((resource) => {
                    const url =
                      resource.content ||
                      (resource.metadata as any)?.url ||
                      "#";
                    const title =
                      (resource.metadata as any)?.title ||
                      resource.resource_type;

                    return (
                      <a
                        key={resource.resource_id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {resource.resource_type === "Link" ? (
                            <LinkIcon className="w-5 h-5 text-primary" />
                          ) : resource.resource_type === "PDF" ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : (
                            <ExternalLink className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {url}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Navigation Bar */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate(
                        `/course/${courseId}/lesson/${prevLesson.lesson_id}`
                      )
                    }
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                ) : (
                  <div />
                )}

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Lesson {currentIndex + 1} of {allLessons.length}
                  </p>
                </div>

                {nextLesson ? (
                  <Button
                    onClick={() =>
                      navigate(
                        `/course/${courseId}/lesson/${nextLesson.lesson_id}`
                      )
                    }
                    className="gap-2"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="gap-2"
                  >
                    Back to Course
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </SignedIn>
    </div>
  );
};

export default CourseLesson;
