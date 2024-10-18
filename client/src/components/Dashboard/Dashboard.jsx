import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import API from '../../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);

  useEffect(() => {
    // Fetch dashboard data from the new route
    API.get('/dashboard/summary')
      .then((res) => {
        console.log('Dashboard data:', res.data); // Log the data for debugging
        setTotalEmployees(res.data.totalEmployees || 0);
        setTotalPayroll(res.data.totalPayroll || 0);
        setAttendanceRate(res.data.attendanceRate || 0);
      })
      .catch((err) => console.error('Error fetching dashboard data:', err));
  }, []);

  // Attendance data for the bar chart
  const attendanceData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [90, 95, 92, 96, 94], // Replace with dynamic data if available
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">{totalEmployees}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Payroll</Typography>
            <Typography variant="h4">${totalPayroll}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Attendance Rate</Typography>
            <Typography variant="h4">{attendanceRate}%</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Render the bar chart */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Attendance Overview
        </Typography>
        <Bar data={attendanceData} />
      </div>
    </Container>
  );
};

export default Dashboard;
