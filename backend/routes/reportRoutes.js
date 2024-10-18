// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming you have a pool connection setup for PostgreSQL

// GET reports based on type
router.get('/', async (req, res) => {
  const { type } = req.query;

  try {
    let query = '';
    switch (type) {
      case 'employee':
        query = `
          SELECT e.employee_id, e.first_name, e.last_name, e.email, 
                 e.position, e.department, e.date_joined, p.salary 
          FROM employees e 
          JOIN payroll p ON e.employee_id = p.employee_id;
        `;
        break;
      case 'payroll':
        query = `
          SELECT payroll_id, employee_id, basic_salary, tax, 
                 deductions, net_salary, payment_date 
          FROM payroll;
        `;
        break;
      case 'attendance':
        query = `
          SELECT attendance_id, employee_id, date, status 
          FROM attendance;
        `;
        break;
      case 'leave':
        query = `
          SELECT leave_id, employee_id, start_date, end_date, 
                 leave_type, status, reason 
          FROM leaves;
        `;
        break;
      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
});

module.exports = router;
