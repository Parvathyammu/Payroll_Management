/**
 * NAVIGATION BAR COMPONENT - Main application navigation
 * This component provides the primary navigation interface for the application
 * 
 * Key Features:
 * - Material-UI AppBar for professional styling
 * - Responsive navigation links
 * - Authentication-aware UI (login/logout)
 * - React Router integration for client-side navigation
 * - Context integration for authentication state
 * 
 * Navigation Structure:
 * - Dashboard: Main overview page
 * - Employees: Employee management
 * - Payroll: Payroll processing
 * - Attendance: Time tracking
 * - Leave: Leave management
 * - Reports: Analytics and reports
 */

import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // Material-UI components
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation
import { AuthContext } from '../context/AuthContext'; // Authentication context

/**
 * NAVBAR COMPONENT
 * Renders the main navigation bar with authentication-aware interface
 */
const Navbar = () => {
  // AUTHENTICATION CONTEXT
  // Access authentication state and logout function
  const { auth, logout } = useContext(AuthContext);
  
  // NAVIGATION HOOK
  // Used for programmatic navigation after logout
  const navigate = useNavigate();

  /**
   * LOGOUT HANDLER
   * Logs out user and redirects to login page
   */
  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate('/login'); // Redirect to login page
  };

  // COMPONENT RENDER
  return (
    <AppBar position="static">
      <Toolbar>
        {/* APPLICATION TITLE */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Payroll Management
        </Typography>
        
        {/* NAVIGATION LINKS */}
        <>
          {/* DASHBOARD LINK - Main overview page */}
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          
          {/* EMPLOYEE MANAGEMENT LINK */}
          <Button color="inherit" component={Link} to="/employees">
            Employees
          </Button>
          
          {/* PAYROLL MANAGEMENT LINK */}
          <Button color="inherit" component={Link} to="/payroll">
            Payroll
          </Button>
          
          {/* ATTENDANCE TRACKING LINK */}
          <Button color="inherit" component={Link} to="/attendance">
            Attendance
          </Button>
          
          {/* LEAVE MANAGEMENT LINK */}
          <Button color="inherit" component={Link} to="/leave">
            Leave
          </Button>
          
          {/* REPORTS AND ANALYTICS LINK */}
          <Button color="inherit" component={Link} to="/reports">
            Reports
          </Button>
          
          {/* AUTHENTICATION BUTTONS */}
          {/* Conditional rendering based on authentication status */}
          {auth.token ? (
            // USER IS AUTHENTICATED - Show logout button
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            // USER NOT AUTHENTICATED - Show login/register buttons
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
