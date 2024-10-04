const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes'); // Importing employee routes once
const userRoutes = require('./routes/userRoutes'); // Importing user routes once
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', userRoutes);
// Add other routes similarly
// e.g., app.use('/api/payroll', payrollRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Payroll Management System API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
