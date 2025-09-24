import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Grid, Typography, CircularProgress, Container, Box } from '@mui/material';
import debounce from 'lodash.debounce';  
import MovieCard from '../moviecard/MovieCard';
import { searchMovies } from '../../services/movieService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceSetQuery = useCallback(
    debounce((q) => {
      setDebouncedQuery(q);
    }, 500),
    []  
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debounceSetQuery(value);
  };

  useEffect(() => {
    const doSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);  
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(debouncedQuery);
        setResults(data.results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search');
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [debouncedQuery]);

  const handleSearchClick = () => {
    debounceSetQuery.cancel();  
    setDebouncedQuery(query);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            fullWidth
            label="Search by title or keyword"
            variant="outlined"
            value={query}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
            disabled={loading}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {!loading && !error && results.length === 0 && debouncedQuery && (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            No results for &ldquo;{debouncedQuery}&rdquo;
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }} alignItems="stretch">
          {results.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: 'flex' }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Search;
