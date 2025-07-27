/**
 * EMPLOYEE ROUTES - RESTful API endpoints for employee management
 * This file handles all CRUD operations for employee data
 * 
 * Endpoints:
 * - GET /api/employees - Retrieve all employees
 * - GET /api/employees/:id - Retrieve specific employee
 * - POST /api/employees - Create new employee
 * - PUT /api/employees/:id - Update existing employee
 * - DELETE /api/employees/:id - Delete employee
 */

// Express router for modular route handling
const express = require('express');
const router = express.Router();

// Database connection pool for PostgreSQL operations
const pool = require('../config/db');

// RETRIEVE ALL EMPLOYEES
// GET /api/employees
router.get('/', async (req, res) => {
  try {
    // Query database for all employees, ordered by ID
    const result = await pool.query('SELECT * FROM employees ORDER BY employee_id ASC');
    
    // Return employee data as JSON
    res.json(result.rows);
  } catch (error) {
    // Log error and return server error response
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// RETRIEVE SINGLE EMPLOYEE BY ID
// GET /api/employees/:id
router.get('/:id', async (req, res) => {
  // Extract employee ID from URL parameters
  const { id } = req.params;
  
  try {
    // Query database for specific employee
    const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
    
    // Check if employee exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Return single employee data
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// CREATE NEW EMPLOYEE
// POST /api/employees
router.post('/', async (req, res) => {
  // Extract employee data from request body
  const { first_name, last_name, email, position, department, date_joined, salary, role } = req.body;
  
  try {
    // Insert new employee into database and return the created record
    const result = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, position, department, date_joined, salary, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [first_name, last_name, email, position, department, date_joined, salary, role || 'employee']
    );
    
    // Return created employee with 201 status (Created)
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// UPDATE EXISTING EMPLOYEE
// PUT /api/employees/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, position, department, date_joined, salary, role } = req.body;
  
  try {
    // Update employee record and return updated data
    const result = await pool.query(
      `UPDATE employees SET first_name = $1, last_name = $2, email = $3, position = $4, department = $5,
       date_joined = $6, salary = $7, role = $8, updated_at = NOW()
       WHERE employee_id = $9 RETURNING *`,
      [first_name, last_name, email, position, department, date_joined, salary, role || 'employee', id]
    );
    
    // Check if employee was found and updated
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Return updated employee data
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE EMPLOYEE
// DELETE /api/employees/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Delete employee from database
    const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
    
    // Check if employee was found and deleted
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Return success message
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Export router for use in main server file
module.exports = router;
