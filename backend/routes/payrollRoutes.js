/**
 * PAYROLL ROUTES - Manages payroll calculations and records
 * This file handles all payroll-related operations including salary calculations
 * 
 * Key Features:
 * - Automatic net salary calculations
 * - CRUD operations for payroll records
 * - Tax and deduction management
 * - Payment date tracking
 * - Employee payroll history
 * 
 * Endpoints:
 * - GET /api/payroll - Retrieve all payroll records
 * - GET /api/payroll/:id - Retrieve specific payroll record
 * - POST /api/payroll - Create new payroll record
 * - PUT /api/payroll/:id - Update payroll record
 * - DELETE /api/payroll/:id - Delete payroll record
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Database connection pool

/**
 * RETRIEVE ALL PAYROLL RECORDS
 * GET /api/payroll
 * Returns complete list of payroll records ordered by ID
 */
router.get('/', async (req, res) => {
  try {
    // Query database for all payroll records
    const result = await pool.query('SELECT * FROM payroll ORDER BY payroll_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payroll records:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * RETRIEVE SINGLE PAYROLL RECORD
 * GET /api/payroll/:id
 * Returns specific payroll record by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Query database for specific payroll record
    const result = await pool.query('SELECT * FROM payroll WHERE payroll_id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching payroll:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * CREATE NEW PAYROLL RECORD
 * POST /api/payroll
 * Calculates net salary and creates new payroll entry
 */
router.post('/', async (req, res) => {
  // Extract payroll data from request body
  const { employee_id, basic_salary, tax, deductions, payment_date } = req.body;

  // AUTOMATIC NET SALARY CALCULATION
  // Net Salary = Basic Salary - Tax - Other Deductions
  const net_salary = basic_salary - tax - deductions;

  try {
    // INSERT PAYROLL RECORD WITH CALCULATED VALUES
    const result = await pool.query(
      `INSERT INTO payroll (employee_id, basic_salary, tax, deductions, net_salary, payment_date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [employee_id, basic_salary, tax, deductions, net_salary, payment_date]
    );
    
    // Return created payroll record
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding payroll record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * UPDATE PAYROLL RECORD
 * PUT /api/payroll/:id
 * Updates existing payroll record and recalculates net salary
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { employee_id, basic_salary, tax, deductions, payment_date } = req.body;

  // Calculate the updated net salary
  const net_salary = basic_salary - tax - deductions;

  try {
    const result = await pool.query(
      `UPDATE payroll SET employee_id = $1, basic_salary = $2, tax = $3, deductions = $4, net_salary = $5, payment_date = $6
       WHERE payroll_id = $7 RETURNING *`,
      [employee_id, basic_salary, tax, deductions, net_salary, payment_date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating payroll record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * DELETE PAYROLL RECORD
 * DELETE /api/payroll/:id
 * Deletes payroll record by ID
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM payroll WHERE payroll_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    res.json({ message: 'Payroll record deleted successfully' });
  } catch (error) {
    console.error('Error deleting payroll record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
