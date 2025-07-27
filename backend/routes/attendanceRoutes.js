/**
 * ATTENDANCE ROUTES - Employee time tracking and attendance management
 * This file handles all attendance-related operations including check-in/check-out
 * 
 * Key Features:
 * - Employee attendance record management
 * - Check-in and check-out time tracking
 * - Attendance status monitoring (Present, Absent, Late)
 * - CRUD operations for attendance records
 * - Date-based attendance queries
 * 
 * Endpoints:
 * - GET /api/attendance - Retrieve all attendance records
 * - GET /api/attendance/:id - Retrieve specific attendance record
 * - POST /api/attendance - Create new attendance record
 * - PUT /api/attendance/:id - Update attendance record
 * - DELETE /api/attendance/:id - Delete attendance record
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Database connection pool

/**
 * RETRIEVE ALL ATTENDANCE RECORDS
 * GET /api/attendance
 * Returns complete list of attendance records ordered by ID
 */
router.get('/', async (req, res) => {
  try {
    // Query database for all attendance records
    const result = await pool.query('SELECT * FROM attendance ORDER BY attendance_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching attendance records:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * RETRIEVE SINGLE ATTENDANCE RECORD
 * GET /api/attendance/:id
 * Returns specific attendance record by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Query database for specific attendance record
    const result = await pool.query('SELECT * FROM attendance WHERE attendance_id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * CREATE NEW ATTENDANCE RECORD
 * POST /api/attendance
 * Records employee check-in/check-out and attendance status
 */
router.post('/', async (req, res) => {
  // Extract attendance data from request body
  const { employee_id, date, status, check_in, check_out } = req.body;
  
  try {
    // INSERT ATTENDANCE RECORD
    // Optional check_in and check_out times (can be null)
    const result = await pool.query(
      `INSERT INTO attendance (employee_id, date, status, check_in, check_out)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [employee_id, date, status, check_in || null, check_out || null]
    );
    
    // Return created attendance record
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * UPDATE ATTENDANCE RECORD
 * PUT /api/attendance/:id
 * Updates existing attendance record (useful for check-out times)
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { employee_id, date, status, check_in, check_out } = req.body;
  try {
    const result = await pool.query(
      `UPDATE attendance SET employee_id = $1, date = $2, status = $3, check_in = $4, check_out = $5
       WHERE attendance_id = $6 RETURNING *`,
      [employee_id, date, status, check_in || null, check_out || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * DELETE ATTENDANCE RECORD
 * DELETE /api/attendance/:id
 * Removes attendance record from the system
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM attendance WHERE attendance_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
