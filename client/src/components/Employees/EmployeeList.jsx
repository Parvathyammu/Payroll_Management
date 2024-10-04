import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    API.get('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      API.delete(`/employees/${id}`)
        .then(() => fetchEmployees())
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/employees/add"
        style={{ marginBottom: '20px' }}
      >
        Add Employee
      </Button>
      <Table>
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
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.employee_id}>
              <TableCell>{emp.employee_id}</TableCell>
              <TableCell>{emp.first_name}</TableCell>
              <TableCell>{emp.last_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.date_joined}</TableCell>
              <TableCell>${emp.salary}</TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/employees/edit/${emp.employee_id}`}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
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
