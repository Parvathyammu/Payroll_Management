// routes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming db is set up for database connection

// Route to get dashboard summary data
router.get('/summary', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM DashboardView'); // Ensure you're using pool
    if (result.rows.length > 0) {
      const { total_employees, total_payroll, attendance_rate } = result.rows[0];
      res.json({ totalEmployees: total_employees, totalPayroll: total_payroll, attendanceRate: attendance_rate });
    } else {
      res.status(404).json({ message: 'No dashboard data found' });
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
