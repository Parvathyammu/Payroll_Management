/**
 * LOGIN COMPONENT - User authentication interface
 * This component provides the login form for user authentication
 * 
 * Key Features:
 * - Material-UI form components for professional styling
 * - Controlled form inputs with state management
 * - API integration for authentication
 * - Context integration for global auth state
 * - Navigation after successful login
 * - Error handling for invalid credentials
 * 
 * Authentication Flow:
 * 1. User enters email and password
 * 2. Form submits to /api/auth/login endpoint
 * 3. On success: token stored, user redirected to dashboard
 * 4. On failure: error message displayed
 */

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Authentication context
import { useNavigate } from 'react-router-dom'; // Navigation hook
import API from '../../services/api'; // Centralized API service
import { TextField, Button, Container, Typography } from '@mui/material'; // Material-UI components

/**
 * LOGIN COMPONENT
 * Renders authentication form and handles login process
 */
const Login = () => {
  // AUTHENTICATION CONTEXT
  // Access login function from authentication context
  const { login } = useContext(AuthContext);
  
  // NAVIGATION HOOK
  // For programmatic navigation after successful login
  const navigate = useNavigate();
  
  // FORM STATE MANAGEMENT
  // Controlled inputs for email and password
  const [form, setForm] = useState({
    email: '',    // User's email address
    password: '', // User's password
  });

  /**
   * FORM INPUT HANDLER
   * Updates form state when user types in input fields
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * FORM SUBMISSION HANDLER
   * Processes login form submission and authenticates user
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // API CALL FOR AUTHENTICATION
    API.post('/auth/login', form)
      .then((res) => {
        // SUCCESS: Store token and redirect
        login(res.data.token); // Update authentication context
        navigate('/dashboard');  // Redirect to main dashboard
        alert('Login successful');
      })
      .catch((err) => {
        // ERROR: Display error message
        console.error(err);
        alert('Invalid credentials');
      });
  };

  // COMPONENT RENDER
  return (
    <Container maxWidth="sm">
      {/* PAGE TITLE */}
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      
      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit}>
        {/* EMAIL INPUT FIELD */}
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        {/* PASSWORD INPUT FIELD */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        {/* SUBMIT BUTTON */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
