import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" className="footer-text">
          © {new Date().getFullYear()} Movie Recommender. Built with ❤️ using React & TMDB API.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
