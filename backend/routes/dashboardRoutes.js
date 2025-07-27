/**
 * DASHBOARD ROUTES - Analytics and summary data endpoints
 * This file provides aggregated data for the main dashboard interface
 * 
 * Key Features:
 * - Real-time dashboard metrics calculation
 * - Database view integration for performance
 * - Summary statistics for management overview
 * - Error handling for missing data
 * 
 * Dashboard Metrics:
 * - Total number of employees in the system
 * - Total payroll amount across all employees
 * - Overall attendance rate percentage
 * 
 * Database Integration:
 * - Uses DashboardView for optimized data retrieval
 * - Single query for all dashboard metrics
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Database connection pool

/**
 * DASHBOARD SUMMARY ENDPOINT
 * GET /api/dashboard/summary
 * Returns aggregated statistics for the main dashboard
 */
router.get('/summary', async (req, res) => {
  try {
    // QUERY DASHBOARD VIEW
    // DashboardView is a database view that aggregates data from multiple tables
    // This provides better performance than multiple separate queries
    const result = await pool.query('SELECT * FROM DashboardView');
    
    if (result.rows.length > 0) {
      // EXTRACT DASHBOARD METRICS
      // Destructure the aggregated data from the database view
      const { total_employees, total_payroll, attendance_rate } = result.rows[0];
      
      // RETURN FORMATTED RESPONSE
      // Convert database field names to camelCase for frontend consistency
      res.json({ 
        totalEmployees: total_employees,    // Total count of active employees
        totalPayroll: total_payroll,        // Sum of all employee salaries
        attendanceRate: attendance_rate     // Average attendance percentage
      });
    } else {
      // NO DATA FOUND
      // This could happen if the dashboard view is empty or not properly configured
      res.status(404).json({ message: 'No dashboard data found' });
    }
  } catch (err) {
    // ERROR HANDLING
    // Log error details and return generic error message
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export router for use in main server file
module.exports = router;
