/**
 * MAIN BACKEND SERVER FILE - Entry point for the Payroll Management System API
 * This file sets up the Express server, configures middleware, and defines API routes
 * 
 * Key Features:
 * - Express.js server setup with CORS and JSON parsing
 * - Modular route structure for different features
 * - Environment variable configuration
 * - RESTful API endpoints for all payroll system modules
 */

// Core dependencies for the Express server
const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing for frontend communication
const bodyParser = require('body-parser'); // (Optional) For parsing request bodies

// Route imports - Each module handles specific functionality
const employeeRoutes = require('./routes/employeeRoutes'); // Employee CRUD operations
const userRoutes = require('./routes/userRoutes'); // Authentication and user management
const payrollRoutes = require('./routes/payrollRoutes'); // Payroll calculations and records
const attendanceRoutes = require('./routes/attendanceRoutes'); // Employee attendance tracking
const leaveRoutes = require('./routes/leaveRoutes'); // Leave management system
const reportRoutes = require('./routes/reportRoutes'); // Analytics and reporting
const dashboardRoutes = require('./routes/dashboardRoutes'); // Dashboard statistics

// Environment variables configuration
require('dotenv').config();

// Express application instance
const app = express();

// MIDDLEWARE CONFIGURATION
// These run on every request to process and prepare data
app.use(cors()); // Enable CORS for all routes to allow frontend communication
app.use(express.json()); // Parse JSON request bodies automatically

// API ROUTES CONFIGURATION
// Each route prefix maps to specific functionality modules
app.use('/api/employees', employeeRoutes); // Employee management endpoints
app.use('/api/auth', userRoutes); // Authentication endpoints (login, register)
app.use('/api/payroll', payrollRoutes); // Payroll processing endpoints
app.use('/api/attendance', attendanceRoutes); // Attendance tracking endpoints
app.use('/api/leaves', leaveRoutes); // Leave management endpoints
app.use('/api/reports', reportRoutes); // Reports and analytics endpoints
app.use('/api/dashboard', dashboardRoutes); // Dashboard data endpoints

// Root endpoint - Basic API health check
app.get('/', (req, res) => {
  res.send('Payroll Management System API');
});

// SERVER STARTUP CONFIGURATION
// Start the server on specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
