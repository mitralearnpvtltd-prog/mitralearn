import { SubmoduleContent } from "@/data/curriculum";
import dataEngineeringImage from "@/assets/data-engineering-responsibilities.png";

interface NotionDocumentProps {
  content: SubmoduleContent;
}

export const NotionDocument = ({ content }: NotionDocumentProps) => {
  // Only render for lesson 1.1
  if (content.submodule !== "1.1") {
    return null;
  }

  return (
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
        <div className="my-6">
          <img 
            src={dataEngineeringImage} 
            alt="Data Engineering Responsibilities" 
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
};
