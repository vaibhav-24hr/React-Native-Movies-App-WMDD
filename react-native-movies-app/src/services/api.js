import axios from 'axios';

// Using Expo's default .env support (requires EXPO_PUBLIC_ prefix)
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getMovies = async (category) => {
  // category: 'now_playing', 'popular', 'top_rated', 'upcoming'
  try {
    const response = await api.get(`/movie/${category}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies (${category}):`, error);
    throw error;
  }
};

export const getTVShows = async (category) => {
  // category: 'airing_today', 'on_the_air', 'popular', 'top_rated'
  try {
    const response = await api.get(`/tv/${category}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching TV shows (${category}):`, error);
    throw error;
  }
};

export const searchMedia = async (query, type) => {
  // type: 'movie', 'multi', 'tv'
  try {
    const response = await api.get(`/search/${type}`, {
      params: {
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error searching ${type}:`, error);
    throw error;
  }
};

export const getDetails = async (type, id) => {
  // type: 'movie' or 'tv'
  try {
    const response = await api.get(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${type}/${id}:`, error);
    throw error;
  }
};

export default api;
