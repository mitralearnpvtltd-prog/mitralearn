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


// Practice coding challenges for Data Engineering topics
const getPracticeChallenge = (submoduleId: string): { question: string; language: string; expectedPatterns: string[]; solution: string; hint: string } => {
  const challenges: Record<string, { question: string; language: string; expectedPatterns: string[]; solution: string; hint: string }> = {
    "1.1": {
      question: "Write a Python function that reads a CSV file and returns the number of rows. Use pandas library.",
      language: "python",
      expectedPatterns: ["import pandas", "pd.read_csv", "len(", ".shape"],
      solution: `import pandas as pd

def count_rows(file_path):
    df = pd.read_csv(file_path)
    return len(df)

# Example usage
# row_count = count_rows('data.csv')
# print(f"Number of rows: {row_count}")`,
      hint: "Start with 'import pandas as pd', then use pd.read_csv() to load the file and len() or .shape to count rows."
    },
    "1.2": {
      question: "Write Python code to demonstrate the data lifecycle stages: Generate sample data, Transform it, and Store it to a dictionary.",
      language: "python",
      expectedPatterns: ["=", "for", "append", "print"],
      solution: `# Data Lifecycle Demo
# 1. GENERATE - Create sample data
raw_data = [
    {"name": "Alice", "age": 30, "city": "NYC"},
    {"name": "Bob", "age": 25, "city": "LA"}
]

# 2. TRANSFORM - Add new field
for record in raw_data:
    record["is_adult"] = record["age"] >= 18

# 3. STORE - Save to data store
data_store = {"users": raw_data}
print(data_store)`,
      hint: "Create a list of dictionaries for raw data, loop through to transform, then store in a new dictionary structure."
    },
    "2.1": {
      question: "Write a simple Python ETL function that extracts data from a list, transforms it (uppercase names), and loads it into a new list.",
      language: "python",
      expectedPatterns: ["def", "for", "upper()", "append", "return"],
      solution: `def simple_etl_pipeline(source_data):
    # EXTRACT
    extracted = source_data.copy()
    
    # TRANSFORM - uppercase names
    transformed = []
    for record in extracted:
        record["name"] = record["name"].upper()
        transformed.append(record)
    
    # LOAD - return processed data
    return transformed

# Test
data = [{"name": "alice", "id": 1}, {"name": "bob", "id": 2}]
result = simple_etl_pipeline(data)
print(result)`,
      hint: "Define a function with three stages: copy the source (Extract), loop and modify with .upper() (Transform), return new list (Load)."
    },
    "2.2": {
      question: "Compare ETL vs ELT by writing two Python functions: one that transforms before loading, one that loads then transforms.",
      language: "python",
      expectedPatterns: ["def", "etl", "elt", "transform", "load"],
      solution: `# ETL - Transform before Load
def etl_approach(raw_data):
    # Extract
    data = raw_data.copy()
    # Transform FIRST
    for item in data:
        item["value"] = item["value"] * 2
    # Load (return as "stored")
    return {"warehouse": data}

# ELT - Load before Transform  
def elt_approach(raw_data):
    # Extract & Load FIRST (raw)
    warehouse = {"raw_zone": raw_data.copy()}
    # Transform AFTER loading
    warehouse["transformed"] = [
        {**item, "value": item["value"] * 2} 
        for item in warehouse["raw_zone"]
    ]
    return warehouse

# Test
data = [{"id": 1, "value": 10}]
print("ETL:", etl_approach(data))
print("ELT:", elt_approach(data))`,
      hint: "Create two functions: ETL transforms before storing, ELT stores raw first then transforms in the warehouse."
    },
    "3.1": {
      question: "Write SQL queries to create a simple users table and insert sample data. Then write a SELECT query.",
      language: "sql",
      expectedPatterns: ["CREATE TABLE", "INSERT INTO", "SELECT", "FROM"],
      solution: `-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (id, name, email) VALUES
(1, 'Alice Johnson', 'alice@example.com'),
(2, 'Bob Smith', 'bob@example.com'),
(3, 'Carol White', 'carol@example.com');

-- Query the data
SELECT id, name, email 
FROM users 
WHERE name LIKE '%Smith%';`,
      hint: "Use CREATE TABLE with column definitions, INSERT INTO with VALUES, and SELECT with WHERE clause."
    },
    "3.2": {
      question: "Design a star schema with a fact table (sales) and dimension table (products). Write the CREATE TABLE statements.",
      language: "sql",
      expectedPatterns: ["CREATE TABLE", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES"],
      solution: `-- Dimension Table: Products
CREATE TABLE dim_products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(200),
    category VARCHAR(100),
    unit_price DECIMAL(10,2)
);

-- Fact Table: Sales
CREATE TABLE fact_sales (
    sale_id INT PRIMARY KEY,
    product_id INT,
    quantity INT,
    total_amount DECIMAL(12,2),
    sale_date DATE,
    FOREIGN KEY (product_id) REFERENCES dim_products(product_id)
);

-- Example: Join query
SELECT 
    p.product_name,
    SUM(s.quantity) as total_sold,
    SUM(s.total_amount) as revenue
FROM fact_sales s
JOIN dim_products p ON s.product_id = p.product_id
GROUP BY p.product_name;`,
      hint: "Create a dimension table (dim_products) with descriptive attributes, then a fact table (fact_sales) with foreign key reference."
    },
    "4.1": {
      question: "Write Python code demonstrating the 3 V's of Big Data (Volume, Velocity, Variety) using simple examples.",
      language: "python",
      expectedPatterns: ["volume", "velocity", "variety", "print"],
      solution: `# Big Data 3 V's Demonstration

# VOLUME - Large amounts of data
volume_example = {
    "description": "Petabytes of data",
    "example": "1 PB = 1,000,000 GB",
    "use_case": "Social media stores 500+ PB of user data"
}

# VELOCITY - Speed of data generation
velocity_example = {
    "description": "Data generated per second",
    "example": "Twitter: 6,000 tweets/second",
    "use_case": "Real-time fraud detection"
}

# VARIETY - Different data types
variety_example = {
    "types": ["structured (SQL)", "semi-structured (JSON)", "unstructured (images)"],
    "use_case": "IoT sensors produce JSON, logs, binary data"
}

print("Volume:", volume_example)
print("Velocity:", velocity_example)
print("Variety:", variety_example)`,
      hint: "Create dictionaries for each V (Volume, Velocity, Variety) with descriptions and real-world examples, then print them."
    },
    "4.2": {
      question: "Write PySpark-style code to load data, perform a transformation, and show results. (Simulated with comments)",
      language: "python",
      expectedPatterns: ["spark", "read", "filter", "select", "show"],
      solution: `# Apache Spark Example (PySpark syntax)
# Note: This is conceptual code - requires Spark environment

# Initialize Spark Session
# from pyspark.sql import SparkSession
# spark = SparkSession.builder.appName("DataProcessing").getOrCreate()

# Simulated Spark operations:
spark_code = """
# Read data from source
df = spark.read.csv("sales_data.csv", header=True, inferSchema=True)

# Transform - filter and select
result = df.filter(df.amount > 1000) \\
           .select("customer_id", "product", "amount") \\
           .groupBy("product") \\
           .sum("amount")

# Show results
result.show()
"""

print("PySpark ETL Pipeline:")
print(spark_code)

# Key Spark concepts:
concepts = {
    "RDD": "Resilient Distributed Dataset - basic abstraction",
    "DataFrame": "Distributed collection with schema",
    "Transformation": "Lazy operations (filter, map, select)",
    "Action": "Triggers execution (show, collect, count)"
}
print("\\nKey Concepts:", concepts)`,
      hint: "Write PySpark-style code with spark.read, .filter(), .select(), .groupBy(), and .show() operations."
    },
    "5.1": {
      question: "Write pseudocode for a workflow orchestration that runs tasks in sequence with dependencies.",
      language: "python",
      expectedPatterns: ["task", "depend", "run", "def"],
      solution: `# Workflow Orchestration Example

def task_extract():
    print("Extracting data from source...")
    return {"data": [1, 2, 3, 4, 5]}

def task_transform(data):
    print("Transforming data...")
    return {"transformed": [x * 2 for x in data["data"]]}

def task_load(data):
    print("Loading data to destination...")
    print(f"Loaded: {data['transformed']}")
    return True

# DAG Definition (Directed Acyclic Graph)
def run_pipeline():
    # Define task dependencies
    # extract -> transform -> load
    
    # Task 1: Extract (no dependencies)
    extract_result = task_extract()
    
    # Task 2: Transform (depends on extract)
    transform_result = task_transform(extract_result)
    
    # Task 3: Load (depends on transform)
    load_result = task_load(transform_result)
    
    print("Pipeline completed successfully!")
    return load_result

# Run the orchestrated pipeline
run_pipeline()`,
      hint: "Create separate functions for each task, then a main function that runs them in sequence with dependencies."
    },
    "5.2": {
      question: "Write an Apache Airflow DAG definition (Python) that schedules an ETL pipeline to run daily.",
      language: "python",
      expectedPatterns: ["DAG", "dag", "task", "schedule", ">>"],
      solution: `# Apache Airflow DAG Example
from datetime import datetime, timedelta

# Note: Requires Airflow environment
dag_code = '''
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    "owner": "data_team",
    "depends_on_past": False,
    "start_date": datetime(2024, 1, 1),
    "retries": 3,
    "retry_delay": timedelta(minutes=5)
}

# Define the DAG
dag = DAG(
    "daily_etl_pipeline",
    default_args=default_args,
    schedule_interval="@daily",  # Run every day
    catchup=False
)

# Define tasks
extract_task = PythonOperator(
    task_id="extract_data",
    python_callable=extract_function,
    dag=dag
)

transform_task = PythonOperator(
    task_id="transform_data", 
    python_callable=transform_function,
    dag=dag
)

load_task = PythonOperator(
    task_id="load_data",
    python_callable=load_function,
    dag=dag
)

# Set dependencies
extract_task >> transform_task >> load_task
'''

print("Airflow DAG Definition:")
print(dag_code)

# Key scheduling options
schedules = {
    "@daily": "Run once a day at midnight",
    "@hourly": "Run once an hour",
    "@weekly": "Run once a week",
    "0 6 * * *": "Cron: Daily at 6 AM"
}
print("\\nSchedule Options:", schedules)`,
      hint: "Define a DAG with default_args, schedule_interval='@daily', create PythonOperator tasks, and set dependencies with >>."
    },
    "6.1": {
      question: "Write SQL to create a data warehouse schema with staging, integration, and presentation layers.",
      language: "sql",
      expectedPatterns: ["CREATE SCHEMA", "CREATE TABLE", "staging", "presentation"],
      solution: `-- Data Warehouse Layer Architecture

-- 1. STAGING LAYER - Raw data landing zone
CREATE SCHEMA IF NOT EXISTS staging;

CREATE TABLE staging.raw_orders (
    order_id VARCHAR(50),
    customer_id VARCHAR(50),
    order_date VARCHAR(20),
    amount VARCHAR(20),
    loaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. INTEGRATION LAYER - Cleansed & standardized
CREATE SCHEMA IF NOT EXISTS integration;

CREATE TABLE integration.orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE,
    amount DECIMAL(12,2),
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRESENTATION LAYER - Business-ready aggregates
CREATE SCHEMA IF NOT EXISTS presentation;

CREATE TABLE presentation.daily_sales_summary (
    summary_date DATE PRIMARY KEY,
    total_orders INT,
    total_revenue DECIMAL(15,2),
    avg_order_value DECIMAL(10,2)
);

-- Transform: Staging -> Integration -> Presentation
SELECT 'Data flows: Raw -> Cleansed -> Aggregated' AS data_flow;`,
      hint: "Create three schemas (staging, integration, presentation) with tables at each layer showing data refinement."
    },
    "6.2": {
      question: "Write SQL demonstrating OLAP vs OLTP query patterns with example queries for each.",
      language: "sql",
      expectedPatterns: ["SELECT", "GROUP BY", "SUM", "INSERT", "UPDATE"],
      solution: `-- OLTP vs OLAP Query Patterns

-- OLTP (Online Transaction Processing)
-- Fast, simple operations on individual records

-- OLTP Example 1: Insert new order
INSERT INTO orders (order_id, customer_id, product_id, quantity, order_date)
VALUES (10001, 500, 75, 2, CURRENT_DATE);

-- OLTP Example 2: Update inventory
UPDATE inventory 
SET quantity = quantity - 2 
WHERE product_id = 75;

-- OLTP Example 3: Lookup single customer
SELECT customer_name, email 
FROM customers 
WHERE customer_id = 500;

-- ----------------------------------------

-- OLAP (Online Analytical Processing)
-- Complex aggregations across large datasets

-- OLAP Example 1: Monthly sales by category
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    category,
    SUM(amount) AS total_sales,
    COUNT(*) AS order_count
FROM fact_sales
JOIN dim_products ON fact_sales.product_id = dim_products.product_id
GROUP BY DATE_TRUNC('month', order_date), category
ORDER BY month, total_sales DESC;

-- OLAP Example 2: Year-over-year comparison
SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    SUM(amount) AS annual_revenue
FROM fact_sales
GROUP BY EXTRACT(YEAR FROM order_date);`,
      hint: "OLTP: simple INSERT, UPDATE, single-row SELECT. OLAP: complex SELECT with GROUP BY, SUM, JOIN on large data."
    },
    "7.1": {
      question: "Write Python code comparing batch vs streaming data processing approaches.",
      language: "python",
      expectedPatterns: ["batch", "stream", "process", "def"],
      solution: `import time
from datetime import datetime

# BATCH PROCESSING
def batch_process(data_batch):
    """Process all data at once"""
    print(f"[BATCH] Processing {len(data_batch)} records at once...")
    results = []
    for record in data_batch:
        results.append(record * 2)  # Transform
    print(f"[BATCH] Completed at {datetime.now()}")
    return results

# STREAMING PROCESSING  
def stream_process(data_stream):
    """Process data as it arrives"""
    print("[STREAM] Waiting for events...")
    for i, record in enumerate(data_stream):
        result = record * 2  # Transform immediately
        print(f"[STREAM] Processed record {i+1}: {result}")
        time.sleep(0.1)  # Simulate real-time delay
    print(f"[STREAM] Stream ended at {datetime.now()}")

# Compare
sample_data = [1, 2, 3, 4, 5]

print("=== BATCH MODE ===")
batch_results = batch_process(sample_data)
print(f"Results: {batch_results}")

print("\\n=== STREAMING MODE ===")
stream_process(sample_data)

# Key differences
comparison = {
    "Batch": {"latency": "High (minutes/hours)", "throughput": "High", "use_case": "Reports, ML training"},
    "Stream": {"latency": "Low (milliseconds)", "throughput": "Variable", "use_case": "Alerts, real-time dashboards"}
}
print("\\nComparison:", comparison)`,
      hint: "Create two functions: batch_process (all at once) and stream_process (one-by-one with delays to simulate real-time)."
    },
    "7.2": {
      question: "Write Python code simulating Kafka-style message producer and consumer pattern.",
      language: "python",
      expectedPatterns: ["producer", "consumer", "message", "topic", "queue"],
      solution: `from collections import deque
from datetime import datetime
import json

# Simulated Kafka Topic (using a queue)
class KafkaTopic:
    def __init__(self, name):
        self.name = name
        self.messages = deque()
        self.offset = 0
    
    def produce(self, key, value):
        message = {
            "offset": self.offset,
            "timestamp": str(datetime.now()),
            "key": key,
            "value": value
        }
        self.messages.append(message)
        self.offset += 1
        print(f"[PRODUCER] Sent to '{self.name}': {key}")
        return message
    
    def consume(self):
        if self.messages:
            msg = self.messages.popleft()
            print(f"[CONSUMER] Received: {msg['key']} = {msg['value']}")
            return msg
        return None

# Create topic
orders_topic = KafkaTopic("orders")

# Producer: Send events
orders_topic.produce("order_1", {"item": "laptop", "price": 999})
orders_topic.produce("order_2", {"item": "mouse", "price": 29})
orders_topic.produce("order_3", {"item": "keyboard", "price": 79})

print("--- Consuming Messages ---")

# Consumer: Process events
while True:
    message = orders_topic.consume()
    if not message:
        break
    # Process the message
    order_data = message["value"]
    print(f"  Processing order: " + order_data['item'] + " - " + str(order_data['price']))

print("\\n[DONE] All messages consumed!")`,
      hint: "Create a class with produce() and consume() methods using a queue (deque). Show sending and receiving messages."
    },
    "8.1": {
      question: "Write Python code that validates data quality with checks for completeness, accuracy, and consistency.",
      language: "python",
      expectedPatterns: ["def", "check", "null", "valid", "quality"],
      solution: `# Data Quality Validation Framework

def check_completeness(data, required_fields):
    """Check for missing/null values"""
    issues = []
    for i, record in enumerate(data):
        for field in required_fields:
            if field not in record or record[field] is None or record[field] == "":
                issues.append(f"Row {i}: Missing '{field}'")
    return {"check": "Completeness", "passed": len(issues) == 0, "issues": issues}

def check_accuracy(data, rules):
    """Check data matches expected formats/ranges"""
    issues = []
    for i, record in enumerate(data):
        if "age" in record and (record["age"] < 0 or record["age"] > 150):
            issues.append(f"Row {i}: Invalid age {record['age']}")
        if "email" in record and "@" not in str(record.get("email", "")):
            issues.append(f"Row {i}: Invalid email format")
    return {"check": "Accuracy", "passed": len(issues) == 0, "issues": issues}

def check_consistency(data):
    """Check for duplicate IDs"""
    ids = [r.get("id") for r in data if "id" in r]
    duplicates = [id for id in ids if ids.count(id) > 1]
    return {"check": "Consistency", "passed": len(duplicates) == 0, "issues": list(set(duplicates))}

# Test data
test_data = [
    {"id": 1, "name": "Alice", "age": 30, "email": "alice@test.com"},
    {"id": 2, "name": None, "age": 25, "email": "bob@test.com"},  # Missing name
    {"id": 1, "name": "Charlie", "age": 200, "email": "invalid"},  # Duplicate ID, bad age/email
]

# Run quality checks
print("=== Data Quality Report ===")
print(check_completeness(test_data, ["id", "name", "age", "email"]))
print(check_accuracy(test_data, {}))
print(check_consistency(test_data))`,
      hint: "Create functions for each quality dimension: completeness (null checks), accuracy (value validation), consistency (duplicates)."
    },
    "8.2": {
      question: "Write Python code implementing data governance concepts: data catalog, lineage tracking, and access control.",
      language: "python",
      expectedPatterns: ["catalog", "lineage", "access", "class", "def"],
      solution: `from datetime import datetime

# Data Governance Framework

class DataCatalog:
    """Metadata management for data assets"""
    def __init__(self):
        self.assets = {}
    
    def register(self, name, metadata):
        self.assets[name] = {
            **metadata,
            "registered_at": str(datetime.now())
        }
        print(f"[CATALOG] Registered: {name}")
    
    def search(self, keyword):
        return {k: v for k, v in self.assets.items() if keyword.lower() in k.lower()}

class LineageTracker:
    """Track data transformations and origins"""
    def __init__(self):
        self.lineage = []
    
    def record(self, source, target, transformation):
        self.lineage.append({
            "source": source,
            "target": target,
            "transformation": transformation,
            "timestamp": str(datetime.now())
        })
        print(f"[LINEAGE] {source} -> {target}")
    
    def trace(self, dataset):
        return [l for l in self.lineage if l["target"] == dataset]

class AccessControl:
    """Role-based access management"""
    def __init__(self):
        self.permissions = {}
    
    def grant(self, user, dataset, level):
        key = f"{user}:{dataset}"
        self.permissions[key] = level
        print(f"[ACCESS] Granted {level} on {dataset} to {user}")
    
    def check(self, user, dataset, required_level):
        key = f"{user}:{dataset}"
        return self.permissions.get(key, "none") in [required_level, "admin"]

# Demo
catalog = DataCatalog()
catalog.register("sales_data", {"type": "table", "owner": "analytics_team", "pii": False})
catalog.register("customer_pii", {"type": "table", "owner": "data_team", "pii": True})

lineage = LineageTracker()
lineage.record("raw_orders", "cleaned_orders", "null_removal")
lineage.record("cleaned_orders", "sales_summary", "aggregation")

access = AccessControl()
access.grant("analyst_1", "sales_data", "read")
access.grant("admin_user", "customer_pii", "admin")

print("\\n[CHECK] Can analyst read sales_data?", access.check("analyst_1", "sales_data", "read"))`,
      hint: "Create classes for DataCatalog (register assets), LineageTracker (record transformations), AccessControl (grant/check permissions)."
    },
    "9.1": {
      question: "Design and outline a complete end-to-end data pipeline project for e-commerce analytics.",
      language: "python",
      expectedPatterns: ["def", "extract", "transform", "load", "pipeline"],
      solution: `"""
End-to-End E-Commerce Data Pipeline Project
============================================
"""

# Project Architecture
architecture = {
    "sources": ["MySQL (orders)", "MongoDB (products)", "S3 (clickstream)"],
    "ingestion": "Apache Kafka / Airbyte",
    "storage": "AWS S3 (Data Lake) + Snowflake (Warehouse)",
    "transformation": "dbt + Apache Spark",
    "orchestration": "Apache Airflow",
    "serving": "Tableau Dashboard + REST API"
}

def extract_orders():
    """Extract from transactional database"""
    print("[EXTRACT] Pulling orders from MySQL...")
    return [{"order_id": 1, "amount": 99.99, "customer_id": 100}]

def extract_products():
    """Extract product catalog"""
    print("[EXTRACT] Pulling products from MongoDB...")
    return [{"product_id": "P001", "name": "Widget", "category": "Electronics"}]

def transform_data(orders, products):
    """Clean, join, and aggregate data"""
    print("[TRANSFORM] Cleaning and enriching data...")
    enriched = []
    for order in orders:
        enriched.append({
            **order,
            "is_valid": order["amount"] > 0,
            "processed_date": "2024-01-15"
        })
    return enriched

def load_to_warehouse(data):
    """Load to data warehouse"""
    print(f"[LOAD] Inserting {len(data)} records to Snowflake...")
    return True

def run_pipeline():
    """Main orchestration"""
    print("\\n=== E-Commerce Analytics Pipeline ===\\n")
    print("Architecture:", architecture)
    print("\\n--- Running Pipeline ---")
    
    # Extract
    orders = extract_orders()
    products = extract_products()
    
    # Transform
    enriched_data = transform_data(orders, products)
    
    # Load
    success = load_to_warehouse(enriched_data)
    
    print("\\n[COMPLETE] Pipeline finished successfully!" if success else "[ERROR] Pipeline failed")
    
    # Output metrics
    metrics = {"records_processed": len(enriched_data), "status": "success"}
    print("Metrics:", metrics)

# Execute
run_pipeline()`,
      hint: "Create functions for extract, transform, load, and a main run_pipeline() function that orchestrates the full flow."
    }
  };

  return challenges[submoduleId] || {
    question: "Write a Python script demonstrating key concepts from this lesson.",
    language: "python",
    expectedPatterns: ["def", "print", "="],
    solution: `# Practice Exercise
def main():
    data = {"key": "value"}
    print("Concept demonstrated:", data)

main()`,
    hint: "Create a function that demonstrates the main concepts covered in this lesson."
  };
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

  const isSubmoduleCompleted = progress.completedSubmodules.includes(content.submodule);
  const quizScore = progress.completedQuizzes[content.submodule];
  const isPracticeCompleted = progress.codingChallengesCompleted.includes(content.submodule);
  const module = getModuleForSubmodule(content.submodule);
  const practiceChallenge = getPracticeChallenge(content.submodule);
  const hasPractice = true; // All submodules have practice

  // Check if previous submodule is completed for gated flow
  const previousSubmoduleId = getPreviousSubmoduleId(content.submodule);
  const isPreviousCompleted = !previousSubmoduleId || progress.completedSubmodules.includes(previousSubmoduleId);

  // Determine section completion status
  const isLearnCompleted = true;
  const canAccessPractice = isLearnCompleted;
  const canAccessQuiz = isPracticeCompleted || !hasPractice;

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

  // Compiler auto-grading logic with topic-specific validation
  const handleRunCode = () => {
    const trimmedCode = compilerCode.trim().toLowerCase();
    
    if (trimmedCode.length < 10) {
      setCompilerOutput("Error: Please write more code to complete the exercise.");
      setCompilerHint(practiceChallenge.hint);
      return;
    }

    // Check for expected patterns based on the challenge
    const matchedPatterns = practiceChallenge.expectedPatterns.filter(pattern => 
      trimmedCode.includes(pattern.toLowerCase())
    );

    const isCorrect = matchedPatterns.length >= Math.ceil(practiceChallenge.expectedPatterns.length / 2);

    if (isCorrect) {
      setCompilerOutput("✓ Success! Your code demonstrates the required concepts correctly.");
      setCompilerHint("");
      completeCodingChallenge(content.submodule);
      toast.success("Practice challenge completed! You can now access the Quiz.");
    } else {
      setCompilerOutput("✗ Incorrect. Your code doesn't match the expected patterns. Try again!");
      setCompilerHint(practiceChallenge.hint);
    }
  };

  const handleCompleteLearn = () => {
    setActiveTab("practice");
    toast.success("Learn section completed! Moving to Practice.");
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
              Continue to Practice
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
                Coding Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Challenge Question */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium shrink-0">
                      Q
                    </span>
                    <div>
                      <p className="font-medium text-foreground mb-1">Challenge</p>
                      <p className="text-muted-foreground">{practiceChallenge.question}</p>
                      <Badge variant="outline" className="mt-2">
                        Language: {practiceChallenge.language.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Code Compiler */}
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
                      <span className="text-sm font-medium">Code Editor ({practiceChallenge.language})</span>
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
                      placeholder={`Write your ${practiceChallenge.language} code here...`}
                      className="w-full h-64 p-4 font-mono text-sm bg-card resize-none focus:outline-none"
                      spellCheck={false}
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
                        <Lightbulb className="w-4 h-4 mt-0.5 text-warning shrink-0" />
                        {compilerHint}
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button onClick={handleRunCode} className="flex-1 gap-2">
                      <Play className="w-4 h-4" />
                      Run Code
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

                  {isPracticeCompleted && (
                    <Button onClick={handleCompletePractice} className="w-full gap-2">
                      Continue to Quiz
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
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
