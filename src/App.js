import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';

import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavBar />

        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/moviedetails' element={<MovieDetails/>}/>
            {/* Add more routes here */}
          </Routes>
        </Container>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
