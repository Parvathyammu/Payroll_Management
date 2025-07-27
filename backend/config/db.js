/**
 * DATABASE CONNECTION CONFIGURATION
 * This file sets up the PostgreSQL database connection pool using pg library
 * 
 * Key Features:
 * - Connection pooling for efficient database operations
 * - Environment variable configuration for security
 * - Error handling and connection monitoring
 * - Exported pool instance for use across the application
 */

// PostgreSQL client library for Node.js
const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// DATABASE CONNECTION POOL SETUP
// Pool manages multiple database connections for better performance
const pool = new Pool({
  user: process.env.DB_USER,       // Database username (e.g., 'postgres')
  host: process.env.DB_HOST,       // Database host (e.g., 'localhost')
  database: process.env.DB_NAME,   // Database name (e.g., 'payroll_management')
  password: process.env.DB_PASSWORD, // Database password (stored in environment variables)
  port: process.env.DB_PORT,       // Database port (default PostgreSQL port: 5432)
});

// CONNECTION EVENT HANDLER
// Log successful database connections for monitoring
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Export the pool instance for use in other modules
// This allows other files to import and use the database connection
module.exports = pool;
