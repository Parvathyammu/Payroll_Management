const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');  // Adjust this path according to your db.js location
const router = express.Router();

// User Registration
// Updated registration in userRoutes.js
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;  // Changed field names
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, passwordHash, role || 'employee']
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User registration failed.' });
    }
});


// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
            if (isMatch) {
                // Generate token or return success response
                res.json({ message: 'Login successful', user: user.rows[0] });
            } else {
                res.status(401).json({ error: 'Invalid credentials.' });
            }
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed.' });
    }
});

module.exports = router;
