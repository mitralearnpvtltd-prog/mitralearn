import { SubmoduleContent } from "@/data/curriculum";
import dataEngineeringImage from "@/assets/data-engineering-etl-diagram.png";
import dataLifecycleImage from "@/assets/data-engineering-lifecycle.png";
import dataPipelinesImage from "@/assets/data-pipelines-diagram.png";
import etlVsEltImage from "@/assets/etl-vs-elt-diagram.png";
import apacheSparkImage from "@/assets/apache-spark-fundamentals.png";
import apacheSparkBasicsImage from "@/assets/apache-spark-basics.png";
import dataOrchestrationImage from "@/assets/data-orchestration-diagram.png";
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
  <div className="bg-background min-h-full">
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground mb-8">
        5.1 Data Orchestration
      </h1>

      {/* Overview Section */}
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Overview</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Data orchestration in modern cloud data management. Just as a <strong className="text-foreground">conductor synchronizes musicians</strong> to produce harmonious music, data orchestration coordinates the loading, processing, and compute resource allocation in cloud data environments to ensure <strong className="text-foreground">efficient and accurate data flow</strong>.
      </p>

      <hr className="border-border my-8" />

      {/* Definition */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Definition of Data Orchestration</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Data orchestration</strong> is the systematic coordination, scheduling, and management of:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Data ingestion</li>
        <li>Data replication</li>
        <li>Data transformation</li>
        <li>Data processing</li>
        <li>Compute resource provisioning</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-6">
        across distributed cloud environments to ensure data arrives <strong className="text-foreground">accurately, on time, and cost-efficiently</strong>. It acts as the control layer that ensures all data-related services execute in the correct sequence and with appropriate resources.
      </p>

      {/* Image */}
      <div className="my-6 flex justify-center">
        <img 
          src={dataOrchestrationImage} 
          alt="Data Orchestration Workflow" 
          className="w-full max-w-2xl rounded-lg border border-border"
        />
      </div>

      <hr className="border-border my-8" />

      {/* Why Data Orchestration is Needed */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Data Orchestration is Needed</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Modern cloud environments introduce:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Distributed data sources</li>
        <li>Multiple cloud services</li>
        <li>Dynamic compute scaling</li>
        <li>Real-time data needs</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Without orchestration:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Data pipelines break</li>
        <li>Costs increase due to idle compute</li>
        <li>Downstream systems process incomplete data</li>
        <li>Systems lose reliability</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Symphony Conductor Analogy */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Symphony Conductor Analogy</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A <strong className="text-foreground">conductor</strong> does not create music directly. The conductor:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Controls timing</li>
        <li>Coordinates performers</li>
        <li>Ensures harmony</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Similarly, <strong className="text-foreground">data orchestration</strong>:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Does not store data</li>
        <li>Controls execution timing</li>
        <li>Coordinates services and workflows</li>
        <li>Ensures correct data flow</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Without orchestration, systems behave independently, leading to inefficiency.
      </p>

      <hr className="border-border my-8" />

      {/* Traditional vs Modern */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Traditional Data Ingestion (Batch-Based Model)</h2>
      
      <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Definition:</strong> Batch processing is a method where data is collected over time and processed in large chunks at scheduled intervals.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Characteristics</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Overnight execution</li>
        <li>Fixed compute resources</li>
        <li>Centralized systems</li>
        <li>Predictable workloads</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Limitations</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>High latency</li>
        <li>No real-time insights</li>
        <li>Inefficient compute usage</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Transition to Cloud */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Transition to Cloud Data Environments</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Cloud computing changed data management by introducing:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Distributed data sources</li>
        <li>Decoupled storage and compute</li>
        <li>Elastic scaling</li>
        <li>Continuous data generation</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-6">
        This shift made static batch schedules <strong className="text-foreground">insufficient</strong>.
      </p>

      <hr className="border-border my-8" />

      {/* Live Streaming */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Live Streaming Data Ingestion</h2>
      
      <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Definition:</strong> Live streaming data ingestion is the continuous movement of data from source systems to target platforms in near real time.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Benefits</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Reduced latency</li>
        <li>Continuous data availability</li>
        <li>Avoids batch spikes</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Challenges Introduced</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Identifying all relevant data sources</li>
        <li>Managing data dependencies</li>
        <li>Triggering transformations correctly</li>
        <li>Handling partial or late data</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Live streaming increases orchestration complexity, making <strong className="text-foreground">coordination essential</strong>.
      </p>

      <hr className="border-border my-8" />

      {/* Compute Resource Management */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Compute Resource Management in the Cloud</h2>
      
      <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Definition:</strong> Cloud compute scaling allows resources to scale up during heavy workloads and scale down when idle.
        </p>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Example:</strong> Platforms like Snowflake allow on-demand compute provisioning and usage-based billing.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">Orchestration decides:</strong>
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>When to start compute</li>
        <li>How much compute is required</li>
        <li>When to terminate resources</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Orchestration Framework */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Orchestration Framework</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        An <strong className="text-foreground">orchestration framework</strong> is a system that:
      </p>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-4">
        <li>Schedules workflows</li>
        <li>Manages dependencies</li>
        <li>Monitors execution</li>
        <li>Handles failures</li>
      </ul>

      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Core Functions</h3>
      <ul className="list-disc list-outside ml-6 space-y-2 text-muted-foreground mb-6">
        <li>Task sequencing</li>
        <li>Conditional execution</li>
        <li>Error handling</li>
        <li>Resource provisioning</li>
      </ul>

      <hr className="border-border my-8" />

      {/* End-to-End Process */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">End-to-End Data Orchestration Process</h2>
      
      <div className="space-y-4 mb-6">
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 1: Data Onboarding</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Identify data sources</li>
            <li>Define ingestion method (batch or streaming)</li>
            <li>Configure replication tools</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 2: Data Ingestion</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Data is streamed or batch-loaded into the cloud</li>
            <li>Orchestration monitors ingestion status</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 3: Compute Provisioning</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Orchestration allocates compute resources</li>
            <li>Microservices are spun up as required</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 4: Data Transformation</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Data is cleaned, enriched, and structured</li>
            <li>Transformations run only after ingestion completion</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 5: Dependency Management</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Tasks run in correct order</li>
            <li>No step starts prematurely</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 6: Data Loading</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Transformed data loaded into data warehouses, data lakes, or analytical platforms</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 7: Compute De-Provisioning</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Resources are shut down</li>
            <li>Costs are minimized</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Step 8: Monitoring and Error Handling</h4>
          <ul className="list-disc list-outside ml-6 space-y-1 text-muted-foreground text-sm">
            <li>Orchestration tracks execution</li>
            <li>Alerts and retries on failures</li>
          </ul>
        </div>
      </div>

      <hr className="border-border my-8" />

      {/* Benefits */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Benefits of Data Orchestration</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground mb-6">
        <li><strong className="text-foreground">Real-time analytics</strong> — Faster insights from live data</li>
        <li><strong className="text-foreground">Lower cloud costs</strong> — Pay only for resources when needed</li>
        <li><strong className="text-foreground">Reliable data pipelines</strong> — Consistent, monitored execution</li>
        <li><strong className="text-foreground">Scalable architectures</strong> — Grow with your data needs</li>
        <li><strong className="text-foreground">Better business decisions</strong> — Accurate, timely data</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaways</h2>
      <ul className="list-disc list-outside ml-6 space-y-3 text-muted-foreground">
        <li>Data orchestration <strong className="text-foreground">coordinates</strong> data workflows across cloud systems</li>
        <li>It ensures <strong className="text-foreground">timing, dependencies, and resources</strong> are managed correctly</li>
        <li>Modern cloud environments <strong className="text-foreground">require orchestration</strong> for efficiency</li>
        <li>Orchestration enables <strong className="text-foreground">scalable, cost-effective, and reliable</strong> data operations</li>
      </ul>

      <hr className="border-border my-8" />

      {/* Final Thought */}
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Final Thought</h3>
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
        "Data orchestration transforms cloud data systems from independent components into a coordinated ecosystem."
      </blockquote>
      <p className="text-muted-foreground leading-relaxed mb-12">
        By managing timing, dependencies, and resources, orchestration enables <strong className="text-foreground">scalable, efficient, and reliable cloud data operations</strong>.
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
