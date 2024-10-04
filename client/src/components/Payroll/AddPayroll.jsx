import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

const AddPayroll = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: '',
    basic_salary: '',
    tax: '',
    deductions: '',
  });

  useEffect(() => {
    API.get('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/payroll', form)
      .then(() => {
        alert('Payroll added successfully');
        navigate('/payroll');
      })
      .catch((err) => {
        console.error(err);
        alert('Error adding payroll');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Payroll
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {employees.map((emp) => (
            <MenuItem key={emp.employee_id} value={emp.employee_id}>
              {emp.first_name} {emp.last_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Basic Salary"
          name="basic_salary"
          type="number"
          value={form.basic_salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tax"
          name="tax"
          type="number"
          value={form.tax}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Deductions"
          name="deductions"
          type="number"
          value={form.deductions}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Payroll
        </Button>
      </form>
    </Container>
  );
};

export default AddPayroll;
