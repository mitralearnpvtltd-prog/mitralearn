import { useState, useEffect } from "react";
import { SubmoduleContent, QuizQuestion, getNextSubmoduleTitle, getNextSubmoduleId, getModuleForSubmodule, getPreviousSubmoduleId, getSubmoduleContent, getSlugFromSubmoduleId, SUBMODULES_WITH_PRACTICE } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinimalYouTubePlayer } from "@/components/MinimalYouTubePlayer";
import { ProjectSubmission } from "@/components/ProjectSubmission";
import { NotionDocument } from "@/components/NotionDocument";
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
  Brain,
  Wrench,
  GitCompare,
  Globe,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Loader2,
  Rocket,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { executeCode } from "@/lib/codeExecutor";

// Check if this is the capstone project lesson
const isCapstoneProject = (submoduleId: string): boolean => {
  return submoduleId === "9.1";
};

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


// Check if a lesson has a compiler/practice section - use centralized constant

// Check if a lesson has a compiler/practice section
const hasCompiler = (submoduleId: string): boolean => {
  return SUBMODULES_WITH_PRACTICE.includes(submoduleId);
};

// Practice coding challenges for specific Data Engineering topics
const getPracticeChallenge = (submoduleId: string): { 
  question: string; 
  language: string; 
  expectedPatterns: string[]; 
  solution: string; 
  hint: string;
  exampleInput: string;
  exampleOutput: string;
} | null => {
  const challenges: Record<string, { 
    question: string; 
    language: string; 
    expectedPatterns: string[]; 
    solution: string; 
    hint: string;
    exampleInput: string;
    exampleOutput: string;
  }> = {
    // 3.1 Relational Databases Basics - SQL (SQL.js)
    "3.1": {
      question: "Write a SQL query to select all employees from the 'employees' table where their salary is greater than 50000.",
      language: "sql",
      expectedPatterns: ["SELECT", "FROM", "WHERE", "employees", ">"],
      exampleInput: `-- Example: Select all columns from a table with a condition
SELECT * FROM users WHERE age > 25;`,
      exampleOutput: `-- Output would show all users with age above 25
id | name    | age
2  | Bob     | 35
4  | David   | 45`,
      solution: `-- Select all employees with salary above 50000
SELECT * FROM employees WHERE salary > 50000;

-- Or select specific columns
SELECT id, name, department, salary 
FROM employees 
WHERE salary > 50000
ORDER BY salary DESC;`,
      hint: "Use SELECT to choose columns, FROM to specify the table, and WHERE with a comparison operator (>) to filter by salary."
    },
    
    // 4.2 Apache Spark Basics - Python (Pyodide)
    "4.2": {
      question: "Write Python code that simulates counting records in a dataset. Create a list of order records and print the total count.",
      language: "python",
      expectedPatterns: ["len(", "print", "=", "["],
      exampleInput: `# Example: Count items in a list
fruits = ["apple", "banana", "mango"]
count = len(fruits)
print(f"Total fruits: {count}")`,
      exampleOutput: `Total fruits: 3`,
      solution: `# Simulating Spark record counting
order_records = [
    {"id": 1, "customer": "Rahul", "amount": 1500},
    {"id": 2, "customer": "Priya", "amount": 2300},
    {"id": 3, "customer": "Amit", "amount": 890},
    {"id": 4, "customer": "Sneha", "amount": 4200},
    {"id": 5, "customer": "Vikram", "amount": 1750}
]

# Count total records (like df.count() in Spark)
total_records = len(order_records)
print(f"Total records: {total_records}")

# Filter and count (like df.filter().count())
high_value = [r for r in order_records if r["amount"] > 2000]
print(f"High value orders: {len(high_value)}")`,
      hint: "Create a list of dictionaries representing records, use len() to count them, and print the result."
    },
    
    // 5.2 Apache Airflow Basics - Python (Pyodide)
    "5.2": {
      question: "Write Python code that defines 3 task functions (fetch_data, process_data, save_data) and executes them in sequence, printing the task name when each runs.",
      language: "python",
      expectedPatterns: ["def", "print", "fetch", "process", "save"],
      exampleInput: `# Example: Define and run sequential tasks
def step_one():
    print("Running Step 1")
    return "output_1"

def step_two(input_data):
    print(f"Running Step 2 with {input_data}")
    return "output_2"

result = step_one()
step_two(result)`,
      exampleOutput: `Running Step 1
Running Step 2 with output_1`,
      solution: `# Airflow-style task execution simulation

def fetch_data():
    print("Task 1: FETCH_DATA - Retrieving data from API")
    data = [10, 20, 30, 40, 50]
    return data

def process_data(data):
    print("Task 2: PROCESS_DATA - Cleaning and transforming")
    processed = [x * 3 for x in data]
    return processed

def save_data(data):
    print("Task 3: SAVE_DATA - Writing to database")
    print(f"Saved {len(data)} records: {data}")
    return True

# Execute DAG (Directed Acyclic Graph)
print("=== Starting Airflow DAG ===")
raw_data = fetch_data()
clean_data = process_data(raw_data)
success = save_data(clean_data)
print(f"=== DAG Complete: {'Success' if success else 'Failed'} ===")`,
      hint: "Define three functions (fetch_data, process_data, save_data) that each print their task name, then call them in sequence."
    },
    
    // 7.2 Apache Kafka Basics - Python (Pyodide)
    "7.2": {
      question: "Write Python code that simulates a message producer and consumer. Create a list as a 'topic', add 3 messages to it (produce), then loop through and print each message (consume).",
      language: "python",
      expectedPatterns: ["append", "for", "print", "message", "="],
      exampleInput: `# Example: Simple queue simulation
notifications = []
notifications.append("alert1")
notifications.append("alert2")

for notif in notifications:
    print(f"Received: {notif}")`,
      exampleOutput: `Received: alert1
Received: alert2`,
      solution: `# Kafka Producer/Consumer Simulation

# Create topic (message queue)
payments_topic = []

# PRODUCER - Send messages to topic
def produce(topic, message):
    topic.append(message)
    print(f"[PRODUCER] Sent: {message}")

produce(payments_topic, {"txn_id": 101, "customer": "Ankit", "amount": 2500})
produce(payments_topic, {"txn_id": 102, "customer": "Divya", "amount": 1800})
produce(payments_topic, {"txn_id": 103, "customer": "Rohit", "amount": 3200})

print("\\n--- Consumer Processing ---\\n")

# CONSUMER - Read messages from topic
def consume(topic):
    for message in topic:
        print(f"[CONSUMER] Received: {message}")
        # Process the message
        print(f"  Processing transaction #{message['txn_id']}: {message['customer']}")

consume(payments_topic)
print("\\n[DONE] All messages consumed!")`,
      hint: "Create an empty list as a topic, use append() to add messages (produce), then use a for loop to read and print each message (consume)."
    }
  };

  return challenges[submoduleId] || null;
};

export const DayLesson = ({ content }: DayLessonProps) => {
  const { progress, completeSubmodule, completeQuiz, completeCodingChallenge } = useProgress();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | null }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Compiler state
  const [compilerCode, setCompilerCode] = useState("");
  const [compilerOutput, setCompilerOutput] = useState("");
  const [compilerHint, setCompilerHint] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [codePassedValidation, setCodePassedValidation] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [solutionUnlocked, setSolutionUnlocked] = useState(false);

  const isSubmoduleCompleted = progress.completedSubmodules.includes(content.submodule);
  const quizScore = progress.completedQuizzes[content.submodule];
  const isPracticeCompleted = progress.codingChallengesCompleted.includes(content.submodule);
  const module = getModuleForSubmodule(content.submodule);
  const practiceChallenge = getPracticeChallenge(content.submodule);
  const hasPractice = hasCompiler(content.submodule);
  const isCapstone = isCapstoneProject(content.submodule);

  // Check if previous submodule is completed for gated flow
  const previousSubmoduleId = getPreviousSubmoduleId(content.submodule);
  const isPreviousCompleted = !previousSubmoduleId || progress.completedSubmodules.includes(previousSubmoduleId);

  // Next lesson info
  const nextSubmoduleId = getNextSubmoduleId(content.submodule);
  const nextSubmoduleTitle = getNextSubmoduleTitle(content.submodule);

  // Count resources and questions
  const resourceCount = content.resources.length;
  const quizCount = content.quizQuestions.length;

  // Load saved quiz answers if already submitted
  useEffect(() => {
    if (quizScore !== undefined) {
      setQuizSubmitted(true);
    }
  }, [quizScore, content.submodule]);

  // Reset state when content changes
  useEffect(() => {
    setActiveTab("overview");
    setQuizAnswers({});
    setQuizSubmitted(quizScore !== undefined);
    setCompilerCode("");
    setCompilerOutput("");
    setCompilerHint("");
    setShowSolution(false);
    setCodePassedValidation(false);
    setAttemptCount(0);
    setSolutionUnlocked(false);
  }, [content.submodule]);

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
      
      if (nextSubmoduleId) {
        const nextSlug = getSlugFromSubmoduleId(nextSubmoduleId);
        setTimeout(() => {
          navigate(`/curriculum/lesson/${nextSlug}`);
          toast.info(`Moving to next lesson: ${nextSubmoduleTitle}`);
        }, 2000);
      }
    } else {
      toast.error(`You scored ${score}%. You need 70% to pass.`);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Compiler execution
  const handleRunCode = async () => {
    if (!practiceChallenge) return;
    
    const trimmedCode = compilerCode.trim();
    
    if (trimmedCode.length < 5) {
      setCompilerOutput("Error: Please write some code to execute.");
      setCompilerHint(practiceChallenge.hint);
      return;
    }

    setIsRunning(true);
    setCompilerOutput("Executing...");
    setCompilerHint("");

    try {
      const result = await executeCode(trimmedCode, practiceChallenge.language);
      
      setCompilerOutput(result.output);
      
      if (result.success) {
        const lowerCode = trimmedCode.toLowerCase();
        const matchedPatterns = practiceChallenge.expectedPatterns.filter(pattern => 
          lowerCode.includes(pattern.toLowerCase())
        );
        const hasRequiredPatterns = matchedPatterns.length >= Math.ceil(practiceChallenge.expectedPatterns.length / 2);
        
        if (hasRequiredPatterns) {
          setCodePassedValidation(true);
          if (!isPracticeCompleted) {
            completeCodingChallenge(content.submodule);
            toast.success("Practice challenge completed! You can now access the Quiz.");
          }
        } else {
          setCodePassedValidation(false);
          setCompilerHint(practiceChallenge.hint);
        }
      } else {
        setCodePassedValidation(false);
        setCompilerHint(practiceChallenge.hint);
      }
    } catch (error) {
      setCompilerOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      setCompilerHint(practiceChallenge.hint);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* Video Section - Reduced Size with Custom Player */}
      <div className="bg-[#1a1a2e] w-full py-3 sm:py-4">
        <div className="max-w-2xl mx-auto px-2 sm:px-4">
          {content.resources.filter(r => r.type === 'Video').length > 0 ? (
            content.resources.filter(r => r.type === 'Video').map((resource, index) => {
              const videoId = getYouTubeVideoId(resource.url);
              
              if (videoId && isEmbeddableVideo(resource.url)) {
                return (
                  <MinimalYouTubePlayer 
                    key={index} 
                    videoId={videoId} 
                    title={resource.title}
                  />
                );
              }
              
              return (
                <a
                  key={index}
                  href={resource.url}
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
              <span className="text-sm">Video Player</span>
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
              {hasPractice && (
                <TabsTrigger 
                  value="practice" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-2 sm:px-0 gap-1 sm:gap-2 text-sm sm:text-base min-h-[48px]"
                >
                  Practice
                  <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="quiz" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-2 sm:px-0 gap-1 sm:gap-2 text-sm sm:text-base min-h-[48px]"
              >
                {isCapstone ? "Project" : "Q&A"}
                <Badge variant="secondary" className="rounded-full text-xs px-1.5 sm:px-2 py-0.5">
                  {isCapstone ? "1" : quizCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-2 sm:px-0 gap-1 sm:gap-2 text-sm sm:text-base min-h-[48px]"
              >
                <span className="hidden sm:inline">Resources</span>
                <span className="sm:hidden">Files</span>
                <Badge variant="secondary" className="rounded-full text-xs px-1.5 sm:px-2 py-0.5">
                  {resourceCount}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            {/* Use NotionDocument for lessons with custom content */}
            {(content.submodule === "1.1" || content.submodule === "1.2" || content.submodule === "2.1" || content.submodule === "2.2" || content.submodule === "3.1" || content.submodule === "3.2" || content.submodule === "4.1" || content.submodule === "4.2" || content.submodule === "5.1" || content.submodule === "5.2" || content.submodule === "6.1" || content.submodule === "6.2" || content.submodule === "7.1" || content.submodule === "7.2" || content.submodule === "8.1" || content.submodule === "8.2") ? (
              <NotionDocument content={content} />
            ) : (
              <div className="space-y-8">
                {/* Module Badge and Title */}
                <div className="space-y-4">
                  <Badge variant="default" className="bg-primary/10 text-primary border-0 font-medium">
                    Module {module?.module}: {module?.title}
                  </Badge>
                  
                  <h1 className="text-3xl font-display font-bold text-foreground">
                    {content.title}
                  </h1>
                  
                  {isSubmoduleCompleted && (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}
                </div>

                {/* Introduction */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {content.content.introduction}
                  </p>
                </div>

                {/* Key Concepts */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Key Concepts
                  </h2>
                  <div className="grid gap-3">
                    {content.content.keyConcepts.map((concept, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-muted-foreground">{concept}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Responsibilities */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Core Responsibilities
                  </h2>
                  <div className="grid gap-2">
                    {content.content.coreResponsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-start gap-3 py-2">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{responsibility}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Ecosystem */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    Tools & Ecosystem
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {content.content.toolsEcosystem.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm font-normal">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Comparison */}
                {content.content.comparison && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-primary" />
                      {content.content.comparison.title}
                    </h2>
                    <ul className="space-y-2">
                      {content.content.comparison.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Real-World Applications */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Real-World Applications
                  </h2>
                  <div className="grid gap-3">
                    {content.content.realWorldApplications.map((application, index) => (
                      <div key={index} className="pl-4 border-l-2 border-primary/30 py-1">
                        <p className="text-muted-foreground">{application}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips & Insights */}
                <div className="p-6 rounded-xl bg-warning/5 border border-warning/20 space-y-3">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    Tips & Insights
                  </h2>
                  <ul className="space-y-2">
                    {content.content.tipsInsights.map((tip, index) => (
                      <li key={index} className="text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-warning">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Thinking Questions */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Thinking Questions
                  </h2>
                  <div className="space-y-3">
                    {content.content.thinkingQuestions.map((question, index) => (
                      <div key={index} className="pl-4 border-l-2 border-secondary py-1">
                        <p className="text-muted-foreground italic">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Further Reading */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-primary" />
                    Further Reading
                  </h2>
                  <ul className="space-y-2">
                    {content.content.furtherReading.map((reading, index) => (
                      <li key={index} className="text-muted-foreground flex items-start gap-2">
                        <FileText className="w-4 h-4 mt-1 text-muted-foreground/60 flex-shrink-0" />
                        {reading}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Lesson Button */}
                {nextSubmoduleId && (
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button 
                      onClick={() => navigate(`/curriculum/lesson/${getSlugFromSubmoduleId(nextSubmoduleId)}`)}
                      className="gap-2"
                      size="lg"
                    >
                      Next: {nextSubmoduleTitle}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-0 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Resources</h2>
            
            <div className="grid gap-4">
              {content.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    resource.type === 'Video' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                  }`}>
                    {resource.type === 'Video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {resource.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{resource.type}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </TabsContent>

          {/* Quiz/Q&A Tab */}
          <TabsContent value="quiz" className="mt-0 space-y-6">
            {isCapstone ? (
              <ProjectSubmission 
                submoduleId={content.submodule} 
                onComplete={() => {
                  toast.success("Congratulations on completing the course! 🎉");
                }}
              />
            ) : (
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="px-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Quiz</CardTitle>
                    {quizSubmitted && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetQuiz} 
                        className="gap-2"
                      >
                        <RefreshCcw className="w-4 h-4" />
                        Retry
                      </Button>
                    )}
                  </div>
                  {!quizSubmitted && (
                    <p className="text-muted-foreground">
                      Answer all questions to complete the quiz. You need 70% to pass.
                    </p>
                  )}
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  {content.quizQuestions.map((question, qIndex) => (
                    <div key={question.id} className="space-y-3 p-4 rounded-lg bg-card border border-border">
                      <h4 className="font-medium flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                          {qIndex + 1}
                        </span>
                        <span className="pt-0.5">{question.question}</span>
                      </h4>
                      <div className="grid gap-2 pl-10">
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
                                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                                )}
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <div className="ml-10 p-3 rounded-lg bg-muted/50 text-sm">
                          <p className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
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
                    <div className="p-6 rounded-xl bg-muted text-center">
                      <p className="text-3xl font-display font-bold">
                        Your Score: {quizScore}%
                      </p>
                      <p className="text-muted-foreground mt-2">
                        {quizScore! >= 70
                          ? "Great job! You passed!"
                          : "Keep practicing and try again!"}
                      </p>
                      {quizScore! >= 70 && nextSubmoduleId && (
                        <Button 
                          onClick={() => navigate(`/curriculum/lesson/${getSlugFromSubmoduleId(nextSubmoduleId)}`)}
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
            )}
          </TabsContent>

          {/* Practice Tab */}
          {hasPractice && practiceChallenge && (
            <TabsContent value="practice" className="mt-0 space-y-6">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                Coding Practice
              </h2>

              {/* Example Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Example
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 border-b">
                      <span className="text-sm font-medium">Example Input</span>
                    </div>
                    <pre className="p-4 bg-card overflow-x-auto">
                      <code className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                        {practiceChallenge.exampleInput}
                      </code>
                    </pre>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-success/10 px-4 py-2 border-b">
                      <span className="text-sm font-medium text-success">Expected Output</span>
                    </div>
                    <pre className="p-4 bg-card overflow-x-auto">
                      <code className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                        {practiceChallenge.exampleOutput}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Challenge Question */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium flex-shrink-0">
                    Q
                  </span>
                  <div>
                    <p className="font-medium text-foreground mb-1">Your Challenge</p>
                    <p className="text-muted-foreground">{practiceChallenge.question}</p>
                    <Badge variant="outline" className="mt-2">
                      Language: {practiceChallenge.language.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Code Editor ({practiceChallenge.language.toUpperCase()})</span>
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
                    placeholder={`Write your ${practiceChallenge.language.toUpperCase()} code here...`}
                    className="w-full h-72 p-4 font-mono text-sm bg-card resize-none focus:outline-none"
                    spellCheck={false}
                  />
                </div>

                <div className="border rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Output</span>
                    {isRunning && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  </div>
                  <div className="flex-1 bg-card min-h-[288px] overflow-auto">
                    {compilerOutput ? (
                      <pre className={`p-4 h-full text-sm font-mono whitespace-pre-wrap ${
                        compilerOutput.includes('Error') || compilerOutput.includes('error')
                          ? 'text-destructive' 
                          : 'text-foreground'
                      }`}>
                        {compilerOutput}
                      </pre>
                    ) : (
                      <div className="text-muted-foreground text-sm font-mono h-full flex items-center justify-center p-4">
                        <p className="text-center">Click "Run Code" to see output here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hint */}
              {compilerHint && (
                <div className="p-4 rounded-lg bg-secondary/10 text-secondary-foreground">
                  <p className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 mt-0.5 text-warning flex-shrink-0" />
                    {compilerHint}
                  </p>
                </div>
              )}

              {/* Attempt Counter */}
              {!codePassedValidation && attemptCount > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="text-sm">
                      Attempts: <span className="font-semibold">{attemptCount}/3</span>
                    </span>
                  </div>
                  {attemptCount >= 3 && !solutionUnlocked && (
                    <span className="text-xs text-muted-foreground">Solution unlocked!</span>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setAttemptCount(prev => prev + 1);
                    if (attemptCount + 1 >= 3) {
                      setSolutionUnlocked(true);
                    }
                    handleRunCode();
                  }} 
                  disabled={isRunning} 
                  className="flex-1 gap-2"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Code
                    </>
                  )}
                </Button>
                {solutionUnlocked || codePassedValidation ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSolution(!showSolution)}
                    className="gap-2"
                  >
                    {showSolution ? "Hide" : "Show"} Solution
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    disabled
                    className="gap-2 opacity-60"
                  >
                    🔒 Solution Locked
                  </Button>
                )}
              </div>

              {/* Hint after attempts */}
              {attemptCount >= 1 && !codePassedValidation && !solutionUnlocked && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">
                        Hint {attemptCount}/3
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {practiceChallenge.hint}
                      </p>
                      {attemptCount >= 2 && (
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          💡 Try {3 - attemptCount} more time{3 - attemptCount !== 1 ? 's' : ''} to unlock the solution
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Solution */}
              {showSolution && (solutionUnlocked || codePassedValidation) && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-success/10 px-4 py-2 border-b flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">Example Solution</span>
                  </div>
                  <pre className="p-4 bg-muted/50 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                      {practiceChallenge.solution}
                    </code>
                  </pre>
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>

      </div>

      {/* Sticky Next Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:left-80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Current tab indicator */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{activeTab}</span>
            <span>•</span>
            <span>{content.title}</span>
          </div>
          
          <Button 
            onClick={() => {
              const tabOrder = hasPractice 
                ? ["overview", "practice", "quiz", "resources"] 
                : ["overview", "quiz", "resources"];
              
              const currentIndex = tabOrder.indexOf(activeTab);
              
              if (currentIndex < tabOrder.length - 1) {
                setActiveTab(tabOrder[currentIndex + 1]);
              } else if (nextSubmoduleId) {
                navigate(`/curriculum/lesson/${getSlugFromSubmoduleId(nextSubmoduleId)}`);
              }
            }}
            className="gap-2 min-w-[140px]"
            size="default"
          >
            {(() => {
              const tabOrder = hasPractice 
                ? ["overview", "practice", "quiz", "resources"] 
                : ["overview", "quiz", "resources"];
              const currentIndex = tabOrder.indexOf(activeTab);
              
              if (currentIndex < tabOrder.length - 1) {
                const nextTab = tabOrder[currentIndex + 1];
                const tabLabels: Record<string, string> = {
                  "practice": "Practice",
                  "quiz": "Q&A",
                  "resources": "Resources"
                };
                return (
                  <>
                    Next: {tabLabels[nextTab]}
                    <ArrowRight className="w-4 h-4" />
                  </>
                );
              } else if (nextSubmoduleId) {
                return (
                  <>
                    Next Lesson
                    <ArrowRight className="w-4 h-4" />
                  </>
                );
              }
              return (
                <>
                  Complete
                  <CheckCircle2 className="w-4 h-4" />
                </>
              );
            })()}
          </Button>
        </div>
      </div>

      {/* Spacer for fixed bottom bar */}
      <div className="h-16" />
    </div>
  );
};
