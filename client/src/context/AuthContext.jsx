/**
 * AUTHENTICATION CONTEXT - Global state management for user authentication
 * This file implements React Context API for managing authentication state across the app
 * 
 * Key Features:
 * - Centralized authentication state management
 * - JWT token handling and storage
 * - Automatic token validation and user data fetching
 * - Login/logout functionality
 * - Persistent authentication using localStorage
 * 
 * Authentication Flow:
 * 1. User logs in -> token stored in localStorage and context
 * 2. Token used for API requests -> user data fetched
 * 3. Context provides auth state to all components
 * 4. Protected routes check auth state for access control
 */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // HTTP client for API requests

// CREATE AUTHENTICATION CONTEXT
// This context will be accessible throughout the component tree
export const AuthContext = createContext();

/**
 * AUTHENTICATION PROVIDER COMPONENT
 * Wraps the entire application to provide authentication state
 * @param {Object} children - Child components that need access to auth context
 */
export const AuthProvider = ({ children }) => {
  // AUTHENTICATION STATE
  // Manages current user authentication status and data
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'), // Retrieve saved token from browser storage
    user: null, // User profile data (initially null)
  });

  // EFFECT HOOK - Runs when component mounts or token changes
  // Automatically validates token and fetches user data
  useEffect(() => {
    if (auth.token) {
      // TOKEN VALIDATION AND USER DATA FETCH
      // If token exists, verify it by fetching user data
      axios
        .get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${auth.token}` }, // Include token in request headers
        })
        .then((response) => {
          // SUCCESS: Update auth state with user data
          setAuth((prev) => ({ ...prev, user: response.data }));
        })
        .catch((error) => {
          // ERROR: Token invalid or expired, logout user
          console.error(error);
          logout();
        });
    }
  }, [auth.token]); // Dependency array - effect runs when token changes

  /**
   * LOGIN FUNCTION
   * Stores JWT token and updates authentication state
   * @param {string} token - JWT token received from login API
   */
  const login = (token) => {
    localStorage.setItem('token', token); // Persist token in browser storage
    setAuth({ token, user: null }); // Update context state (user data will be fetched by useEffect)
  };

  /**
   * LOGOUT FUNCTION
   * Clears authentication data and redirects to login
   */
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from browser storage
    setAuth({ token: null, user: null }); // Clear authentication state
  };

  // CONTEXT PROVIDER
  // Makes auth state and functions available to all child components
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
