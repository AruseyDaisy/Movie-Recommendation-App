import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card>
      <CardMedia component="img" height="300" image={posterUrl} alt={movie.title} />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.slice(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
