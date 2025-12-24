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
      introduction: "Data Engineering is the discipline of designing, building, and maintaining systems that collect, store, and analyze data at scale. As organizations increasingly rely on data-driven decision making, Data Engineers serve as the architects of the data ecosystem, ensuring that data flows seamlessly from source systems to analytical platforms.",
      keyConcepts: [
        "Data Infrastructure: The foundational systems and technologies that support data collection, storage, and processing",
        "Data Pipelines: Automated workflows that move and transform data between systems",
        "Data Quality: Ensuring accuracy, completeness, and reliability of data",
        "Scalability: Building systems that can handle growing data volumes efficiently",
        "Data Governance: Policies and practices for managing data assets"
      ],
      coreResponsibilities: [
        "Design and implement data architectures that support business requirements",
        "Build and maintain ETL/ELT pipelines for data integration",
        "Optimize database performance and query efficiency",
        "Ensure data security, privacy, and compliance",
        "Collaborate with Data Scientists and Analysts to understand data needs",
        "Monitor and troubleshoot data systems for reliability"
      ],
      toolsEcosystem: [
        "Programming: Python, SQL, Scala, Java",
        "Databases: PostgreSQL, MySQL, MongoDB, Cassandra",
        "Big Data: Apache Spark, Hadoop, Hive",
        "Cloud Platforms: AWS, Google Cloud, Azure",
        "Orchestration: Apache Airflow, Prefect, Dagster",
        "Streaming: Apache Kafka, Apache Flink"
      ],
      realWorldApplications: [
        "E-commerce: Processing millions of transactions and user interactions daily",
        "Healthcare: Managing patient data while ensuring HIPAA compliance",
        "Finance: Real-time fraud detection and risk analysis",
        "Social Media: Handling petabytes of user-generated content",
        "IoT: Processing sensor data from connected devices"
      ],
      tipsInsights: [
        "Start with understanding the business problem before designing technical solutions",
        "Documentation is crucial – your future self and teammates will thank you",
        "Always consider data quality at the source, not as an afterthought",
        "Learn to balance between perfect architecture and practical delivery",
        "Stay updated with emerging technologies but master the fundamentals first"
      ],
      thinkingQuestions: [
        "How would you design a data pipeline that handles 10x the current data volume?",
        "What are the trade-offs between batch and real-time data processing?",
        "How do you ensure data consistency across distributed systems?"
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
      introduction: "The Data Engineering Lifecycle provides a comprehensive framework for understanding how data flows through an organization, from its origin to its ultimate consumption. This lifecycle approach helps Data Engineers systematically address challenges at each stage while maintaining focus on delivering value to stakeholders.",
      keyConcepts: [
        "Generation: Data is created from source systems, applications, IoT devices, or user interactions",
        "Ingestion: Moving data from source systems to storage or processing platforms",
        "Transformation: Converting raw data into formats suitable for analysis",
        "Storage: Persisting data in appropriate systems based on access patterns",
        "Serving: Making data available for analytics, ML, and business applications"
      ],
      coreResponsibilities: [
        "Define data contracts with upstream data producers",
        "Implement reliable ingestion mechanisms for various data sources",
        "Design transformation logic that ensures data quality",
        "Select appropriate storage solutions based on use cases",
        "Build serving layers that meet performance requirements"
      ],
      toolsEcosystem: [
        "Ingestion: Apache Kafka, AWS Kinesis, Fivetran, Airbyte",
        "Transformation: dbt, Apache Spark, Pandas",
        "Storage: Data Lakes (S3, ADLS), Data Warehouses (Snowflake, BigQuery)",
        "Serving: APIs, BI Tools (Tableau, Looker), Feature Stores"
      ],
      realWorldApplications: [
        "Retail: Tracking customer journey from website visit to purchase",
        "Manufacturing: Monitoring production line efficiency in real-time",
        "Media: Personalizing content recommendations based on user behavior",
        "Logistics: Optimizing delivery routes using location data"
      ],
      tipsInsights: [
        "Think of the lifecycle as a continuous loop, not a linear process",
        "Each stage should have clear SLAs and monitoring",
        "Data quality issues are cheaper to fix earlier in the lifecycle",
        "Consider both current and future requirements when designing stages"
      ],
      thinkingQuestions: [
        "How do you handle late-arriving data in your pipeline?",
        "What metrics would you track to measure pipeline health?",
        "How do you version and document changes to transformation logic?"
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
      introduction: "A data pipeline is an automated series of processes that move data from one or more sources to one or more destinations, typically including transformations along the way. Modern organizations rely on data pipelines to ensure timely and reliable access to clean, consistent data for decision-making.",
      keyConcepts: [
        "Source Systems: Origins of data including databases, APIs, files, and streaming sources",
        "Destinations: Target systems such as data warehouses, data lakes, or applications",
        "Transformations: Operations that clean, enrich, aggregate, or restructure data",
        "Scheduling: Mechanisms for triggering pipeline execution (time-based, event-based)",
        "Monitoring: Observability into pipeline health, performance, and data quality"
      ],
      coreResponsibilities: [
        "Define clear data contracts between source and destination systems",
        "Implement error handling and retry mechanisms",
        "Ensure data quality checks at critical pipeline stages",
        "Optimize for performance while maintaining reliability",
        "Document pipeline logic and dependencies"
      ],
      toolsEcosystem: [
        "Batch Processing: Apache Spark, AWS Glue, Azure Data Factory",
        "Streaming: Apache Kafka, Apache Flink, AWS Kinesis",
        "Orchestration: Apache Airflow, Prefect, Dagster",
        "Data Integration: Fivetran, Airbyte, Stitch"
      ],
      comparison: {
        title: "Batch vs Streaming Pipelines",
        items: [
          "Batch: Processes data in scheduled intervals; suitable for non-time-sensitive workloads",
          "Streaming: Processes data in real-time or near-real-time; ideal for time-sensitive use cases",
          "Batch: Easier to implement and debug; lower infrastructure costs",
          "Streaming: More complex architecture; handles continuous data flows"
        ]
      },
      realWorldApplications: [
        "Data Warehousing: Consolidating data from multiple operational systems",
        "Machine Learning: Preparing training data for model development",
        "Business Intelligence: Feeding dashboards with up-to-date metrics",
        "Data Synchronization: Keeping systems in sync across the organization"
      ],
      tipsInsights: [
        "Start simple and iterate – avoid over-engineering initially",
        "Build pipelines with testability in mind from the start",
        "Implement comprehensive logging for debugging",
        "Consider data lineage to track data origins and transformations"
      ],
      thinkingQuestions: [
        "When would you choose a streaming pipeline over a batch pipeline?",
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
      introduction: "ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform) represent two fundamental approaches to data integration. Understanding when to use each approach is essential for designing efficient data architectures that meet business requirements while optimizing for cost and performance.",
      keyConcepts: [
        "ETL: Transform data in a staging area before loading to the destination",
        "ELT: Load raw data first, then transform within the destination system",
        "Staging Area: Intermediate storage for data processing in ETL workflows",
        "Push-down Optimization: Leveraging destination system compute for transformations"
      ],
      coreResponsibilities: [
        "Evaluate business requirements to choose the appropriate approach",
        "Design staging areas and transformation logic",
        "Optimize data loading strategies for performance",
        "Implement data quality checks at appropriate stages"
      ],
      toolsEcosystem: [
        "ETL Tools: Informatica, Talend, SSIS, Apache NiFi",
        "ELT Tools: dbt, Fivetran + Snowflake, Matillion",
        "Cloud Warehouses (for ELT): Snowflake, BigQuery, Redshift, Databricks"
      ],
      comparison: {
        title: "ETL vs ELT Comparison",
        items: [
          "ETL: Better for complex transformations requiring specialized processing",
          "ELT: Ideal when leveraging cloud warehouse compute capabilities",
          "ETL: Lower storage costs as only transformed data is stored",
          "ELT: Greater flexibility for ad-hoc analysis on raw data",
          "ETL: Longer development cycles due to upfront transformation design",
          "ELT: Faster time-to-insight with schema-on-read approaches"
        ]
      },
      realWorldApplications: [
        "Legacy Modernization: Migrating from ETL to ELT when adopting cloud warehouses",
        "Real-time Analytics: Using ELT for faster data availability",
        "Compliance: ETL for sensitive data that requires transformation before storage",
        "Data Lakes: ELT pattern for storing raw data with on-demand transformations"
      ],
      tipsInsights: [
        "Modern data stacks increasingly favor ELT due to cloud warehouse capabilities",
        "ETL remains relevant for edge computing and IoT scenarios",
        "Consider hybrid approaches that combine benefits of both",
        "dbt has become the industry standard for ELT transformations"
      ],
      thinkingQuestions: [
        "How does the choice between ETL and ELT affect data governance?",
        "What factors would lead you to choose ETL over ELT?",
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
      introduction: "Data modeling is the process of creating a visual representation of data structures and their relationships. It serves as a critical bridge between business requirements and technical implementation, ensuring that databases are designed to efficiently support organizational needs.",
      keyConcepts: [
        "Conceptual Model: High-level representation of business entities and relationships",
        "Logical Model: Detailed structure independent of specific database technology",
        "Physical Model: Implementation-specific design including data types and indexes",
        "Entity-Relationship Diagrams: Visual notation for representing data models",
        "Dimensional Modeling: Technique for designing data warehouses (star/snowflake schemas)"
      ],
      coreResponsibilities: [
        "Translate business requirements into data models",
        "Design schemas that balance normalization and performance",
        "Document data models for team collaboration",
        "Evolve models as business requirements change",
        "Ensure consistency across different data systems"
      ],
      toolsEcosystem: [
        "Modeling Tools: ERwin, IBM InfoSphere, Lucidchart, draw.io",
        "Documentation: Data dictionaries, metadata catalogs",
        "Version Control: Schema versioning with tools like Flyway, Liquibase"
      ],
      comparison: {
        title: "OLTP vs OLAP Data Models",
        items: [
          "OLTP: Normalized schemas optimized for transactional operations",
          "OLAP: Dimensional schemas (star/snowflake) optimized for analytical queries",
          "OLTP: Frequent small updates and inserts",
          "OLAP: Large batch loads with complex read queries"
        ]
      },
      realWorldApplications: [
        "Enterprise Data Warehouse: Star schema for business intelligence",
        "Customer 360: Unified customer data model across touchpoints",
        "Supply Chain: Modeling complex relationships between suppliers, products, and logistics",
        "Financial Reporting: Dimensional models for financial analysis"
      ],
      tipsInsights: [
        "Involve business stakeholders in conceptual modeling",
        "Document assumptions and business rules in the model",
        "Plan for schema evolution from the beginning",
        "Consider both current and future analytical requirements"
      ],
      thinkingQuestions: [
        "How do you handle slowly changing dimensions in a data warehouse?",
        "When would you choose a snowflake schema over a star schema?",
        "How do you model many-to-many relationships in dimensional modeling?"
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
      introduction: "Big Data refers to datasets that are too large, complex, or fast-moving to be processed by traditional data management tools. The Big Data revolution has transformed how organizations collect, store, and analyze information, enabling insights that were previously impossible to obtain.",
      keyConcepts: [
        "Volume: The massive scale of data generated and stored",
        "Variety: Different types of data – structured, semi-structured, unstructured",
        "Velocity: The speed at which data is generated and must be processed",
        "Veracity: The reliability and accuracy of data",
        "Value: The business insights and benefits derived from data"
      ],
      coreResponsibilities: [
        "Design systems that can scale horizontally to handle data growth",
        "Implement distributed processing frameworks for large-scale analytics",
        "Manage data across different storage tiers based on access patterns",
        "Optimize costs while maintaining performance",
        "Ensure data reliability in distributed environments"
      ],
      toolsEcosystem: [
        "Storage: HDFS, Amazon S3, Azure Data Lake Storage, Google Cloud Storage",
        "Processing: Apache Spark, Apache Flink, Presto, Trino",
        "Databases: Cassandra, HBase, MongoDB, ClickHouse",
        "Cloud Platforms: AWS EMR, Azure HDInsight, Google Dataproc, Databricks"
      ],
      realWorldApplications: [
        "Recommendation Systems: Netflix, Spotify processing user behavior at scale",
        "Fraud Detection: Financial institutions analyzing millions of transactions",
        "Genomics: Processing and analyzing DNA sequencing data",
        "Autonomous Vehicles: Processing sensor data in real-time",
        "Social Media: Analyzing billions of posts and interactions"
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
      introduction: "Apache Spark is a unified analytics engine for large-scale data processing. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general computation graphs. Spark has become the de facto standard for big data processing due to its speed, ease of use, and versatility.",
      keyConcepts: [
        "RDD (Resilient Distributed Dataset): The fundamental data structure in Spark",
        "DataFrame: Higher-level abstraction built on RDDs with schema support",
        "Transformations: Operations that create new datasets (lazy evaluation)",
        "Actions: Operations that trigger computation and return results",
        "Spark SQL: Module for structured data processing using SQL"
      ],
      coreResponsibilities: [
        "Design efficient Spark applications for batch and streaming workloads",
        "Optimize Spark jobs for performance and resource utilization",
        "Manage data partitioning and cluster resources",
        "Debug and troubleshoot Spark job failures",
        "Integrate Spark with data lakes and warehouses"
      ],
      toolsEcosystem: [
        "Spark Core: Foundation for parallel and distributed processing",
        "Spark SQL: Structured data processing with SQL interface",
        "Spark Streaming/Structured Streaming: Real-time data processing",
        "MLlib: Machine learning library",
        "Platforms: Databricks, AWS EMR, Google Dataproc, Azure HDInsight"
      ],
      comparison: {
        title: "RDDs vs DataFrames",
        items: [
          "RDDs: Low-level API with full control over data processing",
          "DataFrames: High-level API with query optimization",
          "RDDs: Type-safe but harder to optimize",
          "DataFrames: Schema-aware with Catalyst optimizer for performance"
        ]
      },
      realWorldApplications: [
        "ETL at Scale: Processing petabytes of data for data warehouses",
        "Machine Learning: Training models on large datasets with MLlib",
        "Log Analysis: Processing application and server logs at scale",
        "Real-time Analytics: Streaming dashboards and alerting systems"
      ],
      tipsInsights: [
        "Prefer DataFrames over RDDs for better performance through optimization",
        "Monitor Spark UI to understand job execution and identify bottlenecks",
        "Proper partitioning is key to Spark performance",
        "Cache intermediate results that are reused multiple times"
      ],
      thinkingQuestions: [
        "How do you handle data skew in Spark applications?",
        "When would you use Spark Streaming vs batch processing?",
        "How do you optimize Spark jobs that are running out of memory?"
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
      introduction: "Apache Airflow is the most widely adopted open-source platform for orchestrating complex data workflows. Originally developed at Airbnb, Airflow allows you to programmatically author, schedule, and monitor workflows as code, making it easier to manage and version control your data pipelines.",
      keyConcepts: [
        "DAG: Python code defining workflows as directed acyclic graphs",
        "Operators: Building blocks for tasks (BashOperator, PythonOperator, etc.)",
        "Tasks: Individual units of work within a DAG",
        "Scheduler: Component that triggers DAGs and schedules tasks",
        "Executor: Component that runs tasks (Local, Celery, Kubernetes)"
      ],
      coreResponsibilities: [
        "Design and implement DAGs for data pipeline orchestration",
        "Configure Airflow for production deployment",
        "Monitor and troubleshoot DAG execution",
        "Manage connections and variables securely",
        "Scale Airflow infrastructure for growing workloads"
      ],
      toolsEcosystem: [
        "Operators: BashOperator, PythonOperator, SQL operators, cloud-specific operators",
        "Executors: LocalExecutor, CeleryExecutor, KubernetesExecutor",
        "UI: Airflow Web Interface for monitoring and management",
        "Managed Services: Astronomer, Google Cloud Composer, AWS MWAA"
      ],
      comparison: {
        title: "Airflow vs Other Orchestrators",
        items: [
          "Airflow: Python-native, mature ecosystem, large community",
          "Prefect: Modern Python API, better local development experience",
          "Dagster: Strong focus on data quality and testing",
          "Airflow: Industry standard with extensive operator library"
        ]
      },
      realWorldApplications: [
        "ETL Pipelines: Scheduled data extraction and loading workflows",
        "ML Pipelines: Model training and deployment automation",
        "Report Generation: Automated business reporting workflows",
        "Data Quality: Scheduled data validation and alerting"
      ],
      tipsInsights: [
        "Write DAGs as code – leverage version control and code review",
        "Use XComs sparingly – they are not designed for large data transfer",
        "Implement proper task timeouts to prevent resource leaks",
        "Use task groups to organize complex DAGs for better readability"
      ],
      thinkingQuestions: [
        "How do you handle secrets and credentials in Airflow?",
        "What executor would you choose for a production deployment?",
        "How do you implement dynamic DAGs that respond to changing requirements?"
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
      introduction: "A data warehouse is a centralized repository that stores integrated data from multiple sources, optimized for analytical queries and reporting. Data warehouses enable organizations to perform historical analysis, generate reports, and support data-driven decision-making at scale.",
      keyConcepts: [
        "Subject-Oriented: Data organized around key business subjects (sales, customers, products)",
        "Integrated: Data from multiple sources combined into a consistent format",
        "Non-Volatile: Data is stable and not frequently updated once loaded",
        "Time-Variant: Historical data maintained for trend analysis",
        "Dimensional Modeling: Star and snowflake schemas for analytical queries"
      ],
      coreResponsibilities: [
        "Design dimensional models that support business analytics needs",
        "Implement ETL/ELT processes to populate the warehouse",
        "Optimize query performance for analytical workloads",
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
      introduction: "OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) represent two fundamental approaches to data management, each optimized for different use cases. Understanding when to use each system is essential for designing effective data architectures.",
      keyConcepts: [
        "OLTP: Optimized for high-volume transactional operations",
        "OLAP: Optimized for complex analytical queries and reporting",
        "Normalization vs Denormalization: Trade-offs between data integrity and query performance",
        "Write-Heavy vs Read-Heavy: Different optimization strategies for each workload type"
      ],
      coreResponsibilities: [
        "Choose appropriate systems based on workload characteristics",
        "Design schemas optimized for the specific use case",
        "Implement data movement from OLTP to OLAP systems",
        "Balance performance and consistency requirements"
      ],
      toolsEcosystem: [
        "OLTP Databases: PostgreSQL, MySQL, Oracle, SQL Server",
        "OLAP Systems: Snowflake, BigQuery, Redshift, ClickHouse",
        "Hybrid: SingleStore, CockroachDB (HTAP systems)"
      ],
      comparison: {
        title: "OLTP vs OLAP Comparison",
        items: [
          "OLTP: Many short transactions with CRUD operations",
          "OLAP: Fewer, more complex queries with aggregations",
          "OLTP: Normalized schemas to minimize redundancy",
          "OLAP: Denormalized schemas for query performance",
          "OLTP: Prioritizes data consistency and integrity",
          "OLAP: Prioritizes query speed and analytical flexibility",
          "OLTP: Current operational data",
          "OLAP: Historical data for trend analysis"
        ]
      },
      realWorldApplications: [
        "OLTP: E-commerce order processing, banking transactions, inventory management",
        "OLAP: Sales trend analysis, customer behavior analytics, financial reporting",
        "Integration: ETL pipelines moving data from OLTP to OLAP systems"
      ],
      tipsInsights: [
        "Modern cloud warehouses blur the line between OLTP and OLAP",
        "Consider HTAP systems for use cases requiring both workloads",
        "Design data movement strategies that balance freshness and performance",
        "Materialized views can bridge OLTP and OLAP requirements"
      ],
      thinkingQuestions: [
        "When would you consider a hybrid HTAP system?",
        "How do you determine the right refresh frequency for OLAP data?",
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
      introduction: "Streaming data processing enables organizations to act on data as it is generated, rather than waiting for batch processing windows. This paradigm shift is essential for use cases requiring real-time insights, immediate responses, and continuous analytics.",
      keyConcepts: [
        "Event Streams: Continuous sequences of events ordered by time",
        "Stream Processing: Analyzing data in motion rather than at rest",
        "Event Time vs Processing Time: When events occur vs when they are processed",
        "Windowing: Grouping streaming events into time-based windows for aggregation",
        "Exactly-Once Semantics: Ensuring each event is processed exactly once"
      ],
      coreResponsibilities: [
        "Design streaming architectures that meet latency requirements",
        "Handle late-arriving and out-of-order events",
        "Implement fault-tolerant stream processing",
        "Manage state in streaming applications",
        "Monitor streaming pipeline health and throughput"
      ],
      toolsEcosystem: [
        "Message Brokers: Apache Kafka, Amazon Kinesis, Google Pub/Sub, Azure Event Hubs",
        "Stream Processing: Apache Flink, Apache Spark Streaming, Kafka Streams, Apache Storm",
        "Databases: Apache Druid, ClickHouse, TimescaleDB",
        "Platforms: Confluent, Decodable, Materialize"
      ],
      comparison: {
        title: "Batch vs Streaming",
        items: [
          "Batch: Process data in scheduled intervals (hourly, daily)",
          "Streaming: Process data continuously as it arrives",
          "Batch: Higher latency, easier to implement and debug",
          "Streaming: Lower latency, more complex architecture",
          "Batch: Better for historical analysis and large transformations",
          "Streaming: Essential for real-time dashboards and alerting"
        ]
      },
      realWorldApplications: [
        "Fraud Detection: Identifying suspicious transactions in real-time",
        "IoT Monitoring: Processing sensor data for immediate alerts",
        "Live Dashboards: Real-time business metrics and KPIs",
        "Personalization: Adapting user experience based on recent behavior",
        "Log Analytics: Detecting anomalies in application logs instantly"
      ],
      tipsInsights: [
        "Start with understanding latency requirements before choosing streaming",
        "Design for exactly-once processing from the beginning",
        "Consider the Lambda or Kappa architecture for hybrid needs",
        "Monitor consumer lag to ensure processing keeps up with data arrival"
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
      introduction: "Apache Kafka is a distributed event streaming platform capable of handling trillions of events per day. Originally developed at LinkedIn, Kafka has become the industry standard for building real-time data pipelines and streaming applications.",
      keyConcepts: [
        "Topics: Logical channels for organizing events",
        "Partitions: Subdivisions of topics for parallelism and scalability",
        "Producers: Applications that publish events to topics",
        "Consumers: Applications that subscribe to topics and process events",
        "Consumer Groups: Groups of consumers that share the processing load",
        "Brokers: Kafka servers that store data and serve clients"
      ],
      coreResponsibilities: [
        "Design topic and partition strategies for scalability",
        "Implement reliable producers and consumers",
        "Monitor Kafka cluster health and performance",
        "Manage data retention and cleanup policies",
        "Ensure high availability and fault tolerance"
      ],
      toolsEcosystem: [
        "Kafka Core: Brokers, producers, consumers",
        "Kafka Connect: Framework for connecting to external systems",
        "Kafka Streams: Stream processing library",
        "KSQL/ksqlDB: SQL interface for stream processing",
        "Schema Registry: Schema management for Kafka messages",
        "Managed Services: Confluent Cloud, Amazon MSK, Azure Event Hubs"
      ],
      realWorldApplications: [
        "Log Aggregation: Centralizing logs from distributed systems",
        "Event Sourcing: Storing application state as a sequence of events",
        "Metrics Collection: Gathering operational metrics from services",
        "Change Data Capture: Streaming database changes to downstream systems",
        "Microservices Communication: Async messaging between services"
      ],
      tipsInsights: [
        "Choose partition counts based on throughput requirements",
        "Use keys to ensure related messages go to the same partition",
        "Implement idempotent producers for exactly-once semantics",
        "Monitor consumer lag to detect processing bottlenecks",
        "Consider managed Kafka services for reduced operational burden"
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
      introduction: "Data quality is the measure of data's fitness for its intended use. In data engineering, ensuring high data quality is crucial because downstream analytics, machine learning models, and business decisions are only as good as the data they are based on. Poor data quality can lead to incorrect insights, failed pipelines, and costly business mistakes.",
      keyConcepts: [
        "Accuracy: Data correctly represents the real-world entity or event",
        "Completeness: All required data is present",
        "Consistency: Data values are coherent across systems",
        "Timeliness: Data is available when needed",
        "Validity: Data conforms to defined formats and rules",
        "Uniqueness: No unintended duplicate records"
      ],
      coreResponsibilities: [
        "Implement data validation at ingestion and transformation stages",
        "Set up monitoring and alerting for data quality issues",
        "Define and enforce data quality SLAs",
        "Create data quality dashboards and reports",
        "Collaborate with data producers to fix upstream issues"
      ],
      toolsEcosystem: [
        "Data Quality Frameworks: Great Expectations, Deequ, Soda",
        "Data Observability: Monte Carlo, Bigeye, Datadog",
        "Profiling: pandas-profiling, Apache Griffin",
        "Testing: dbt tests, custom validation scripts"
      ],
      realWorldApplications: [
        "Financial Services: Ensuring transaction data accuracy for compliance",
        "Healthcare: Validating patient data for accurate treatments",
        "E-commerce: Maintaining product catalog integrity",
        "Marketing: Ensuring customer data quality for targeting"
      ],
      tipsInsights: [
        "Shift-left data quality – catch issues as early as possible",
        "Automate quality checks in your data pipelines",
        "Document expected data quality standards for each dataset",
        "Build a culture of data quality ownership across teams"
      ],
      thinkingQuestions: [
        "How do you handle data quality issues without blocking pipeline execution?",
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
