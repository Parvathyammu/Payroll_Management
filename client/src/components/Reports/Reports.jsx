import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import {
  Container,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [reports, setReports] = useState([]);

  const handleGenerateReport = () => {
    API.get(`/reports?type=${reportType}`)
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Report Type</InputLabel>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          label="Report Type"
        >
          <MenuItem value="employee">Employee Report</MenuItem>
          <MenuItem value="payroll">Payroll Report</MenuItem>
          <MenuItem value="attendance">Attendance Report</MenuItem>
          <MenuItem value="leave">Leave Report</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
        disabled={!reportType}
        style={{ marginBottom: '20px' }}
      >
        Generate Report
      </Button>

      {/* Display reports based on report type */}
      {reportType === 'employee' && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((emp) => (
              <TableRow key={emp.employee_id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.first_name} {emp.last_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.date_joined}</TableCell>
                <TableCell>${emp.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {reportType === 'payroll' && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payroll ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell>Payment Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((pay) => (
              <TableRow key={pay.payroll_id}>
                <TableCell>{pay.payroll_id}</TableCell>
                <TableCell>{pay.employee_id}</TableCell>
                <TableCell>${pay.basic_salary}</TableCell>
                <TableCell>${pay.tax}</TableCell>
                <TableCell>${pay.deductions}</TableCell>
                <TableCell>${pay.net_salary}</TableCell>
                <TableCell>{pay.payment_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Implement other report types similarly */}
    </Container>
  );
};

export default Reports;
