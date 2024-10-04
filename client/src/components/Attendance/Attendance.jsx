// src/components/Attendance/Attendance.jsx

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
  TextField, // Importing TextField
} from '@mui/material';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: '',
    date: '',
    status: 'Present',
    check_in: '',
    check_out: '',
  });

  const fetchAttendance = () => {
    API.get('/attendance')
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));
  };

  const fetchEmployees = () => {
    API.get('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();
    API.post('/attendance', form)
      .then(() => {
        alert('Attendance recorded');
        setForm({
          employee_id: '',
          date: '',
          status: 'Present',
          check_in: '',
          check_out: '',
        });
        fetchAttendance();
      })
      .catch((err) => {
        console.error(err);
        alert('Error recording attendance');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Attendance
      </Typography>
      <form onSubmit={handleAddAttendance} style={{ marginBottom: '20px' }}>
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
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Late">Late</MenuItem>
        </TextField>
        {form.status === 'Present' && (
          <>
            <TextField
              label="Check-In Time"
              name="check_in"
              type="time"
              value={form.check_in}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Check-Out Time"
              name="check_out"
              type="time"
              value={form.check_out}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Record Attendance
        </Button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Attendance ID</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Check-In</TableCell>
            <TableCell>Check-Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map((att) => (
            <TableRow key={att.attendance_id}>
              <TableCell>{att.attendance_id}</TableCell>
              <TableCell>{att.employee_id}</TableCell>
              <TableCell>{att.date}</TableCell>
              <TableCell>{att.status}</TableCell>
              <TableCell>{att.check_in || 'N/A'}</TableCell>
              <TableCell>{att.check_out || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Attendance;
