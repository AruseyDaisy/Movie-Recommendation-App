import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { fetchPopularMovies, fetchOtherMovies, searchMovies } from '../services/movieService';
import MovieCard from '../components/moviecard/MovieCard';

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [popularMovies, setPopularMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularPage, setPopularPage] = useState(1);
  const [otherPage, setOtherPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setPopularPage(1);
    setOtherPage(1);
    setSearchPage(1);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const data = await searchMovies(searchQuery, searchPage);
      setSearchResults(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    if (tabIndex === 0) {
      setPopularPage(value);
    } else if (tabIndex === 1) {
      setOtherPage(value);
    } else {
      setSearchPage(value);
      handleSearch();
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        if (tabIndex === 0) {
          const data = await fetchPopularMovies({ page: popularPage });
          setPopularMovies(data.results);
          setTotalPages(data.total_pages);
        } else if (tabIndex === 1) {
          const data = await fetchOtherMovies({ page: otherPage });
          setOtherMovies(data.results);
          setTotalPages(data.total_pages);
        } else if (tabIndex === 2 && searchQuery.trim()) {
          await handleSearch();
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, popularPage, otherPage, searchPage]);

  const renderMovies = () => {
    const movieList =
      tabIndex === 0
        ? popularMovies
        : tabIndex === 1
        ? otherMovies
        : searchResults;

    return movieList.length === 0 ? (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No movies found.
      </Typography>
    ) : (
      <>
        <Grid container spacing={3} sx={{ mt: 2 }} alignItems="stretch">
          {movieList.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: 'flex' }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.min(totalPages, 50)}
            page={tabIndex === 0 ? popularPage : tabIndex === 1 ? otherPage : searchPage}
            onChange={handlePageChange}
            color="primary"
            disabled={loading}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Movie Recommender
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discover trending movies and explore your favorites
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={() => {
            setTabIndex(2);
            setSearchPage(1);
            handleSearch();
          }}>
            Search
          </Button>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="movie tabs"
          centered
        >
          <Tab label="Popular Movies" />
          <Tab label="Other Movies" />
          <Tab label="Search Results" />
        </Tabs>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          {tabIndex === 0
            ? 'Popular Movies'
            : tabIndex === 1
            ? 'Other Movies'
            : `Search Results for "${searchQuery}"`}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          renderMovies()
        )}
      </Container>
    </>
  );
};

export default HomePage;
