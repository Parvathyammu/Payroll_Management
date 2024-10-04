// src/components/Leave/LeaveManagement.jsx

import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField, // Importing TextField
} from '@mui/material';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    leave_type: 'Annual',
    reason: '',
  });

  const fetchLeaves = () => {
    API.get('/leaves')
      .then((res) => setLeaves(res.data))
      .catch((err) => console.error(err));
  };

  const fetchEmployees = () => {
    API.get('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    API.post('/leaves', form)
      .then(() => {
        alert('Leave applied successfully');
        setForm({
          employee_id: '',
          start_date: '',
          end_date: '',
          leave_type: 'Annual',
          reason: '',
        });
        fetchLeaves();
      })
      .catch((err) => {
        console.error(err);
        alert('Error applying leave');
      });
  };

  const handleStatusChange = (leave_id, status) => {
    API.put(`/leaves/${leave_id}`, { status })
      .then(() => fetchLeaves())
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Leave Management
      </Typography>
      <form onSubmit={handleApplyLeave} style={{ marginBottom: '20px' }}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Employee</InputLabel>
          <Select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            label="Employee"
          >
            {employees.map((emp) => (
              <MenuItem key={emp.employee_id} value={emp.employee_id}>
                {emp.first_name} {emp.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="End Date"
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Leave Type</InputLabel>
          <Select
            name="leave_type"
            value={form.leave_type}
            onChange={handleChange}
            label="Leave Type"
          >
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Sick">Sick</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Reason"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Apply for Leave
        </Button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Leave ID</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.leave_id}>
              <TableCell>{leave.leave_id}</TableCell>
              <TableCell>{leave.employee_id}</TableCell>
              <TableCell>{leave.start_date}</TableCell>
              <TableCell>{leave.end_date}</TableCell>
              <TableCell>{leave.leave_type}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                {leave.status === 'Pending' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusChange(leave.leave_id, 'Approved')}
                      style={{ marginRight: '10px' }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleStatusChange(leave.leave_id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LeaveManagement;
