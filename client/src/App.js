/**
 * MAIN REACT APPLICATION COMPONENT
 * This is the root component that defines the entire application structure and routing
 * 
 * Key Features:
 * - React Router for client-side navigation
 * - Protected routes for authenticated users
 * - Component-based architecture
 * - Modular page structure
 * 
 * Application Structure:
 * - Authentication: Login/Register
 * - Dashboard: Overview and statistics
 * - Employee Management: CRUD operations
 * - Payroll: Salary calculations and records
 * - Attendance: Time tracking
 * - Leave Management: Leave requests and approvals
 * - Reports: Analytics and insights
 */

// Core React imports
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // React Router for navigation

// Layout Components
import Navbar from './components/Navbar'; // Navigation bar component

// Authentication Components
import Login from './components/Authentication/Login'; // User login page
import Register from './components/Authentication/Register'; // User registration page

// Main Application Components
import Dashboard from './components/Dashboard/Dashboard'; // Main dashboard with statistics

// Employee Management Components
import EmployeeList from './components/Employees/EmployeeList'; // Display all employees
import AddEmployee from './components/Employees/AddEmployee'; // Form to add new employee
import EditEmployee from './components/Employees/EditEmployee'; // Form to edit employee details

// Payroll Management Components
import PayrollList from './components/Payroll/PayrollList'; // Display payroll records
import AddPayroll from './components/Payroll/AddPayroll'; // Form to add payroll entry

// Other Feature Components
import Attendance from './components/Attendance/Attendance'; // Attendance tracking interface
import LeaveManagement from './components/Leave/LeaveManagement'; // Leave management system
import Reports from './components/Reports/Reports'; // Reports and analytics

// Security and Authentication
import ProtectedRoute from './components/ProtectedRoute'; // HOC for route protection

// Styling
import './App.css'; // Global application styles

/**
 * MAIN APP COMPONENT
 * Defines the complete application structure with routing
 */
function App() {
  return (
    <div>
      {/* NAVIGATION BAR - Appears on all pages */}
      <Navbar />
      
      {/* ROUTING CONFIGURATION */}
      <Routes>
        {/* PUBLIC ROUTES - Accessible without authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* PROTECTED ROUTES - Require user authentication */}
        
        {/* Dashboard Route - Main landing page for authenticated users */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* EMPLOYEE MANAGEMENT ROUTES */}
        {/* Employee list - View all employees */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        
        {/* Add new employee form */}
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        
        {/* Edit employee form - Dynamic route with employee ID */}
        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        
        {/* PAYROLL MANAGEMENT ROUTES */}
        {/* Payroll list - View all payroll records */}
        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <PayrollList />
            </ProtectedRoute>
          }
        />
        
        {/* Add new payroll entry */}
        <Route
          path="/payroll/add"
          element={
            <ProtectedRoute>
              <AddPayroll />
            </ProtectedRoute>
          }
        />
        
        {/* ATTENDANCE MANAGEMENT ROUTE */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        
        {/* LEAVE MANAGEMENT ROUTE */}
        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <LeaveManagement />
            </ProtectedRoute>
          }
        />
        
        {/* REPORTS AND ANALYTICS ROUTE */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
