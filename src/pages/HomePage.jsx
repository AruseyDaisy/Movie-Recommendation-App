// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Button
} from '@mui/material';

import { fetchPopularMovies } from '../services/movieService';
import MovieCard from '../components/moviecard/MovieCard';
import { Link } from 'react-router-dom';    // <-- import this

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {/* Hero Section + Search Button */}
      <Box
        sx={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 4,
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Movie Recommender
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discover trending movies and explore your favorites
        </Typography>

    
      </Box>
      

      {/* Movie Grid */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Popular Movies
        </Typography>
            <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/search"
          sx={{ mt: 2 }}
        >
          Search Movies
        </Button>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress sx={{ mt: 4 }} />

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {Array.from(new Array(8)).map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Box>
                    <Box
                      sx={{
                        backgroundColor: 'grey.300',
                        height: 300,
                        width: '100%',
                        borderRadius: 2
                      }}
                    />
                    <Box sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          backgroundColor: 'grey.300',
                          height: 24,
                          width: '80%',
                          mb: 0.5,
                          borderRadius: 1
                        }}
                      />
                      <Box
                        sx={{
                          backgroundColor: 'grey.300',
                          height: 24,
                          width: '60%',
                          borderRadius: 1
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <>
            {movies.length === 0 ? (
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                No movies found.
              </Typography>
            ) : (
              <>
                <Grid
                  container
                  spacing={3}
                  sx={{ mt: 2 }}
                  alignItems="stretch"
                >
                  {movies.map((movie) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={movie.id}
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Pagination
                    count={Math.min(totalPages, 50)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={loading}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
