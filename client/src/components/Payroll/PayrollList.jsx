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

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);

  const fetchPayrolls = () => {
    API.get('/payroll')
      .then((res) => setPayrolls(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payroll entry?')) {
      API.delete(`/payroll/${id}`)
        .then(() => fetchPayrolls())
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payroll
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/payroll/add"
        style={{ marginBottom: '20px' }}
      >
        Add Payroll
      </Button>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payrolls.map((pay) => (
            <TableRow key={pay.payroll_id}>
              <TableCell>{pay.payroll_id}</TableCell>
              <TableCell>{pay.employee_id}</TableCell>
              <TableCell>${pay.basic_salary}</TableCell>
              <TableCell>${pay.tax}</TableCell>
              <TableCell>${pay.deductions}</TableCell>
              <TableCell>${pay.net_salary}</TableCell>
              <TableCell>{pay.payment_date}</TableCell>
              <TableCell>
                {/* Implement EditPayroll component if needed */}
                <IconButton
                  component={Link}
                  to={`/payroll/edit/${pay.payroll_id}`}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(pay.payroll_id)}
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

export default PayrollList;
