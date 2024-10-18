const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all payroll records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payroll ORDER BY payroll_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payroll records:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET payroll by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
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

// POST add a new payroll record
router.post('/', async (req, res) => {
  const { employee_id, basic_salary, tax, deductions, payment_date } = req.body;

  // Calculate the net salary
  const net_salary = basic_salary - tax - deductions;

  try {
    const result = await pool.query(
      `INSERT INTO payroll (employee_id, basic_salary, tax, deductions, net_salary, payment_date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [employee_id, basic_salary, tax, deductions, net_salary, payment_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding payroll record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT update payroll record
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

// DELETE payroll record
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
