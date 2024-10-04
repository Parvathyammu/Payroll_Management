// backend/routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY employee_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST add new employee
router.post('/', async (req, res) => {
  const { first_name, last_name, email, position, department, date_joined, salary, role } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, position, department, date_joined, salary, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [first_name, last_name, email, position, department, date_joined, salary, role || 'employee']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT update employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, position, department, date_joined, salary, role } = req.body;
  try {
    const result = await pool.query(
      `UPDATE employees SET first_name = $1, last_name = $2, email = $3, position = $4, department = $5,
       date_joined = $6, salary = $7, role = $8, updated_at = NOW()
       WHERE employee_id = $9 RETURNING *`,
      [first_name, last_name, email, position, department, date_joined, salary, role || 'employee', id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
