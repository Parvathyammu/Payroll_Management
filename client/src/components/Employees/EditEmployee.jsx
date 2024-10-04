import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
    date_joined: '',
    salary: '',
  });

  useEffect(() => {
    API.get(`/employees/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/employees/${id}`, form)
      .then(() => {
        alert('Employee updated successfully');
        navigate('/employees');
      })
      .catch((err) => {
        console.error(err);
        alert('Error updating employee');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Position"
          name="position"
          value={form.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date Joined"
          name="date_joined"
          type="date"
          value={form.date_joined}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Employee
        </Button>
      </form>
    </Container>
  );
};

export default EditEmployee;
