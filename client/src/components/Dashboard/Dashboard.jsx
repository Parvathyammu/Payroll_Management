import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">150</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Total Payroll</Typography>
            <Typography variant="h4">$45,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Attendance Rate</Typography>
            <Typography variant="h4">95%</Typography>
          </Paper>
        </Grid>
        {/* Add more summary cards as needed */}
      </Grid>
    </Container>
  );
};

export default Dashboard;
