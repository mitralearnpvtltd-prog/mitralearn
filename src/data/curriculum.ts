export interface DayContent {
  day: number;
  week: number;
  title: string;
  description: string;
  topics: string[];
  objectives: string[];
  practiceExercises: string[];
  quizQuestions: QuizQuestion[];
  codingChallenge?: CodingChallenge;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodingChallenge {
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
}

export interface WeekContent {
  week: number;
  title: string;
  theme: string;
  description: string;
  days: number[];
  project: WeeklyProject;
  assessment: WeeklyAssessment;
}

export interface WeeklyProject {
  title: string;
  description: string;
  requirements: string[];
  deliverables: string[];
}

export interface WeeklyAssessment {
  title: string;
  type: 'quiz' | 'project' | 'mixed';
  passingScore: number;
}

export const weeks: WeekContent[] = [
  {
    week: 1,
    title: "Python Foundations",
    theme: "Building Your Programming Base",
    description: "Master Python fundamentals including data types, control structures, functions, and OOP concepts essential for data science.",
    days: [1, 2, 3, 4, 5, 6, 7],
    project: {
      title: "Personal Expense Tracker",
      description: "Build a console-based expense tracker using Python OOP",
      requirements: ["Use classes for expenses and categories", "Implement file I/O for data persistence", "Add basic statistics functionality"],
      deliverables: ["Python source code", "README documentation", "Sample data file"]
    },
    assessment: {
      title: "Python Fundamentals Assessment",
      type: "mixed",
      passingScore: 70
    }
  },
  {
    week: 2,
    title: "Data Manipulation with NumPy & Pandas",
    theme: "Mastering Data Structures",
    description: "Learn to efficiently manipulate and analyze data using NumPy arrays and Pandas DataFrames.",
    days: [8, 9, 10, 11, 12, 13, 14],
    project: {
      title: "Sales Data Analyzer",
      description: "Analyze a real-world sales dataset using Pandas",
      requirements: ["Load and clean CSV data", "Perform aggregations and groupby operations", "Generate summary statistics"],
      deliverables: ["Jupyter notebook", "Cleaned dataset", "Analysis report"]
    },
    assessment: {
      title: "Data Manipulation Assessment",
      type: "mixed",
      passingScore: 70
    }
  },
  {
    week: 3,
    title: "Data Visualization",
    theme: "Telling Stories with Data",
    description: "Create compelling visualizations using Matplotlib, Seaborn, and Plotly to communicate insights effectively.",
    days: [15, 16, 17, 18, 19, 20, 21],
    project: {
      title: "COVID-19 Dashboard",
      description: "Build an interactive visualization dashboard",
      requirements: ["Multiple chart types", "Interactive elements with Plotly", "Color schemes and styling"],
      deliverables: ["Interactive HTML dashboard", "Static report with insights"]
    },
    assessment: {
      title: "Visualization Skills Assessment",
      type: "project",
      passingScore: 70
    }
  },
  {
    week: 4,
    title: "Statistics & Probability",
    theme: "The Mathematical Foundation",
    description: "Build strong statistical foundations including descriptive statistics, probability, distributions, and hypothesis testing.",
    days: [22, 23, 24, 25, 26, 27, 28],
    project: {
      title: "A/B Test Analysis",
      description: "Conduct a complete A/B test analysis on conversion data",
      requirements: ["Hypothesis formulation", "Statistical testing", "Effect size calculation", "Results interpretation"],
      deliverables: ["Analysis notebook", "Presentation slides", "Recommendations document"]
    },
    assessment: {
      title: "Statistics Assessment",
      type: "quiz",
      passingScore: 75
    }
  },
  {
    week: 5,
    title: "Machine Learning Fundamentals",
    theme: "Introduction to ML",
    description: "Understand core ML concepts including supervised vs unsupervised learning, model evaluation, and common algorithms.",
    days: [29, 30, 31, 32, 33, 34, 35],
    project: {
      title: "House Price Predictor",
      description: "Build a regression model to predict house prices",
      requirements: ["Feature engineering", "Model comparison", "Cross-validation", "Model interpretation"],
      deliverables: ["Trained model", "Jupyter notebook", "Model performance report"]
    },
    assessment: {
      title: "ML Fundamentals Assessment",
      type: "mixed",
      passingScore: 70
    }
  },
  {
    week: 6,
    title: "Advanced Machine Learning",
    theme: "Deep Dive into Algorithms",
    description: "Explore ensemble methods, tree-based models, SVMs, and clustering algorithms for complex problems.",
    days: [36, 37, 38, 39, 40, 41, 42],
    project: {
      title: "Customer Segmentation Engine",
      description: "Segment customers using clustering techniques",
      requirements: ["K-means and hierarchical clustering", "Dimensionality reduction", "Cluster profiling", "Business recommendations"],
      deliverables: ["Segmentation model", "Customer profiles", "Marketing recommendations"]
    },
    assessment: {
      title: "Advanced ML Assessment",
      type: "mixed",
      passingScore: 70
    }
  },
  {
    week: 7,
    title: "Deep Learning & NLP",
    theme: "Neural Networks and Text",
    description: "Introduction to neural networks, TensorFlow/Keras basics, and natural language processing fundamentals.",
    days: [43, 44, 45, 46, 47, 48, 49],
    project: {
      title: "Sentiment Analysis API",
      description: "Build a sentiment classifier for product reviews",
      requirements: ["Text preprocessing pipeline", "LSTM or Transformer model", "API deployment", "Performance evaluation"],
      deliverables: ["Trained model", "API code", "Demo notebook"]
    },
    assessment: {
      title: "Deep Learning Assessment",
      type: "mixed",
      passingScore: 70
    }
  },
  {
    week: 8,
    title: "Capstone & Career Prep",
    theme: "Putting It All Together",
    description: "Complete your capstone project, prepare your portfolio, and get ready for data science interviews.",
    days: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    project: {
      title: "End-to-End ML Capstone",
      description: "Complete data science project from problem definition to deployment",
      requirements: ["Problem scoping", "EDA and feature engineering", "Model development", "Deployment", "Documentation"],
      deliverables: ["Complete project repository", "Deployed model/app", "Project presentation", "Technical documentation"]
    },
    assessment: {
      title: "Final Capstone Evaluation",
      type: "project",
      passingScore: 75
    }
  }
];

export const days: DayContent[] = [
  {
    day: 1,
    week: 1,
    title: "Python Basics & Environment Setup",
    description: "Set up your data science environment and learn Python basics including variables, data types, and basic operations.",
    topics: ["Installing Python & Anaconda", "Jupyter Notebooks", "Variables & Data Types", "Basic Operators", "String Operations"],
    objectives: ["Set up a complete data science environment", "Understand Python syntax and conventions", "Work with basic data types"],
    practiceExercises: ["Install Anaconda and create your first notebook", "Write a program that converts temperature between Celsius and Fahrenheit", "Create a simple calculator using variables"],
    quizQuestions: [
      {
        id: "d1q1",
        question: "What is the output of: print(type(3.14))?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"],
        correctAnswer: 1,
        explanation: "3.14 is a decimal number, which in Python is represented as a float data type."
      },
      {
        id: "d1q2",
        question: "Which of these is NOT a valid variable name in Python?",
        options: ["my_variable", "_hidden", "2fast", "dataScience"],
        correctAnswer: 2,
        explanation: "Variable names in Python cannot start with a number."
      },
      {
        id: "d1q3",
        question: "What operator is used for exponentiation in Python?",
        options: ["^", "**", "exp()", "pow"],
        correctAnswer: 1,
        explanation: "In Python, ** is the exponentiation operator. For example, 2**3 equals 8."
      }
    ],
    codingChallenge: {
      title: "Temperature Converter",
      description: "Write a function that converts Celsius to Fahrenheit and vice versa.",
      starterCode: `def celsius_to_fahrenheit(celsius):
    # Your code here
    pass

def fahrenheit_to_celsius(fahrenheit):
    # Your code here
    pass

# Test your functions
print(celsius_to_fahrenheit(0))  # Should print 32.0
print(fahrenheit_to_celsius(98.6))  # Should print 37.0`,
      expectedOutput: "32.0\n37.0",
      hints: ["F = C × 9/5 + 32", "C = (F - 32) × 5/9"]
    }
  },
  {
    day: 2,
    week: 1,
    title: "Control Flow & Conditionals",
    description: "Master conditional statements and control flow to make your programs respond to different situations.",
    topics: ["If/Elif/Else Statements", "Comparison Operators", "Logical Operators", "Nested Conditions", "Ternary Operator"],
    objectives: ["Write conditional statements effectively", "Use comparison and logical operators", "Handle multiple conditions"],
    practiceExercises: ["Build a grade calculator", "Create a simple login validator", "Design a number guessing game"],
    quizQuestions: [
      {
        id: "d2q1",
        question: "What is the result of: True and False or True?",
        options: ["True", "False", "Error", "None"],
        correctAnswer: 0,
        explanation: "'and' has higher precedence than 'or'. So (True and False) = False, then False or True = True."
      },
      {
        id: "d2q2",
        question: "Which statement correctly checks if x is between 5 and 10 (inclusive)?",
        options: ["5 < x < 10", "x >= 5 and x <= 10", "5 <= x <= 10", "Both B and C"],
        correctAnswer: 3,
        explanation: "Python supports chained comparisons (5 <= x <= 10) and explicit AND conditions work too."
      }
    ]
  },
  {
    day: 3,
    week: 1,
    title: "Loops & Iterations",
    description: "Learn to automate repetitive tasks using for loops, while loops, and iteration techniques.",
    topics: ["For Loops", "While Loops", "Range Function", "Break & Continue", "List Comprehensions"],
    objectives: ["Iterate over sequences effectively", "Choose between for and while loops", "Write efficient list comprehensions"],
    practiceExercises: ["Print multiplication tables", "Find all prime numbers up to N", "Reverse a string using loops"],
    quizQuestions: [
      {
        id: "d3q1",
        question: "What does range(2, 10, 2) generate?",
        options: ["2, 4, 6, 8", "2, 4, 6, 8, 10", "0, 2, 4, 6, 8", "2, 3, 4, 5, 6, 7, 8, 9"],
        correctAnswer: 0,
        explanation: "range(start, stop, step) generates numbers from 2 to 9 (exclusive) with step 2: 2, 4, 6, 8."
      }
    ],
    codingChallenge: {
      title: "FizzBuzz Classic",
      description: "Print numbers 1-100, but for multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', and multiples of both print 'FizzBuzz'.",
      starterCode: `def fizzbuzz():
    # Your code here
    pass

fizzbuzz()`,
      expectedOutput: "1\n2\nFizz\n4\nBuzz\n...",
      hints: ["Use modulo operator %", "Check for multiples of 15 first"]
    }
  },
  {
    day: 4,
    week: 1,
    title: "Functions & Modules",
    description: "Create reusable code with functions, understand scope, and work with Python modules.",
    topics: ["Defining Functions", "Parameters & Arguments", "Return Values", "Scope & Namespace", "Importing Modules"],
    objectives: ["Write clean, reusable functions", "Understand variable scope", "Work with built-in and external modules"],
    practiceExercises: ["Create a calculator with functions", "Build a password strength checker", "Write a module with utility functions"],
    quizQuestions: [
      {
        id: "d4q1",
        question: "What is the difference between *args and **kwargs?",
        options: ["*args for lists, **kwargs for tuples", "*args for positional args, **kwargs for keyword args", "They are the same", "*args is faster"],
        correctAnswer: 1,
        explanation: "*args collects extra positional arguments as a tuple, **kwargs collects keyword arguments as a dictionary."
      }
    ]
  },
  {
    day: 5,
    week: 1,
    title: "Data Structures: Lists & Tuples",
    description: "Master Python's sequence types for organizing and manipulating collections of data.",
    topics: ["List Operations", "Slicing", "List Methods", "Tuples", "Unpacking"],
    objectives: ["Manipulate lists efficiently", "Choose between lists and tuples", "Use slicing and unpacking"],
    practiceExercises: ["Implement a stack using lists", "Sort a list of tuples", "Matrix operations with nested lists"],
    quizQuestions: [
      {
        id: "d5q1",
        question: "What is the output of [1, 2, 3][::-1]?",
        options: ["[1, 2, 3]", "[3, 2, 1]", "[1, 3]", "Error"],
        correctAnswer: 1,
        explanation: "[::-1] reverses a sequence by using a step of -1."
      }
    ]
  },
  {
    day: 6,
    week: 1,
    title: "Data Structures: Dictionaries & Sets",
    description: "Learn to work with key-value pairs and unique collections for efficient data organization.",
    topics: ["Dictionary Basics", "Dictionary Methods", "Sets", "Set Operations", "When to Use Each"],
    objectives: ["Use dictionaries for structured data", "Perform set operations", "Choose the right data structure"],
    practiceExercises: ["Build a contact book", "Count word frequencies", "Find common elements between lists"],
    quizQuestions: [
      {
        id: "d6q1",
        question: "How do you safely get a value from a dictionary that might not have the key?",
        options: ["dict[key]", "dict.get(key)", "dict.fetch(key)", "dict.find(key)"],
        correctAnswer: 1,
        explanation: ".get() returns None (or a default value) if the key doesn't exist, avoiding KeyError."
      }
    ]
  },
  {
    day: 7,
    week: 1,
    title: "Object-Oriented Programming",
    description: "Understand OOP concepts to write organized, maintainable code for complex applications.",
    topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation", "Magic Methods"],
    objectives: ["Design classes and create objects", "Implement inheritance", "Use encapsulation effectively"],
    practiceExercises: ["Create a BankAccount class", "Build a shape hierarchy", "Implement a simple game with OOP"],
    quizQuestions: [
      {
        id: "d7q1",
        question: "What does the __init__ method do?",
        options: ["Destroys the object", "Initializes object attributes", "Creates a new class", "Inherits from parent"],
        correctAnswer: 1,
        explanation: "__init__ is the constructor that runs when you create a new object, initializing its attributes."
      }
    ]
  }
];

// Generate remaining days with simplified content
for (let i = 8; i <= 60; i++) {
  const weekNum = Math.ceil(i / 7);
  const week = weeks.find(w => w.days.includes(i));
  
  if (!days.find(d => d.day === i)) {
    days.push({
      day: i,
      week: weekNum,
      title: `Day ${i}: ${week?.title || 'Advanced Topics'}`,
      description: `Continue building skills in ${week?.theme || 'data science'}. Deep practice and hands-on exercises.`,
      topics: ["Topic 1", "Topic 2", "Topic 3"],
      objectives: ["Master key concepts", "Apply in practice", "Build projects"],
      practiceExercises: ["Exercise 1", "Exercise 2", "Exercise 3"],
      quizQuestions: [
        {
          id: `d${i}q1`,
          question: `Sample question for Day ${i}`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation: "This is a sample explanation."
        }
      ]
    });
  }
}

export const getDayContent = (dayNumber: number): DayContent | undefined => {
  return days.find(d => d.day === dayNumber);
};

export const getWeekContent = (weekNumber: number): WeekContent | undefined => {
  return weeks.find(w => w.week === weekNumber);
};

export const getWeekForDay = (dayNumber: number): WeekContent | undefined => {
  return weeks.find(w => w.days.includes(dayNumber));
};
