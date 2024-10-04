// backend/config/db.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,       // e.g., 'postgres'
  host: process.env.DB_HOST,       // e.g., 'localhost'
  database: process.env.DB_NAME,   // 'payroll_management'
  password: process.env.DB_PASSWORD, // Your PostgreSQL password
  port: process.env.DB_PORT,       // Default is 5432
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;
