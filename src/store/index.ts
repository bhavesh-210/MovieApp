import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export const saveToStorage = async (movies: any[]) => {
  try {
    await AsyncStorage.setItem('cached_movies', JSON.stringify(movies));
  } catch {
  }
};

export const loadFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('cached_movies');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
