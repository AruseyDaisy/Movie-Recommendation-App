import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" component={Link} to="/">
          <MovieIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Movie Recommender
        </Typography>

       
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
