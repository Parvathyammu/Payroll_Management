/**
 * DASHBOARD COMPONENT - Main application overview and analytics
 * This component displays key metrics and visualizations for the payroll system
 * 
 * Key Features:
 * - Real-time dashboard statistics (employees, payroll, attendance)
 * - Interactive charts using Chart.js
 * - Responsive Material-UI layout
 * - API integration for dynamic data
 * 
 * Displayed Metrics:
 * - Total number of employees
 * - Total payroll amount
 * - Overall attendance rate
 * - Weekly attendance visualization
 */

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material'; // Material-UI components
import API from '../../services/api'; // Centralized API service
import { Bar } from 'react-chartjs-2'; // Chart.js React wrapper for bar charts

// Chart.js components registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// CHART.JS SETUP
// Register necessary Chart.js components for bar chart functionality
ChartJS.register(
  CategoryScale,  // X-axis categories
  LinearScale,    // Y-axis numerical scale
  BarElement,     // Bar chart elements
  Title,          // Chart title
  Tooltip,        // Interactive tooltips
  Legend          // Chart legend
);

/**
 * DASHBOARD COMPONENT
 * Main dashboard displaying system overview and metrics
 */
const Dashboard = () => {
  // STATE MANAGEMENT FOR DASHBOARD METRICS
  const [totalEmployees, setTotalEmployees] = useState(0);    // Total employee count
  const [totalPayroll, setTotalPayroll] = useState(0);        // Total payroll amount
  const [attendanceRate, setAttendanceRate] = useState(0);    // Overall attendance percentage

  // EFFECT HOOK - Fetch dashboard data on component mount
  useEffect(() => {
    // API CALL TO FETCH DASHBOARD SUMMARY
    // Retrieves key metrics from the backend dashboard endpoint
    API.get('/dashboard/summary')
      .then((res) => {
        console.log('Dashboard data:', res.data); // Debug logging
        
        // UPDATE STATE WITH FETCHED DATA
        // Use fallback values (0) if data is undefined
        setTotalEmployees(res.data.totalEmployees || 0);
        setTotalPayroll(res.data.totalPayroll || 0);
        setAttendanceRate(res.data.attendanceRate || 0);
      })
      .catch((err) => console.error('Error fetching dashboard data:', err));
  }, []); // Empty dependency array - runs once on mount

  // CHART DATA CONFIGURATION
  // Static attendance data for weekly overview (can be made dynamic)
  const attendanceData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // X-axis labels
    datasets: [
      {
        label: 'Attendance Rate',
        data: [90, 95, 92, 96, 94], // Sample data (replace with dynamic data)
        backgroundColor: 'rgba(75,192,192,0.6)', // Bar color with transparency
        borderColor: 'rgba(75,192,192,1)',       // Bar border color
        borderWidth: 1,
      },
    ],
  };

  // COMPONENT RENDER
  return (
    <Container>
      {/* PAGE TITLE */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* METRICS GRID LAYOUT */}
      <Grid container spacing={3}>
        {/* TOTAL EMPLOYEES CARD */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">{totalEmployees}</Typography>
          </Paper>
        </Grid>
        
        {/* TOTAL PAYROLL CARD */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Payroll</Typography>
            <Typography variant="h4">${totalPayroll}</Typography>
          </Paper>
        </Grid>
        
        {/* ATTENDANCE RATE CARD */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Attendance Rate</Typography>
            <Typography variant="h4">{attendanceRate}%</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* ATTENDANCE CHART SECTION */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Attendance Overview
        </Typography>
        {/* CHART.JS BAR CHART */}
        <Bar data={attendanceData} />
      </div>
    </Container>
  );
};

export default Dashboard;
