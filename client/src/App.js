import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeList from './components/Employees/EmployeeList';
import AddEmployee from './components/Employees/AddEmployee';
import EditEmployee from './components/Employees/EditEmployee';
import PayrollList from './components/Payroll/PayrollList';
import AddPayroll from './components/Payroll/AddPayroll';
import Attendance from './components/Attendance/Attendance';
import LeaveManagement from './components/Leave/LeaveManagement';
import Reports from './components/Reports/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <PayrollList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payroll/add"
          element={
            <ProtectedRoute>
              <AddPayroll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <LeaveManagement />
            </ProtectedRoute>
          }
        />
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
