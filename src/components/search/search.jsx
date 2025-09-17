import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, CircularProgress, Container } from '@mui/material';
import { searchMovies } from '../services/apiService';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchMovies(query);
      setResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {results.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Search;
