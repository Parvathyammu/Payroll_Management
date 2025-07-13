/**
 * REACT APPLICATION ENTRY POINT
 * This file is the main entry point for the React application
 * 
 * Key Features:
 * - React DOM rendering setup
 * - Router configuration for client-side navigation
 * - Authentication context provider setup
 * - Application component tree initialization
 * 
 * Provider Hierarchy:
 * 1. BrowserRouter - Enables client-side routing
 * 2. AuthProvider - Global authentication state management
 * 3. App - Main application component
 * 
 * This structure ensures:
 * - All components have access to routing functionality
 * - Authentication state is available throughout the app
 * - Clean separation of concerns
 */

import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 rendering API
import App from './App'; // Main application component
import { BrowserRouter } from 'react-router-dom'; // React Router for navigation
import { AuthProvider } from './context/AuthContext'; // Authentication context

// CREATE REACT ROOT
// React 18 createRoot API for improved performance
const root = ReactDOM.createRoot(document.getElementById('root'));

// RENDER APPLICATION WITH PROVIDERS
// Wrap App component with necessary providers in correct order
root.render(
  // BROWSER ROUTER - Enables client-side routing for SPA functionality
  <BrowserRouter>
    {/* AUTH PROVIDER - Makes authentication state available globally */}
    <AuthProvider>
      {/* MAIN APP COMPONENT - Contains all application logic and routing */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
