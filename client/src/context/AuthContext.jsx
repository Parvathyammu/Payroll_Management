import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      // Fetch user data
      axios
        .get('/api/auth/user', {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((response) => {
          setAuth((prev) => ({ ...prev, user: response.data }));
        })
        .catch((error) => {
          console.error(error);
          logout();
        });
    }
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, user: null });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
