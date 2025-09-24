import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card
      sx={{
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        justifyContent: 'space-between',
      }}
    >
      <Link to={`/movie/${id}`}>
        <CardMedia
          component="img"
          height="350"
          image={imageUrl}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {release_date?.substring(0, 4) || 'Unknown year'}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <Rating
            name="read-only"
            value={vote_average / 2}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {vote_average?.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
