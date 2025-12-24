export interface Resource {
  type: 'Video' | 'Article';
  title: string;
  url: string;
}

export interface SubmoduleContent {
  submodule: string; // e.g., "1.1", "1.2", "2.1"
  moduleNumber: number;
  title: string;
  resources: Resource[];
  quizQuestions: QuizQuestion[];
  practiceExercises: string[];
}

// Legacy alias for backward compatibility
export type DayContent = SubmoduleContent;

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

export interface ModuleContent {
  module: number;
  title: string;
  submodules: string[]; // e.g., ["1.1", "1.2"]
  assessment?: ModuleAssessment;
}

// Legacy alias for backward compatibility
export type WeekContent = ModuleContent;

export interface ModuleAssessment {
  title: string;
  type: 'quiz' | 'project' | 'mixed';
  passingScore: number;
}

// Legacy alias
export type WeeklyAssessment = ModuleAssessment;

// Data from Google Sheet: Curriculum_Data_Engineer
export const modules: ModuleContent[] = [
  {
    module: 1,
    title: "What is Data Science",
    submodules: ["1.1", "1.2"],
    assessment: {
      title: "Module 1 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 2,
    title: "Python Basics",
    submodules: ["2.1", "2.2"],
    assessment: {
      title: "Module 2 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 3,
    title: "NumPy & Pandas",
    submodules: ["3.1", "3.2"],
    assessment: {
      title: "Module 3 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 4,
    title: "Data Visualization",
    submodules: ["4.1"],
    assessment: {
      title: "Module 4 Assessment",
      type: "quiz",
      passingScore: 70
    }
  }
];

// Legacy export for backward compatibility
export const weeks = modules;

export const submodules: SubmoduleContent[] = [
  {
    submodule: "1.1",
    moduleNumber: 1,
    title: "Introduction to Data Science",
    resources: [
      {
        type: "Video",
        title: "What is Data Science?",
        url: "https://www.youtube.com/watch?v=X3paOmcrTjQ"
      },
      {
        type: "Article",
        title: "IBM: What is Data Science",
        url: "https://www.ibm.com/topics/data-science"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "1.1q1",
        question: "What is Data Science primarily concerned with?",
        options: ["Building websites", "Extracting insights from data", "Hardware design", "Network security"],
        correctAnswer: 1,
        explanation: "Data Science is the field of extracting meaningful insights and knowledge from structured and unstructured data."
      }
    ]
  },
  {
    submodule: "1.2",
    moduleNumber: 1,
    title: "Data Science Workflow",
    resources: [
      {
        type: "Video",
        title: "Data Science Lifecycle",
        url: "https://www.youtube.com/watch?v=x4YHIUzwRWw"
      },
      {
        type: "Article",
        title: "Analytics Vidhya Workflow",
        url: "https://www.analyticsvidhya.com/blog/2021/03/data-science-life-cycle/"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "1.2q1",
        question: "What is the first step in the data science workflow?",
        options: ["Model deployment", "Data collection", "Visualization", "Model training"],
        correctAnswer: 1,
        explanation: "Data collection is typically the first step in any data science project."
      }
    ]
  },
  {
    submodule: "2.1",
    moduleNumber: 2,
    title: "Python Overview",
    resources: [
      {
        type: "Video",
        title: "Python Full Course Intro",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw"
      },
      {
        type: "Article",
        title: "Python Official Intro",
        url: "https://www.python.org/doc/essays/blurb/"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "2.1q1",
        question: "Python is known for being:",
        options: ["Compiled-only language", "Easy to read and write", "Only for web development", "A hardware language"],
        correctAnswer: 1,
        explanation: "Python is famous for its readability and simplicity."
      }
    ]
  },
  {
    submodule: "2.2",
    moduleNumber: 2,
    title: "Variables & Data Types",
    resources: [
      {
        type: "Video",
        title: "Python Data Types",
        url: "https://www.youtube.com/watch?v=khKv-8q7YmY"
      },
      {
        type: "Article",
        title: "GeeksforGeeks Data Types",
        url: "https://www.geeksforgeeks.org/python-data-types/"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "2.2q1",
        question: "What is the output of: print(type(3.14))?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"],
        correctAnswer: 1,
        explanation: "3.14 is a decimal number, which in Python is represented as a float data type."
      }
    ]
  },
  {
    submodule: "3.1",
    moduleNumber: 3,
    title: "NumPy Basics",
    resources: [
      {
        type: "Video",
        title: "NumPy Tutorial",
        url: "https://www.youtube.com/watch?v=QUT1VHiLmmI"
      },
      {
        type: "Article",
        title: "NumPy Official Docs",
        url: "https://numpy.org/doc/stable/user/absolute_beginners.html"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "3.1q1",
        question: "NumPy is primarily used for:",
        options: ["Web development", "Numerical computing", "Game development", "Mobile apps"],
        correctAnswer: 1,
        explanation: "NumPy is a fundamental package for numerical computing in Python."
      }
    ]
  },
  {
    submodule: "3.2",
    moduleNumber: 3,
    title: "Pandas Basics",
    resources: [
      {
        type: "Video",
        title: "Pandas Tutorial",
        url: "https://www.youtube.com/watch?v=2uvysYbKdjM"
      },
      {
        type: "Article",
        title: "Pandas Getting Started",
        url: "https://pandas.pydata.org/docs/getting_started/index.html"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "3.2q1",
        question: "What is the primary data structure in Pandas?",
        options: ["Array", "List", "DataFrame", "Dictionary"],
        correctAnswer: 2,
        explanation: "DataFrame is the primary data structure in Pandas for working with tabular data."
      }
    ]
  },
  {
    submodule: "4.1",
    moduleNumber: 4,
    title: "Intro to Visualization",
    resources: [
      {
        type: "Video",
        title: "Matplotlib Basics",
        url: "https://www.youtube.com/watch?v=OZOOLe2imFo"
      },
      {
        type: "Article",
        title: "Tableau Visualization Guide",
        url: "https://www.tableau.com/learn/articles/data-visualization"
      }
    ],
    practiceExercises: [],
    quizQuestions: [
      {
        id: "4.1q1",
        question: "Which library is commonly used for data visualization in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Flask"],
        correctAnswer: 2,
        explanation: "Matplotlib is one of the most widely used libraries for creating visualizations in Python."
      }
    ]
  }
];

// Legacy export for backward compatibility
export const days = submodules;

export const getSubmoduleContent = (submoduleId: string): SubmoduleContent | undefined => {
  return submodules.find(s => s.submodule === submoduleId);
};

// Legacy function alias
export const getDayContent = getSubmoduleContent;

export const getModuleContent = (moduleNumber: number): ModuleContent | undefined => {
  return modules.find(m => m.module === moduleNumber);
};

// Legacy function alias
export const getWeekContent = getModuleContent;

export const getModuleForSubmodule = (submoduleId: string): ModuleContent | undefined => {
  return modules.find(m => m.submodules.includes(submoduleId));
};

// Legacy function alias
export const getWeekForDay = getModuleForSubmodule;

// Get all submodules in order
export const getAllSubmodulesOrdered = (): string[] => {
  return modules.flatMap(m => m.submodules);
};

// Helper to get next submodule title
export const getNextSubmoduleTitle = (currentSubmoduleId: string): string | undefined => {
  const allSubmodules = getAllSubmodulesOrdered();
  const currentIndex = allSubmodules.indexOf(currentSubmoduleId);
  if (currentIndex === -1 || currentIndex >= allSubmodules.length - 1) return undefined;
  const nextId = allSubmodules[currentIndex + 1];
  const nextSubmodule = getSubmoduleContent(nextId);
  return nextSubmodule?.title;
};

// Helper to get next submodule ID
export const getNextSubmoduleId = (currentSubmoduleId: string): string | undefined => {
  const allSubmodules = getAllSubmodulesOrdered();
  const currentIndex = allSubmodules.indexOf(currentSubmoduleId);
  if (currentIndex === -1 || currentIndex >= allSubmodules.length - 1) return undefined;
  return allSubmodules[currentIndex + 1];
};

// Helper to get previous submodule ID
export const getPreviousSubmoduleId = (currentSubmoduleId: string): string | undefined => {
  const allSubmodules = getAllSubmodulesOrdered();
  const currentIndex = allSubmodules.indexOf(currentSubmoduleId);
  if (currentIndex <= 0) return undefined;
  return allSubmodules[currentIndex - 1];
};

// Total count helpers
export const getTotalSubmodules = (): number => {
  return submodules.length;
};

export const getTotalModules = (): number => {
  return modules.length;
};

// Get first uncompleted submodule
export const getFirstUncompletedSubmodule = (completedSubmodules: string[]): string => {
  const allSubmodules = getAllSubmodulesOrdered();
  for (const submoduleId of allSubmodules) {
    if (!completedSubmodules.includes(submoduleId)) {
      return submoduleId;
    }
  }
  return allSubmodules[allSubmodules.length - 1]; // Return last if all completed
};
