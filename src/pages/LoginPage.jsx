// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

const LoginPage = () => {
  const { login, authError } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.user) {
      navigate('/');  
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        {authError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{authError}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account? <Button variant="text" onClick={() => navigate('/signup')}>Sign Up</Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
