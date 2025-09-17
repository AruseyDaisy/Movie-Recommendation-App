
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/moviecard/movieCard';
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Pagination,
  Box,
} from '@mui/material';

import {fetchPopularMovies} from '../services/movieService'

// import { fetchPopularMovies } from '../services/apiService';
// import MovieCard from '../components/MovieCard';


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
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
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Movie Recommender
        </Typography>
        <Typography variant="h5">
          Discover trending movies and explore your favorites
        </Typography>
      </Box>

      {/* Movie Grid */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Popular Movies
        </Typography>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              count={Math.min(totalPages, 50)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
