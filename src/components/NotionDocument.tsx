import { SubmoduleContent } from "@/data/curriculum";
import dataEngineeringImage from "@/assets/data-engineering-etl-diagram.png";
import dataLifecycleImage from "@/assets/data-engineering-lifecycle.png";
import dataPipelinesImage from "@/assets/data-pipelines-diagram.png";
import etlVsEltImage from "@/assets/etl-vs-elt-diagram.png";
import apacheSparkImage from "@/assets/apache-spark-fundamentals.png";
import apacheSparkBasicsImage from "@/assets/apache-spark-basics.png";
import dataOrchestrationImage from "@/assets/data-orchestration-51.jpg";
import airflowPrerequisitesImage from "@/assets/airflow-prerequisites.png";
import airflowCourseOverviewImage from "@/assets/airflow-course-overview.png";
import airflowDagsPipelineImage from "@/assets/airflow-dags-pipeline.png";
import dimensionalModelingImage from "@/assets/dimensional-modeling-diagram.png";
import oltpOlapEtlImage from "@/assets/oltp-olap-etl-diagram.png";
import batchStreamProcessingImage from "@/assets/batch-stream-processing-diagram.png";
import apacheKafkaArchImage from "@/assets/apache-kafka-architecture.png";
import ensuringDataQualityImage from "@/assets/ensuring-data-quality.png";
import improvingDataQualityImage from "@/assets/improving-data-quality.png";

interface NotionDocumentProps {
  content: SubmoduleContent;
}

// Lesson 1.1 Content
const Lesson11Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        1.1 What is Data Engineering?
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        A comprehensive overview of the <strong className="text-foreground">data engineering role</strong>, core functions, responsibilities, and relevance within the broader data ecosystem, particularly in relation to data analytics and data science. It addresses common questions and clarifies what being a data engineer entails, making it easier for viewers to understand if this career path suits them.
      </p>

      {/* Core Concepts and Definitions */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Core Concepts and Definitions</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>
          <strong className="text-foreground">Data Engineering</strong> is primarily concerned with the <strong className="text-foreground">movement and transformation of data</strong> from various source systems to target systems like data warehouses.
        </li>
        <li>
          The role is closely linked to but distinct from <strong className="text-foreground">data analytics</strong> and <strong className="text-foreground">data science</strong>.
        </li>
        <li>
          The fundamental process in data engineering is <strong className="text-foreground">ETL (Extract, Transform, Load)</strong>:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li><strong className="text-foreground">Extract</strong>: Querying and retrieving data from source systems (databases, flat files, APIs).</li>
            <li><strong className="text-foreground">Transform</strong>: Cleaning, converting, and reshaping data to standardize it for analysis.</li>
            <li><strong className="text-foreground">Load</strong>: Storing the transformed data into a data warehouse or another storage solution for querying and analysis.</li>
          </ul>
        </li>
      </ul>

      {/* Data Engineering Workflow Example */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Data Engineering Workflow Example</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Using a fictional retailer database (AdventureWorks), the video illustrates the data engineering workflow:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>The retailer has multiple transactional databases across different regions (North America, Asia, Africa, Europe).</li>
        <li>Simple queries on a single database suffice for small-scale analysis (e.g., counting mountain bike sales last month).</li>
        <li>
          As the company grows and data sources multiply geographically:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Running queries on production databases becomes inefficient.</li>
            <li>Data engineers build <strong className="text-foreground">data pipelines</strong> to extract data from multiple sources.</li>
            <li>The data is <strong className="text-foreground">aggregated into a centralized data warehouse</strong>.</li>
            <li>
              This enables company-wide analysis, such as:
              <ul className="list-disc list-outside ml-6 mt-1 space-y-1">
                <li>Regional sales comparisons.</li>
                <li>Seasonal sales trends.</li>
                <li>Product bundling and cross-selling opportunities.</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      {/* Key Responsibilities of Data Engineers */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Responsibilities of Data Engineers</h2>
      
      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={dataEngineeringImage} 
          alt="Data Engineering ETL Diagram" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Extracting data</strong> from diverse sources such as databases, flat files, and APIs.</li>
        <li>
          <strong className="text-foreground">Transforming data</strong> by:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Cleaning (e.g., converting missing text values to "unknown").</li>
            <li>Standardizing (e.g., converting sales amounts from different currencies to USD using exchange rate APIs).</li>
          </ul>
        </li>
        <li><strong className="text-foreground">Loading data</strong> into a structured data warehouse with a defined schema.</li>
        <li><strong className="text-foreground">Data testing and quality assurance</strong> to ensure data validity and compliance with production standards.</li>
        <li><strong className="text-foreground">Orchestration and monitoring</strong> of data pipelines using tools such as Apache Airflow, Prefect, or others.</li>
        <li><strong className="text-foreground">Cloud integration</strong> is increasingly essential, requiring familiarity with platforms like AWS, Azure, or Google Cloud for pipeline orchestration.</li>
      </ul>

      {/* Required Skills and Tools Table */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Required Skills and Tools</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Skill/Tool</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Purpose/Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">SQL</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Querying data from relational databases</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Python</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Scripting ETL processes, data transformation</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">ETL Tools</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Informatica, SSIS, Stitch, Fivetran (<em>examples</em>)</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Data Modeling</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Designing data structures during transformation</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Data Warehouse Design</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Creating schemas for data storage (SQL Server, Postgres, Snowflake, Redshift)</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Orchestration Software</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Running and monitoring pipelines (Airflow, Prefect)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Cloud Platforms</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Managing pipelines on AWS, Azure, Google Cloud</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Insights */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Additional Insights</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Business/domain knowledge</strong> is important for effective data engineering but typically comes from business analysts.</li>
        <li>The <strong className="text-foreground">data warehouse schema design</strong> is often handled by data or system architects; if unavailable, data engineers assume this responsibility.</li>
        <li>Data pipelines handle <strong className="text-foreground">raw or "dirty" data</strong>, applying cleansing and transformation before making it available for analysis.</li>
        <li>Data engineers operate <strong className="text-foreground">behind the scenes</strong> but are critical for enabling data scientists and analysts to perform their work effectively.</li>
      </ul>

      {/* Timeline Table of Data Engineering Process */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Timeline Table of Data Engineering Process</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Phase</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Extraction</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Querying and retrieving data from multiple, diverse source systems</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Transformation</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cleaning, standardizing (e.g., currency conversion), and reshaping data</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Loading</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Storing transformed data in a centralized data warehouse</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Orchestration</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Automating, running, and monitoring the ETL pipelines</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Quality Assurance</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Testing data to ensure accuracy and compliance with production standards</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data engineering is essential for managing and preparing data at scale</strong>, enabling complex analytics and data science.</li>
        <li>The role involves <strong className="text-foreground">building and maintaining ETL pipelines</strong> to move and transform data efficiently.</li>
        <li>A data engineer needs strong technical skills in <strong className="text-foreground">SQL, Python, data modeling, and orchestration tools</strong>, as well as familiarity with <strong className="text-foreground">cloud environments</strong>.</li>
        <li>Understanding <strong className="text-foreground">business requirements and data quality</strong> is crucial, even though domain expertise usually comes from other roles.</li>
        <li>Data engineering supports <strong className="text-foreground">company-wide decision making</strong> by consolidating and preparing data from multiple sources.</li>
      </ul>

      {/* Closing Paragraph */}
      <p className="text-muted-foreground leading-relaxed mt-8 mb-12">
        This video provides a clear, practical introduction to data engineering, emphasizing the importance of ETL pipelines, data warehousing, and the technical skills needed to succeed in this role.
      </p>
    </div>
  </div>
);

// Lesson 1.2 Content
const Lesson12Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        1.2 Data Engineering Lifecycle
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        A comprehensive overview of the <strong className="text-foreground">data engineering life cycle</strong>, breaking it down into <strong className="text-foreground">seven distinct phases</strong> that a data pipeline undergoes within a business context. The presenter emphasizes not only the technical steps but also the integration of modern software development best practices, such as <strong className="text-foreground">CI/CD (Continuous Integration/Continuous Deployment)</strong>, to ensure efficiency and sustainability in data engineering projects.
      </p>

      {/* Seven Phases of the Data Engineering Life Cycle */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Seven Phases of the Data Engineering Life Cycle</h2>
      
      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={dataLifecycleImage} 
          alt="Data Engineering Life Cycle" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Phase Number</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Phase Name</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Key Activities & Focus</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Challenges & Considerations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">1</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Collection</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Gathering data from various sources (internal systems like ERP, CRM; external APIs, social media, public datasets)</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Handling inconsistent formats, high volume, data privacy, anonymization, and ensuring data accuracy and relevance</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">2</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Integration & Storage</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cleaning, transforming, consolidating data into warehouses or lakes</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Choosing storage (cloud vs. on-premises), ETL vs. ELT, real-time vs. batch processing, avoiding data decay</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">3</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Cleaning & Processing</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Removing errors, normalizing, deduplicating, verifying, merging, and rebuilding missing data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Detecting anomalies, missing values, outliers; maintaining data integrity and avoiding biased cleaning</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">4</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Modeling & Warehousing</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Designing efficient data schemas and warehouses that support operational and analytical needs</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Ensuring model flexibility, query performance, security, compliance, and alignment with business requirements</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">5</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Analysis</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Applying statistical methods, machine learning, and other analytics to extract insights</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Avoiding poor data quality impacts, overfitting, and incorrect assumptions that lead to misleading conclusions</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">6</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Visualization & Reporting</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Creating visualizations (charts, dashboards) and automated reports that communicate insights clearly to stakeholders</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Preventing bias or misinterpretation in presentations; ensuring reports are timely, relevant, and accessible</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">7</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Pipeline Maintenance</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Ongoing updates and improvements of data processes and infrastructure</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Maintaining data integrity over time, adapting to new technologies, ensuring governance, quality assurance</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights and Concepts */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Insights and Concepts</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data Collection</strong> is foundational, requiring verification of data accuracy and timeliness beyond trusting metadata or descriptions.</li>
        <li><strong className="text-foreground">Integration</strong> involves making diverse data formats coherent and accessible, often requiring complex ETL/ELT pipelines and decisions on batch vs. real-time processing.</li>
        <li>The <strong className="text-foreground">cleaning phase</strong> is the most time-consuming, essential for ensuring data usability, and should be automated where possible to reduce manual effort and bias.</li>
        <li><strong className="text-foreground">Data modeling</strong> must be business-driven, balancing technical efficiency with actual operational and analytical requirements.</li>
        <li><strong className="text-foreground">Data analysis</strong> heavily relies on clean, high-quality data to produce valid insights, with serious risks if poor data leads to inaccurate business decisions.</li>
        <li><strong className="text-foreground">Visualization and reporting</strong> are critical for translating data insights into actionable business knowledge, requiring clarity and avoidance of interpretative bias.</li>
        <li><strong className="text-foreground">Pipeline maintenance</strong> is continuous and vital for adapting to evolving data, new business needs, and technological changes, involving strong governance frameworks.</li>
      </ul>

      {/* Challenges and Pitfalls Highlighted */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Challenges and Pitfalls Highlighted</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data inconsistency and volume</strong> during collection can overwhelm systems.</li>
        <li><strong className="text-foreground">Data decay</strong>, where data becomes outdated, undermines reliability.</li>
        <li>Risk of <strong className="text-foreground">over-cleaning</strong> which can bias data and distort its meaning.</li>
        <li>Designing data models that are <strong className="text-foreground">too rigid</strong> or inefficient can degrade performance and limit scalability.</li>
        <li>Poor data quality leading to <strong className="text-foreground">misleading analytics and flawed business decisions</strong>.</li>
        <li>Visualizations that <strong className="text-foreground">misrepresent or bias data</strong> can misguide stakeholders.</li>
        <li>Maintenance requires balancing <strong className="text-foreground">innovation with system stability and data accuracy</strong>.</li>
      </ul>

      {/* Additional Notes */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Additional Notes</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>The speaker stresses the importance of incorporating <strong className="text-foreground">software development lifecycle best practices</strong> (like CI/CD) into data engineering workflows for improved lifecycle management.</li>
        <li>The life cycle is iterative, with pipeline maintenance feeding back into data collection and integration phases as data and business requirements evolve.</li>
        <li><strong className="text-foreground">AI/ML readiness</strong> is increasingly important; data often needs to be transformed into specialized formats (e.g., vector embeddings) to support machine learning models downstream.</li>
      </ul>

      {/* Conclusion */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Conclusion</h2>
      <p className="text-muted-foreground leading-relaxed mb-12">
        This video offers a detailed and structured framework for understanding the <strong className="text-foreground">data engineering life cycle</strong>, emphasizing that success relies on careful attention to each phase—from initial data collection through ongoing pipeline maintenance—while integrating modern best practices and anticipating challenges. By mastering these stages, data engineers can effectively <strong className="text-foreground">wrangle vast and complex data environments to deliver reliable, actionable insights that drive business value</strong>.
      </p>
    </div>
  </div>
);

// Lesson 2.1 Content
const Lesson21Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        2.1 Understanding Data Pipelines
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        A comprehensive overview of <strong className="text-foreground">data pipelines</strong>, explaining their purpose, processes, and applications by drawing an analogy to water pipelines. It breaks down the concept, tools, and use cases to clarify how data is collected, transformed, and delivered within organizations.
      </p>

      {/* Key Concepts and Analogies */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Concepts and Analogies</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>
          <strong className="text-foreground">Water Pipeline Analogy</strong>:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Water originates from natural sources such as lakes, oceans, and rivers.</li>
            <li>It undergoes treatment to become safe for use.</li>
            <li>Water pipelines transport water from sources to treatment plants and then to end users (for drinking, cleaning, agriculture).</li>
            <li>Similarly, <strong className="text-foreground">data pipelines</strong> move data from raw sources to places where it can be used after cleaning and transformation.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Data Sources</strong>:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Data exists in various forms: data lakes, databases, SaaS applications (both on-premises and cloud), and streaming data (e.g., factory sensor data).</li>
            <li>This raw data is often <strong className="text-foreground">dirty or contaminated</strong>, requiring cleaning and transformation before use.</li>
          </ul>
        </li>
      </ul>

      {/* Data Pipeline Processes */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Data Pipeline Processes</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Process</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Description</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Use Case / Benefits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">ETL (Extract, Transform, Load)</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Extracts data, cleans and transforms it (removes duplicates, fills missing values), then loads it into repositories such as enterprise data warehouses. Usually done in batch processing but can also support streaming data ingestion.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Creates clean, ready-to-use business data repositories for analysis and reporting.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Data Replication</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Continuously copies data from source to another repository to support high-performance back ends or backup/disaster recovery.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Ensures business continuity and supports applications requiring fast data access where source systems can't.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Data Virtualization</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Provides real-time, virtual access to data sources without physically copying data. Useful for testing new data use cases quickly without heavy transformation projects.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Enables rapid prototyping and querying across disparate data sources; formal pipelines can be built later if successful.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Workflow and Usage */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Workflow and Usage</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>Data pipelines <strong className="text-foreground">extract data from producers</strong> (sources) and deliver clean, transformed data to <strong className="text-foreground">consumers</strong> (business intelligence platforms, machine learning models, etc.).</li>
        <li>
          After data is prepared, it supports:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li><strong className="text-foreground">Business Intelligence (BI)</strong> for various types of reporting and decision-making.</li>
            <li><strong className="text-foreground">Machine Learning (ML)</strong>, which requires large volumes of high-quality data to train algorithms and enable smarter business decisions.</li>
          </ul>
        </li>
      </ul>

      {/* Core Insights */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Core Insights</h2>
      
      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={dataPipelinesImage} 
          alt="Understanding Data Pipelines" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data pipelines are essential</strong> for managing the flow of data from raw, unstructured sources into usable, reliable business assets.</li>
        <li>Unlike physical water pipelines, <strong className="text-foreground">data virtualization allows flexible, real-time data access without moving data</strong>, which accelerates experimentation and use case validation.</li>
        <li><strong className="text-foreground">Batch processing remains common</strong>, but streaming ingestion is increasing to handle real-time data.</li>
        <li>Data replication supports both performance optimization and resilience in business systems.</li>
        <li>The ultimate goal is to enable data consumers—whether BI tools or ML models—to operate on <strong className="text-foreground">clean, trustworthy data</strong>.</li>
      </ul>

      {/* Summary Table: Data Pipeline Methods */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Summary Table: Data Pipeline Methods</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Method</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Data Movement</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Use Case</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Key Advantage</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Limitations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">ETL</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Extract → Transform → Load (batch or streaming)</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Clean and prepare data for business use</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Structured, clean data ready for analysis</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Often scheduled, not real-time</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Replication</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Continuous copying</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">High performance needs, backup/recovery</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Fast access, business continuity</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Storage overhead, redundancy</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Virtualization</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Real-time querying</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Quick testing, prototyping</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">No data duplication, immediate access</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Not suitable for large production workloads</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Conclusion</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The video effectively communicates the <strong className="text-foreground">importance of data pipelines</strong> in transforming raw data into actionable insights. It highlights different technologies—ETL, replication, and virtualization—that organizations use to manage data flow. By comparing data pipelines to water pipelines, the explanation grounds abstract concepts in everyday experience, making the material accessible and clear.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-12">
        <strong className="text-foreground">Understanding these pipelines is crucial</strong> for businesses aiming to leverage data for intelligence and machine learning, ensuring decisions are based on clean, timely, and reliable data.
      </p>
    </div>
  </div>
);


// Lesson 2.2 Content
const Lesson22Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        2.2 ETL vs ELT Explained
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        An explanation and comparison of two data integration methods: <strong className="text-foreground">ETL (Extract, Transform, Load)</strong> and <strong className="text-foreground">ELT (Extract, Load, Transform)</strong>. These are processes commonly used in data engineering to move and prepare data for analytics.
      </p>

      {/* ETL vs ELT Diagram */}
      <div className="my-6 flex justify-center">
        <img 
          src={etlVsEltImage} 
          alt="ETL vs ELT Comparison Diagram" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      {/* ETL: Extract, Transform, Load */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">ETL: Extract, Transform, Load</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>
          <strong className="text-foreground">Process:</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li><strong className="text-foreground">Extract</strong>: Data is gathered from various source systems (e.g., databases, APIs, files).</li>
            <li><strong className="text-foreground">Transform</strong>: Data is processed in a staging area. Transformations include cleaning, filtering, aggregating, joining, and conforming data before loading it.</li>
            <li><strong className="text-foreground">Load</strong>: The prepared, transformed data is loaded into the target system, such as a data warehouse.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Legacy Context:</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Used with <strong className="text-foreground">on-premises data warehouses</strong> where compute and storage are limited and closely tied together.</li>
            <li>Transformation was done externally to avoid overloading the warehouse.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Tools mentioned:</strong> Apache Spark, Apache Kafka, Fivetran, Stitch, Talend, Informatica, SSIS
        </li>
      </ul>

      {/* ELT: Extract, Load, Transform */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">ELT: Extract, Load, Transform</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>
          <strong className="text-foreground">Process:</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li><strong className="text-foreground">Extract</strong>: Data is gathered from source systems.</li>
            <li><strong className="text-foreground">Load</strong>: Raw data is loaded directly into the target system (often a <strong className="text-foreground">cloud-based data warehouse</strong>).</li>
            <li><strong className="text-foreground">Transform</strong>: Data transformation happens <strong className="text-foreground">inside the target system</strong>, using its compute resources.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Modern Context:</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Enabled by <strong className="text-foreground">cloud data warehouses</strong> like Snowflake, BigQuery, and Redshift, where compute and storage are <strong className="text-foreground">decoupled and scalable</strong>.</li>
            <li>Easier to scale compute on demand, making transformation inside the warehouse practical and efficient.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Tools mentioned:</strong> Snowflake, BigQuery, Redshift, dbt
        </li>
      </ul>

      {/* Side-by-Side Comparison */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Side-by-Side Comparison</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Aspect</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">ETL</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">ELT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Transformation Location</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Staging area (before loading)</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Inside the target system (after loading)</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Infrastructure</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">On-premises, tightly coupled compute and storage</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cloud, decoupled compute and storage</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Data Warehouse Type</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Traditional/on-premises (e.g., Teradata, Oracle)</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cloud-based (e.g., Snowflake, BigQuery, Redshift)</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Scalability</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Limited by hardware</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Highly scalable (cloud elasticity)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Typical Tools</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Informatica, SSIS, Talend, Spark, Kafka</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Snowflake, BigQuery, Redshift, dbt</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Use Case</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Legacy systems, complex pre-processing needs</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Modern cloud analytics, fast iteration</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Insights</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>The key difference is <strong className="text-foreground">where and when</strong> transformation happens.</li>
        <li><strong className="text-foreground">ETL</strong> transforms data outside the warehouse (often necessary for legacy systems with limited resources).</li>
        <li><strong className="text-foreground">ELT</strong> leverages the power of modern cloud warehouses to transform data after loading.</li>
        <li>ELT is increasingly popular due to <strong className="text-foreground">cloud scalability and separation of compute and storage</strong>.</li>
        <li>Choosing between ETL and ELT depends on <strong className="text-foreground">existing infrastructure, data volume, and transformation complexity</strong>.</li>
      </ul>

      {/* When to Use Each Approach */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">When to Use Each Approach</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Scenario</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Recommended Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">On-premises data warehouse with limited compute</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">ETL</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Complex transformations before loading</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">ETL</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cloud data warehouse with scalable compute</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">ELT</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Need for raw data retention and flexible transformations</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">ELT</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Modern analytics with dbt-style transformations</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">ELT</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Conclusion</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Both ETL and ELT are valid data integration approaches, but <strong className="text-foreground">ELT has become the dominant pattern</strong> in modern cloud-based data engineering due to the scalability and flexibility of cloud data warehouses.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-12">
        Understanding both approaches is essential for data engineers, as many organizations still operate hybrid environments with both legacy and modern systems. The choice between ETL and ELT should be driven by <strong className="text-foreground">infrastructure capabilities, data requirements, and organizational needs</strong>.
      </p>
    </div>
  </div>
);

// Lesson 3.1 Content
const Lesson31Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        3.1 Relational Databases Basics
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        In today's world, data is everywhere from library checkouts and school records to millions of online transactions. To <strong className="text-foreground">store, organize, and extract insights efficiently</strong>, we use <strong className="text-foreground">databases, relational data models, and SQL</strong>. These concepts form the foundation for big data analytics, machine learning, and business intelligence.
      </p>

      <hr className="border-border my-8" />

      {/* What Is a Database? */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is a Database?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A <strong className="text-foreground">database</strong> is an electronic system that organizes data in <strong className="text-foreground">tables (rows and columns)</strong> for efficient storage and retrieval.
      </p>
      
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Example (Library Scenario):</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li><strong className="text-foreground">Tables:</strong> Patrons, Books, Checkouts</li>
        <li><strong className="text-foreground">Patrons table fields:</strong> Library card number, Name, Membership year, Total overdue fines</li>
      </ul>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Relational Databases:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Tables are <strong className="text-foreground">linked via relationships</strong> (primary keys and foreign keys)</li>
        <li>Enables complex queries:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>"Which books did a specific patron check out in 2025?"</li>
            <li>"Which books are most frequently checked out?"</li>
          </ul>
        </li>
      </ul>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Databases vs. Spreadsheets:</strong>
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Feature</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Databases</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Spreadsheets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Capacity</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Can store vast amounts of data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Limited by file size</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Security</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Encrypted and secure</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Less secure</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Multi-user Access</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Supports simultaneous queries</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Limited or no real-time collaboration</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Relationships</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Supports relational links</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Flat structure, no formal relationships</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data Modification</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Queries don't alter stored data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Direct edits possible</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Key Insight:</strong> Databases provide <strong className="text-foreground">more scalable, secure, and powerful</strong> storage and retrieval than spreadsheets. Queries <strong className="text-foreground">don't change the underlying data</strong>, allowing safe analysis.
      </p>

      <hr className="border-border my-8" />

      {/* Data Modeling Basics */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Data Modeling Basics</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Data modeling</strong> is the process of <strong className="text-foreground">structuring raw data logically</strong>, defining tables, attributes, and relationships. It ensures <strong className="text-foreground">consistency, usability, and efficient querying</strong>.
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Steps in Data Modeling:</strong>
      </p>
      <ol className="list-decimal list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li><strong className="text-foreground">Conceptual Model</strong> – High-level entities and relationships (e.g., Customer, Order, Product)</li>
        <li><strong className="text-foreground">Logical Model</strong> – Detailed attributes, primary keys (PK), and foreign keys (FK)</li>
        <li><strong className="text-foreground">Physical Model</strong> – Database schema with optimized storage and indexes</li>
      </ol>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Example:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Customer Table → CustomerID (PK), Name, Email</li>
        <li>Order Table → OrderID (PK), CustomerID (FK), Date, TotalAmount</li>
        <li><strong className="text-foreground">Relationship:</strong> Customers linked to orders for analytical queries</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Introduction to SQL */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Introduction to SQL</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">SQL (Structured Query Language)</strong> is used to <strong className="text-foreground">create, query, and manage relational databases</strong>.
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Basic SQL Examples:</strong>
      </p>

      <ol className="list-decimal list-outside ml-6 space-y-4 text-muted-foreground mb-4">
        <li>
          <strong className="text-foreground">Create Table:</strong>
          <pre className="bg-muted/50 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
            <code className="text-foreground">{`CREATE TABLE Customers (
  CustomerID INT PRIMARY KEY,
  Name VARCHAR(50),
  Email VARCHAR(50)
);`}</code>
          </pre>
        </li>
        <li>
          <strong className="text-foreground">Insert Data:</strong>
          <pre className="bg-muted/50 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
            <code className="text-foreground">{`INSERT INTO Customers (CustomerID, Name, Email)
VALUES (1, 'Alice', 'alice@example.com');`}</code>
          </pre>
        </li>
        <li>
          <strong className="text-foreground">Query Data:</strong>
          <pre className="bg-muted/50 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
            <code className="text-foreground">{`SELECT Name, Email
FROM Customers
WHERE CustomerID = 1;`}</code>
          </pre>
        </li>
        <li>
          <strong className="text-foreground">Join Tables:</strong>
          <pre className="bg-muted/50 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
            <code className="text-foreground">{`SELECT Customers.Name, Orders.TotalAmount
FROM Customers
JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`}</code>
          </pre>
        </li>
      </ol>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Why SQL Matters for Big Data:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Efficiently extracts insights from <strong className="text-foreground">large, relational datasets</strong></li>
        <li>Supports <strong className="text-foreground">aggregations, filters, and complex queries</strong></li>
        <li>Powers <strong className="text-foreground">analytics, dashboards, and ML pipelines</strong></li>
      </ul>

      <hr className="border-border my-8" />

      {/* Real-World Applications */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Real-World Applications</h2>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">E-commerce</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Query customer purchase history</li>
        <li>Analyze top-selling products</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Healthcare</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Aggregate patient data for trends</li>
        <li>Identify high-risk patients</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Finance</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Detect fraudulent transactions</li>
        <li>Generate reports on user spending patterns</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Library Management (Example from Video)</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Track book checkouts by patrons</li>
        <li>Identify overdue books and frequent borrowers</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Databases</strong> store structured data efficiently and securely</li>
        <li><strong className="text-foreground">Relational models</strong> link tables, enabling complex analysis</li>
        <li><strong className="text-foreground">Data modeling</strong> ensures logical structure, relationships, and optimized queries</li>
        <li><strong className="text-foreground">SQL</strong> is the essential language for interacting with databases without altering underlying data</li>
        <li>Together, these tools provide the foundation for <strong className="text-foreground">big data analytics, reporting, and AI applications</strong></li>
      </ul>

      <hr className="border-border my-8" />

      {/* Final Thought */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Final Thought</h3>
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
        "Raw data is only valuable once it's structured, linked, and queried effectively, databases, data modeling, and SQL turn data into actionable insights."
      </blockquote>
      <p className="text-muted-foreground leading-relaxed mb-12">
        Mastering these fundamentals equips students with the skills to <strong className="text-foreground">handle big data confidently</strong>, enabling advanced analytics and informed decision-making.
      </p>
    </div>
  </div>
);

// Lesson 3.2 Content
const Lesson32Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        3.2 Data Modeling Concepts
      </h1>

      {/* Overview Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Overview</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Data modeling is the process of designing a <strong className="text-foreground">clear, structured blueprint for a database</strong> so raw, messy data becomes reliable, efficient, and easy to analyze. It defines <strong className="text-foreground">entities, relationships, and keys</strong>, follows a workflow from <strong className="text-foreground">conceptual → logical → physical models</strong>, and ensures <strong className="text-foreground">data integrity, performance, and compliance</strong>. Strong data models power analytics, applications, and AI/ML, and must be well-documented and maintained as systems evolve.
      </p>

      <hr className="border-border my-8" />

      {/* Core Concepts and Definitions */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Core Concepts and Definitions</h3>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data Modeling</strong>: The process of <strong className="text-foreground">defining the structure of a database</strong> by organizing raw, unstructured data into a logical, coherent framework that supports efficient storage, querying, and analysis.</li>
        <li>It involves creating a <strong className="text-foreground">blueprint or schema</strong> that dictates how data entities relate to each other, ensuring consistency and usability across various applications.</li>
        <li>The goal is to make data <strong className="text-foreground">both human-readable and computationally efficient</strong> to reduce costs during large-scale analytics and improve performance.</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Explanation and Importance */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Explanation and Importance</h3>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>Raw data (e.g., from APIs or transactional sources) is often messy and unstructured.</li>
        <li>Data modeling <strong className="text-foreground">aligns and integrates</strong> this data into existing databases by defining relationships like linking transactions to customers or payments to orders.</li>
        <li>A well-designed data model:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Supports <strong className="text-foreground">efficient data queries</strong> and analysis.</li>
            <li>Provides a <strong className="text-foreground">foundation for applications</strong> such as machine learning, analytics platforms, and database design.</li>
            <li>Ensures <strong className="text-foreground">data integrity and accuracy</strong>, critical for reliable AI/ML outcomes and business decision-making.</li>
            <li>Facilitates <strong className="text-foreground">data governance and compliance</strong> with regulations like GDPR by clearly documenting data storage and security.</li>
          </ul>
        </li>
      </ul>

      <hr className="border-border my-8" />

      {/* Data Model Example Breakdown */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Data Model Example Breakdown</h3>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>The video walks through a <strong className="text-foreground">relational data model</strong> example involving:
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Tables such as <strong className="text-foreground">Order Header</strong>, <strong className="text-foreground">Payment</strong>, <strong className="text-foreground">Customer</strong>, <strong className="text-foreground">Order Line</strong>, and <strong className="text-foreground">Product</strong>.</li>
            <li>Use of <strong className="text-foreground">Primary Keys (PK)</strong> as unique identifiers (e.g., Customer ID, Order ID).</li>
            <li>Use of <strong className="text-foreground">Foreign Keys (FK)</strong> to establish relationships between tables (e.g., Payment linked to Order Header).</li>
            <li>Logical decisions about data storage (e.g., whether to include Delivery ID in Order Header) to optimize space and query efficiency.</li>
          </ul>
        </li>
      </ul>

      <hr className="border-border my-8" />

      {/* Types of Data Models Covered */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Types of Data Models Covered</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Data Model Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Description</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Use Case / Strengths</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Relational Model</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Data organized in tables with relations via primary and foreign keys.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Widely used; simple to set up; powerful querying capabilities.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Object-Oriented Model</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Combines data and operations on that data, modeling complex objects with state changes.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Suitable for complex applications like robotics or simulations.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Network Model</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Extension of hierarchical model; allows multiple parent records per child for complex links.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Handles complex many-to-many relationships better than trees.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Hierarchical Model</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Tree-like structure with one parent and multiple children per record.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Early database systems; limited in representing many relationships.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Entity-Relationship Model</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Maps entities, attributes, and relationships clearly for logical data design.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Useful for databases with distinct, well-defined entity relations.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-8" />

      {/* Data Modeling Workflow */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Data Modeling Workflow</h3>
      <ol className="list-decimal list-outside ml-6 space-y-4 text-muted-foreground">
        <li>
          <strong className="text-foreground">Conceptual Modeling</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>High-level business view of data flow and key entities.</li>
            <li>Focus on stakeholder requirements and what data is needed for reports and analytics.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Logical Modeling</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Detailed technical design including attributes, keys, and relationships.</li>
            <li>Defines how data is structured logically before physical implementation.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Physical Modeling</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Creation of database schemas, indexes, partitioning, and optimization for performance.</li>
            <li>Preparing the database architecture before ingesting data.</li>
          </ul>
        </li>
        <li>
          <strong className="text-foreground">Implementation and Maintenance</strong>
          <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Building the actual database and uploading data.</li>
            <li>Ongoing updates to the model based on changing business needs or data requirements.</li>
            <li>Documentation is critical to avoid technical debt and ease future modifications.</li>
          </ul>
        </li>
      </ol>

      <hr className="border-border my-8" />

      {/* Applications and Benefits of Data Modeling */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Applications and Benefits of Data Modeling</h3>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Database Design</strong>: Helps architects design efficient data structures aligned with business needs.</li>
        <li><strong className="text-foreground">Data Integrity</strong>: Ensures accuracy and consistency in stored data, critical for trustworthy analytics.</li>
        <li><strong className="text-foreground">Data Analysis</strong>: Facilitates smooth extraction of insights by providing a clear data framework.</li>
        <li><strong className="text-foreground">Application Development</strong>: Supports transactional and operational applications with reliable data usage.</li>
        <li><strong className="text-foreground">Data Governance & Compliance</strong>: Provides clarity for data management policies and regulatory adherence.</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Popular Data Modeling Tools Mentioned */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Popular Data Modeling Tools Mentioned</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Tool</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Key Features</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">ER Studio</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Connects to databases, identifies relationships, design.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Popular and feature-rich.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">DB Schema</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Schema documentation, monitoring, supports SQL/NoSQL.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Useful for schema replication.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">IRND Data Modeling</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Creates database from physical models automatically.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Reduces manual steps if correctly formatted.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Archie</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Visual architecture tool.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Free/cheap option for visualization.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">SQL Database Modeler</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Build and visualize SQL database models.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Supports SQL-centric workflows.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Oracle SQL Data Modeler</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Specialized for Oracle databases.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Useful in Oracle environments.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">IBM Infosphere Data Architect</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Focus on BI and analytics-friendly modeling.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Good for less technical users.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">MySQL Workbench</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Open source, MySQL focused modeling and design.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Popular but presenter prefers not to use it.</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Lucidchart</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cloud-based collaborative diagramming tool.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Great for team collaboration.</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">PG Modeler</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Open source PostgreSQL modeling tool.</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Full source code access and ease of use.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-8" />

      {/* Key Insights */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Key Insights</h3>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li><strong className="text-foreground">Data modeling is fundamental</strong> to all database systems and data-driven applications.</li>
        <li>It bridges the gap between raw data and usable, analyzable information.</li>
        <li>Choosing the right data model depends on the complexity and nature of the data and applications.</li>
        <li>Maintenance and documentation are as important as initial design to keep models functional and adaptable.</li>
        <li>Modern tools facilitate data modeling, ranging from simple visualization to automated database creation.</li>
      </ul>

      <hr className="border-border my-8" />

      <p className="text-muted-foreground leading-relaxed mb-12">
        This Page thoroughly demystifies data modeling, emphasizing its indispensability in the modern data landscape for ensuring <strong className="text-foreground">robust, efficient, and compliant data management</strong>.
      </p>
    </div>
  </div>
);

// Lesson 4.1 Content
const Lesson41Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        4.1 Big Data Fundamentals
      </h1>

      {/* Overview Section */}
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Overview</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Every click, swipe, message, photo, video, and transaction generates data. When this data becomes <strong className="text-foreground">too large, too fast, and too complex</strong> for traditional databases or spreadsheets to handle, it is known as <strong className="text-foreground">Big Data</strong>. Understanding big data fundamentals helps students grasp <strong className="text-foreground">how modern systems store, process, and extract value from massive datasets</strong> used by companies like Google, Netflix, hospitals, and governments.
      </p>

      <hr className="border-border my-8" />

      {/* What Is Big Data? */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is Big Data?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Big Data</strong> refers to extremely large and complex datasets that cannot be efficiently stored or analyzed using single-machine systems.
      </p>
      
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Simple example:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>A school storing marks in Excel → <em>normal data</em></li>
        <li>YouTube storing billions of videos, comments, likes, and watch histories → <em>big data</em></li>
      </ul>

      <p className="text-muted-foreground leading-relaxed mb-4">
        With nearly <strong className="text-foreground">5 billion smartphone users worldwide</strong>, the amount of data generated every minute is enormous:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>3.8 million Google searches</li>
        <li>4.5 million YouTube videos watched</li>
        <li>188 million emails sent</li>
        <li>2.1 million snaps shared</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={apacheSparkImage} 
          alt="Apache Spark Fundamentals" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      {/* The 5 V's of Big Data */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">The 5 V's of Big Data (Core Foundation)</h2>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Volume – How much data?</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Big data involves <strong className="text-foreground">massive quantities of data</strong>, often measured in terabytes, petabytes, or exabytes.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Healthcare systems generate <strong className="text-foreground">2314 exabytes annually</strong> from patient records, scans, and lab results</li>
        <li>Social media platforms store billions of images and videos</li>
      </ul>

      <hr className="border-border my-8" />

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Velocity – How fast is data generated?</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Data is produced and updated <strong className="text-foreground">continuously and in real time</strong>.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Live stock market prices</li>
        <li>Ride-sharing apps tracking driver locations every second</li>
      </ul>

      <hr className="border-border my-8" />

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Variety – What types of data?</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Big data comes in multiple formats:
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Data Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Description</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Structured</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Fixed schema</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">SQL tables, Excel sheets</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Semi-structured</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Partial structure</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">JSON, XML, log files</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Unstructured</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">No structure</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Images, videos, audio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <p className="text-muted-foreground leading-relaxed mb-4">An e-commerce app stores:</p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Orders in tables (structured)</li>
        <li>App logs (semi-structured)</li>
        <li>Product images (unstructured)</li>
      </ul>

      <hr className="border-border my-8" />

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Veracity – How reliable is the data?</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Not all data is accurate or clean. Veracity focuses on <strong className="text-foreground">data quality and trustworthiness</strong>.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Fake product reviews</li>
        <li>Faulty IoT sensor readings</li>
      </ul>

      <hr className="border-border my-8" />

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5. Value – What insight does data provide?</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Data is useful only if it delivers <strong className="text-foreground">actionable insights</strong>.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Netflix recommending shows</li>
        <li>Banks detecting fraud in real time</li>
        <li>Hospitals predicting diseases early</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Why Traditional Systems Fail */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Traditional Systems Fail</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Traditional databases:</p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Operate on a <strong className="text-foreground">single machine</strong></li>
        <li>Cannot scale efficiently</li>
        <li>Are costly to upgrade</li>
        <li>Struggle with unstructured data</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Big data systems overcome this by <strong className="text-foreground">distributing storage and computation across multiple machines</strong>.
      </p>

      <hr className="border-border my-8" />

      {/* Hadoop: Foundation of Big Data Processing */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Hadoop: Foundation of Big Data Processing</h2>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. HDFS (Hadoop Distributed File System)</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        HDFS enables scalable and fault-tolerant storage by:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Splitting large files into <strong className="text-foreground">small blocks</strong></li>
        <li>Storing blocks across <strong className="text-foreground">multiple machines</strong></li>
        <li>Replicating data to prevent loss during failures</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A 1 TB video file is divided into chunks and stored on several servers instead of one.
      </p>

      <hr className="border-border my-8" />

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. MapReduce (Parallel Processing)</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        MapReduce speeds up processing by:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Breaking large jobs into smaller tasks (<strong className="text-foreground">Map</strong>)</li>
        <li>Running them <strong className="text-foreground">in parallel</strong></li>
        <li>Combining results into a final output (<strong className="text-foreground">Reduce</strong>)</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">Example:</strong></p>
      <p className="text-muted-foreground leading-relaxed mb-4">Counting words in millions of documents:</p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Each machine counts words in its portion</li>
        <li>Results are merged into a final count</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Real-World Applications */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Real-World Applications of Big Data</h2>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Healthcare</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Early disease detection</li>
        <li>Personalized treatment plans</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Gaming</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Analyze player behavior</li>
        <li>Improve gameplay and reduce churn</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Disaster Management</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Predict hurricanes and floods</li>
        <li>Improve evacuation and response planning</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">E-commerce</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Personalized recommendations</li>
        <li>Demand forecasting and inventory optimization</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>Big data deals with <strong className="text-foreground">large, fast, and diverse datasets</strong></li>
        <li>The <strong className="text-foreground">5 V's</strong> define big data characteristics</li>
        <li><strong className="text-foreground">Hadoop</strong> enables distributed storage (HDFS) and parallel processing (MapReduce)</li>
        <li>Proper big data analysis creates value across industries</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Final Thought */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Final Thought</h3>
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
        "Data is the new oil, but big data analytics is the refinery that turns it into value."
      </blockquote>
      <p className="text-muted-foreground leading-relaxed mb-12">
        Mastering big data fundamentals builds a strong foundation for careers in <strong className="text-foreground">data engineering, analytics, AI, cloud computing, and modern software systems</strong>.
      </p>
    </div>
  </div>
);

// Lesson 4.2 Content
const Lesson42Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        4.2 Apache Spark Basics
      </h1>

      {/* Overview Section */}
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Overview</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        As data volumes grow beyond what a single machine can handle, traditional tools become slow and inefficient. <strong className="text-foreground">Apache Spark</strong> was built to solve this exact problem. It is a fast, distributed, in-memory data processing engine used to analyze massive datasets efficiently.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6">
        This page explains Apache Spark fundamentals from zero, covering:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>What Spark is and why it matters</li>
        <li>Spark architecture and execution flow</li>
        <li>Core concepts like RDDs, DAGs, and lazy evaluation</li>
        <li>How Spark is used in real-world big data systems</li>
      </ul>

      <hr className="border-border my-8" />

      {/* What Is Apache Spark? */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is Apache Spark?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Apache Spark is an <strong className="text-foreground">open-source distributed computing framework</strong> designed to process large datasets across multiple machines in parallel.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Why Spark Is Fast</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Processes data <strong className="text-foreground">in memory</strong> instead of repeatedly writing to disk</li>
        <li>Splits data into <strong className="text-foreground">partitions</strong> and processes them in parallel</li>
        <li>Optimizes execution automatically using a <strong className="text-foreground">logical execution plan</strong></li>
      </ul>

      {/* Comparison Table */}
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Approach</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Performance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Excel / traditional scripts</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Slow for large data</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Apache Spark</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Processes terabytes or petabytes efficiently</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={apacheSparkBasicsImage} 
          alt="Apache Spark Fundamentals Diagram" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      <hr className="border-border my-8" />

      {/* Why Apache Spark Was Created */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Apache Spark Was Created</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Earlier systems like <strong className="text-foreground">Hadoop MapReduce</strong> were powerful but slow because:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Each step wrote intermediate data to disk</li>
        <li>Iterative workloads (analytics, ML) were inefficient</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Apache Spark Architecture */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Apache Spark Architecture (Beginner View)</h2>
      
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Key Components of Spark Architecture</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Component</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Role in Spark</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Simple Analogy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Driver Program</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Plans and coordinates execution</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Master Chef</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Cluster Manager</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Allocates CPU & memory</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Restaurant Manager</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Worker Nodes</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Execute tasks in parallel</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Assistant Chefs</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Executors</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Run tasks & store data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Cooking Stations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Restaurant Analogy (Easy to Remember)</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>The <strong className="text-foreground">Master Chef (Driver)</strong> receives an order (Spark job)</li>
        <li>The work is divided among <strong className="text-foreground">Assistant Chefs (Workers)</strong></li>
        <li>The <strong className="text-foreground">Restaurant Manager (Cluster Manager)</strong> decides how many chefs are needed</li>
        <li>All chefs work in parallel, finishing the order faster</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Spark follows the same idea to process large data quickly.
      </p>

      <hr className="border-border my-8" />

      {/* Spark Execution Flow */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Spark Execution Flow (With Example)</h2>
      
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Example Task</h3>
      <ol className="list-decimal list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Read a CSV file</li>
        <li>Remove duplicate records</li>
        <li>Count total rows</li>
      </ol>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Step-by-Step Execution</h3>
      
      <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">1. Spark Session / Spark Context</h4>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Created by the Driver Program</li>
        <li>Acts as the entry point to Spark</li>
        <li>Connects to the cluster manager</li>
      </ul>

      <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">2. Lazy Evaluation</h4>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Spark does not execute immediately</li>
        <li>It builds a logical plan (DAG) for all transformations</li>
      </ul>

      <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">3. DAG (Directed Acyclic Graph)</h4>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Represents the full execution plan</li>
        <li>Optimized before execution begins</li>
      </ul>

      <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">4. Transformations vs Actions</h4>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Type</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Description</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Transformation</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Modifies data, not executed immediately</td>
              <td className="border border-border px-4 py-3 text-muted-foreground"><code className="bg-muted px-1 rounded text-sm">filter()</code>, <code className="bg-muted px-1 rounded text-sm">dropDuplicates()</code></td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Action</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Triggers execution</td>
              <td className="border border-border px-4 py-3 text-muted-foreground"><code className="bg-muted px-1 rounded text-sm">count()</code>, <code className="bg-muted px-1 rounded text-sm">show()</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Execution starts only when an <strong className="text-foreground">action</strong> is called.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">How Spark Executes Internally</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Step</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">What Happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">DAG Creation</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Logical plan is built</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Stage Division</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">DAG is split into stages</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Task Creation</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Each stage is divided into tasks</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Task Scheduling</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Tasks assigned to executors</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Parallel Execution</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Workers process data partitions</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Result Collection</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Driver aggregates results</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-8" />

      {/* Core Spark Data Concepts */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Core Spark Data Concepts</h2>
      
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">RDD (Resilient Distributed Dataset)</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Fundamental Spark data structure</li>
        <li>Immutable and distributed</li>
        <li>Fault-tolerant using lineage</li>
        <li><em>Example: A large log file split across multiple machines.</em></li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">DataFrames (Preferred for Beginners)</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Feature</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">RDD</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">DataFrame</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Ease of Use</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Low</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">High</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Performance</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Good</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Excellent</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Optimization</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Manual</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Automatic</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6">
        <em>Example: A table with columns: order_id, amount, date</em>
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Spark Ecosystem Components</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Component</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Purpose</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Spark SQL</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Structured data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">SQL on logs</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">Spark Streaming</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Real-time data</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Sensor streams</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">MLlib</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Machine learning</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Recommendations</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground"><strong className="text-foreground">GraphX</strong></td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Graph processing</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Social networks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-8" />

      {/* Why Apache Spark Is Important */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Apache Spark Is Important in Big Data</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground mb-6">
        <li><strong className="text-foreground">Speed</strong> — In-memory processing makes Spark up to 100× faster</li>
        <li><strong className="text-foreground">Scalability</strong> — Runs on thousands of nodes</li>
        <li><strong className="text-foreground">Versatility</strong> — Batch + Streaming + ML in one engine</li>
        <li><strong className="text-foreground">Developer Friendly</strong> — Supports Python, Scala, Java, SQL</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Real-World Use Cases */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Real-World Use Cases</h2>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">E-commerce</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Product recommendations</li>
        <li>Sales analytics</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Finance</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Fraud detection</li>
        <li>Risk modeling</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Healthcare</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Patient data analysis</li>
        <li>Disease prediction</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Social Media</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Trend detection</li>
        <li>User behavior analysis</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Spark vs Hadoop MapReduce */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Spark vs Hadoop MapReduce</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Feature</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Spark</th>
              <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">MapReduce</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Processing</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">In-memory</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Disk-based</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Speed</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Very fast</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Slow</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-muted-foreground">Use Cases</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Batch, Streaming, ML</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Batch only</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-3 text-muted-foreground">Developer Experience</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">High</td>
              <td className="border border-border px-4 py-3 text-muted-foreground">Low</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-8" />

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>Apache Spark is a <strong className="text-foreground">fast, distributed big data engine</strong></li>
        <li>Uses <strong className="text-foreground">parallel processing + in-memory execution</strong></li>
        <li><strong className="text-foreground">Lazy evaluation</strong> and <strong className="text-foreground">DAG optimization</strong> make it efficient</li>
        <li>Core building block of modern data platforms</li>
        <li>Essential skill for data engineers and analysts</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Final Thought */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Final Thought</h3>
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
        "Big data is not about size alone—it's about speed, insight, and action. Apache Spark turns raw data into intelligence."
      </blockquote>
      <p className="text-muted-foreground leading-relaxed mb-12">
        If you master Spark fundamentals, you gain a powerful foundation for <strong className="text-foreground">analytics, machine learning, and large-scale data engineering</strong>.
      </p>
    </div>
  </div>
);

// Lesson 5.1 Content
const Lesson51Content = () => (
  <div className="bg-white min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12 text-[rgb(55,53,47)]" style={{ lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold mb-6">5.1 Data orchestration</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-0">Overview</h1>
      <hr className="border-[rgba(55,53,47,0.09)] my-4" />

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">
        <strong>Data orchestration</strong> in modern cloud data management. Just as a conductor synchronizes musicians to produce harmonious music, data orchestration coordinates the loading, processing, and compute resource allocation in cloud data environments to ensure efficient and accurate data flow
      </h2>

      {/* 1. Definition */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">1. Definition of Data Orchestration</h1>
      <p className="my-2">
        Data orchestration is the systematic coordination, scheduling, and management of:
      </p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data ingestion</li>
        <li className="pl-1">Data replication</li>
        <li className="pl-1">Data transformation</li>
        <li className="pl-1">Data processing</li>
        <li className="pl-1">Compute resource provisioning</li>
      </ul>
      <p className="my-2">
        across distributed cloud environments to ensure data arrives accurately, on time, and cost-efficiently. It acts as the control layer that ensures all data-related services execute in the correct sequence and with appropriate resources.
      </p>

      {/* Image */}
      <figure className="my-6 text-center">
        <img src={dataOrchestrationImage} alt="Data Orchestration" className="max-w-full mx-auto" />
      </figure>

      {/* 2. Why Data Orchestration is Needed */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">2. Why Data Orchestration is Needed</h1>
      <p className="my-2">Modern cloud environments introduce:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Distributed data sources</li>
        <li className="pl-1">Multiple cloud services</li>
        <li className="pl-1">Dynamic compute scaling</li>
        <li className="pl-1">Real-time data needs</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Without orchestration:</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data pipelines break</li>
        <li className="pl-1">Costs increase due to idle compute</li>
        <li className="pl-1">Downstream systems process incomplete data</li>
        <li className="pl-1">Systems lose reliability</li>
      </ul>

      {/* 3. Symphony Conductor Analogy */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">3. Symphony Conductor Analogy (Conceptual Understanding)</h1>
      <p className="my-2">A conductor does not create music directly.</p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">The conductor:</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Controls timing</li>
        <li className="pl-1">Coordinates performers</li>
        <li className="pl-1">Ensures harmony</li>
      </ul>

      <p className="my-2">Similarly, data orchestration:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Does not store data</li>
        <li className="pl-1">Controls execution timing</li>
        <li className="pl-1">Coordinates services and workflows</li>
        <li className="pl-1">Ensures correct data flow</li>
      </ul>

      <p className="my-2">Without orchestration, systems behave independently, leading to inefficiency.</p>

      {/* 4. Traditional Data Ingestion */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">4. Traditional Data Ingestion (Batch-Based Model)</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition: Batch Processing</h2>
      <p className="my-2">
        Batch processing is a method where data is collected over time and processed in large chunks at scheduled intervals.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Characteristics</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Overnight execution</li>
        <li className="pl-1">Fixed compute resources</li>
        <li className="pl-1">Centralized systems</li>
        <li className="pl-1">Predictable workloads</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Limitations</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">High latency</li>
        <li className="pl-1">No real-time insights</li>
        <li className="pl-1">Inefficient compute usage</li>
      </ul>

      {/* 5. Transition to Cloud */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">5. Transition to Cloud Data Environments</h1>
      <p className="my-2">Cloud computing changed data management by introducing:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Distributed data sources</li>
        <li className="pl-1">Decoupled storage and compute</li>
        <li className="pl-1">Elastic scaling</li>
        <li className="pl-1">Continuous data generation</li>
      </ul>
      <p className="my-2">This shift made static batch schedules insufficient.</p>

      {/* 6. Live Streaming Data Ingestion */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">6. Live Streaming Data Ingestion</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition: Live Streaming</h2>
      <p className="my-2">
        Live streaming data ingestion is the continuous movement of data from source systems to target platforms in near real time.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Benefits</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Reduced latency</li>
        <li className="pl-1">Continuous data availability</li>
        <li className="pl-1">Avoids batch spikes</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Challenges Introduced</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Identifying all relevant data sources</li>
        <li className="pl-1">Managing data dependencies</li>
        <li className="pl-1">Triggering transformations correctly</li>
        <li className="pl-1">Handling partial or late data</li>
      </ul>

      <p className="my-2">Live streaming increases orchestration complexity, making coordination essential.</p>

      {/* 7. Downstream Data Processing */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">7. Downstream Data Processing Challenges</h1>
      <p className="my-2">After ingestion, data must be:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Cleaned</li>
        <li className="pl-1">Transformed</li>
        <li className="pl-1">Aggregated</li>
        <li className="pl-1">Loaded into analytical systems</li>
      </ul>

      <p className="my-2">Challenges include:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Knowing when data is "ready"</li>
        <li className="pl-1">Synchronizing multiple streams</li>
        <li className="pl-1">Avoiding premature processing</li>
      </ul>

      <p className="my-2">Orchestration ensures downstream processes start only when conditions are met.</p>

      {/* 8. Compute Resource Management */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">8. Compute Resource Management in the Cloud</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition: Cloud Compute Scaling</h2>
      <p className="my-2">Cloud compute scaling allows resources to:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Scale up during heavy workloads</li>
        <li className="pl-1">Scale down when idle</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Example</h2>
      <p className="my-2">Platforms like Snowflake allow:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">On-demand compute provisioning</li>
        <li className="pl-1">Usage-based billing</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Orchestration decides:</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">When to start compute</li>
        <li className="pl-1">How much compute is required</li>
        <li className="pl-1">When to terminate resources</li>
      </ul>

      {/* 9. Microservices and Cost Efficiency */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">9. Microservices and Cost Efficiency</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition: Microservices</h2>
      <p className="my-2">
        Microservices are small, independent services designed to perform a specific task and shut down after completion.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Role in Orchestration</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Orchestration triggers microservices</li>
        <li className="pl-1">Ensures services run only when needed</li>
        <li className="pl-1">Prevents resource wastage</li>
      </ul>

      <p className="my-2">This model is the foundation of cloud cost optimization.</p>

      {/* 10. Data Replication */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">10. Data Replication</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition: Data Replication</h2>
      <p className="my-2">
        Data replication is the continuous copying of data from source databases into cloud environments.
      </p>

      {/* 11. Vendor Selection */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">11. Vendor Selection in Orchestration</h1>
      <p className="my-2">Organizations typically select:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">A replication vendor</li>
        <li className="pl-1">An orchestration framework</li>
      </ul>

      <p className="my-2">Options include:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Built-in cloud orchestration tools</li>
        <li className="pl-1">Third-party orchestration platforms</li>
        <li className="pl-1">Open-source orchestration solutions</li>
      </ul>

      <p className="my-2">Selection depends on:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data volume</li>
        <li className="pl-1">Real-time needs</li>
        <li className="pl-1">Cost constraints</li>
        <li className="pl-1">Existing architecture</li>
      </ul>

      {/* 12. Orchestration Framework */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">12. Orchestration Framework</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Definition</h2>
      <p className="my-2">An orchestration framework is a system that:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Schedules workflows</li>
        <li className="pl-1">Manages dependencies</li>
        <li className="pl-1">Monitors execution</li>
        <li className="pl-1">Handles failures</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Core Functions</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Task sequencing</li>
        <li className="pl-1">Conditional execution</li>
        <li className="pl-1">Error handling</li>
        <li className="pl-1">Resource provisioning</li>
      </ul>

      {/* 13. End-to-End Process */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">13. End-to-End Data Orchestration Process</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 1: Data Onboarding</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Identify data sources</li>
        <li className="pl-1">Define ingestion method (batch or streaming)</li>
        <li className="pl-1">Configure replication tools</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 2: Data Ingestion</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data is streamed or batch-loaded into the cloud</li>
        <li className="pl-1">Orchestration monitors ingestion status</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 3: Compute Provisioning</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Orchestration allocates compute resources</li>
        <li className="pl-1">Microservices are spun up as required</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 4: Data Transformation</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data is cleaned, enriched, and structured</li>
        <li className="pl-1">Transformations run only after ingestion completion</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 5: Dependency Management</h2>
      <p className="my-2">Orchestration ensures:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Tasks run in correct order</li>
        <li className="pl-1">No step starts prematurely</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 6: Data Loading</h2>
      <p className="my-2">Transformed data is loaded into:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data warehouses</li>
        <li className="pl-1">Data lakes</li>
        <li className="pl-1">Analytical platforms</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 7: Compute De-Provisioning</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Resources are shut down</li>
        <li className="pl-1">Costs are minimized</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Step 8: Monitoring and Error Handling</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Orchestration tracks execution</li>
        <li className="pl-1">Retries or alerts on failure</li>
      </ul>

      {/* 14. Orchestration Planning Approaches */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">14. Orchestration Planning Approaches</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Strategic Architecture Planning</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">On-site workshops</li>
        <li className="pl-1">Whiteboarding workflows</li>
        <li className="pl-1">Deep upfront design</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-2">Co-Development Model</h2>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Ongoing collaboration</li>
      </ul>

      {/* 15. Relationship with Data Governance */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">15. Relationship with Data Governance and Data Quality</h1>
      <p className="my-2">Orchestration enforces:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Governance rules</li>
        <li className="pl-1">Quality checks</li>
      </ul>

      <p className="my-2">Ensures:</p>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Data validation happens before use</li>
        <li className="pl-1">Policies are consistently applied</li>
      </ul>

      {/* 16. Benefits */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">16. Benefits of Data Orchestration</h1>
      <ul className="list-disc ml-6 my-2">
        <li className="pl-1">Real-time analytics</li>
        <li className="pl-1">Lower cloud costs</li>
        <li className="pl-1">Reliable data pipelines</li>
        <li className="pl-1">Scalable architectures</li>
        <li className="pl-1">Better business decisions</li>
      </ul>

      <p className="my-4">
        Data orchestration transforms cloud data systems from independent components into a coordinated ecosystem. By managing timing, dependencies, and resources, orchestration enables scalable, efficient, and reliable cloud data operation.
      </p>
    </div>
  </div>
);

// Lesson 5.2 Content - Apache Airflow
const Lesson52Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">5.2 Apache Airflow</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        This comprehensive tutorial, presented by Code J, offers an in-depth introduction to Apache Airflow 2.0, combining theoretical explanations and practical demonstrations over approximately two hours. It is designed for beginners with basic Python knowledge and includes hands-on examples with source code hosted on a GitHub repository.
      </p>

      {/* 1. Introduction to Apache Airflow */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">1. Introduction to Apache Airflow</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Definition</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Apache Airflow is an open-source workflow orchestration platform used to design, schedule, and monitor data pipelines using Python.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Purpose</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Automate ETL pipelines</li>
        <li className="pl-1">Schedule batch jobs</li>
        <li className="pl-1">Monitor data workflows</li>
        <li className="pl-1">Manage dependencies between tasks</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Key Features</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Python-based DAG creation</li>
        <li className="pl-1">Scalable architecture</li>
        <li className="pl-1">Powerful scheduling system</li>
        <li className="pl-1">Rich UI for monitoring</li>
        <li className="pl-1">Extensible using plugins and providers</li>
      </ul>

      {/* Images - Below Key Features */}
      <div className="my-6">
        <img 
          src={airflowPrerequisitesImage} 
          alt="Prerequisites & Installation, Airflow Architecture, Task Lifecycle" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      <div className="my-6">
        <img 
          src={airflowCourseOverviewImage} 
          alt="Course Overview & Setup" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* 2. Course Prerequisites & Setup */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">2. Course Prerequisites & Setup</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Prerequisites</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Basic Python knowledge</li>
        <li className="pl-1">Understanding of command line</li>
        <li className="pl-1">Familiarity with data workflows (optional)</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Installation Options</h2>
      
      <h3 className="text-[1.25rem] font-semibold mt-5 mb-2">Option 1: Local Installation</h3>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Python 3.6+ required</li>
        <li className="pl-1">Install using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">pip install apache-airflow</code></li>
        <li className="pl-1">Initialize DB using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">airflow db init</code></li>
        <li className="pl-1">Start services</li>
      </ul>

      <h3 className="text-[1.25rem] font-semibold mt-5 mb-2">Option 2: Docker Setup (Recommended)</h3>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Install Docker Desktop</li>
        <li className="pl-1">Use Docker Compose file</li>
        <li className="pl-1">Faster and production-like environment</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Airflow Components Started Manually</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Webserver (UI access)</li>
        <li className="pl-1">Scheduler (task scheduling)</li>
        <li className="pl-1">User created via CLI for login</li>
      </ul>

      {/* 3. Core Concepts */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">3. Core Concepts of Apache Airflow</h1>
      
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold">Concept</th>
              <th className="border border-border px-4 py-2 text-left font-semibold">Explanation</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-4 py-2">DAG</td>
              <td className="border border-border px-4 py-2">Directed Acyclic Graph representing workflow</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Task</td>
              <td className="border border-border px-4 py-2">Individual unit of work</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Operator</td>
              <td className="border border-border px-4 py-2">Defines what a task does</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">DAG Run</td>
              <td className="border border-border px-4 py-2">Execution of DAG for a specific date</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Task Instance</td>
              <td className="border border-border px-4 py-2">Specific execution of a task</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Execution Date</td>
              <td className="border border-border px-4 py-2">Logical time for which DAG runs</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Task Lifecycle */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">4. Task Lifecycle</h1>
      <p className="my-2 text-muted-foreground">Task moves through these states:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">no status</li>
        <li className="pl-1">scheduled</li>
        <li className="pl-1">queued</li>
        <li className="pl-1">running</li>
        <li className="pl-1">success / failed</li>
        <li className="pl-1">retry / reschedule</li>
      </ul>
      
      <p className="my-2 text-muted-foreground">Additional states:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">skipped</li>
        <li className="pl-1">upstream_failed</li>
        <li className="pl-1">removed</li>
      </ul>
      
      <p className="my-2 text-muted-foreground">Airflow UI visually represents task states using colors.</p>

      {/* 5. Apache Airflow Architecture */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">5. Apache Airflow Architecture</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Main Components</h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold">Component</th>
              <th className="border border-border px-4 py-2 text-left font-semibold">Role</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-4 py-2">Webserver</td>
              <td className="border border-border px-4 py-2">UI for monitoring and triggering</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Scheduler</td>
              <td className="border border-border px-4 py-2">Decides when tasks should run</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Executor</td>
              <td className="border border-border px-4 py-2">Sends tasks to workers</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Workers</td>
              <td className="border border-border px-4 py-2">Execute tasks</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Metadata Database</td>
              <td className="border border-border px-4 py-2">Stores DAG runs, task states, logs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Data Engineer Responsibility</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Write DAGs</li>
        <li className="pl-1">Manage dependencies</li>
        <li className="pl-1">Configure connections</li>
        <li className="pl-1">Maintain scheduling</li>
      </ul>

      {/* DAGs & Pipeline Image */}
      <div className="my-6">
        <img 
          src={airflowDagsPipelineImage} 
          alt="Creating DAGs in Airflow, Scheduling & Connections, PostgreSQL to S3 Pipeline, Key Takeaways" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* 6. DAG Creation */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">6. DAG Creation (Core Practical Skill)</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">DAG File Location</h2>
      <p className="my-2 text-muted-foreground">Stored inside <code className="bg-muted px-1.5 py-0.5 rounded text-sm">/dags</code> folder</p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Important DAG Parameters</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">dag_id</li>
        <li className="pl-1">description</li>
        <li className="pl-1">start_date</li>
        <li className="pl-1">schedule_interval</li>
        <li className="pl-1">default_args</li>
        <li className="pl-1">retries</li>
        <li className="pl-1">retry_delay</li>
        <li className="pl-1">owner</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Defining Dependencies</h2>
      <p className="my-2 text-muted-foreground"><code className="bg-muted px-1.5 py-0.5 rounded text-sm">task1 &gt;&gt; task2</code></p>

      {/* 7. Operators */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">7. Operators in Airflow</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Common Operators</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1"><strong className="text-foreground">BashOperator</strong> – runs shell commands</li>
        <li className="pl-1"><strong className="text-foreground">PythonOperator</strong> – runs Python functions</li>
        <li className="pl-1"><strong className="text-foreground">PostgreSQLOperator</strong> – executes SQL</li>
        <li className="pl-1"><strong className="text-foreground">S3KeySensor</strong> – waits for files</li>
      </ul>
      
      <p className="my-2 text-muted-foreground">Operators define behavior; tasks execute operators.</p>

      {/* 8. PythonOperator & XCom */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">8. PythonOperator & XCom</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">PythonOperator</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Executes Python functions</li>
        <li className="pl-1">Parameters passed using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">op_kwargs</code></li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">XCom (Cross Communication)</h2>
      <p className="my-2 text-muted-foreground">Used for sharing small data between tasks.</p>
      
      <p className="my-2 text-muted-foreground">Key rules:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Function return automatically stored in XCom</li>
        <li className="pl-1">Pulled using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ti.xcom_pull()</code></li>
        <li className="pl-1">Size limit: 48 KB only</li>
        <li className="pl-1">Suitable only for metadata, not large datasets</li>
      </ul>

      {/* 9. TaskFlow API */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">9. TaskFlow API (Airflow 2.0 Feature)</h1>
      <p className="my-2 text-muted-foreground">Modern way to write DAGs using decorators.</p>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Benefits</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Uses <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@dag</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@task</code></li>
        <li className="pl-1">Automatically handles dependencies</li>
        <li className="pl-1">Built-in XCom support</li>
        <li className="pl-1">Less boilerplate code</li>
        <li className="pl-1">Cleaner syntax</li>
      </ul>
      
      <p className="my-2 text-muted-foreground">Allows returning dictionaries for multiple outputs.</p>

      {/* 10. DAG Scheduling Concepts */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">10. DAG Scheduling Concepts</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Schedule Interval</h2>
      <p className="my-2 text-muted-foreground">Supports:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Cron expressions (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-sm">0 9 * * 1-5</code>)</li>
        <li className="pl-1">Presets</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Catchup</h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold">Setting</th>
              <th className="border border-border px-4 py-2 text-left font-semibold">Behavior</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="border border-border px-4 py-2">catchup=True</td>
              <td className="border border-border px-4 py-2">Runs all missed DAG runs</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">catchup=False</td>
              <td className="border border-border px-4 py-2">Skips old runs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Backfill</h2>
      <p className="my-2 text-muted-foreground">Manual execution of DAGs for past dates.</p>

      {/* 11. Airflow Connections */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">11. Airflow Connections & External Services</h1>
      <p className="my-2 text-muted-foreground">Managed through Airflow UI → Admin → Connections</p>

      {/* 12. PostgreSQL Integration */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">12. PostgreSQL Integration</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Tools Used</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">PostgreSQL container via Docker</li>
        <li className="pl-1">DBeaver for DB management</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Techniques</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm">PostgreSQLOperator</code> for SQL execution</li>
        <li className="pl-1">Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm">PostgresHook</code> for Python-based DB access</li>
        <li className="pl-1">Use SQL templating: <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{"{{ ds }}"}</code> for execution date</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Best Practice</h2>
      <p className="my-2 text-muted-foreground">Always delete old records before inserting to avoid primary key conflicts.</p>

      {/* 13. S3 Integration */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">13. S3 Integration using MinIO</h1>
      <p className="my-2 text-muted-foreground">MinIO acts as local S3 service.</p>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Workflow</h2>
      <ol className="list-decimal ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Run MinIO in Docker</li>
        <li className="pl-1">Create bucket</li>
        <li className="pl-1">Upload file</li>
        <li className="pl-1">Configure AWS connection</li>
        <li className="pl-1">Use S3KeySensor to detect file</li>
      </ol>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Sensors</h2>
      <p className="my-2 text-muted-foreground">Sensors pause workflow until condition is met.</p>
      
      <p className="my-2 text-muted-foreground">Common parameters:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">poke_interval</li>
        <li className="pl-1">timeout</li>
      </ul>

      {/* 14. Installing Python Packages */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">14. Installing Python Packages in Airflow Docker</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Method 1: Extend Official Image (Recommended)</h2>
      <ol className="list-decimal ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Create requirements.txt</li>
        <li className="pl-1">Write Dockerfile extending Airflow image</li>
        <li className="pl-1">Install packages using pip</li>
        <li className="pl-1">Update docker-compose.yml</li>
        <li className="pl-1">Rebuild image</li>
      </ol>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Method 2: Build from Airflow Source</h2>
      <ol className="list-decimal ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Clone GitHub repo</li>
        <li className="pl-1">Modify build files</li>
        <li className="pl-1">Build custom image</li>
      </ol>

      {/* 15. Temporary Files Handling */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">15. Temporary Files Handling</h1>
      <p className="my-2 text-muted-foreground">Use Python <code className="bg-muted px-1.5 py-0.5 rounded text-sm">tempfile</code> module:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Avoid cluttering DAG folder</li>
        <li className="pl-1">Automatically deleted after use</li>
        <li className="pl-1">Ideal for pipelines writing intermediate files</li>
      </ul>

      {/* 16. End-to-End Pipeline Example */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">16. End-to-End Pipeline Example</h1>
      <p className="my-2 text-muted-foreground font-semibold">PostgreSQL → S3 Pipeline</p>
      
      <p className="my-2 text-muted-foreground">Steps:</p>
      <ol className="list-decimal ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Query data from PostgreSQL</li>
        <li className="pl-1">Filter using execution date</li>
        <li className="pl-1">Save results to temp file</li>
        <li className="pl-1">Upload file to S3 using S3Hook</li>
        <li className="pl-1">File name dynamically generated</li>
        <li className="pl-1">Logs confirm success</li>
        <li className="pl-1">No leftover files</li>
      </ol>
      
      <p className="my-2 text-muted-foreground">Demonstrates real-world ETL pipeline.</p>

      {/* 17. Key Takeaways */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">17. Key Takeaways</h1>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Apache Airflow is industry standard for workflow orchestration</li>
        <li className="pl-1">DAG defines logic and dependencies</li>
        <li className="pl-1">Operators execute work</li>
        <li className="pl-1">XCom enables lightweight data sharing</li>
        <li className="pl-1">TaskFlow API simplifies development</li>
        <li className="pl-1">Cron-based scheduling offers flexibility</li>
        <li className="pl-1">Connections and hooks enable integration</li>
        <li className="pl-1">Docker-based deployment is scalable</li>
        <li className="pl-1">Sensors support event-driven pipelines</li>
        <li className="pl-1">Real pipelines involve DB + cloud integration</li>
      </ul>
    </div>
  </div>
);

// Lesson 6.1 Content
const Lesson61Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">6.1 Data Warehouse Explained</h1>

      {/* Data Engineering Foundations */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Data Engineering Foundations: Data Warehousing & Analytics</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Comprehensive introduction to data warehousing concepts including OLAP, dimensions, facts, measures, OLAP cubes, operations, and schemas.
      </p>

      {/* What is Data Warehousing? */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">What is Data Warehousing?</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        A data warehouse is a specialized relational database designed for analytical needs rather than just transactional storage.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Unlike traditional databases (Oracle, MySQL, SQL Server), which are optimized for <strong className="text-foreground">Online Transaction Processing (OLTP)</strong>, data warehouses support <strong className="text-foreground">Online Analytical Processing (OLAP)</strong> to enable complex queries and analysis.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Data warehouses consolidate data from multiple sources (databases, flat files) into a centralized repository.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        The data stored in a warehouse is processed and organized as information (not just raw data) to facilitate efficient and insightful retrieval.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">ETL process (Extract, Transform, Load)</strong> transfers data first to a staging area (temporary storage), then into the warehouse.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Data in warehouses includes raw data, metadata, and aggregated data; metadata is crucial as it describes the data structure, attributes, and relationships, differentiating a warehouse from a simple database.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Warehouses may include <strong className="text-foreground">data marts</strong> — subsets of the warehouse tailored to specific user groups with restricted access for security and simplicity.
      </p>

      {/* Image - Below key features of introduction */}
      <div className="my-6">
        <img 
          src={dimensionalModelingImage} 
          alt="Dimensional Modeling in Data Engineering - Dimensions, Facts, Measures" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* OLAP (Online Analytical Processing) */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">OLAP (Online Analytical Processing)</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLAP enables multi-dimensional data analysis using <strong className="text-foreground">OLAP cubes</strong> (3D or higher dimensional structures).
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLAP contrasts with OLTP by supporting complex aggregations, filtering, sorting, and mathematical operations on large datasets stored across multiple tables.
      </p>

      {/* Data Storage and OLAP */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Data Storage and OLAP</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Data is stored in cubes allowing users to view data from different dimensions (e.g., time, location, product).
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLAP provides new insights by allowing data to be examined from multiple perspectives, enhancing decision-making.
      </p>

      {/* OLAP Cubes */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">OLAP Cubes</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">OLAP cubes come in three types:</p>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">OLAP Type</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Description</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Advantages</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Disadvantages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">MOLAP (Multi-dimensional OLAP)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Stores data directly in a multi-dimensional database</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Excellent performance, complex calculations</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Handles limited data volume</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">ROLAP (Relational OLAP)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Stores multi-dimensional data in relational databases</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Handles large data volumes</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Requires more processing time and disk space</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">HOLAP (Hybrid OLAP)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Combines MOLAP and ROLAP</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Allows drill-through from cube to relational data, balances performance and scalability</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Not explicitly detailed</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* OLAP Operations */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">OLAP Operations</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Five key operations enable flexible data analysis on OLAP cubes:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1"><strong className="text-foreground">Roll-up:</strong> Aggregates data by climbing up a hierarchy (e.g., from cities to countries).</li>
        <li className="pl-1"><strong className="text-foreground">Drill-down:</strong> Opposite of roll-up; breaks down aggregate data into finer details (e.g., quarters into months).</li>
        <li className="pl-1"><strong className="text-foreground">Slice:</strong> Extracts a sub-cube by fixing a single dimension (e.g., viewing data for only Q1).</li>
        <li className="pl-1"><strong className="text-foreground">Dice:</strong> Extracts a sub-cube by selecting multiple dimensions and values (e.g., data for specific cities and products).</li>
        <li className="pl-1"><strong className="text-foreground">Pivot (Rotation):</strong> Rotates the data axes to provide alternate views (e.g., swapping rows and columns).</li>
      </ul>

      {/* Dimensions, Facts, and Measures */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Dimensions, Facts, and Measures</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Dimension Tables</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Contain descriptive attributes related to business entities (e.g., Customer, Product, Date) and provide structured context for analysis.
      </p>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Fact Tables</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Contain measurable data (facts) such as sales quantities or revenue, linked to dimensions via keys.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">A fact table includes:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1"><strong className="text-foreground">Dimension keys:</strong> Foreign keys linking to dimension tables.</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Measures</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Numeric values that can be aggregated or manipulated (e.g., total units sold).
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Every dimension table must be linked to a fact table to enable querying and analysis.
      </p>

      {/* Schemas in Data Warehousing */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Schemas in Data Warehousing</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Schemas define the logical structure and relationships between tables in a data warehouse. Unlike the typical ER (Entity-Relationship) model in databases, data warehouses use specialized schemas:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Schema Type</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Description</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Key Characteristics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Star Schema</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Central fact table surrounded by denormalized dimension tables</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Simple structure; dimension tables have primary keys; fact table contains foreign keys and measures</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Snowflake Schema</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Normalized form of star schema; dimension tables split into more tables</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Reduces data redundancy by normalizing dimension tables into related sub-tables</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Galaxy Schema (Fact Constellation)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Contains multiple fact tables sharing dimension tables</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Supports complex relationships; some dimension tables linked to multiple fact tables; used for complex analysis</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="my-2 text-muted-foreground leading-relaxed">
        In Star schema, dimension tables have unique primary keys; fact tables hold foreign keys and measures; dimension tables store descriptive attributes.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Snowflake schema normalizes dimension tables into multiple related tables for better structure and storage efficiency.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Galaxy schema allows multiple fact tables sharing common dimensions, supporting more complex organizational data models.
      </p>

      {/* Timeline Table of Key Topics Covered */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Timeline Table of Key Topics Covered</h1>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Topic</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Key Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Introduction & Overview</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Data warehousing definition, architecture, ETL, staging area, difference between database and warehouse</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">OLAP & OLTP Concepts</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Online Analytical Processing, multi-dimensional data, OLAP cubes vs. OLTP tables</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">OLAP Cubes Types</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">MOLAP, ROLAP, HOLAP definitions, advantages, and disadvantages</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">OLAP Operations</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Roll-up, Drill-down, Slice, Dice, Pivot operations explained with examples</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Dimensions</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Definition, role of dimension tables, benefits for structured analysis</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Facts and Measures</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Fact tables, dimension keys, measures, connection between facts and dimensions</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Schemas in Data Warehousing</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Star schema, Snowflake schema, Galaxy schema; relationships between fact and dimension tables</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground">Summary and Q&A</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Recap of all topics and closing remarks</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights and Conclusions */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Key Insights and Conclusions</h1>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Data warehousing transforms raw data into meaningful information to support business intelligence and decision-making through efficient retrieval and analysis.</li>
        <li className="pl-1">OLAP is central to data warehousing, enabling complex, multi-dimensional queries that are not feasible in traditional OLTP systems.</li>
        <li className="pl-1">The choice of OLAP cube type (MOLAP, ROLAP, HOLAP) depends on data volume, performance needs, and storage considerations.</li>
        <li className="pl-1">OLAP operations like roll-up, drill-down, slice, dice, and pivot allow flexible and dynamic data analysis from multiple perspectives.</li>
        <li className="pl-1">Dimensions and facts form the backbone of data modeling in warehouses, with facts providing measurable metrics and dimensions providing descriptive context.</li>
        <li className="pl-1">Schemas organize and define relationships between data warehouse tables; understanding star, snowflake, and galaxy schemas is essential for designing efficient warehouses.</li>
        <li className="pl-1">Metadata plays a critical role in managing and understanding the data warehouse structure and content.</li>
        <li className="pl-1">Data marts provide segmented access to data, improving security and simplifying analysis for specific user groups.</li>
      </ul>
    </div>
  </div>
);

// Lesson 6.2 Content
const Lesson62Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">6.2 OLAP versus OLTP Systems</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        A detailed comparison between <strong className="text-foreground">Online Analytical Processing (OLAP)</strong> and <strong className="text-foreground">Online Transactional Processing (OLTP)</strong> systems, highlighting their distinct purposes, architectures, and use cases within data management environments.
      </p>

      {/* Core Concepts and Definitions */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Core Concepts and Definitions</h1>

      {/* OLAP */}
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">OLAP (Online Analytical Processing)</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Designed for multi-dimensional, high-speed analysis of large, aggregated datasets.</li>
        <li className="pl-1">Typically operates on data sourced from data warehouses, data marts, or other centralized repositories.</li>
        <li className="pl-1">Ideal for data mining, business intelligence, complex analytical calculations, and business reporting such as financial analysis, budgeting, and sales forecasting.</li>
        <li className="pl-1">Central to OLAP is the <strong className="text-foreground">OLAP cube</strong>, a multi-dimensional data structure that extends traditional relational databases by adding layers (dimensions) beyond simple rows and columns.</li>
        <li className="pl-1">A <strong className="text-foreground">data dimension</strong> represents an element of a dataset, e.g., region, time, product model.</li>
        <li className="pl-1">OLAP cubes allow users to drill down through layers, e.g., from region level to state, city, or specific stores.</li>
        <li className="pl-1">Historical aggregated data in OLAP is usually stored using <strong className="text-foreground">star schema</strong> or <strong className="text-foreground">snowflake schema</strong> designs.</li>
      </ul>

      {/* Image - Below key features of introduction */}
      <div className="my-6">
        <img 
          src={oltpOlapEtlImage} 
          alt="OLTP vs OLAP with ETL - Transactions to High Volume Data Analysis" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* OLTP */}
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">OLTP (Online Transactional Processing)</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Focuses on real-time execution of numerous simple transactions, serving many users simultaneously.</li>
        <li className="pl-1">Powers everyday transactional systems such as ATMs, in-store purchases, hotel reservations, and extends to non-financial transactions like password changes or text messaging.</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Built on relational databases optimized for:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Processing large volumes of simple transactions quickly.</li>
        <li className="pl-1">Supporting multi-user access while maintaining data integrity.</li>
        <li className="pl-1">Delivering rapid response times (milliseconds).</li>
        <li className="pl-1">Ensuring high availability (24/7/365) with continuous incremental backups.</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Primarily used by frontline workers (cashiers, bank tellers, hotel clerks) and customers through self-service applications (online banking, e-commerce, travel bookings).
      </p>

      {/* OLAP vs OLTP: Key Differences */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">OLAP vs OLTP: Key Differences</h1>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Feature</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">OLAP</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">OLTP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Purpose</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Complex multi-dimensional data analysis</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Real-time processing of high-volume transactions</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Data Type</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Aggregated, historical data</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Current, transactional data</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Users</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Data scientists, business analysts, knowledge workers</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Frontline workers, customers</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Database Structure</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">OLAP cubes with multi-dimensional schemas (star/snowflake)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Relational databases with indexed tables</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Performance Focus</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Fast querying for analytics and reporting</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Fast transaction processing with low latency</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Typical Applications</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Business intelligence, data mining, reporting, forecasting</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">ATM transactions, retail purchases, reservations</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Data Volume Handling</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Large volumes of historical data</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Large volumes of simple, individual transactions</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Availability & Backup</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Not specified</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">24/7/365 availability, incremental backups</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Key Insights</h1>
      
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">OLAP and OLTP</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLAP and OLTP serve complementary roles in modern data ecosystems; OLTP systems handle everyday transactions, while OLAP systems enable strategic decision-making through data analysis.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">OLAP Cubes</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLAP cubes provide a multi-layered view of data, allowing detailed exploration across various dimensions.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">OLTP Systems</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        OLTP systems ensure data integrity and rapid transaction throughput, critical for operational functions.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Organizations often integrate both systems, where OLTP provides the real-time data feed that OLAP uses for deeper analysis.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        The distinction in optimization—analytical (OLAP) versus transactional (OLTP)—is fundamental to understanding their deployment and usage scenarios.
      </p>

      {/* Conclusion */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Conclusion</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        The video clearly delineates OLAP as the analytical powerhouse enabling strategic insights through complex queries on aggregated datasets, and OLTP as the operational backbone, handling high volumes of simple, real-time transactions. Both are indispensable in data-driven organizations, serving different but interconnected functions to support business operations and intelligence.
      </p>
    </div>
  </div>
);

// Lesson 7.1 Content
const Lesson71Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">7.1 Batch Processing and Stream Processing Systems</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Overview of batch processing systems, stream processing systems, and the hybrid concept of micro-batching, explaining their differences, use cases, and practical implementations including real-world examples from Netflix and Nasdaq.
      </p>

      {/* Core Concepts */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Core Concepts</h1>

      {/* Batch Processing */}
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Batch Processing</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Involves processing large volumes of data collected over a period (e.g., end-of-day files).</li>
        <li className="pl-1">Processes data in scheduled or ad hoc runs.</li>
        <li className="pl-1">Suitable for scenarios where data arrives periodically in large sizes.</li>
        <li className="pl-1">Commonly uses big data frameworks like <strong className="text-foreground">Hadoop</strong>, <strong className="text-foreground">Apache Spark</strong>, and storage solutions like <strong className="text-foreground">HDFS</strong>.</li>
        <li className="pl-1">Data is transformed, stored in databases or data stores, and then retrieved for analysis via tools like Tableau or Qlik Sense.</li>
      </ul>

      {/* Image - Below key features of introduction */}
      <div className="my-6">
        <img 
          src={batchStreamProcessingImage} 
          alt="Batch Processing and Stream Processing Systems - Batch, Micro-Batching, and Stream Processing with Real-World Examples" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Stream Processing */}
      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Stream Processing</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Processes data continuously and in real time as it arrives.</li>
        <li className="pl-1">Ideal for scenarios requiring instant feedback or anomaly detection.</li>
        <li className="pl-1">Data is pushed continuously into systems like <strong className="text-foreground">Kafka</strong> or <strong className="text-foreground">Amazon Kinesis Data Streams</strong>.</li>
        <li className="pl-1">Frameworks such as <strong className="text-foreground">Apache Flink</strong>, <strong className="text-foreground">Apache Storm</strong>, <strong className="text-foreground">Apache Beam</strong>, and <strong className="text-foreground">Spark Streaming</strong> consume and process these streams.</li>
        <li className="pl-1">Allows filtering, aggregating, and real-time action triggering (e.g., alerting or system shutdown).</li>
      </ul>

      {/* Micro-Batching */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Micro-Batching</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Combines batch and stream processing by collecting data in short intervals and processing it continuously.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Offers a balance between scheduled batch processing and real-time streaming.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Processes data faster than traditional batch but not fully real-time.
      </p>

      {/* Use Cases and Application Architecture */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Use Cases and Application Architecture</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Batch Processing Use Case</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Processing end-of-day files from multiple sources.</li>
        <li className="pl-1">Large file sizes and formats processed once per day or month.</li>
        <li className="pl-1">Processed using Hadoop or Spark, stored in databases or HDFS.</li>
        <li className="pl-1">Used for historical data analysis and generating aggregated reports.</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Stream Processing Use Case</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Multiple applications publish real-time accessibility or security-related data to a Kafka topic.</li>
        <li className="pl-1">Stream processing frameworks consume this data to identify anomalies and trigger security alerts.</li>
        <li className="pl-1">Enables continuous monitoring and instant response to security events.</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Analytics Application Example</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Combines both batch and stream processing architectures.
      </p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Data from web browsers, mobile apps, and IoT devices are streamed via an API gateway into Amazon Kinesis Data Streams.</li>
        <li className="pl-1">Real-time processing using Amazon Kinesis Data Analytics with Apache Flink to generate live dashboards.</li>
        <li className="pl-1">Data is simultaneously stored in Amazon S3 via Kinesis Data Firehose for batch processing.</li>
        <li className="pl-1">Historical data analytics are performed using Amazon EMR with Apache Spark, storing results in Elasticsearch for querying.</li>
        <li className="pl-1">Archival storage uses Amazon Glacier for audit and long-term retention.</li>
        <li className="pl-1">This hybrid architecture supports instant insights (streaming) and deep historical analysis (batching).</li>
      </ul>

      {/* Real-World Industry Examples */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Real-World Industry Examples</h1>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Company</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Processing Type</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Technologies Used</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Netflix</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Stream</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Amazon Kinesis Data Streams, CloudWatch, Apache Flink</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Processes terabytes of logs daily for real-time analytics and tracing application flows</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Nasdaq</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Batch</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Amazon EMR, Amazon Redshift, S3, Hardware Security Module (HSM)</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Historical data with client-side encryption and secure EMR clusters for auditing and analysis</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Key Insights</h1>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Batch processing excels where data is large, periodic, and requires historical analysis.</li>
        <li className="pl-1">Stream processing suits applications needing immediate data processing and real-time decision-making.</li>
        <li className="pl-1">Micro-batching provides a compromise by processing data in small time windows, balancing latency and throughput.</li>
        <li className="pl-1">The combination of batch and stream processing enables organizations to meet both real-time operational needs and historical data analytics.</li>
        <li className="pl-1">Security and compliance considerations can influence architecture choices, as seen in Nasdaq's use of encryption and hardware security modules.</li>
        <li className="pl-1">Selecting the right pattern depends on the specific use case and data characteristics.</li>
      </ul>

      {/* Conclusion */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Conclusion</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        This video clarifies the conceptual and practical differences between batch and stream processing systems and illustrates how they can be integrated within a single analytics platform. With frameworks like Hadoop, Spark, Kafka, and AWS Kinesis, organizations can build scalable, flexible data processing pipelines tailored to their operational and analytical needs. The examples from Netflix and Nasdaq demonstrate the adoption of these technologies in large-scale, real-world environments, highlighting the importance of choosing appropriate processing methods based on data velocity, volume, and security requirements.
      </p>
    </div>
  </div>
);

// Lesson 7.2 Content
const Lesson72Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">7.2 Apache Kafka</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Apache Kafka</strong> is a distributed event streaming platform designed for handling massive pipelines of real-time data at scale. Originally created at LinkedIn in 2011, it is implemented in Java and Scala and named Kafka to emphasize its optimization for writing and processing event streams efficiently.
      </p>

      {/* Core Concepts and Architecture */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Core Concepts and Architecture</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Event Streaming and Topics</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Kafka organizes data as an ordered, immutable log called a <strong className="text-foreground">topic</strong>. Each event (record) includes a key, value, timestamp, and optional metadata or headers.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Durability and Ordering</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Events are durably stored on disk within topics, which can persist indefinitely or be deleted when no longer needed. Kafka guarantees that consumers read events in exactly the same order.
      </p>

      {/* Image - Below key features of introduction */}
      <div className="my-6">
        <img 
          src={apacheKafkaArchImage} 
          alt="Apache Kafka: Distributed Event Streaming Platform - Producers, Consumers, Topics, and Zookeeper" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Cluster and Brokers</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Topics are partitioned and distributed across a cluster of servers known as <strong className="text-foreground">brokers</strong>. This design provides Kafka with fault tolerance and scalability, allowing it to handle any workload size.
      </p>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Producers and Consumers</h2>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1"><strong className="text-foreground">Producers</strong> publish events to topics.</li>
        <li className="pl-1"><strong className="text-foreground">Consumers</strong> subscribe to topics and can read the latest event, the entire log from the beginning, or a subset using offsets.</li>
      </ul>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Stream Processing API</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Kafka offers a powerful <strong className="text-foreground">Streams API</strong> primarily supported in Java. This API enables:
      </p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Stateless transformations (e.g., filtering events).</li>
        <li className="pl-1">Stateful transformations such as aggregations over time windows, combining multiple events into single results.</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        This capability allows real-time processing and management of data streams at scale, beyond simple event consumption.
      </p>

      {/* Use Cases and Industry Adoption */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Use Cases and Industry Adoption</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Kafka is widely used in production environments for streaming data applications due to its high throughput and reliability. Examples of companies leveraging Kafka include:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Company</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Lyft</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Collecting and processing geolocation data</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Spotify</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Log processing</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Netflix</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Log processing</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Cloudflare</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Real-time analytics</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Getting Started Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Getting Started Overview</h1>

      <h2 className="text-[1.5rem] font-semibold mt-6 mb-3">Kafka Workflow</h2>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Kafka requires a cluster manager such as <strong className="text-foreground">Zookeeper</strong> or the newer <strong className="text-foreground">KRaft mode</strong> to manage the cluster.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        The typical workflow to begin using Kafka involves:
      </p>
      <ol className="list-decimal ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Starting Zookeeper in one terminal.</li>
        <li className="pl-1">Starting the Kafka server in another.</li>
        <li className="pl-1">Creating topics to hold event logs.</li>
        <li className="pl-1">Publishing events (each line representing an event) to topics.</li>
        <li className="pl-1">Consuming events using Kafka consumer commands, optionally reading from the beginning or a specific offset.</li>
      </ol>

      {/* Key Insights */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Key Insights</h1>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Kafka is optimized for handling large-scale, real-time streaming data workloads.</li>
        <li className="pl-1">Its distributed architecture ensures fault tolerance and horizontal scalability.</li>
        <li className="pl-1">The Streams API enhances Kafka's functionality by enabling complex stream transformations and aggregations.</li>
        <li className="pl-1">Kafka's log-based design guarantees event ordering and durability, critical for many streaming data applications.</li>
        <li className="pl-1">It has broad adoption in industries requiring robust, scalable data pipelines.</li>
      </ul>

      {/* Conclusion */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Conclusion</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Apache Kafka is a powerful, fault-tolerant event streaming platform suitable for real-time data pipelines and stream processing at scale. Its architecture combining distributed logs, durable storage, and robust APIs has made it a foundational technology for modern data infrastructure in multiple industries.
      </p>
    </div>
  </div>
);

// Lesson 8.1 Content
const Lesson81Content = () => (
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-foreground mb-8">8.1 Data Quality</h1>

      {/* Overview */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">Overview</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Introduction emphasizing the exploration of the concept of quality, highlighting the difficulties in understanding it clearly. Quality is a complex topic requiring deeper investigation.
      </p>

      {/* 1. Concept of Quality */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">1. Concept of Quality</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Quality is difficult to define clearly because it depends on context, usage, and expectations.
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">In data systems, quality is not just about correctness but about:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Whether data is usable</li>
        <li className="pl-1">Whether it supports decision-making</li>
        <li className="pl-1">Whether it avoids confusion and inefficiency</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Quality problems often remain hidden until they cause losses in time, money, or credibility.
      </p>

      {/* Image 1 - Ensuring Data Quality */}
      <div className="my-6">
        <img 
          src={ensuringDataQualityImage} 
          alt="Ensuring Data Quality - Clarity, Accuracy, Completeness, Consistency" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* 2. Relationship Between Quality and Efficiency */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">2. Relationship Between Quality and Efficiency</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Poor quality directly leads to:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Wastage of time</li>
        <li className="pl-1">Wastage of money</li>
        <li className="pl-1">Repetition of work</li>
        <li className="pl-1">Delayed outcomes</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Organizations suffer when data is:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Incomplete</li>
        <li className="pl-1">Late</li>
        <li className="pl-1">Incorrect</li>
        <li className="pl-1">Misinterpreted</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Even small quality issues multiply into large operational inefficiencies.
      </p>

      {/* 3. Time-Related Quality Issues */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">3. Time-Related Quality Issues</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Time is a critical dimension of data quality.</p>
      <p className="my-2 text-muted-foreground leading-relaxed">Delays such as:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Late notifications</li>
        <li className="pl-1">Slow approvals</li>
        <li className="pl-1">Delayed communication</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">reduce the value of data.</p>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Data that arrives late is often as harmful as incorrect data.</strong>
      </p>

      {/* 4. Missing Data Problems */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">4. Missing Data Problems</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Missing data is a major quality issue.</p>
      <p className="my-2 text-muted-foreground leading-relaxed">Causes of missing data include:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Poor data entry</li>
        <li className="pl-1">System incompatibility</li>
        <li className="pl-1">Manual processes</li>
        <li className="pl-1">Lack of validation checks</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Missing records reduce:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Reliability</li>
        <li className="pl-1">Completeness</li>
        <li className="pl-1">Trust in the system</li>
      </ul>

      {/* 5. Centralization vs Standardization */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">5. Centralization vs Standardization</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Centralization alone does not guarantee quality.</p>
      <p className="my-2 text-muted-foreground leading-relaxed">Problems arise when:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Systems are centralized</li>
        <li className="pl-1">But formats differ across states or regions</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Different forms, rules, or structures create:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Data inconsistency</li>
        <li className="pl-1">Integration challenges</li>
        <li className="pl-1">Increased manual correction</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">A centralized system must also be standardized to ensure quality.</strong>
      </p>

      {/* 6. Regional and State-Level Variations */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">6. Regional and State-Level Variations</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Different states following different formats cause:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Data mismatch</li>
        <li className="pl-1">Incomplete aggregation</li>
        <li className="pl-1">Reporting errors</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">This leads to:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Increased complexity</li>
        <li className="pl-1">Reduced comparability</li>
      </ul>

      {/* 7. Language Barriers in Data Quality */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">7. Language Barriers in Data Quality</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Language differences create:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Misinterpretation of instructions</li>
        <li className="pl-1">Errors in forms and records</li>
        <li className="pl-1">Communication gaps</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Poor language clarity leads to process breakdowns.</p>

      {/* 8. Communication Quality */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">8. Communication Quality</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Communication is a core part of data quality.</p>
      <p className="my-2 text-muted-foreground leading-relaxed">Issues mentioned include:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Spelling mistakes</li>
        <li className="pl-1">Incorrect terms</li>
        <li className="pl-1">Ambiguous wording</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Even minor communication errors can lead to major quality failures.
      </p>

      {/* 9. Confirmation and Validation Failures */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">9. Confirmation and Validation Failures</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Quality requires:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Clear confirmation</li>
        <li className="pl-1">Validation before acceptance</li>
        <li className="pl-1">Avoiding assumptions</li>
      </ul>

      {/* 10. Process Quality Issues */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">10. Process Quality Issues</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Quality is affected not just by data but by:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">People</li>
        <li className="pl-1">Human involvement</li>
        <li className="pl-1">Communication flow</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Process-related problems include:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Delayed notifications</li>
        <li className="pl-1">Poor coordination</li>
        <li className="pl-1">Unclear responsibility</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        Quality failures often come from process design flaws, not technology alone.
      </p>

      {/* 11. Impact on Organizational Performance */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">11. Impact on Organizational Performance</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">Poor data quality affects:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Management decisions</li>
        <li className="pl-1">Shareholder confidence</li>
        <li className="pl-1">Performance measurement</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">When data is unreliable:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Reports become misleading</li>
        <li className="pl-1">Strategies become flawed</li>
        <li className="pl-1">Trust in systems reduces</li>
      </ul>

      {/* 12. Data Quality Dimensions */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">12. Data Quality Dimensions</h1>
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Dimension</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Explanation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Accuracy</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Data must be correct and error-free</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Completeness</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">No missing or blank values</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Consistency</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Same data should match across systems</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Timeliness</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Data must be available at the right time</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-muted-foreground font-medium">Clarity</td>
              <td className="border border-border px-4 py-2 text-muted-foreground">Data and communication should be easily understood</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 13. Root Causes of Poor Data Quality */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">13. Root Causes of Poor Data Quality</h1>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Manual data handling</li>
        <li className="pl-1">Lack of training</li>
        <li className="pl-1">No standard formats</li>
        <li className="pl-1">Language mismatches</li>
        <li className="pl-1">Weak validation systems</li>
        <li className="pl-1">Poor communication channels</li>
      </ul>

      {/* 14. Methods to Improve Data Quality */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">14. Methods to Improve Data Quality</h1>

      {/* Image 2 - Improving Data Quality */}
      <div className="my-6">
        <img 
          src={improvingDataQualityImage} 
          alt="Improving Data Quality - Standardize Data, Validate & Clean, Automate Processes, Monitor & Verify" 
          className="w-full rounded-lg border border-border"
        />
      </div>

      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Introduce uniform standards across regions</li>
        <li className="pl-1">Ensure centralized systems with standardized rules</li>
        <li className="pl-1">Implement validation checks and confirmation workflows</li>
        <li className="pl-1">Reduce language issues through clear documentation and simple terminology</li>
        <li className="pl-1">Automate data capture to reduce spelling errors and manual mistakes</li>
      </ul>

      {/* 15. Core Insight */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">15. Core Insight</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Data quality is a system-wide responsibility, not just a technical task.</strong>
      </p>
      <p className="my-2 text-muted-foreground leading-relaxed">It involves:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">People</li>
        <li className="pl-1">Processes</li>
        <li className="pl-1">Technology</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Quality failures mostly arise from:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Poor coordination</li>
        <li className="pl-1">Lack of clarity</li>
        <li className="pl-1">Inconsistent systems</li>
      </ul>

      {/* 16. Final Takeaway */}
      <h1 className="text-[1.875rem] font-semibold mt-8 mb-4">16. Final Takeaway</h1>
      <p className="my-2 text-muted-foreground leading-relaxed">High-quality data ensures:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Efficiency</li>
        <li className="pl-1">Accuracy</li>
        <li className="pl-1">Trust</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">Poor-quality data leads to:</p>
      <ul className="list-disc ml-6 my-2 text-muted-foreground">
        <li className="pl-1">Confusion</li>
        <li className="pl-1">Delays</li>
        <li className="pl-1">Financial and operational loss</li>
      </ul>
      <p className="my-2 text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Quality must be built from the source, not corrected at the end.</strong>
      </p>
    </div>
  </div>
);

export const NotionDocument = ({ content }: NotionDocumentProps) => {
  switch (content.submodule) {
    case "1.1":
      return <Lesson11Content />;
    case "1.2":
      return <Lesson12Content />;
    case "2.1":
      return <Lesson21Content />;
    case "2.2":
      return <Lesson22Content />;
    case "3.1":
      return <Lesson31Content />;
    case "3.2":
      return <Lesson32Content />;
    case "4.1":
      return <Lesson41Content />;
    case "4.2":
      return <Lesson42Content />;
    case "5.1":
      return <Lesson51Content />;
    case "5.2":
      return <Lesson52Content />;
    case "6.1":
      return <Lesson61Content />;
    case "6.2":
      return <Lesson62Content />;
    case "7.1":
      return <Lesson71Content />;
    case "7.2":
      return <Lesson72Content />;
    case "8.1":
      return <Lesson81Content />;
    default:
      return (
        <div className="bg-background min-h-full">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-foreground mb-8">
              Content for {content.submodule} not found.
            </h1>
          </div>
        </div>
      );
  }
};
