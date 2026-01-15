export interface Resource {
  type: 'Video' | 'Article';
  title: string;
  url: string;
}

export interface SubmoduleContent {
  submodule: string; // e.g., "1.1", "1.2", "2.1"
  moduleNumber: number;
  title: string;
  description: string; // One-line summary of the lesson
  resources: Resource[];
  quizQuestions: QuizQuestion[];
  practiceExercises: string[];
  content: {
    introduction: string;
    keyConcepts: string[];
    coreResponsibilities: string[];
    toolsEcosystem: string[];
    comparison?: { title: string; items: string[] };
    realWorldApplications: string[];
    tipsInsights: string[];
    thinkingQuestions: string[];
    furtherReading: string[];
  };
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

// Data from Excel: Data Engineering Curriculum
export const modules: ModuleContent[] = [
  {
    module: 1,
    title: "Foundations of Data Engineering",
    submodules: ["1.1", "1.2"],
    assessment: {
      title: "Module 1 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 2,
    title: "Data Pipelines & ETL",
    submodules: ["2.1", "2.2"],
    assessment: {
      title: "Module 2 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 3,
    title: "Databases & Data Modeling",
    submodules: ["3.1", "3.2"],
    assessment: {
      title: "Module 3 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 4,
    title: "Big Data Processing",
    submodules: ["4.1", "4.2"],
    assessment: {
      title: "Module 4 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 5,
    title: "Workflow Orchestration",
    submodules: ["5.1", "5.2"],
    assessment: {
      title: "Module 5 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 6,
    title: "Data Warehousing",
    submodules: ["6.1", "6.2"],
    assessment: {
      title: "Module 6 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 7,
    title: "Streaming Data",
    submodules: ["7.1", "7.2"],
    assessment: {
      title: "Module 7 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 8,
    title: "Data Quality, Governance & Security",
    submodules: ["8.1", "8.2"],
    assessment: {
      title: "Module 8 Assessment",
      type: "quiz",
      passingScore: 70
    }
  },
  {
    module: 9,
    title: "Data Engineering Project",
    submodules: ["9.1"],
    assessment: {
      title: "Capstone Project",
      type: "project",
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
    title: "What is Data Engineering",
    description: "Explore the role, responsibilities, and ecosystem of modern data engineering.",
    resources: [
      {
        type: "Video",
        title: "What is Data Engineering? (Concepts Explained)",
        url: "https://www.youtube.com/watch?v=fwkLcp8dbic"
      },
      {
        type: "Article",
        title: "Data Engineering 101 – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/data-engineering/data-engineering-101/"
      }
    ],
    practiceExercises: [
      "Write a Python script that reads a CSV file and prints the first 5 rows",
      "Create a simple data validation function that checks for null values"
    ],
    quizQuestions: [
      {
        id: "1.1q1",
        question: "What is the primary role of a Data Engineer?",
        options: ["Building machine learning models", "Designing and maintaining data infrastructure", "Creating data visualizations", "Conducting statistical analysis"],
        correctAnswer: 1,
        explanation: "Data Engineers are responsible for designing, building, and maintaining the infrastructure and systems that enable data collection, storage, and analysis."
      },
      {
        id: "1.1q2",
        question: "Which of the following is NOT a core responsibility of a Data Engineer?",
        options: ["Building ETL pipelines", "Managing data warehouses", "Training neural networks", "Ensuring data quality"],
        correctAnswer: 2,
        explanation: "Training neural networks is typically the responsibility of Machine Learning Engineers or Data Scientists, not Data Engineers."
      },
      {
        id: "1.1q3",
        question: "Data Engineering sits at the intersection of which disciplines?",
        options: ["Marketing and Sales", "Software Engineering and Data Science", "HR and Finance", "Design and UX"],
        correctAnswer: 1,
        explanation: "Data Engineering combines software engineering principles with data science requirements to build robust data systems."
      }
    ],
    content: {
      introduction: "A comprehensive overview of the data engineering role, core functions, responsibilities, and relevance within the broader data ecosystem. Data Engineering is primarily concerned with the movement and transformation of data from various source systems to target systems like data warehouses. The fundamental process in data engineering is ETL (Extract, Transform, Load).",
      keyConcepts: [
        "ETL Process: Extract (querying and retrieving data from source systems), Transform (cleaning, converting, and reshaping data), Load (storing transformed data into a data warehouse)",
        "Data Pipelines: Automated workflows that extract data from multiple sources and aggregate into centralized data warehouses",
        "Data Quality: Testing and quality assurance to ensure data validity and compliance with production standards",
        "Orchestration: Monitoring of data pipelines using tools such as Apache Airflow, Prefect, or others",
        "Cloud Integration: Familiarity with platforms like AWS, Azure, or Google Cloud for pipeline orchestration"
      ],
      coreResponsibilities: [
        "Extracting data from diverse sources such as databases, flat files, and APIs",
        "Transforming data by cleaning (e.g., converting missing text values to 'unknown') and standardizing (e.g., currency conversion)",
        "Loading data into a structured data warehouse with a defined schema",
        "Data testing and quality assurance to ensure data validity and compliance",
        "Orchestration and monitoring of data pipelines",
        "Cloud integration for pipeline orchestration"
      ],
      toolsEcosystem: [
        "SQL: Querying data from relational databases",
        "Python: Scripting ETL processes, data transformation",
        "ETL Tools: Informatica, SSIS, Stitch, Fivetran",
        "Data Modeling: Designing data structures during transformation",
        "Data Warehouse Design: Creating schemas (SQL Server, Postgres, Snowflake, Redshift)",
        "Orchestration Software: Running and monitoring pipelines (Airflow, Prefect)",
        "Cloud Platforms: AWS, Azure, Google Cloud"
      ],
      realWorldApplications: [
        "Retail: Processing transactional databases across different regions for company-wide analysis",
        "Regional Sales Comparisons: Aggregating data from multiple geographic databases",
        "Seasonal Sales Trends: Analyzing temporal patterns in sales data",
        "Product Bundling: Cross-selling opportunities through data aggregation",
        "Currency Standardization: Converting sales amounts from different currencies using exchange rate APIs"
      ],
      tipsInsights: [
        "Business/domain knowledge is important for effective data engineering but typically comes from business analysts",
        "Data warehouse schema design is often handled by data or system architects; if unavailable, data engineers assume this responsibility",
        "Data pipelines handle raw or 'dirty' data, applying cleansing and transformation before making it available for analysis",
        "Data engineers operate behind the scenes but are critical for enabling data scientists and analysts"
      ],
      thinkingQuestions: [
        "How would you design a data pipeline for a retailer with multiple regional databases?",
        "What are the trade-offs between running queries on production databases vs using a data warehouse?",
        "How do you handle data standardization across different source systems?"
      ],
      furtherReading: [
        "Fundamentals of Data Engineering by Joe Reis and Matt Housley",
        "Designing Data-Intensive Applications by Martin Kleppmann",
        "The Data Warehouse Toolkit by Ralph Kimball"
      ]
    }
  },
  {
    submodule: "1.2",
    moduleNumber: 1,
    title: "Data Engineering Lifecycle",
    description: "Understand the stages of data flow from generation to serving.",
    resources: [
      {
        type: "Video",
        title: "Data Engineering Lifecycle Explained",
        url: "https://www.youtube.com/watch?v=aWmfhBWmUqU"
      },
      {
        type: "Article",
        title: "Data Engineering Lifecycle – Analytics Vidhya",
        url: "https://www.analyticsvidhya.com/blog/2021/06/data-engineering-concepts-and-importance/"
      }
    ],
    practiceExercises: [
      "Map out the data lifecycle for a sample e-commerce application",
      "Identify potential bottlenecks in a given data pipeline architecture"
    ],
    quizQuestions: [
      {
        id: "1.2q1",
        question: "What is the first stage in the Data Engineering Lifecycle?",
        options: ["Transformation", "Generation/Ingestion", "Storage", "Serving"],
        correctAnswer: 1,
        explanation: "The lifecycle begins with data generation and ingestion – collecting data from various source systems."
      },
      {
        id: "1.2q2",
        question: "Which stage focuses on making data available for analysis?",
        options: ["Ingestion", "Storage", "Serving", "Transformation"],
        correctAnswer: 2,
        explanation: "The Serving stage focuses on making processed data available to end users, applications, and analytical tools."
      },
      {
        id: "1.2q3",
        question: "What undercurrents support all stages of the data lifecycle?",
        options: ["Only security", "Security, metadata, and data governance", "Only storage optimization", "Marketing and sales"],
        correctAnswer: 1,
        explanation: "Security, metadata management, and data governance are cross-cutting concerns that support every stage of the lifecycle."
      }
    ],
    content: {
      introduction: "A comprehensive overview of the data engineering life cycle, breaking it down into seven distinct phases that a data pipeline undergoes within a business context. The lifecycle integrates modern software development best practices, such as CI/CD (Continuous Integration/Continuous Deployment), to ensure efficiency and sustainability in data engineering projects.",
      keyConcepts: [
        "Phase 1 - Data Collection: Gathering data from various sources (internal systems like ERP, CRM; external APIs, social media, public datasets)",
        "Phase 2 - Data Integration & Storage: Cleaning, transforming, consolidating data into warehouses or lakes",
        "Phase 3 - Data Cleaning & Processing: Removing errors, normalizing, deduplicating, verifying, merging data",
        "Phase 4 - Data Modeling & Warehousing: Designing efficient data schemas and warehouses for operational and analytical needs",
        "Phase 5 - Data Analysis: Applying statistical methods and machine learning to extract insights",
        "Phase 6 - Data Visualization & Reporting: Creating dashboards and automated reports for stakeholders",
        "Phase 7 - Pipeline Maintenance: Ongoing updates and improvements of data processes and infrastructure"
      ],
      coreResponsibilities: [
        "Handle inconsistent formats, high volume, data privacy, and anonymization during collection",
        "Choose storage solutions (cloud vs on-premises), manage ETL vs ELT, handle real-time vs batch processing",
        "Detect anomalies, missing values, outliers while maintaining data integrity",
        "Ensure model flexibility, query performance, security, and compliance",
        "Prevent poor data quality impacts, overfitting, and incorrect assumptions",
        "Ensure reports are timely, relevant, and accessible without bias",
        "Maintain data integrity over time, adapt to new technologies, ensure governance"
      ],
      toolsEcosystem: [
        "Data Integration: ETL/ELT pipelines with batch vs real-time processing",
        "Storage: Cloud and on-premises data warehouses and lakes",
        "Quality: Automated cleaning and validation systems",
        "CI/CD: Continuous integration and deployment for data pipelines"
      ],
      realWorldApplications: [
        "Retail: Tracking customer journey from website visit to purchase",
        "Manufacturing: Monitoring production line efficiency in real-time",
        "Media: Personalizing content recommendations based on user behavior",
        "AI/ML: Transforming data into specialized formats (e.g., vector embeddings) for machine learning"
      ],
      tipsInsights: [
        "The life cycle is iterative, with pipeline maintenance feeding back into data collection and integration phases",
        "Data decay occurs when data becomes outdated, undermining reliability",
        "Risk of over-cleaning which can bias data and distort its meaning",
        "AI/ML readiness is increasingly important for downstream machine learning models"
      ],
      thinkingQuestions: [
        "How do you balance innovation with system stability in pipeline maintenance?",
        "What metrics would you track to measure data decay?",
        "How do you prevent over-cleaning that could bias your data?"
      ],
      furtherReading: [
        "The Data Engineering Lifecycle (Chapter 2) – Fundamentals of Data Engineering",
        "Building Event-Driven Microservices by Adam Bellemare"
      ]
    }
  },
  {
    submodule: "2.1",
    moduleNumber: 2,
    title: "What is a Data Pipeline",
    description: "Learn how automated workflows move and transform data between systems.",
    resources: [
      {
        type: "Video",
        title: "Data Pipelines Explained Simply",
        url: "https://www.youtube.com/watch?v=6kEGUCrBEU0"
      },
      {
        type: "Article",
        title: "What Is a Data Pipeline? – AWS",
        url: "https://aws.amazon.com/what-is/data-pipeline/"
      }
    ],
    practiceExercises: [
      "Design a simple data pipeline diagram for a user analytics system",
      "Write pseudocode for a pipeline that extracts, transforms, and loads sales data"
    ],
    quizQuestions: [
      {
        id: "2.1q1",
        question: "What is the primary purpose of a data pipeline?",
        options: ["Store data permanently", "Move and transform data between systems", "Visualize data", "Delete old data"],
        correctAnswer: 1,
        explanation: "Data pipelines automate the flow of data from source systems to destinations, including any necessary transformations."
      },
      {
        id: "2.1q2",
        question: "Which is NOT a characteristic of a well-designed data pipeline?",
        options: ["Reliability", "Scalability", "Manual intervention required", "Idempotency"],
        correctAnswer: 2,
        explanation: "Well-designed pipelines minimize manual intervention through automation and self-healing capabilities."
      },
      {
        id: "2.1q3",
        question: "What does idempotency mean in the context of data pipelines?",
        options: ["Running once produces the same result as running multiple times", "Pipeline runs faster each time", "Data is compressed", "Pipeline never fails"],
        correctAnswer: 0,
        explanation: "Idempotency ensures that running a pipeline multiple times produces the same result, which is crucial for recovery from failures."
      }
    ],
    content: {
      introduction: "A comprehensive overview of data pipelines, explaining their purpose, processes, and applications by drawing an analogy to water pipelines. Just as water pipelines transport water from sources to treatment plants and then to end users, data pipelines move data from raw sources to places where it can be used after cleaning and transformation.",
      keyConcepts: [
        "Water Pipeline Analogy: Data pipelines move data like water from source to destination after treatment/transformation",
        "ETL (Extract, Transform, Load): Extracts data, cleans and transforms it, then loads it into repositories like data warehouses",
        "Data Replication: Continuously copies data from source to another repository for high-performance or backup/disaster recovery",
        "Data Virtualization: Provides real-time virtual access to data sources without physically copying data",
        "Data Sources: Data lakes, databases, SaaS applications (on-premises and cloud), and streaming data"
      ],
      coreResponsibilities: [
        "Extract data from producers (sources) and deliver clean, transformed data to consumers",
        "Clean and transform raw or 'dirty' data before making it available for analysis",
        "Support both batch processing and streaming data ingestion",
        "Enable Business Intelligence for various types of reporting and decision-making",
        "Prepare high-quality data to train Machine Learning algorithms"
      ],
      toolsEcosystem: [
        "ETL: Batch or streaming processing for clean, structured data",
        "Data Replication: Continuous copying for fast access and business continuity",
        "Data Virtualization: Real-time querying for quick testing and prototyping",
        "Processing: Hadoop, Apache Spark, cloud data warehouses"
      ],
      comparison: {
        title: "Data Pipeline Methods",
        items: [
          "ETL: Extract → Transform → Load, creates clean data ready for analysis, often scheduled not real-time",
          "Data Replication: Continuous copying for high performance needs and backup/recovery, provides fast access",
          "Data Virtualization: Real-time querying for quick testing, no data duplication, not suitable for large production workloads"
        ]
      },
      realWorldApplications: [
        "Business Intelligence: Various types of reporting and decision-making",
        "Machine Learning: Training algorithms with large volumes of high-quality data",
        "Data Warehousing: Consolidating data from multiple operational systems",
        "Disaster Recovery: Backup systems using data replication"
      ],
      tipsInsights: [
        "Unlike physical water pipelines, data virtualization allows flexible, real-time data access without moving data",
        "Data virtualization accelerates experimentation and use case validation",
        "Batch processing remains common, but streaming ingestion is increasing to handle real-time data",
        "Data replication supports both performance optimization and resilience"
      ],
      thinkingQuestions: [
        "When would you choose data virtualization over ETL for a new use case?",
        "How do you handle schema changes in source systems?",
        "What strategies can you use to make pipelines fault-tolerant?"
      ],
      furtherReading: [
        "Data Pipelines Pocket Reference by James Densmore",
        "Streaming Systems by Tyler Akidau"
      ]
    }
  },
  {
    submodule: "2.2",
    moduleNumber: 2,
    title: "ETL vs ELT",
    description: "Compare traditional and modern data integration approaches.",
    resources: [
      {
        type: "Video",
        title: "ETL vs ELT Explained",
        url: "https://youtu.be/I2cSwf5bq2s"
      },
      {
        type: "Article",
        title: "ETL vs ELT – Snowflake",
        url: "https://www.snowflake.com/guides/etl-vs-elt/"
      }
    ],
    practiceExercises: [
      "Compare ETL and ELT approaches for a given business scenario",
      "Write a simple Python ETL script that extracts CSV data, transforms it, and loads to a database"
    ],
    quizQuestions: [
      {
        id: "2.2q1",
        question: "In ETL, where does transformation occur?",
        options: ["In the source system", "Before loading to destination", "After loading to destination", "During extraction only"],
        correctAnswer: 1,
        explanation: "In ETL (Extract, Transform, Load), data is transformed in a staging area before being loaded into the destination system."
      },
      {
        id: "2.2q2",
        question: "Which approach is better suited for cloud data warehouses?",
        options: ["ETL", "ELT", "Neither", "Only batch processing"],
        correctAnswer: 1,
        explanation: "ELT leverages the processing power of modern cloud data warehouses to perform transformations after loading raw data."
      },
      {
        id: "2.2q3",
        question: "What is a key advantage of ELT over traditional ETL?",
        options: ["Lower storage costs", "Preserves raw data for flexible analysis", "Faster extraction", "Simpler security"],
        correctAnswer: 1,
        explanation: "ELT preserves raw data in the destination, allowing for flexible transformations as business requirements evolve."
      }
    ],
    content: {
      introduction: "A comprehensive comparison between two prevalent data pipeline methodologies: Extract-Transform-Load (ETL) and Extract-Load-Transform (ELT). ETL is the 'old school' approach dominant for decades before modern cloud warehouses, while ELT emerged recently due to the rise of powerful cloud data warehouses capable of on-demand large-scale transformations.",
      keyConcepts: [
        "ETL: Traditional pipeline where data is extracted, transformed in a staging environment, then loaded into a warehouse",
        "ELT: Modern pipeline where data is extracted, loaded raw into the warehouse, and transformed within the warehouse itself",
        "ETL Workflow: Extract raw data → Transform externally using ETL tools → Load cleaned data into warehouse",
        "ELT Workflow: Extract data → Load raw data into cloud warehouses → Transform inside warehouse leveraging its computational power"
      ],
      coreResponsibilities: [
        "Evaluate data volume and velocity to choose appropriate approach",
        "Consider processing capabilities of your data warehouse",
        "Assess data quality and security requirements",
        "Balance resource availability with analytical needs"
      ],
      toolsEcosystem: [
        "ETL Tools: Informatica, Talend, SSIS, Apache NiFi, Airflow for orchestration",
        "ELT Tools: dbt, Fivetran + Snowflake, Matillion",
        "Cloud Warehouses (for ELT): Snowflake, PostgreSQL, BigQuery, Redshift"
      ],
      comparison: {
        title: "ETL vs ELT Comparison",
        items: [
          "ETL Advantages: Strong data quality and consistency, efficient for limited warehouse compute, enhanced security and compliance control",
          "ELT Advantages: Highly scalable with parallel processing, simpler pipelines, near real-time data availability",
          "ETL Drawbacks: Complex at large scale, limited scalability, delayed data availability",
          "ELT Drawbacks: Data quality risks if raw data loaded without cleaning, dependent on powerful warehouse, less control over quality pre-load"
        ]
      },
      realWorldApplications: [
        "Large Data Volume & Velocity: ELT handles better due to scalability and immediate loading",
        "Limited Processing Capabilities: ETL preferred for complex transformations pre-load",
        "High Data Quality & Security: ETL allows better control over cleansing and compliance",
        "Real-time Analytics: ELT supports real-time analysis; ETL offers better accuracy at cost of latency"
      ],
      tipsInsights: [
        "ETL remains relevant for organizations requiring strict data quality, compliance, and legacy warehouses",
        "ELT leverages modern cloud warehouses with scalable parallel processing",
        "The choice depends on data volume, processing power, security requirements, and analytical priorities",
        "ELT pipelines benefit from reduced complexity but require strong governance"
      ],
      thinkingQuestions: [
        "How does the choice between ETL and ELT affect data governance?",
        "What factors would lead you to choose ETL over ELT for a specific use case?",
        "How do you handle sensitive data in an ELT architecture?"
      ],
      furtherReading: [
        "The Analytics Setup Guidebook – dbt Labs",
        "ETL vs ELT: Key Differences Explained – Snowflake Documentation"
      ]
    }
  },
  {
    submodule: "3.1",
    moduleNumber: 3,
    title: "Relational Databases Basics",
    description: "Master SQL and relational database fundamentals for data storage.",
    resources: [
      {
        type: "Video",
        title: "SQL & Relational Databases Explained",
        url: "https://www.youtube.com/watch?v=QyZM1krf2NM"
      },
      {
        type: "Article",
        title: "Introduction to RDBMS – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system/"
      }
    ],
    practiceExercises: [
      "Create a simple database schema for an e-commerce application",
      "Write SQL queries to create tables with proper relationships and constraints"
    ],
    quizQuestions: [
      {
        id: "3.1q1",
        question: "What does RDBMS stand for?",
        options: ["Relational Data Base Management System", "Random Database Management System", "Rapid Database Machine System", "Relational Data Backup Management System"],
        correctAnswer: 0,
        explanation: "RDBMS stands for Relational Database Management System, which organizes data into related tables."
      },
      {
        id: "3.1q2",
        question: "What is a primary key?",
        options: ["A key used to encrypt data", "A unique identifier for each row in a table", "The first column in any table", "A backup key"],
        correctAnswer: 1,
        explanation: "A primary key uniquely identifies each record in a table and ensures data integrity."
      },
      {
        id: "3.1q3",
        question: "What is normalization in databases?",
        options: ["Making all data the same type", "Organizing data to reduce redundancy", "Encrypting sensitive data", "Compressing database files"],
        correctAnswer: 1,
        explanation: "Normalization is the process of organizing data to minimize redundancy and improve data integrity."
      }
    ],
    content: {
      introduction: "Relational databases form the backbone of most enterprise data systems, organizing data into structured tables with defined relationships. Understanding relational database concepts is fundamental for Data Engineers, as these systems remain the primary choice for transactional workloads and structured data storage.",
      keyConcepts: [
        "Tables: Structured collections of related data organized in rows and columns",
        "Primary Keys: Unique identifiers that distinguish each row in a table",
        "Foreign Keys: References to primary keys in other tables, establishing relationships",
        "Normalization: Process of organizing data to reduce redundancy",
        "ACID Properties: Atomicity, Consistency, Isolation, Durability for transaction reliability"
      ],
      coreResponsibilities: [
        "Design efficient database schemas that support application requirements",
        "Implement appropriate indexing strategies for query optimization",
        "Ensure data integrity through constraints and relationships",
        "Plan for scalability and performance under load",
        "Implement backup and recovery procedures"
      ],
      toolsEcosystem: [
        "Open Source: PostgreSQL, MySQL, MariaDB",
        "Commercial: Oracle, Microsoft SQL Server",
        "Cloud-managed: Amazon RDS, Azure SQL, Google Cloud SQL",
        "Query Tools: DBeaver, pgAdmin, SQL Developer"
      ],
      realWorldApplications: [
        "E-commerce: Managing products, orders, customers, and inventory",
        "Banking: Transaction processing and account management",
        "Healthcare: Patient records and appointment scheduling",
        "ERP Systems: Enterprise resource planning and business operations"
      ],
      tipsInsights: [
        "Master SQL – it remains the most important skill for data professionals",
        "Understand execution plans to optimize query performance",
        "Balance normalization with practical query performance needs",
        "Consider read replicas for scaling read-heavy workloads"
      ],
      thinkingQuestions: [
        "When would you denormalize a database schema?",
        "How do you choose between different RDBMS options?",
        "What strategies can improve query performance on large tables?"
      ],
      furtherReading: [
        "SQL Performance Explained by Markus Winand",
        "Database Design for Mere Mortals by Michael Hernandez"
      ]
    }
  },
  {
    submodule: "3.2",
    moduleNumber: 3,
    title: "Data Modeling Concepts",
    description: "Design effective schemas using dimensional and conceptual modeling.",
    resources: [
      {
        type: "Video",
        title: "Data Modeling Basics for Beginners",
        url: "https://youtu.be/CUR6rKrIEGc"
      },
      {
        type: "Article",
        title: "Data Modeling Basics – IBM",
        url: "https://www.ibm.com/topics/data-modeling"
      }
    ],
    practiceExercises: [
      "Create an Entity-Relationship diagram for a library management system",
      "Convert a conceptual model to a physical database schema"
    ],
    quizQuestions: [
      {
        id: "3.2q1",
        question: "What is the purpose of data modeling?",
        options: ["To visualize data only", "To define data structure and relationships", "To delete unnecessary data", "To compress data"],
        correctAnswer: 1,
        explanation: "Data modeling defines how data is structured, stored, and accessed, serving as a blueprint for database design."
      },
      {
        id: "3.2q2",
        question: "What is a star schema commonly used for?",
        options: ["OLTP systems", "Data warehousing and analytics", "Real-time streaming", "File storage"],
        correctAnswer: 1,
        explanation: "Star schema is optimized for analytical queries and is commonly used in data warehousing."
      },
      {
        id: "3.2q3",
        question: "What is the difference between conceptual and physical data models?",
        options: ["They are the same", "Conceptual is high-level; physical includes implementation details", "Physical is simpler", "Conceptual includes more technical details"],
        correctAnswer: 1,
        explanation: "Conceptual models represent business concepts at a high level, while physical models include specific implementation details like data types and indexes."
      }
    ],
    content: {
      introduction: "Data modeling is the process of designing a clear, structured blueprint for a database so raw, messy data becomes reliable, efficient, and easy to analyze. It defines entities, relationships, and keys, follows a workflow from conceptual → logical → physical models, and ensures data integrity, performance, and compliance. Strong data models power analytics, applications, and AI/ML.",
      keyConcepts: [
        "Data Modeling: Organizing raw, unstructured data into a logical, coherent framework for efficient storage, querying, and analysis",
        "Primary Keys (PK): Unique identifiers for each record (e.g., Customer ID, Order ID)",
        "Foreign Keys (FK): Establishing relationships between tables (e.g., Payment linked to Order Header)",
        "Conceptual Modeling: High-level business view of data flow and key entities",
        "Logical Modeling: Detailed technical design including attributes, keys, and relationships",
        "Physical Modeling: Creation of database schemas, indexes, partitioning, and optimization"
      ],
      coreResponsibilities: [
        "Translate business requirements into data models that support analytics needs",
        "Design efficient database schemas aligned with business requirements",
        "Ensure data integrity and accuracy for trustworthy analytics",
        "Facilitate data governance and compliance (e.g., GDPR) by documenting data storage and security",
        "Document models to avoid technical debt and ease future modifications"
      ],
      toolsEcosystem: [
        "ER Studio: Connects to databases, identifies relationships",
        "DB Schema: Schema documentation, monitoring, supports SQL/NoSQL",
        "Lucidchart: Cloud-based collaborative diagramming tool",
        "PG Modeler: Open source PostgreSQL modeling tool",
        "MySQL Workbench, Oracle SQL Data Modeler, IBM Infosphere Data Architect"
      ],
      comparison: {
        title: "Data Model Types",
        items: [
          "Relational Model: Data organized in tables with relations via primary and foreign keys - widely used",
          "Object-Oriented Model: Combines data and operations, suitable for complex applications like robotics",
          "Network Model: Allows multiple parent records per child for complex many-to-many relationships",
          "Entity-Relationship Model: Maps entities, attributes, and relationships for logical data design"
        ]
      },
      realWorldApplications: [
        "Database Design: Helping architects design efficient data structures",
        "Data Integrity: Ensuring accuracy and consistency in stored data",
        "Data Analysis: Facilitating smooth extraction of insights",
        "Data Governance & Compliance: Providing clarity for data management policies and regulatory adherence"
      ],
      tipsInsights: [
        "Data modeling is fundamental to all database systems and data-driven applications",
        "It bridges the gap between raw data and usable, analyzable information",
        "Choosing the right data model depends on the complexity and nature of the data",
        "Maintenance and documentation are as important as initial design"
      ],
      thinkingQuestions: [
        "How do you handle slowly changing dimensions in a data warehouse?",
        "When would you choose a snowflake schema over a star schema?",
        "How do you make logical decisions about data storage to optimize space and query efficiency?"
      ],
      furtherReading: [
        "The Data Warehouse Toolkit by Ralph Kimball",
        "Data Modeling Made Simple by Steve Hoberman"
      ]
    }
  },
  {
    submodule: "4.1",
    moduleNumber: 4,
    title: "Big Data Fundamentals",
    description: "Understand volume, variety, velocity and distributed computing principles.",
    resources: [
      {
        type: "Video",
        title: "What Is Big Data?",
        url: "https://www.youtube.com/watch?v=bAyrObl7TYE"
      },
      {
        type: "Article",
        title: "Big Data Explained – Oracle",
        url: "https://www.oracle.com/big-data/what-is-big-data/"
      }
    ],
    practiceExercises: [
      "Calculate the storage requirements for a big data scenario",
      "Design a distributed processing strategy for a large dataset"
    ],
    quizQuestions: [
      {
        id: "4.1q1",
        question: "What are the 3 Vs of Big Data?",
        options: ["Value, Vision, Velocity", "Volume, Variety, Velocity", "Volume, Value, Visibility", "Variety, Validation, Volume"],
        correctAnswer: 1,
        explanation: "The 3 Vs – Volume, Variety, and Velocity – are the foundational characteristics that define Big Data."
      },
      {
        id: "4.1q2",
        question: "What is distributed computing in the context of Big Data?",
        options: ["Running programs on a single powerful computer", "Processing data across multiple connected computers", "Storing data in the cloud", "Distributing data to users"],
        correctAnswer: 1,
        explanation: "Distributed computing involves processing data across multiple computers working together to handle large-scale workloads."
      },
      {
        id: "4.1q3",
        question: "What is horizontal scaling?",
        options: ["Adding more power to existing machines", "Adding more machines to handle load", "Reducing data size", "Optimizing code"],
        correctAnswer: 1,
        explanation: "Horizontal scaling (scaling out) involves adding more machines to a system, as opposed to vertical scaling which adds more power to existing machines."
      }
    ],
    content: {
      introduction: "Every click, swipe, message, photo, video, and transaction generates data. When this data becomes too large, too fast, and too complex for traditional databases or spreadsheets to handle, it is known as Big Data. Understanding big data fundamentals helps grasp how modern systems store, process, and extract value from massive datasets used by companies like Google, Netflix, hospitals, and governments.",
      keyConcepts: [
        "Volume: Massive quantities of data, often measured in terabytes, petabytes, or exabytes (e.g., healthcare systems generate 2314 exabytes annually)",
        "Velocity: Data is produced and updated continuously and in real time (e.g., live stock market prices, ride-sharing apps tracking drivers every second)",
        "Variety: Multiple formats - Structured (SQL tables), Semi-structured (JSON, XML), Unstructured (images, videos, audio)",
        "Veracity: Data quality and trustworthiness (e.g., fake product reviews, faulty IoT sensor readings)",
        "Value: Actionable insights (e.g., Netflix recommendations, bank fraud detection, hospital disease prediction)"
      ],
      coreResponsibilities: [
        "Design systems that can scale horizontally to handle data growth",
        "Implement distributed processing frameworks for large-scale analytics",
        "Manage data across different storage tiers based on access patterns",
        "Handle data that traditional single-machine systems cannot process efficiently",
        "Ensure data reliability in distributed environments"
      ],
      toolsEcosystem: [
        "HDFS (Hadoop Distributed File System): Splits large files into blocks, stores across multiple machines, replicates for fault tolerance",
        "MapReduce: Breaks large jobs into smaller tasks (Map), runs in parallel, combines results (Reduce)",
        "Apache Spark, Apache Flink, Presto, Trino for processing",
        "Cloud Platforms: AWS EMR, Azure HDInsight, Google Dataproc, Databricks"
      ],
      realWorldApplications: [
        "Healthcare: Early disease detection, personalized treatment plans",
        "Gaming: Analyze player behavior, improve gameplay, reduce churn",
        "Disaster Management: Predict hurricanes and floods, improve evacuation planning",
        "E-commerce: Personalized recommendations, demand forecasting, inventory optimization"
      ],
      tipsInsights: [
        "Not all data problems require big data solutions – assess before adopting",
        "Cloud platforms have made big data more accessible to smaller organizations",
        "Focus on data quality – garbage in, garbage out at scale is even worse",
        "Consider the total cost of ownership, not just infrastructure costs"
      ],
      thinkingQuestions: [
        "How do you determine if a problem truly requires big data technologies?",
        "What are the trade-offs between consistency and availability in distributed systems?",
        "How does data locality affect big data processing performance?"
      ],
      furtherReading: [
        "Designing Data-Intensive Applications by Martin Kleppmann",
        "Big Data: Principles and Best Practices by Nathan Marz"
      ]
    }
  },
  {
    submodule: "4.2",
    moduleNumber: 4,
    title: "Apache Spark Basics",
    description: "Process large-scale data with in-memory distributed computing.",
    resources: [
      {
        type: "Video",
        title: "Apache Spark Explained in 20 Minutes",
        url: "https://youtu.be/jDkLiqlyQaY"
      },
      {
        type: "Article",
        title: "Apache Spark Overview – Databricks",
        url: "https://www.databricks.com/glossary/apache-spark"
      }
    ],
    practiceExercises: [
      "Write a PySpark script to read and transform a large CSV file",
      "Implement a word count program using Spark RDDs and DataFrames"
    ],
    quizQuestions: [
      {
        id: "4.2q1",
        question: "What makes Apache Spark faster than traditional MapReduce?",
        options: ["Better algorithms", "In-memory processing", "Smaller datasets", "Simpler code"],
        correctAnswer: 1,
        explanation: "Spark's in-memory processing capability allows it to be up to 100x faster than disk-based MapReduce for certain workloads."
      },
      {
        id: "4.2q2",
        question: "What is a Spark DataFrame?",
        options: ["A physical database table", "A distributed collection of data organized into named columns", "A Python library", "A file format"],
        correctAnswer: 1,
        explanation: "A Spark DataFrame is a distributed collection of data organized into named columns, similar to a table in a relational database."
      },
      {
        id: "4.2q3",
        question: "What is lazy evaluation in Spark?",
        options: ["Spark runs slowly", "Transformations are not executed until an action is called", "Spark skips some operations", "Data is loaded partially"],
        correctAnswer: 1,
        explanation: "Lazy evaluation means Spark builds up a logical plan of transformations but only executes when an action (like collect or save) is triggered."
      }
    ],
    content: {
      introduction: "As data volumes grow beyond what a single machine can handle, traditional tools become slow and inefficient. Apache Spark was built to solve this exact problem. It is a fast, distributed, in-memory data processing engine used to analyze massive datasets efficiently, processing data in memory instead of repeatedly writing to disk.",
      keyConcepts: [
        "In-Memory Processing: Spark processes data in memory, making it up to 100× faster than disk-based systems",
        "Driver Program: Plans and coordinates execution (like a Master Chef)",
        "Cluster Manager: Allocates CPU & memory (like a Restaurant Manager)",
        "Worker Nodes & Executors: Execute tasks in parallel (like Assistant Chefs and Cooking Stations)",
        "Lazy Evaluation: Spark builds a logical plan (DAG) for transformations, executing only when an action is called",
        "DAG (Directed Acyclic Graph): Represents the full execution plan, optimized before execution"
      ],
      coreResponsibilities: [
        "Design efficient Spark applications for batch and streaming workloads",
        "Optimize Spark jobs for performance and resource utilization using DAG optimization",
        "Manage data partitioning and cluster resources",
        "Understand the difference between Transformations (lazy) and Actions (trigger execution)",
        "Choose between RDDs and DataFrames based on use case requirements"
      ],
      toolsEcosystem: [
        "Spark SQL: Structured data processing using SQL on logs",
        "Spark Streaming: Real-time data processing for sensor streams",
        "MLlib: Machine learning library for recommendations",
        "GraphX: Graph processing for social networks",
        "Platforms: Databricks, AWS EMR, Google Dataproc, Azure HDInsight"
      ],
      comparison: {
        title: "RDDs vs DataFrames & Spark vs MapReduce",
        items: [
          "RDD: Fundamental Spark data structure, immutable, distributed, fault-tolerant using lineage",
          "DataFrame: Higher ease of use, excellent performance, automatic optimization",
          "Spark: In-memory processing, very fast, supports Batch/Streaming/ML",
          "MapReduce: Disk-based, slow, batch only, lower developer experience"
        ]
      },
      realWorldApplications: [
        "E-commerce: Product recommendations, sales analytics",
        "Finance: Fraud detection, risk modeling",
        "Healthcare: Patient data analysis, disease prediction",
        "Social Media: Trend detection, user behavior analysis"
      ],
      tipsInsights: [
        "Prefer DataFrames over RDDs for better performance through automatic optimization",
        "Transformations (filter, dropDuplicates) are lazy; Actions (count, show) trigger execution",
        "Spark supports Python, Scala, Java, and SQL for developer flexibility",
        "Spark runs on thousands of nodes, making it highly scalable"
      ],
      thinkingQuestions: [
        "How do you handle data skew in Spark applications?",
        "When would you use Spark Streaming vs batch processing?",
        "What is the execution flow from DAG Creation to Result Collection?"
      ],
      furtherReading: [
        "Learning Spark, 2nd Edition by Jules Damji et al.",
        "High Performance Spark by Holden Karau"
      ]
    }
  },
  {
    submodule: "5.1",
    moduleNumber: 5,
    title: "What is Workflow Orchestration",
    description: "Coordinate and schedule complex data tasks with DAGs.",
    resources: [
      {
        type: "Video",
        title: "Data Orchestration Explained",
        url: "https://www.youtube.com/watch?v=iyw9puEmTrA"
      },
      {
        type: "Article",
        title: "Data Orchestration Explained – Astronomer",
        url: "https://www.astronomer.io/guides/data-orchestration/"
      }
    ],
    practiceExercises: [
      "Design a workflow diagram for a daily ETL process",
      "Identify dependencies and failure handling strategies for a data pipeline"
    ],
    quizQuestions: [
      {
        id: "5.1q1",
        question: "What is the primary purpose of workflow orchestration?",
        options: ["Store data", "Coordinate and schedule data tasks", "Visualize data", "Encrypt data"],
        correctAnswer: 1,
        explanation: "Workflow orchestration coordinates, schedules, and manages the execution of data tasks and dependencies."
      },
      {
        id: "5.1q2",
        question: "What is a DAG in workflow orchestration?",
        options: ["Data Analysis Graph", "Directed Acyclic Graph", "Digital Access Gateway", "Data Archive Group"],
        correctAnswer: 1,
        explanation: "A DAG (Directed Acyclic Graph) represents workflow tasks and their dependencies, ensuring tasks execute in the correct order."
      },
      {
        id: "5.1q3",
        question: "Why is orchestration important for data pipelines?",
        options: ["It makes data smaller", "It ensures reliable and coordinated execution of tasks", "It only saves storage space", "It replaces databases"],
        correctAnswer: 1,
        explanation: "Orchestration ensures that data pipeline tasks run reliably, in the correct order, and with proper error handling."
      }
    ],
    content: {
      introduction: "Workflow orchestration is the automated coordination, scheduling, and management of complex data workflows. As data pipelines grow in complexity, orchestration becomes essential for ensuring reliable execution, managing dependencies, handling failures, and providing visibility into pipeline operations.",
      keyConcepts: [
        "DAG (Directed Acyclic Graph): Visual representation of workflow tasks and dependencies",
        "Scheduling: Time-based or event-based triggering of workflows",
        "Dependencies: Relationships between tasks that determine execution order",
        "Retry Logic: Automated handling of transient failures",
        "Monitoring & Alerting: Visibility into workflow execution and health"
      ],
      coreResponsibilities: [
        "Design workflows that are maintainable and scalable",
        "Implement robust error handling and recovery mechanisms",
        "Set up monitoring and alerting for pipeline health",
        "Manage workflow scheduling and resource allocation",
        "Document workflows and operational procedures"
      ],
      toolsEcosystem: [
        "Open Source: Apache Airflow, Prefect, Dagster, Luigi",
        "Cloud-managed: AWS Step Functions, Google Cloud Composer, Azure Data Factory",
        "Enterprise: Control-M, Autosys"
      ],
      realWorldApplications: [
        "Daily Reporting: Orchestrating ETL pipelines for business dashboards",
        "Machine Learning: Managing model training, validation, and deployment workflows",
        "Data Quality: Scheduling data validation and cleansing jobs",
        "Cross-system Integration: Coordinating data movement across multiple platforms"
      ],
      tipsInsights: [
        "Design workflows for idempotency to enable safe retries",
        "Implement proper logging for debugging and auditing",
        "Use parameterization to make workflows reusable",
        "Start with simple orchestration and add complexity as needed"
      ],
      thinkingQuestions: [
        "How do you handle dependencies between workflows?",
        "What strategies can you use to minimize the impact of failures?",
        "How do you test workflows before deploying to production?"
      ],
      furtherReading: [
        "Data Pipelines with Apache Airflow by Bas Harenslak",
        "Fundamentals of Data Engineering – Orchestration Chapter"
      ]
    }
  },
  {
    submodule: "5.2",
    moduleNumber: 5,
    title: "Apache Airflow Basics",
    description: "Build and manage data pipelines with the industry-standard orchestrator.",
    resources: [
      {
        type: "Video",
        title: "Apache Airflow in 25 Minutes",
        url: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE"
      },
      {
        type: "Article",
        title: "Airflow Concepts – Official Docs",
        url: "https://airflow.apache.org/docs/apache-airflow/stable/concepts.html"
      }
    ],
    practiceExercises: [
      "Create a simple Airflow DAG with three sequential tasks",
      "Implement error handling and retries in an Airflow DAG"
    ],
    quizQuestions: [
      {
        id: "5.2q1",
        question: "What is a DAG in Apache Airflow?",
        options: ["A database table", "A collection of tasks with dependencies", "A data format", "A scheduling algorithm"],
        correctAnswer: 1,
        explanation: "In Airflow, a DAG (Directed Acyclic Graph) is a collection of tasks organized with dependencies and scheduling information."
      },
      {
        id: "5.2q2",
        question: "What is an Operator in Airflow?",
        options: ["A person who runs Airflow", "A template for a task", "A database connection", "A logging mechanism"],
        correctAnswer: 1,
        explanation: "An Operator is a template for a specific type of task, such as running a Python function, executing a SQL query, or transferring files."
      },
      {
        id: "5.2q3",
        question: "What is the Airflow Scheduler responsible for?",
        options: ["Storing data", "Triggering DAG runs and scheduling tasks", "Visualizing dashboards", "Managing user access"],
        correctAnswer: 1,
        explanation: "The Airflow Scheduler monitors DAGs, triggers scheduled runs, and submits tasks to the executor."
      }
    ],
    content: {
      introduction: "Apache Airflow is the industry standard for workflow orchestration. It uses DAGs (Directed Acyclic Graphs) to define logic and dependencies, with operators executing work. The platform supports XCom for lightweight data sharing, TaskFlow API for simplified development, cron-based scheduling, connections and hooks for integration, and Docker-based deployment for scalability.",
      keyConcepts: [
        "DAG: Defines logic and dependencies between tasks",
        "Operators: BashOperator (shell commands), PythonOperator (Python functions), PostgreSQLOperator (SQL execution), S3KeySensor (waits for files)",
        "XCom (Cross Communication): Sharing small data between tasks (48 KB limit, metadata only)",
        "TaskFlow API (Airflow 2.0): Modern way using @dag and @task decorators with automatic dependencies and built-in XCom",
        "Schedule Interval: Supports cron expressions and presets (@daily, @hourly, @weekly)",
        "Catchup/Backfill: catchup=True runs missed DAG runs; backfill for manual execution of past dates"
      ],
      coreResponsibilities: [
        "Design and implement DAGs with proper task dependencies using >> and << operators",
        "Configure Airflow connections (PostgreSQL, AWS, S3, APIs) through Admin UI",
        "Use PostgresHook for Python-based DB access and SQL templating with {{ ds }} for execution date",
        "Manage sensors that pause workflow until conditions are met (poke_interval, timeout)",
        "Install packages using extended Docker images or requirements.txt"
      ],
      toolsEcosystem: [
        "PostgreSQL Integration: PostgreSQLOperator for SQL, PostgresHook for Python DB access, DBeaver for management",
        "S3 Integration: MinIO as local S3, S3KeySensor for file detection, AWS connection configuration",
        "Package Installation: Extend official image with requirements.txt or build from source",
        "Temporary Files: Python tempfile module for intermediate files"
      ],
      comparison: {
        title: "Key Airflow Features",
        items: [
          "Operators define behavior; tasks execute operators",
          "PythonOperator: Executes functions with parameters via op_kwargs",
          "TaskFlow API: Uses decorators, automatic dependency handling, cleaner syntax",
          "Real pipelines: PostgreSQL → S3 with temp files, dynamic file names, and logged success"
        ]
      },
      realWorldApplications: [
        "End-to-End Pipeline: Query PostgreSQL → Filter by execution date → Save to temp file → Upload to S3",
        "ETL Pipelines: Scheduled data extraction and loading workflows",
        "DB + Cloud Integration: Combining database queries with cloud storage",
        "Event-Driven Pipelines: Using sensors to wait for files before processing"
      ],
      tipsInsights: [
        "Always delete old records before inserting to avoid primary key conflicts",
        "Use tempfile module to avoid cluttering DAG folder - files are automatically deleted",
        "Function returns are automatically stored in XCom; pull using ti.xcom_pull()",
        "TaskFlow API allows returning dictionaries for multiple outputs"
      ],
      thinkingQuestions: [
        "How do you choose between extending the official Docker image vs building from source?",
        "What executor would you choose for a production deployment?",
        "How do you handle PostgreSQL → S3 pipelines with proper temp file management?"
      ],
      furtherReading: [
        "Data Pipelines with Apache Airflow by Bas Harenslak",
        "Apache Airflow Official Documentation"
      ]
    }
  },
  {
    submodule: "6.1",
    moduleNumber: 6,
    title: "What is a Data Warehouse",
    description: "Store and analyze historical data for business intelligence.",
    resources: [
      {
        type: "Video",
        title: "Data Warehouse Explained",
        url: "https://www.youtube.com/watch?v=CHYPF7jxlik"
      },
      {
        type: "Article",
        title: "Data Warehousing Concepts – IBM",
        url: "https://www.ibm.com/topics/data-warehouse"
      }
    ],
    practiceExercises: [
      "Design a simple data warehouse schema for a retail business",
      "Write SQL queries to create fact and dimension tables"
    ],
    quizQuestions: [
      {
        id: "6.1q1",
        question: "What is the primary purpose of a data warehouse?",
        options: ["Real-time transaction processing", "Long-term storage and analysis of historical data", "Storing application code", "Managing user authentication"],
        correctAnswer: 1,
        explanation: "Data warehouses are designed for storing and analyzing large volumes of historical data to support business intelligence and decision-making."
      },
      {
        id: "6.1q2",
        question: "What is a fact table in a data warehouse?",
        options: ["A table storing dimension attributes", "A table storing measurable business metrics", "A table for user management", "A temporary staging table"],
        correctAnswer: 1,
        explanation: "Fact tables store quantitative data (measures) for analysis, such as sales amounts, quantities, or counts."
      },
      {
        id: "6.1q3",
        question: "What is a dimension table?",
        options: ["A table with numerical metrics", "A table providing descriptive context for facts", "A table for storing logs", "A backup table"],
        correctAnswer: 1,
        explanation: "Dimension tables contain descriptive attributes (like customer name, product category) that provide context for fact table measures."
      }
    ],
    content: {
      introduction: "A data warehouse is a specialized relational database designed for analytical needs rather than just transactional storage. Unlike traditional databases (Oracle, MySQL, SQL Server) optimized for OLTP, data warehouses support OLAP (Online Analytical Processing) to enable complex queries and analysis. Data warehouses consolidate data from multiple sources into a centralized repository, including raw data, metadata, and aggregated data.",
      keyConcepts: [
        "OLAP: Enables multi-dimensional data analysis using OLAP cubes (3D or higher dimensional structures)",
        "OLAP Cubes: Three types - MOLAP, ROLAP, HOLAP - allowing users to view data from different dimensions",
        "Dimension Tables: Contain descriptive attributes related to business entities (Customer, Product, Date)",
        "Fact Tables: Contain measurable data (facts) such as sales quantities or revenue, linked to dimensions via keys",
        "ETL Process: Data transferred first to staging area, then into warehouse",
        "Data Marts: Subsets of warehouse tailored to specific user groups with restricted access"
      ],
      coreResponsibilities: [
        "Design dimensional models that support business analytics needs",
        "Implement ETL/ELT processes to populate the warehouse",
        "Perform OLAP operations: Roll-up, Drill-down, Slice, Dice, Pivot",
        "Manage data retention and archival policies",
        "Ensure data quality and consistency"
      ],
      toolsEcosystem: [
        "Cloud Warehouses: Snowflake, Google BigQuery, Amazon Redshift, Azure Synapse",
        "On-Premise: Teradata, Oracle Data Warehouse, IBM Db2 Warehouse",
        "Transformation: dbt, Matillion, Informatica",
        "BI Tools: Tableau, Looker, Power BI, Metabase"
      ],
      realWorldApplications: [
        "Business Intelligence: Executive dashboards and KPI tracking",
        "Financial Reporting: Consolidated financial statements and analysis",
        "Customer Analytics: Customer segmentation and lifetime value analysis",
        "Supply Chain: Inventory optimization and demand forecasting"
      ],
      tipsInsights: [
        "Cloud data warehouses have dramatically reduced time-to-value",
        "Focus on business requirements when designing dimensional models",
        "Implement incremental loading to improve efficiency",
        "Consider data marts for department-specific analytical needs"
      ],
      thinkingQuestions: [
        "How do you decide between a data warehouse and a data lake?",
        "What strategies can improve query performance in a data warehouse?",
        "How do you handle late-arriving data in a data warehouse?"
      ],
      furtherReading: [
        "The Data Warehouse Toolkit by Ralph Kimball",
        "Building a Scalable Data Warehouse with Data Vault 2.0 by Dan Linstedt"
      ]
    }
  },
  {
    submodule: "6.2",
    moduleNumber: 6,
    title: "OLAP vs OLTP",
    description: "Differentiate transactional and analytical database systems.",
    resources: [
      {
        type: "Video",
        title: "OLAP vs OLTP Explained",
        url: "https://www.youtube.com/watch?v=P7hf_emjsRI"
      },
      {
        type: "Article",
        title: "OLAP vs OLTP – GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-olap-and-oltp/"
      }
    ],
    practiceExercises: [
      "Identify whether given scenarios require OLAP or OLTP systems",
      "Design appropriate schemas for both OLAP and OLTP use cases"
    ],
    quizQuestions: [
      {
        id: "6.2q1",
        question: "What does OLTP stand for?",
        options: ["Online Transaction Processing", "Online Total Processing", "Offline Transaction Processing", "Online Text Processing"],
        correctAnswer: 0,
        explanation: "OLTP stands for Online Transaction Processing, designed for managing day-to-day transactional operations."
      },
      {
        id: "6.2q2",
        question: "Which system is optimized for complex analytical queries?",
        options: ["OLTP", "OLAP", "Both equally", "Neither"],
        correctAnswer: 1,
        explanation: "OLAP (Online Analytical Processing) systems are specifically optimized for complex queries, aggregations, and analytical workloads."
      },
      {
        id: "6.2q3",
        question: "What type of schema is typically used in OLTP systems?",
        options: ["Star schema", "Snowflake schema", "Normalized schema", "No schema"],
        correctAnswer: 2,
        explanation: "OLTP systems typically use normalized schemas (3NF) to minimize data redundancy and ensure data integrity during transactions."
      }
    ],
    content: {
      introduction: "A detailed comparison between Online Analytical Processing (OLAP) and Online Transactional Processing (OLTP) systems. OLAP is designed for multi-dimensional, high-speed analysis of large, aggregated datasets, while OLTP focuses on real-time execution of numerous simple transactions, serving many users simultaneously.",
      keyConcepts: [
        "OLAP: Multi-dimensional analysis using OLAP cubes, ideal for data mining, business intelligence, and reporting",
        "OLTP: Powers everyday transactional systems (ATMs, purchases, reservations, password changes, messaging)",
        "OLAP Cubes: Multi-layered view with dimensions (region, time, product) allowing drill-down exploration",
        "OLTP Databases: Optimized for processing large volumes of simple transactions quickly with millisecond response times",
        "Star/Snowflake Schema: Used for OLAP historical aggregated data storage"
      ],
      coreResponsibilities: [
        "Choose appropriate systems based on workload characteristics",
        "Design schemas optimized for the specific use case (normalized for OLTP, dimensional for OLAP)",
        "Implement data movement from OLTP to OLAP systems",
        "Ensure OLTP systems maintain data integrity and rapid transaction throughput",
        "Support 24/7/365 availability with continuous incremental backups for OLTP"
      ],
      toolsEcosystem: [
        "OLTP Databases: PostgreSQL, MySQL, Oracle, SQL Server",
        "OLAP Systems: Snowflake, BigQuery, Redshift, ClickHouse, Data Warehouses",
        "Hybrid: SingleStore, CockroachDB (HTAP systems)"
      ],
      comparison: {
        title: "OLAP vs OLTP Comparison",
        items: [
          "OLAP: Complex multi-dimensional data analysis; OLTP: Real-time high-volume transactions",
          "OLAP: Aggregated historical data; OLTP: Current transactional data",
          "OLAP: Data scientists, business analysts; OLTP: Frontline workers, customers",
          "OLAP: Business intelligence, forecasting; OLTP: ATM transactions, retail purchases"
        ]
      },
      realWorldApplications: [
        "OLAP: Financial analysis, budgeting, sales forecasting, business reporting",
        "OLTP: ATM transactions, in-store purchases, hotel reservations, online banking",
        "Integration: OLTP provides real-time data feed that OLAP uses for deeper analysis"
      ],
      tipsInsights: [
        "OLAP and OLTP serve complementary roles - OLTP handles everyday transactions, OLAP enables strategic decision-making",
        "Organizations often integrate both systems with OLTP feeding into OLAP",
        "OLAP cubes provide multi-layered views allowing detailed exploration across dimensions",
        "OLTP systems ensure data integrity critical for operational functions"
      ],
      thinkingQuestions: [
        "When would you consider a hybrid HTAP system?",
        "How do you determine the right refresh frequency for OLAP data from OLTP sources?",
        "What are the trade-offs of running analytics directly on OLTP systems?"
      ],
      furtherReading: [
        "Designing Data-Intensive Applications – OLTP and OLAP Chapter",
        "The Data Warehouse Toolkit by Ralph Kimball"
      ]
    }
  },
  {
    submodule: "7.1",
    moduleNumber: 7,
    title: "Streaming Data Concepts",
    description: "Process continuous data flows for real-time analytics.",
    resources: [
      {
        type: "Video",
        title: "Batch vs Streaming Data",
        url: "https://youtu.be/A3Mvy8WMk04"
      },
      {
        type: "Article",
        title: "Streaming Data Explained – Confluent",
        url: "https://www.confluent.io/learn/stream-processing/"
      }
    ],
    practiceExercises: [
      "Design a streaming architecture for a real-time dashboard",
      "Compare latency requirements for batch vs streaming scenarios"
    ],
    quizQuestions: [
      {
        id: "7.1q1",
        question: "What is streaming data?",
        options: ["Data stored in files", "Continuous flow of data generated in real-time", "Compressed data", "Archived data"],
        correctAnswer: 1,
        explanation: "Streaming data refers to data that is continuously generated and needs to be processed as it arrives."
      },
      {
        id: "7.1q2",
        question: "What is a key advantage of stream processing over batch processing?",
        options: ["Lower storage costs", "Real-time or near-real-time insights", "Simpler implementation", "Better data quality"],
        correctAnswer: 1,
        explanation: "Stream processing enables organizations to gain insights from data as it arrives, rather than waiting for batch jobs to complete."
      },
      {
        id: "7.1q3",
        question: "What is event time vs processing time?",
        options: ["They are the same", "Event time is when data was created; processing time is when it is processed", "Processing time is always earlier", "Event time is only for batch systems"],
        correctAnswer: 1,
        explanation: "Event time refers to when an event actually occurred, while processing time is when the system processes it. The difference matters for accurate analytics."
      }
    ],
    content: {
      introduction: "Overview of batch processing systems, stream processing systems, and the hybrid concept of micro-batching. Batch processing involves processing large volumes of data collected over a period, while stream processing handles data continuously in real time. Micro-batching combines both by collecting data in short intervals and processing it continuously.",
      keyConcepts: [
        "Batch Processing: Processes data in scheduled or ad hoc runs, suitable for large end-of-day files",
        "Stream Processing: Processes data continuously as it arrives, ideal for instant feedback and anomaly detection",
        "Micro-Batching: Collects data in short intervals, faster than batch but not fully real-time",
        "Event Time vs Processing Time: When events occur vs when they are processed"
      ],
      coreResponsibilities: [
        "Design streaming architectures using Kafka or Amazon Kinesis Data Streams",
        "Implement batch processing with Hadoop, Apache Spark, and HDFS storage",
        "Handle late-arriving and out-of-order events",
        "Build hybrid architectures combining batch and stream processing",
        "Monitor streaming pipeline health and throughput"
      ],
      toolsEcosystem: [
        "Batch: Hadoop, Apache Spark, HDFS, Tableau, Qlik Sense",
        "Stream: Apache Flink, Apache Storm, Apache Beam, Spark Streaming, Kafka, Amazon Kinesis",
        "Cloud: Amazon Kinesis Data Analytics, Amazon S3, Amazon EMR, Elasticsearch, Amazon Glacier"
      ],
      comparison: {
        title: "Batch vs Streaming",
        items: [
          "Batch: Large files processed once per day/month, historical data analysis",
          "Streaming: Real-time data pushed continuously for filtering, aggregating, and alerting",
          "Micro-batching: Balance between scheduled batch and real-time streaming",
          "Hybrid Architecture: Instant insights (streaming) + deep historical analysis (batching)"
        ]
      },
      realWorldApplications: [
        "Netflix: Amazon Kinesis, CloudWatch, Apache Flink for terabytes of logs daily",
        "Nasdaq: Amazon EMR, Redshift, S3, Hardware Security Module for highly secure historical data",
        "Security Monitoring: Stream processing to identify anomalies and trigger security alerts",
        "Analytics Applications: Live dashboards from streaming + historical analysis from batch"
      ],
      tipsInsights: [
        "Batch excels for large, periodic data requiring historical analysis",
        "Stream suits applications needing immediate processing and real-time decisions",
        "Micro-batching balances latency and throughput",
        "Security and compliance can influence architecture choices"
      ],
      thinkingQuestions: [
        "How do you handle late-arriving events in a streaming system?",
        "When is batch processing still the better choice?",
        "How do you ensure exactly-once processing in a distributed system?"
      ],
      furtherReading: [
        "Streaming Systems by Tyler Akidau",
        "Kafka: The Definitive Guide by Neha Narkhede"
      ]
    }
  },
  {
    submodule: "7.2",
    moduleNumber: 7,
    title: "Apache Kafka Basics",
    description: "Build event-driven architectures with distributed streaming.",
    resources: [
      {
        type: "Video",
        title: "Apache Kafka in 30 Minutes",
        url: "https://www.youtube.com/watch?v=uvb00oaa3k8"
      },
      {
        type: "Article",
        title: "Kafka Basics – Official Docs",
        url: "https://kafka.apache.org/intro"
      }
    ],
    practiceExercises: [
      "Design Kafka topics and partitioning strategy for an e-commerce platform",
      "Write a simple Kafka producer and consumer in Python"
    ],
    quizQuestions: [
      {
        id: "7.2q1",
        question: "What is Apache Kafka primarily used for?",
        options: ["Storing relational data", "Distributed event streaming", "Machine learning", "Data visualization"],
        correctAnswer: 1,
        explanation: "Apache Kafka is a distributed event streaming platform used for building real-time data pipelines and streaming applications."
      },
      {
        id: "7.2q2",
        question: "What is a Kafka topic?",
        options: ["A database table", "A category to which records are published", "A Kafka server", "A consumer group"],
        correctAnswer: 1,
        explanation: "A Kafka topic is a category or feed name to which records are published. Topics are partitioned and replicated across the cluster."
      },
      {
        id: "7.2q3",
        question: "What is the purpose of partitions in Kafka?",
        options: ["Data encryption", "Parallel processing and scalability", "Data compression", "User authentication"],
        correctAnswer: 1,
        explanation: "Partitions allow Kafka to parallelize processing by distributing data across multiple brokers, enabling horizontal scalability."
      }
    ],
    content: {
      introduction: "Apache Kafka is a distributed event streaming platform designed for handling massive pipelines of real-time data at scale. Originally created at LinkedIn in 2011, it organizes data as an ordered, immutable log called a topic. Each event (record) includes a key, value, timestamp, and optional metadata. Events are durably stored on disk and Kafka guarantees consumers read events in exactly the same order.",
      keyConcepts: [
        "Topics: Logical channels organizing data as ordered, immutable logs that can persist indefinitely",
        "Partitions: Subdivisions distributed across brokers for fault tolerance and scalability",
        "Producers and Consumers: Producers publish events; consumers subscribe and can read latest, entire log, or subset using offsets",
        "Brokers: Kafka servers that store data and serve clients in a cluster",
        "Streams API: Enables stateless transformations (filtering) and stateful transformations (aggregations over time windows)"
      ],
      coreResponsibilities: [
        "Design topic and partition strategies for scalability",
        "Implement reliable producers and consumers",
        "Manage cluster with Zookeeper or KRaft mode",
        "Manage data retention and cleanup policies",
        "Use Streams API for complex stream transformations and aggregations"
      ],
      toolsEcosystem: [
        "Kafka Core: Brokers, producers, consumers",
        "Kafka Streams: Stream processing with Java support for stateless and stateful transformations",
        "Cluster Management: Zookeeper or KRaft mode",
        "Managed Services: Confluent Cloud, Amazon MSK, Azure Event Hubs"
      ],
      realWorldApplications: [
        "Lyft: Collecting and processing geolocation data",
        "Spotify & Netflix: Log processing at scale",
        "Cloudflare: Real-time analytics",
        "Microservices Communication: Async messaging between services"
      ],
      tipsInsights: [
        "Kafka's distributed architecture ensures fault tolerance and horizontal scalability",
        "The Streams API enhances functionality with complex stream transformations and aggregations",
        "Kafka's log-based design guarantees event ordering and durability",
        "Start by starting Zookeeper, then Kafka server, create topics, publish events, consume with offset control"
      ],
      thinkingQuestions: [
        "How do you determine the optimal number of partitions for a topic?",
        "What happens when a consumer in a group fails?",
        "How do you ensure message ordering in a Kafka topic?"
      ],
      furtherReading: [
        "Kafka: The Definitive Guide by Neha Narkhede",
        "Designing Event-Driven Systems by Ben Stopford"
      ]
    }
  },
  {
    submodule: "8.1",
    moduleNumber: 8,
    title: "Data Quality Concepts",
    description: "Ensure accuracy, completeness, and reliability of your data.",
    resources: [
      {
        type: "Video",
        title: "Data Quality Explained",
        url: "https://www.youtube.com/watch?v=_AA1JHjmg78"
      },
      {
        type: "Article",
        title: "Data Quality Basics – Talend",
        url: "https://www.talend.com/resources/what-is-data-quality/"
      }
    ],
    practiceExercises: [
      "Define data quality rules for a customer dataset",
      "Write validation checks for common data quality issues"
    ],
    quizQuestions: [
      {
        id: "8.1q1",
        question: "What are the key dimensions of data quality?",
        options: ["Speed and size", "Accuracy, completeness, consistency, and timeliness", "Cost and efficiency", "Format and storage"],
        correctAnswer: 1,
        explanation: "Data quality is typically measured across dimensions including accuracy, completeness, consistency, timeliness, and validity."
      },
      {
        id: "8.1q2",
        question: "What is data profiling?",
        options: ["Encrypting sensitive data", "Analyzing data to understand its structure and quality", "Deleting old data", "Compressing data"],
        correctAnswer: 1,
        explanation: "Data profiling is the process of examining data to understand its structure, content, relationships, and quality characteristics."
      },
      {
        id: "8.1q3",
        question: "Why is data quality important in data engineering?",
        options: ["It only affects storage costs", "Poor quality data leads to incorrect insights and business decisions", "It is only relevant for data scientists", "It only matters for real-time systems"],
        correctAnswer: 1,
        explanation: "Data quality directly impacts the reliability of analytics, machine learning models, and business decisions based on data."
      }
    ],
    content: {
      introduction: "Quality is difficult to define clearly because it depends on context, usage, and expectations. In data systems, quality is not just about correctness but about whether data is usable, supports decision-making, and avoids confusion and inefficiency. Quality problems often remain hidden until they cause losses in time, money, or credibility.",
      keyConcepts: [
        "Accuracy: Data must be correct and error-free",
        "Completeness: No missing or blank values",
        "Consistency: Same data should match across systems",
        "Timeliness: Data must be available at the right time",
        "Clarity: Data and communication should be easily understood",
        "Standardization: Uniform formats and rules",
        "Validity: Data should follow defined rules",
        "Confirmation: Data must be verified before use"
      ],
      coreResponsibilities: [
        "Implement data validation at ingestion and transformation stages",
        "Set up monitoring and alerting for data quality issues",
        "Introduce uniform standards across regions and systems",
        "Implement validation checks and confirmation workflows",
        "Automate data capture to reduce spelling errors and manual mistakes"
      ],
      toolsEcosystem: [
        "Data Quality Frameworks: Great Expectations, Deequ, Soda",
        "Data Observability: Monte Carlo, Bigeye, Datadog",
        "Profiling: pandas-profiling, Apache Griffin",
        "Testing: dbt tests, custom validation scripts"
      ],
      realWorldApplications: [
        "Management Decisions: Poor data quality affects strategies and performance measurement",
        "Shareholder Confidence: Unreliable data leads to misleading reports",
        "Process Quality: Delayed notifications, poor coordination, unclear responsibility",
        "Organizational Performance: Confusion, delays, financial and operational loss"
      ],
      tipsInsights: [
        "Data quality is a system-wide responsibility involving people, processes, and technology",
        "Quality failures mostly arise from poor coordination, lack of clarity, and inconsistent systems",
        "Quality must be built from the source, not corrected at the end",
        "Poor quality leads to wastage of time, money, and repetition of work"
      ],
      thinkingQuestions: [
        "How do you handle regional and state-level format variations?",
        "What metrics would you track to measure overall data quality?",
        "How do you balance data quality checks with pipeline performance?"
      ],
      furtherReading: [
        "Data Quality: The Accuracy Dimension by Jack Olson",
        "Fundamentals of Data Engineering – Data Quality Chapter"
      ]
    }
  },
  {
    submodule: "8.2",
    moduleNumber: 8,
    title: "Data Governance Basics",
    description: "Implement policies for data management, security, and compliance.",
    resources: [
      {
        type: "Video",
        title: "Data Governance Explained",
        url: "https://www.youtube.com/watch?v=24Ki4Ck4Y2E"
      },
      {
        type: "Article",
        title: "Data Governance Overview – IBM",
        url: "https://www.ibm.com/topics/data-governance"
      }
    ],
    practiceExercises: [
      "Create a data governance policy document for a sample organization",
      "Design a data access control matrix for different user roles"
    ],
    quizQuestions: [
      {
        id: "8.2q1",
        question: "What is data governance?",
        options: ["Only about data security", "A framework for managing data assets, quality, and compliance", "Just data storage management", "Only for large enterprises"],
        correctAnswer: 1,
        explanation: "Data governance is a comprehensive framework that includes policies, processes, and standards for managing data assets throughout their lifecycle."
      },
      {
        id: "8.2q2",
        question: "What is a data catalog?",
        options: ["A database backup system", "A searchable inventory of data assets with metadata", "A data compression tool", "A data visualization platform"],
        correctAnswer: 1,
        explanation: "A data catalog is a centralized inventory that provides metadata about data assets, making it easier to discover, understand, and use data."
      },
      {
        id: "8.2q3",
        question: "What is data lineage?",
        options: ["Data encryption method", "Tracking data origin and transformations through its lifecycle", "Data storage format", "Data access control"],
        correctAnswer: 1,
        explanation: "Data lineage tracks the origin of data and how it transforms as it moves through systems, enabling impact analysis and troubleshooting."
      }
    ],
    content: {
      introduction: "Data governance is the framework of policies, processes, and standards that ensure data is managed as a valuable organizational asset. Effective data governance enables organizations to maintain data quality, ensure compliance, protect sensitive information, and maximize the value derived from data.",
      keyConcepts: [
        "Data Stewardship: Assigned responsibility for data quality and standards",
        "Metadata Management: Managing information about data assets",
        "Data Lineage: Tracking data flow from source to consumption",
        "Data Catalog: Searchable inventory of data assets",
        "Access Control: Managing who can access and modify data",
        "Compliance: Ensuring data handling meets regulatory requirements"
      ],
      coreResponsibilities: [
        "Implement and enforce data governance policies",
        "Maintain data catalogs and metadata repositories",
        "Track and document data lineage across systems",
        "Manage access controls and security classifications",
        "Support compliance with regulations (GDPR, HIPAA, etc.)"
      ],
      toolsEcosystem: [
        "Data Catalogs: Alation, Collibra, DataHub, Apache Atlas",
        "Lineage Tools: Marquez, OpenLineage, Atlan",
        "Access Management: Apache Ranger, AWS Lake Formation",
        "Compliance: OneTrust, BigID, Immuta"
      ],
      realWorldApplications: [
        "Regulatory Compliance: Meeting GDPR, CCPA, HIPAA requirements",
        "Data Discovery: Enabling analysts to find and understand data",
        "Impact Analysis: Understanding how changes affect downstream systems",
        "Data Privacy: Implementing data masking and access controls",
        "Audit Trails: Maintaining records for regulatory audits"
      ],
      tipsInsights: [
        "Start small – governance is a journey, not a destination",
        "Get executive sponsorship for governance initiatives",
        "Automate lineage capture where possible",
        "Make the data catalog a central part of the data workflow"
      ],
      thinkingQuestions: [
        "How do you balance data accessibility with security requirements?",
        "What strategies help drive adoption of data governance practices?",
        "How do you implement data governance in a decentralized organization?"
      ],
      furtherReading: [
        "Data Governance: How to Design, Deploy, and Sustain an Effective Program by John Ladley",
        "DMBOK: Data Management Body of Knowledge"
      ]
    }
  },
  {
    submodule: "9.1",
    moduleNumber: 9,
    title: "End-to-End Data Engineering Project",
    description: "Build a complete data pipeline from ingestion to analytics.",
    resources: [
      {
        type: "Video",
        title: "Build a Simple E-commerce Data Pipeline",
        url: "https://www.youtube.com/watch?v=IBydayIGCbQ"
      }
    ],
    practiceExercises: [
      "Build a complete data pipeline from source to analytics",
      "Implement monitoring and alerting for your pipeline",
      "Document your architecture and design decisions"
    ],
    quizQuestions: [
      {
        id: "9.1q1",
        question: "What should be the first step in a data engineering project?",
        options: ["Start coding immediately", "Understand business requirements and data sources", "Choose the latest technology", "Deploy to production"],
        correctAnswer: 1,
        explanation: "Understanding business requirements and data sources is essential before designing and implementing any data solution."
      },
      {
        id: "9.1q2",
        question: "Why is documentation important in data engineering projects?",
        options: ["It is not important", "For team collaboration, maintenance, and knowledge transfer", "Only for compliance", "It slows down development"],
        correctAnswer: 1,
        explanation: "Documentation enables team collaboration, simplifies maintenance, facilitates knowledge transfer, and helps troubleshooting."
      },
      {
        id: "9.1q3",
        question: "What is the best approach to building a data pipeline?",
        options: ["Build everything at once", "Start simple and iterate based on feedback", "Copy from other projects", "Focus only on performance"],
        correctAnswer: 1,
        explanation: "An iterative approach allows you to validate requirements early, get feedback, and continuously improve the solution."
      }
    ],
    content: {
      introduction: "This capstone project brings together all the concepts covered in this course. You will design and implement a complete data engineering solution, from ingesting raw data to serving analytics-ready datasets. This hands-on experience will prepare you for real-world data engineering challenges.",
      keyConcepts: [
        "End-to-End Architecture: Designing complete data solutions",
        "Project Scoping: Defining requirements and success criteria",
        "Technology Selection: Choosing appropriate tools for the task",
        "Implementation: Building reliable and maintainable systems",
        "Testing & Validation: Ensuring solution correctness",
        "Documentation: Communicating design decisions and operations"
      ],
      coreResponsibilities: [
        "Gather and document project requirements",
        "Design the data architecture and data model",
        "Implement ingestion, transformation, and serving layers",
        "Set up monitoring, alerting, and observability",
        "Write comprehensive documentation"
      ],
      toolsEcosystem: [
        "Ingestion: Python, Airbyte, Kafka",
        "Storage: PostgreSQL, Cloud Data Lake, Data Warehouse",
        "Transformation: dbt, Apache Spark, Python",
        "Orchestration: Apache Airflow, Prefect",
        "Serving: BI Tools, APIs"
      ],
      realWorldApplications: [
        "E-commerce Analytics: Sales, inventory, and customer behavior analysis",
        "IoT Data Platform: Sensor data collection and monitoring",
        "Financial Dashboard: Revenue tracking and forecasting",
        "Marketing Analytics: Campaign performance and attribution"
      ],
      tipsInsights: [
        "Start with a clear scope and minimum viable product",
        "Focus on data quality from the beginning",
        "Build for observability – you will need to debug issues",
        "Document as you go, not at the end",
        "Test your pipelines with realistic data volumes"
      ],
      thinkingQuestions: [
        "How would you scale this solution for 10x the data volume?",
        "What would you do differently if starting this project again?",
        "How would you present this project to stakeholders?"
      ],
      furtherReading: [
        "Fundamentals of Data Engineering by Joe Reis and Matt Housley",
        "The Data Engineering Cookbook – Andreas Kretz"
      ]
    }
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

// Convert title to URL-friendly slug
export const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Get submodule ID from slug
export const getSubmoduleIdFromSlug = (slug: string): string | undefined => {
  const submodule = submodules.find(s => titleToSlug(s.title) === slug);
  return submodule?.submodule;
};

// Get slug from submodule ID
export const getSlugFromSubmoduleId = (submoduleId: string): string | undefined => {
  const submodule = submodules.find(s => s.submodule === submoduleId);
  return submodule ? titleToSlug(submodule.title) : undefined;
};
