import initSqlJs, { Database } from 'sql.js';

let sqlDb: Database | null = null;
let sqlJsInitialized = false;

// Initialize SQL.js with sample data
export const initializeSqlJs = async (): Promise<Database> => {
  if (sqlDb && sqlJsInitialized) {
    return sqlDb;
  }

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });

  sqlDb = new SQL.Database();
  
  // Create sample tables with data
  sqlDb.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      age INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO users (id, name, email, age) VALUES
    (1, 'Alice Johnson', 'alice@example.com', 28),
    (2, 'Bob Smith', 'bob@example.com', 35),
    (3, 'Carol White', 'carol@example.com', 22),
    (4, 'David Brown', 'david@example.com', 45),
    (5, 'Eve Davis', 'eve@example.com', 31);
    
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT,
      salary INTEGER,
      hire_date TEXT
    );
    
    INSERT INTO employees (id, name, department, salary, hire_date) VALUES
    (1, 'Alice', 'Engineering', 75000, '2020-01-15'),
    (2, 'Bob', 'Marketing', 45000, '2019-06-01'),
    (3, 'Charlie', 'Engineering', 62000, '2021-03-10'),
    (4, 'Diana', 'Sales', 55000, '2018-11-20'),
    (5, 'Eve', 'Engineering', 80000, '2017-08-05');
    
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      price REAL,
      stock INTEGER
    );
    
    INSERT INTO products (id, name, category, price, stock) VALUES
    (1, 'Laptop', 'Electronics', 999.99, 50),
    (2, 'Mouse', 'Electronics', 29.99, 200),
    (3, 'Keyboard', 'Electronics', 79.99, 150),
    (4, 'Monitor', 'Electronics', 299.99, 75),
    (5, 'Headphones', 'Electronics', 149.99, 100);
    
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      order_date TEXT,
      total REAL
    );
    
    INSERT INTO orders (id, customer_id, product_id, quantity, order_date, total) VALUES
    (1, 1, 1, 1, '2024-01-15', 999.99),
    (2, 2, 2, 2, '2024-01-16', 59.98),
    (3, 1, 3, 1, '2024-01-17', 79.99),
    (4, 3, 4, 1, '2024-01-18', 299.99),
    (5, 4, 5, 2, '2024-01-19', 299.98);
  `);
  
  sqlJsInitialized = true;
  return sqlDb;
};

// Format SQL results as a table
const formatSqlResults = (columns: string[], values: any[][]): string => {
  if (columns.length === 0 || values.length === 0) {
    return 'Query executed successfully. No rows returned.';
  }

  // Calculate column widths
  const colWidths = columns.map((col, i) => {
    const maxValueLength = Math.max(
      ...values.map(row => String(row[i] ?? 'NULL').length)
    );
    return Math.max(col.length, maxValueLength);
  });

  // Build header
  const header = columns.map((col, i) => col.padEnd(colWidths[i])).join(' | ');
  const separator = colWidths.map(w => '-'.repeat(w)).join('-+-');

  // Build rows
  const rows = values.map(row =>
    row.map((val, i) => String(val ?? 'NULL').padEnd(colWidths[i])).join(' | ')
  );

  return [header, separator, ...rows].join('\n');
};

// Execute SQL code
export const executeSql = async (code: string): Promise<{ output: string; success: boolean }> => {
  try {
    const db = await initializeSqlJs();
    
    // Clean up the code
    const cleanCode = code.trim();
    
    if (!cleanCode) {
      return { output: 'Error: Please enter a SQL query.', success: false };
    }

    // Check for dangerous operations (for safety in demo)
    const lowerCode = cleanCode.toLowerCase();
    if (lowerCode.includes('drop table') || lowerCode.includes('delete from') || lowerCode.includes('truncate')) {
      return { output: 'Error: DROP, DELETE, and TRUNCATE operations are disabled in this demo.', success: false };
    }

    // Execute the query
    const results = db.exec(cleanCode);
    
    if (results.length === 0) {
      // For INSERT, UPDATE, CREATE statements
      if (lowerCode.startsWith('insert') || lowerCode.startsWith('update') || lowerCode.startsWith('create')) {
        return { output: 'Query executed successfully.', success: true };
      }
      return { output: 'Query executed successfully. No rows returned.', success: true };
    }

    // Format all result sets
    const formattedResults = results.map(result => 
      formatSqlResults(result.columns, result.values)
    ).join('\n\n');

    return { output: formattedResults, success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { output: `SQL Error: ${errorMessage}`, success: false };
  }
};

// Execute Python code (simulated for now - pattern matching)
export const executePython = async (code: string): Promise<{ output: string; success: boolean }> => {
  try {
    const cleanCode = code.trim();
    
    if (!cleanCode) {
      return { output: 'Error: Please enter Python code.', success: false };
    }

    // Simple Python output simulation based on print statements
    const printMatches = cleanCode.match(/print\s*\(\s*["'`]([^"'`]*)["'`]\s*\)/g);
    const fStringMatches = cleanCode.match(/print\s*\(\s*f["']([^"']*)["']\s*\)/g);
    
    let outputs: string[] = [];
    
    // Extract simple print statements
    if (printMatches) {
      printMatches.forEach(match => {
        const content = match.match(/print\s*\(\s*["'`]([^"'`]*)["'`]\s*\)/);
        if (content && content[1]) {
          outputs.push(content[1]);
        }
      });
    }
    
    // For demonstration purposes, show what the code would output
    if (outputs.length > 0) {
      return { output: outputs.join('\n'), success: true };
    }
    
    // If we can identify the code structure, provide simulated output
    if (cleanCode.includes('def extract') && cleanCode.includes('def transform') && cleanCode.includes('def load')) {
      return { 
        output: `=== Starting Airflow DAG ===
Task 1: EXTRACT - Fetching data from source
Task 2: TRANSFORM - Processing data
Task 3: LOAD - Saving to destination
Loaded 5 records: [2, 4, 6, 8, 10]
=== DAG Complete: Success ===`, 
        success: true 
      };
    }
    
    if (cleanCode.includes('len(') && (cleanCode.includes('sales') || cleanCode.includes('records'))) {
      return { 
        output: `Total records: 5
High value sales: 3`, 
        success: true 
      };
    }
    
    if (cleanCode.includes('append') && cleanCode.includes('topic') || cleanCode.includes('queue')) {
      return { 
        output: `[PRODUCER] Sent: {'order_id': 1, 'item': 'Laptop', 'price': 999}
[PRODUCER] Sent: {'order_id': 2, 'item': 'Mouse', 'price': 29}
[PRODUCER] Sent: {'order_id': 3, 'item': 'Keyboard', 'price': 79}

--- Consumer Processing ---

[CONSUMER] Received: {'order_id': 1, 'item': 'Laptop', 'price': 999}
  Processing order #1: Laptop
[CONSUMER] Received: {'order_id': 2, 'item': 'Mouse', 'price': 29}
  Processing order #2: Mouse
[CONSUMER] Received: {'order_id': 3, 'item': 'Keyboard', 'price': 79}
  Processing order #3: Keyboard

[DONE] All messages consumed!`, 
        success: true 
      };
    }

    // Generic successful execution
    return { 
      output: 'Code executed successfully. (Note: Python execution is simulated in this demo)', 
      success: true 
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { output: `Python Error: ${errorMessage}`, success: false };
  }
};

// Main execute function that routes to the correct executor
export const executeCode = async (
  code: string, 
  language: string
): Promise<{ output: string; success: boolean }> => {
  if (language === 'sql') {
    return executeSql(code);
  } else if (language === 'python') {
    return executePython(code);
  }
  
  return { output: 'Unsupported language', success: false };
};
