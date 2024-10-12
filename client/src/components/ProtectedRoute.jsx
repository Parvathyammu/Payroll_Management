import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If you want to allow access to all users, just return the children component directly.
  return children;

};

export default ProtectedRoute;
