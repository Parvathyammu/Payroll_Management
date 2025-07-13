/**
 * API SERVICE CONFIGURATION
 * This file sets up a centralized HTTP client for all API communications
 * 
 * Key Features:
 * - Axios instance with base URL configuration
 * - Automatic JWT token injection for authenticated requests
 * - Request interceptor for consistent authentication headers
 * - Centralized API endpoint management
 * 
 * Usage:
 * - Import this API instance in components
 * - Use API.get(), API.post(), etc. instead of raw axios calls
 * - Token automatically added to requests if user is authenticated
 */

import axios from 'axios'; // HTTP client library

/**
 * AXIOS INSTANCE CREATION
 * Creates a configured axios instance with base URL
 * All API calls will be prefixed with this base URL
 */
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend server base URL
});

/**
 * REQUEST INTERCEPTOR
 * Automatically adds authentication token to all outgoing requests
 * This ensures authenticated endpoints receive proper authorization headers
 */
API.interceptors.request.use((config) => {
  // Retrieve JWT token from localStorage
  const token = localStorage.getItem('token');
  
  // If token exists, add it to request headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Return modified config to proceed with request
  return config;
});

// Export configured API instance for use in components
export default API;
