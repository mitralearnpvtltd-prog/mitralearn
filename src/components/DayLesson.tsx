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
  Brain,
  Wrench,
  GitCompare,
  Globe,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { executeCode } from "@/lib/codeExecutor";

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


// Lessons that have compilers - ONLY these 4 lessons need a Practice section
const LESSONS_WITH_COMPILER = ["3.1", "4.2", "5.2", "7.2"];

// Check if a lesson has a compiler/practice section
const hasCompiler = (submoduleId: string): boolean => {
  return LESSONS_WITH_COMPILER.includes(submoduleId);
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
      question: "Write a SQL query to select all users from the 'users' table where their age is greater than 25.",
      language: "sql",
      expectedPatterns: ["SELECT", "FROM", "WHERE", "users", ">"],
      exampleInput: `-- Example: Select all columns from a table with a condition
SELECT * FROM employees WHERE salary > 50000;`,
      exampleOutput: `-- Output would show all employees with salary above 50000
id | name    | salary
1  | Alice   | 75000
3  | Charlie | 62000`,
      solution: `-- Select all users older than 25
SELECT * FROM users WHERE age > 25;

-- Or select specific columns
SELECT id, name, email, age 
FROM users 
WHERE age > 25
ORDER BY age ASC;`,
      hint: "Use SELECT to choose columns, FROM to specify the table, and WHERE with a comparison operator (>) to filter by age."
    },
    
    // 4.2 Apache Spark Basics - Python (Pyodide)
    "4.2": {
      question: "Write Python code that simulates counting records in a dataset. Create a list of sales records and print the total count.",
      language: "python",
      expectedPatterns: ["len(", "print", "=", "["],
      exampleInput: `# Example: Count items in a list
products = ["laptop", "phone", "tablet"]
count = len(products)
print(f"Total products: {count}")`,
      exampleOutput: `Total products: 3`,
      solution: `# Simulating Spark record counting
sales_records = [
    {"id": 1, "product": "Laptop", "amount": 999},
    {"id": 2, "product": "Mouse", "amount": 29},
    {"id": 3, "product": "Keyboard", "amount": 79},
    {"id": 4, "product": "Monitor", "amount": 299},
    {"id": 5, "product": "Headphones", "amount": 149}
]

# Count total records (like df.count() in Spark)
total_records = len(sales_records)
print(f"Total records: {total_records}")

# Filter and count (like df.filter().count())
high_value = [r for r in sales_records if r["amount"] > 100]
print(f"High value sales: {len(high_value)}")`,
      hint: "Create a list of dictionaries representing records, use len() to count them, and print the result."
    },
    
    // 5.2 Apache Airflow Basics - Python (Pyodide)
    "5.2": {
      question: "Write Python code that defines 3 task functions (extract, transform, load) and executes them in sequence, printing the task name when each runs.",
      language: "python",
      expectedPatterns: ["def", "print", "extract", "transform", "load"],
      exampleInput: `# Example: Define and run sequential tasks
def task_a():
    print("Running Task A")
    return "data_a"

def task_b(input_data):
    print(f"Running Task B with {input_data}")
    return "data_b"

result = task_a()
task_b(result)`,
      exampleOutput: `Running Task A
Running Task B with data_a`,
      solution: `# Airflow-style task execution simulation

def extract():
    print("Task 1: EXTRACT - Fetching data from source")
    data = [1, 2, 3, 4, 5]
    return data

def transform(data):
    print("Task 2: TRANSFORM - Processing data")
    transformed = [x * 2 for x in data]
    return transformed

def load(data):
    print("Task 3: LOAD - Saving to destination")
    print(f"Loaded {len(data)} records: {data}")
    return True

# Execute DAG (Directed Acyclic Graph)
print("=== Starting Airflow DAG ===")
raw_data = extract()
processed_data = transform(raw_data)
success = load(processed_data)
print(f"=== DAG Complete: {'Success' if success else 'Failed'} ===")`,
      hint: "Define three functions (extract, transform, load) that each print their task name, then call them in sequence."
    },
    
    // 7.2 Apache Kafka Basics - Python (Pyodide)
    "7.2": {
      question: "Write Python code that simulates a message producer and consumer. Create a list as a 'topic', add 3 messages to it (produce), then loop through and print each message (consume).",
      language: "python",
      expectedPatterns: ["append", "for", "print", "message", "="],
      exampleInput: `# Example: Simple queue simulation
queue = []
queue.append("msg1")
queue.append("msg2")

for msg in queue:
    print(f"Received: {msg}")`,
      exampleOutput: `Received: msg1
Received: msg2`,
      solution: `# Kafka Producer/Consumer Simulation

# Create topic (message queue)
orders_topic = []

# PRODUCER - Send messages to topic
def produce(topic, message):
    topic.append(message)
    print(f"[PRODUCER] Sent: {message}")

produce(orders_topic, {"order_id": 1, "item": "Laptop", "price": 999})
produce(orders_topic, {"order_id": 2, "item": "Mouse", "price": 29})
produce(orders_topic, {"order_id": 3, "item": "Keyboard", "price": 79})

print("\\n--- Consumer Processing ---\\n")

# CONSUMER - Read messages from topic
def consume(topic):
    for message in topic:
        print(f"[CONSUMER] Received: {message}")
        # Process the message
        print(f"  Processing order #{message['order_id']}: {message['item']}")

consume(orders_topic)
print("\\n[DONE] All messages consumed!")`,
      hint: "Create an empty list as a topic, use append() to add messages (produce), then use a for loop to read and print each message (consume)."
    }
  };

  return challenges[submoduleId] || null;
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
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [codePassedValidation, setCodePassedValidation] = useState(false);

  const isSubmoduleCompleted = progress.completedSubmodules.includes(content.submodule);
  const quizScore = progress.completedQuizzes[content.submodule];
  const isPracticeCompleted = progress.codingChallengesCompleted.includes(content.submodule);
  const module = getModuleForSubmodule(content.submodule);
  const practiceChallenge = getPracticeChallenge(content.submodule);
  const hasPractice = hasCompiler(content.submodule); // Only specific lessons have practice

  // Check if previous submodule is completed for gated flow
  const previousSubmoduleId = getPreviousSubmoduleId(content.submodule);
  const isPreviousCompleted = !previousSubmoduleId || progress.completedSubmodules.includes(previousSubmoduleId);

  // Determine section completion status
  const isLearnCompleted = true;
  const canAccessPractice = isLearnCompleted && hasPractice;
  const canAccessQuiz = hasPractice ? isPracticeCompleted : true; // Skip practice requirement if no practice

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
    setShowSolution(false);
    setCodePassedValidation(false);
  }, [content.submodule]);

  const handleTabChange = (value: string) => {
    if (value === "practice" && !canAccessPractice) {
      toast.error("Complete the Learn section first!");
      return;
    }
    if (value === "quiz" && !canAccessQuiz) {
      toast.error("Complete the Practice section first!");
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
    
    const nextSubmoduleId = getNextSubmoduleId(content.submodule);
    
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

  // Quiz retry is ALWAYS allowed
  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Compiler execution with real code runner
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
      // Execute the code using the real executor
      const result = await executeCode(trimmedCode, practiceChallenge.language);
      
      setCompilerOutput(result.output);
      
      if (result.success) {
        // Check if the code contains expected patterns to mark as completed
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

  const nextSubmoduleId = getNextSubmoduleId(content.submodule);
  const nextSubmoduleTitle = nextSubmoduleId ? getNextSubmoduleTitle(content.submodule) : undefined;

  return (
    <div className="space-y-6">
      {/* Submodule Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={isSubmoduleCompleted ? "default" : "secondary"}>
              Module {module?.module}: {module?.title}
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
        <TabsList className={`grid w-full ${hasPractice ? 'grid-cols-3' : 'grid-cols-2'} lg:w-auto lg:inline-flex`}>
          <TabsTrigger value="learn" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Learn
          </TabsTrigger>
          {hasPractice && (
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
          )}
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

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {content.content.introduction}
              </p>
            </CardContent>
          </Card>

          {/* Key Concepts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.content.keyConcepts.map((concept, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{concept}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Core Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Core Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {content.content.coreResponsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-1" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tools / Ecosystem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Tools / Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {content.content.toolsEcosystem.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Code className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{tool}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison (if applicable) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-primary" />
                Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              {content.content.comparison ? (
                <div className="space-y-3">
                  <p className="font-medium text-foreground">{content.content.comparison.title}</p>
                  <ul className="space-y-2">
                    {content.content.comparison.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No direct comparison applicable for this topic. The concepts covered are foundational and standalone.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Real-World Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Real-World Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {content.content.realWorldApplications.map((application, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-muted-foreground">{application}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips & Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Tips & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.content.tipsInsights.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Thinking Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Thinking Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.content.thinkingQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
                    <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      ?
                    </span>
                    <span className="text-muted-foreground italic">{question}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Further Reading */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" />
                Further Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {content.content.furtherReading.map((reading, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    <span className="text-muted-foreground">{reading}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Articles/Reading Resources */}
          {content.resources.filter(r => r.type === 'Article').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Additional Resources
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
              {hasPractice ? 'Continue to Practice' : 'Continue to Quiz'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Practice Tab - Only shown for lessons with compilers */}
        {hasPractice && practiceChallenge && (
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Coding Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Example Section - Input Code and Output */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-warning" />
                      Example
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Example Input */}
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
                      {/* Example Output */}
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
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium shrink-0">
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

                  {/* Code Editor and Output Side by Side */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Code Editor */}
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

                    {/* Output Panel */}
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
                        <Lightbulb className="w-4 h-4 mt-0.5 text-warning shrink-0" />
                        {compilerHint}
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button onClick={handleRunCode} disabled={isRunning} className="flex-1 gap-2">
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
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSolution(!showSolution)}
                      className="gap-2"
                    >
                      {showSolution ? "Hide" : "Show"} Solution
                    </Button>
                  </div>

                  {/* Solution (hidden by default) */}
                  {showSolution && (
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

                  {(isPracticeCompleted || codePassedValidation) && (
                    <Button onClick={handleCompletePractice} className="w-full gap-2">
                      Continue to Quiz
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quiz</CardTitle>
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
                        <Lightbulb className="w-4 h-4 text-warning mt-0.5 shrink-0" />
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
