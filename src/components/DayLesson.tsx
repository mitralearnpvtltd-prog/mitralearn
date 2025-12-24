import { useState, useEffect } from "react";
import { SubmoduleContent, QuizQuestion, getNextSubmoduleTitle, getNextSubmoduleId, getModuleForSubmodule, getPreviousSubmoduleId, getSubmoduleContent } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RefreshCcw,
  Target,
  Video,
  FileText,
  Lock,
  Play,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface DayLessonProps {
  content: SubmoduleContent;
}

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper to check if URL is embeddable video
const isEmbeddableVideo = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Course badge logic
const getCourseBadge = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('java')) {
    return 'Advanced';
  }
  return 'Project + Internship';
};

export const DayLesson = ({ content }: DayLessonProps) => {
  const { progress, completeSubmodule, completeQuiz, completeCodingChallenge } = useProgress();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learn");
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | null }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Compiler state
  const [compilerCode, setCompilerCode] = useState("");
  const [compilerOutput, setCompilerOutput] = useState("");
  const [compilerHint, setCompilerHint] = useState("");
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const isSubmoduleCompleted = progress.completedSubmodules.includes(content.submodule);
  const quizScore = progress.completedQuizzes[content.submodule];
  const isPracticeCompleted = progress.codingChallengesCompleted.includes(content.submodule);
  const module = getModuleForSubmodule(content.submodule);
  const hasPractice = content.practiceExercises.length > 0;

  // Check if previous submodule is completed for gated flow
  const previousSubmoduleId = getPreviousSubmoduleId(content.submodule);
  const isPreviousCompleted = !previousSubmoduleId || progress.completedSubmodules.includes(previousSubmoduleId);

  // Determine section completion status
  const isLearnCompleted = true; // Learn is always accessible once unlocked
  const canAccessPractice = isLearnCompleted;
  const canAccessQuiz = hasPractice ? isPracticeCompleted : isLearnCompleted;
  
  // Check if quiz retry is allowed (next submodule Learn + Practice completed)
  const nextSubmoduleId = getNextSubmoduleId(content.submodule);
  const nextSubmoduleContent = nextSubmoduleId ? getSubmoduleContent(nextSubmoduleId) : null;
  const isNextSubmoduleStarted = nextSubmoduleId ? progress.completedSubmodules.includes(nextSubmoduleId) : false;
  const canRetryQuiz = !quizSubmitted || isNextSubmoduleStarted;

  // Load saved quiz answers if already submitted
  useEffect(() => {
    if (quizScore !== undefined) {
      setQuizSubmitted(true);
    }
  }, [quizScore, content.submodule]);

  // Reset state when content changes
  useEffect(() => {
    setActiveTab("learn");
    setQuizAnswers({});
    setQuizSubmitted(quizScore !== undefined);
    setCompilerCode("");
    setCompilerOutput("");
    setCompilerHint("");
    setPracticeCompleted(isPracticeCompleted);
  }, [content.submodule]);

  const handleTabChange = (value: string) => {
    // Enforce gated flow
    if (value === "practice" && !canAccessPractice) {
      toast.error("Complete the Learn section first!");
      return;
    }
    if (value === "quiz" && !canAccessQuiz) {
      toast.error(hasPractice ? "Complete the Practice section first!" : "Complete the Learn section first!");
      return;
    }
    setActiveTab(value);
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleQuizSubmit = () => {
    const correctAnswers = content.quizQuestions.filter(
      (q) => quizAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / content.quizQuestions.length) * 100);
    
    completeQuiz(content.submodule, score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      toast.success(`Great job! You scored ${score}%`);
      if (!isSubmoduleCompleted) {
        completeSubmodule(content.submodule);
      }
      
      // Navigate to next submodule's Learn section after a delay
      if (nextSubmoduleId) {
        setTimeout(() => {
          navigate(`/curriculum/submodule/${nextSubmoduleId}`);
          toast.info(`Moving to next lesson: ${getNextSubmoduleTitle(content.submodule)}`);
        }, 2000);
      }
    } else {
      toast.error(`You scored ${score}%. You need 70% to pass.`);
    }
  };

  const resetQuiz = () => {
    if (!canRetryQuiz && quizScore !== undefined && quizScore < 70) {
      toast.error("Complete the next submodule's Learn and Practice sections to retry this quiz.");
      return;
    }
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Compiler auto-grading logic
  const handleRunCode = () => {
    // Simple validation - check if code contains expected patterns
    const exercise = content.practiceExercises[0] || "";
    const trimmedCode = compilerCode.trim().toLowerCase();
    
    // Basic validation based on exercise content
    if (trimmedCode.length < 10) {
      setCompilerOutput("Error: Please write more code to complete the exercise.");
      setCompilerHint("Tip: Read the exercise carefully and implement the required functionality.");
      return;
    }

    // Check for common patterns based on module
    let isCorrect = false;
    
    if (content.moduleNumber === 2) {
      // Python basics - check for print, variables
      isCorrect = trimmedCode.includes('print') || trimmedCode.includes('=');
    } else if (content.moduleNumber === 3) {
      // NumPy/Pandas - check for import and basic operations
      isCorrect = (trimmedCode.includes('import numpy') || trimmedCode.includes('import pandas') || 
                   trimmedCode.includes('np.') || trimmedCode.includes('pd.'));
    } else if (content.moduleNumber === 4) {
      // Visualization - check for matplotlib
      isCorrect = trimmedCode.includes('import matplotlib') || trimmedCode.includes('plt.');
    } else {
      // Default - check minimum effort
      isCorrect = trimmedCode.length >= 20;
    }

    if (isCorrect) {
      setCompilerOutput("✓ Success! Your code is correct.");
      setCompilerHint("");
      setPracticeCompleted(true);
      completeCodingChallenge(content.submodule);
      toast.success("Practice challenge completed! You can now access the Quiz.");
    } else {
      setCompilerOutput("✗ Incorrect. Please try again.");
      setCompilerHint(getHintForModule(content.moduleNumber));
    }
  };

  const getHintForModule = (moduleNumber: number): string => {
    switch (moduleNumber) {
      case 2:
        return "Hint: Try using print() to display output or create variables with the = operator.";
      case 3:
        return "Hint: Start with 'import numpy as np' or 'import pandas as pd' and use their functions.";
      case 4:
        return "Hint: Import matplotlib with 'import matplotlib.pyplot as plt' and create a plot.";
      default:
        return "Hint: Review the learning materials and try implementing the concepts discussed.";
    }
  };

  const handleCompleteLearn = () => {
    if (hasPractice) {
      setActiveTab("practice");
      toast.success("Learn section completed! Moving to Practice.");
    } else {
      setActiveTab("quiz");
      toast.success("Learn section completed! Moving to Quiz.");
    }
  };

  const handleCompletePractice = () => {
    setActiveTab("quiz");
    toast.success("Practice completed! Moving to Quiz.");
  };

  const nextSubmoduleTitle = nextSubmoduleId ? getNextSubmoduleTitle(content.submodule) : undefined;
  const courseBadge = getCourseBadge(module?.title || content.title);

  return (
    <div className="space-y-6">
      {/* Submodule Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={isSubmoduleCompleted ? "default" : "secondary"}>
              Module {module?.module}: {module?.title}
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {courseBadge}
            </Badge>
            {isSubmoduleCompleted && (
              <Badge variant="outline" className="gap-1 text-success border-success">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {content.submodule}: {content.title}
          </h1>
        </div>
        {nextSubmoduleId && isSubmoduleCompleted && (
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate(`/curriculum/submodule/${nextSubmoduleId}`)}
          >
            Next: {nextSubmoduleTitle}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="learn" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger 
            value="practice" 
            className="gap-2"
            disabled={!canAccessPractice}
          >
            {!canAccessPractice && <Lock className="w-3 h-3" />}
            <Code className="w-4 h-4" />
            Practice
            {isPracticeCompleted && (
              <CheckCircle2 className="w-3 h-3 text-success" />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className="gap-2"
            disabled={!canAccessQuiz}
          >
            {!canAccessQuiz && <Lock className="w-3 h-3" />}
            <Target className="w-4 h-4" />
            Quiz
            {quizScore !== undefined && (
              <Badge variant="secondary" className="ml-1">
                {quizScore}%
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          {isSubmoduleCompleted && (
            <Card className="bg-success/10 border-success/20">
              <CardContent className="py-4">
                <p className="flex items-center gap-2 text-success font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  You've completed this lesson!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Video Section */}
          {content.resources.filter(r => r.type === 'Video').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-destructive" />
                  Video Tutorial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.resources.filter(r => r.type === 'Video').map((resource, index) => {
                    const videoId = getYouTubeVideoId(resource.url);
                    
                    if (videoId && isEmbeddableVideo(resource.url)) {
                      return (
                        <div key={index} className="space-y-2">
                          <p className="font-medium text-foreground">{resource.title}</p>
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={resource.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-destructive/10 text-destructive">
                          <Play className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {resource.title}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Articles/Reading Resources */}
          {content.resources.filter(r => r.type === 'Article').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Reading Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.resources.filter(r => r.type === 'Article').map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {resource.title}
                        </p>
                        <p className="text-sm text-muted-foreground">Article</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button onClick={handleCompleteLearn} className="gap-2">
              Continue to {hasPractice ? "Practice" : "Quiz"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Practice Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasPractice ? (
                <div className="space-y-6">
                  {/* Exercise List */}
                  <div className="space-y-3">
                    {content.practiceExercises.map((exercise, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                          {index + 1}
                        </span>
                        <span>{exercise}</span>
                      </div>
                    ))}
                  </div>

                  {/* Code Compiler */}
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
                        <span className="text-sm font-medium">Code Editor</span>
                        {isPracticeCompleted && (
                          <Badge variant="outline" className="gap-1 text-success border-success">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <textarea
                        value={compilerCode}
                        onChange={(e) => setCompilerCode(e.target.value)}
                        placeholder="Write your code here..."
                        className="w-full h-48 p-4 font-mono text-sm bg-card resize-none focus:outline-none"
                        disabled={isPracticeCompleted}
                      />
                    </div>

                    {/* Output */}
                    {compilerOutput && (
                      <div className={`p-4 rounded-lg ${
                        compilerOutput.includes('Success') 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        <p className="font-medium">{compilerOutput}</p>
                      </div>
                    )}

                    {/* Hint */}
                    {compilerHint && (
                      <div className="p-4 rounded-lg bg-secondary/10 text-secondary-foreground">
                        <p className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                          {compilerHint}
                        </p>
                      </div>
                    )}

                    {/* Run Button */}
                    {!isPracticeCompleted && (
                      <Button onClick={handleRunCode} className="w-full gap-2">
                        <Play className="w-4 h-4" />
                        Run Code
                      </Button>
                    )}

                    {isPracticeCompleted && (
                      <Button onClick={handleCompletePractice} className="w-full gap-2">
                        Continue to Quiz
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No practice exercises for this submodule.</p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Proceed directly to the Quiz section.
                  </p>
                  <Button onClick={() => setActiveTab("quiz")} className="mt-4 gap-2">
                    Go to Quiz
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quiz</CardTitle>
                {quizSubmitted && quizScore !== undefined && quizScore < 70 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetQuiz} 
                    className="gap-2"
                    disabled={!canRetryQuiz}
                  >
                    <RefreshCcw className="w-4 h-4" />
                    {canRetryQuiz ? "Retry" : "Locked"}
                  </Button>
                )}
              </div>
              {!quizSubmitted && (
                <p className="text-sm text-muted-foreground">
                  Answer all questions to complete the quiz. You need 70% to pass.
                </p>
              )}
              {quizSubmitted && quizScore !== undefined && quizScore < 70 && !canRetryQuiz && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Complete the next submodule to unlock quiz retry.
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {content.quizQuestions.map((question, qIndex) => (
                <div key={question.id} className="space-y-3">
                  <h4 className="font-medium flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm shrink-0">
                      {qIndex + 1}
                    </span>
                    {question.question}
                  </h4>
                  <div className="grid gap-2 pl-8">
                    {question.options.map((option, oIndex) => {
                      const isSelected = quizAnswers[question.id] === oIndex;
                      const isCorrect = oIndex === question.correctAnswer;
                      const showResult = quizSubmitted;

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(question.id, oIndex)}
                          disabled={quizSubmitted}
                          className={`p-3 rounded-lg text-left transition-all border-2 ${
                            showResult
                              ? isCorrect
                                ? "border-success bg-success/10 text-success"
                                : isSelected
                                ? "border-destructive bg-destructive/10 text-destructive"
                                : "border-border bg-card"
                              : isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {showResult && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            )}
                            {showResult && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-destructive" />
                            )}
                            <span>{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="pl-8 p-3 rounded-lg bg-muted/50 text-sm">
                      <p className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        <span>{question.explanation}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {!quizSubmitted && (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length !== content.quizQuestions.length}
                  className="w-full"
                  size="lg"
                >
                  Submit Quiz
                </Button>
              )}

              {quizSubmitted && (
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-2xl font-display font-bold">
                    Your Score: {quizScore}%
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {quizScore! >= 70
                      ? "Great job! You passed!"
                      : "Keep practicing and try again!"}
                  </p>
                  {quizScore! >= 70 && nextSubmoduleId && (
                    <Button 
                      onClick={() => navigate(`/curriculum/submodule/${nextSubmoduleId}`)}
                      className="mt-4 gap-2"
                    >
                      Continue to Next Lesson
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
