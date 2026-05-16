const API_KEY = '26d9d32b008deb9437df140dbdf2e53f';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchPopularMovies = async (page: number): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  );
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const searchMovies = async (
  query: string,
  page: number,
): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}&page=${page}`,
  );
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
};
