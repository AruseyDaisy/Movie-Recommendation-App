import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieService';
import { Box, Typography, Rating, Grid, Card, CardMedia, CardContent } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Box>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="body1">{movie.overview}</Typography>
      <Typography variant="body2">Release Date: {movie.release_date}</Typography>
      <Typography variant="body2">Rating: {movie.vote_average}</Typography>
      <Rating value={movie.vote_average / 2} readOnly />

      <Box mt={3}>
        <Typography variant="h5">Cast</Typography>
        <Grid container spacing={2}>
          {movie.credits.cast.map((actor) => (
            <Grid item key={actor.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
                <CardContent>
                  <Typography variant="body2">{actor.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={3}>
        <Typography variant="h5">Reviews</Typography>
        {movie.reviews.results.length > 0 ? (
          movie.reviews.results.map((review) => (
            <Box key={review.id} mb={2}>
              <Typography variant="body2" fontWeight="bold">
                {review.author}
              </Typography>
              <Typography variant="body2">{review.content}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No reviews available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MovieDetails;
