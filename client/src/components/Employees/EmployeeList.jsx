/**
 * EMPLOYEE LIST COMPONENT - Display and manage all employees
 * This component provides a comprehensive view of all employees with management actions
 * 
 * Key Features:
 * - Material-UI table for professional data display
 * - Real-time employee data fetching from API
 * - CRUD operations (Create, Read, Update, Delete)
 * - Navigation to add/edit employee forms
 * - Confirmation dialogs for destructive actions
 * - Responsive table layout
 * 
 * Table Columns:
 * - Employee ID, Name, Email, Position, Department
 * - Date Joined, Salary, Action buttons (Edit/Delete)
 * 
 * User Actions:
 * - Add new employee (navigate to form)
 * - Edit existing employee (navigate to edit form)
 * - Delete employee (with confirmation)
 */

import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // Centralized API service
import { Link } from 'react-router-dom'; // React Router for navigation

// Material-UI components for professional UI
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';

// Material-UI icons for action buttons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * EMPLOYEE LIST COMPONENT
 * Displays all employees in a table format with management actions
 */
const EmployeeList = () => {
  // STATE MANAGEMENT
  // Array to store all employee records
  const [employees, setEmployees] = useState([]);

  /**
   * FETCH EMPLOYEES FUNCTION
   * Retrieves all employee data from the API
   */
  const fetchEmployees = () => {
    API.get('/employees')
      .then((res) => setEmployees(res.data)) // Update state with fetched data
      .catch((err) => console.error(err));   // Log any errors
  };

  // EFFECT HOOK - Fetch employees when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []); // Empty dependency array = runs once on mount

  /**
   * DELETE EMPLOYEE HANDLER
   * Deletes an employee after user confirmation
   * @param {number} id - Employee ID to delete
   */
  const handleDelete = (id) => {
    // CONFIRMATION DIALOG
    // Ask user to confirm destructive action
    if (window.confirm('Are you sure you want to delete this employee?')) {
      // API CALL TO DELETE EMPLOYEE
      API.delete(`/employees/${id}`)
        .then(() => fetchEmployees()) // Refresh the list after successful deletion
        .catch((err) => console.error(err));
    }
  };

  // COMPONENT RENDER
  return (
    <Container>
      {/* PAGE TITLE */}
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      
      {/* ADD EMPLOYEE BUTTON */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/employees/add"
        style={{ marginBottom: '20px' }}
      >
        Add Employee
      </Button>
      
      {/* EMPLOYEES DATA TABLE */}
      <Table>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Date Joined</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        
        {/* TABLE BODY - Dynamic rows for each employee */}
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.employee_id}>
              {/* EMPLOYEE DATA CELLS */}
              <TableCell>{emp.employee_id}</TableCell>
              <TableCell>{emp.first_name}</TableCell>
              <TableCell>{emp.last_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.date_joined}</TableCell>
              <TableCell>${emp.salary}</TableCell>
              
              {/* ACTION BUTTONS CELL */}
              <TableCell>
                {/* EDIT BUTTON - Navigate to edit form */}
                <IconButton
                  component={Link}
                  to={`/employees/edit/${emp.employee_id}`}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                
                {/* DELETE BUTTON - Trigger delete confirmation */}
                <IconButton
                  onClick={() => handleDelete(emp.employee_id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
