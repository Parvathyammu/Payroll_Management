// leaveRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming you are using a PostgreSQL pool connection

// Get all leave requests
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leaves');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single leave request by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM leaves WHERE leave_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new leave request
router.post('/', async (req, res) => {
  const { employee_id, start_date, end_date, leave_type, reason } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO leaves (employee_id, start_date, end_date, leave_type, reason, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [employee_id, start_date, end_date, leave_type, reason, 'Pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a leave request status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE leaves SET status = $1 WHERE leave_id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a leave request
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM leaves WHERE leave_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.json({ message: 'Leave deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
