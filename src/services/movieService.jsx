
import axios from 'axios';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

console.log("API KEY", API_KEY);
console.log("BASE URL", BASE_URL);



const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchPopularMovies = async ({page = 1 }) => {
  const response = await api.get('/movie/popular', {
    params: {
      page,
    },
  });
  console.log("Fetched popular movies for page:", page);
  return response.data;
};
export const fetchOtherMovies = async ({page =1}) => {
  const response = await api.get('/movie/now_playing', {
    params:{
      page,
    },
  })
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,reviews',
    },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};
