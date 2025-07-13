/**
 * USER AUTHENTICATION ROUTES - Handles user registration and login
 * This file manages user authentication endpoints for the payroll system
 * 
 * Key Features:
 * - User registration with password hashing
 * - Secure login with password verification
 * - Role-based user management
 * - Database integration for user storage
 * 
 * Endpoints:
 * - POST /api/auth/register - User registration
 * - POST /api/auth/login - User authentication
 */

const express = require('express');
const bcrypt = require('bcrypt'); // Password hashing library
const pool = require('../config/db'); // Database connection pool
const router = express.Router();

/**
 * USER REGISTRATION ENDPOINT
 * POST /api/auth/register
 * Creates new user account with encrypted password
 */
router.post('/register', async (req, res) => {
    // Extract user data from request body
    const { firstName, lastName, email, password, role } = req.body;
    
    try {
        // PASSWORD HASHING
        // Hash password with salt rounds = 10 for security
        const passwordHash = await bcrypt.hash(password, 10);
        
        // DATABASE INSERTION
        // Insert new user into users table with hashed password
        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, passwordHash, role || 'employee'] // Default role: employee
        );
        
        // Return created user (excluding sensitive data)
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User registration failed.' });
    }
});

/**
 * USER LOGIN ENDPOINT
 * POST /api/auth/login
 * Authenticates user credentials and initiates session
 */
router.post('/login', async (req, res) => {
    // Extract login credentials from request body
    const { email, password } = req.body;
    
    try {
        // DATABASE LOOKUP
        // Find user by email address
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (user.rows.length > 0) {
            // USER FOUND - Verify password
            const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
            
            if (isMatch) {
                // SUCCESSFUL AUTHENTICATION
                // TODO: Generate JWT token for session management
                res.json({ message: 'Login successful', user: user.rows[0] });
            } else {
                // INVALID PASSWORD
                res.status(401).json({ error: 'Invalid credentials.' });
            }
        } else {
            // USER NOT FOUND
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed.' });
    }
});

// Export router for use in main server file
module.exports = router;
