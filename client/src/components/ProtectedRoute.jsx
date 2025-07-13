/**
 * PROTECTED ROUTE COMPONENT - Route access control based on authentication
 * This Higher-Order Component (HOC) wraps routes that require authentication
 * 
 * Key Features:
 * - Authentication state checking
 * - Automatic redirection for unauthorized users
 * - Child component rendering for authorized users
 * - Integration with AuthContext for centralized auth state
 * 
 * Usage:
 * <ProtectedRoute>
 *   <SomePrivateComponent />
 * </ProtectedRoute>
 * 
 * Current Implementation Note:
 * - Currently allows all users (authentication disabled)
 * - Can be easily enabled by uncommenting the auth check
 */

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // React Router navigation
import { AuthContext } from '../context/AuthContext'; // Authentication context

/**
 * PROTECTED ROUTE COMPONENT
 * Conditionally renders child components based on authentication status
 * @param {Object} children - Child components to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  // ACCESS AUTHENTICATION STATE
  // Get current authentication status from context
  const { auth } = useContext(AuthContext);

  // AUTHENTICATION CHECK (Currently Disabled)
  // Uncomment the following lines to enable authentication protection:
  // if (!auth.token) {
  //   return <Navigate to="/login" replace />;
  // }

  // RENDER CHILD COMPONENTS
  // If user is authenticated (or auth is disabled), render the protected content
  return children;
};

export default ProtectedRoute;
