import { useState } from "react";
import { SubmoduleContent, QuizQuestion, getNextSubmoduleTitle } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Code,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RefreshCcw,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface DayLessonProps {
  content: SubmoduleContent;
}

export const DayLesson = ({ content }: DayLessonProps) => {
  const { progress, completeDay, completeQuiz, completeCodingChallenge } = useProgress();
  const [activeTab, setActiveTab] = useState("learn");
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | null }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isSubmoduleCompleted = progress.completedDays.includes(content.submodule);
  const quizScore = progress.completedQuizzes[`day${content.submodule}`];

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleQuizSubmit = () => {
    const correctAnswers = content.quizQuestions.filter(
      (q) => quizAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / content.quizQuestions.length) * 100);
    
    completeQuiz(`day${content.submodule}`, score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      toast.success(`Great job! You scored ${score}%`);
      if (!isSubmoduleCompleted) {
        completeDay(content.submodule);
      }
    } else {
      toast.error(`You scored ${score}%. Try again to pass!`);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleCompleteChallenge = () => {
    completeCodingChallenge(content.submodule);
    toast.success("Practice challenge completed!");
  };

  const nextSubmoduleTitle = getNextSubmoduleTitle(content.submodule);

  return (
    <div className="space-y-6">
      {/* Submodule Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={isSubmoduleCompleted ? "default" : "secondary"}>
              Module {content.module}
            </Badge>
            {isSubmoduleCompleted && (
              <Badge variant="outline" className="gap-1 text-success border-success">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Submodule {content.submodule}: {content.title}
          </h1>
          <p className="text-muted-foreground mt-2">{content.description}</p>
        </div>
        {content.submodule < 60 && (
          <Link to={`/curriculum/day/${content.submodule + 1}`}>
            <Button variant="outline" className="gap-2">
              Next {nextSubmoduleTitle ? `(${nextSubmoduleTitle})` : ""}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="learn" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2">
            <Target className="w-4 h-4" />
            Quiz
            {quizScore !== undefined && (
              <Badge variant="secondary" className="ml-1">
                {quizScore}%
              </Badge>
            )}
          </TabsTrigger>
          {content.codingChallenge && (
            <TabsTrigger value="practice" className="gap-2">
              <Code className="w-4 h-4" />
              Practice
            </TabsTrigger>
          )}
        </TabsList>

        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          {/* Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Topics Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {content.topics.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Practice Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-accent-foreground" />
                Practice Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.practiceExercises.map((exercise, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span>{exercise}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quiz</CardTitle>
                {quizSubmitted && (
                  <Button variant="outline" size="sm" onClick={resetQuiz} className="gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Retry
                  </Button>
                )}
              </div>
              {!quizSubmitted && (
                <p className="text-sm text-muted-foreground">
                  Answer all questions to complete the quiz. You need 70% to pass.
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practice Tab (formerly Code) */}
        {content.codingChallenge && (
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  {content.codingChallenge.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {content.codingChallenge.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-foreground/5 p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{content.codingChallenge.starterCode}</code>
                  </pre>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(!showHint)}
                    className="gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "Hide Hints" : "Show Hints"}
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCompleteChallenge}
                    className="gap-2"
                    disabled={progress.codingChallengesCompleted.includes(content.submodule)}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {progress.codingChallengesCompleted.includes(content.submodule)
                      ? "Completed"
                      : "Mark as Complete"}
                  </Button>
                </div>

                {showHint && (
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent-foreground/20">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-accent-foreground" />
                      Hints
                    </h4>
                    <ul className="space-y-2">
                      {content.codingChallenge.hints.map((hint, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-medium mb-2">Expected Output</h4>
                  <pre className="text-sm font-mono text-muted-foreground">
                    {content.codingChallenge.expectedOutput}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
