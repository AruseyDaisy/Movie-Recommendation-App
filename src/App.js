// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';

import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <NavBar />

          <Container component="main" sx={{ flex: 1, py: 4 }}>
            <Routes>
              
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/moviedetails/:id" 
                element={
                  <ProtectedRoute>
                    <MovieDetails />
                  </ProtectedRoute>
                }
              />

        

            </Routes>
          </Container>

          <Footer />
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
