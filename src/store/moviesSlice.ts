import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState } from '../types';
import { fetchPopularMovies, searchMovies } from '../services/movieApi';

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async ({ page, query }: { page: number; query: string }) => {
    const data = query
      ? await searchMovies(query, page)
      : await fetchPopularMovies(page);
    return { results: data.results, totalPages: data.total_pages, page };
  },
);

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  searchQuery: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.movies = [];
      state.page = 1;
    },
    resetMovies: state => {
      state.movies = [];
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.movies = action.payload.results;
        } else {
          state.movies = [...state.movies, ...action.payload.results];
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
