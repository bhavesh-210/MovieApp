import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  AppDispatch,
  saveToStorage,
  loadFromStorage,
} from '../store';
import { loadMovies, setSearchQuery } from '../store/moviesSlice';
import { IMAGE_BASE_URL } from '../services/movieApi';
import { Movie } from '../types';

const MovieListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, page, totalPages, searchQuery } = useSelector(
    (state: RootState) => state.movies,
  );
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          dispatch(loadMovies({ page: 1, query: searchQuery }));
        }
      },
    );
    return () => subscription.remove();
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const init = async () => {
      const cached = await loadFromStorage();
      if (cached.length > 0 && !searchQuery) {
        // cached data available while fresh data loads
      }
      dispatch(loadMovies({ page: 1, query: searchQuery }));
    };
    init();
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (movies.length > 0 && !searchQuery) {
      saveToStorage(movies);
    }
  }, [movies, searchQuery]);

  const handleSearch = useCallback(() => {
    dispatch(setSearchQuery(inputValue));
  }, [inputValue, dispatch]);

  const loadMore = () => {
    if (!loading && page < totalPages) {
      dispatch(loadMovies({ page: page + 1, query: searchQuery }));
    }
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : 'https://via.placeholder.com/100x150',
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
        <Text style={styles.date}>{item.release_date}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderMovie}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#e50914" /> : null
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No movies found</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  searchBar: { flexDirection: 'row', padding: 10, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchBtn: {
    backgroundColor: '#e50914',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchBtnText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    overflow: 'hidden',
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  rating: { color: '#f5c518', marginTop: 4 },
  date: { color: '#aaa', fontSize: 12, marginTop: 2 },
  overview: { color: '#ccc', fontSize: 13, marginTop: 6 },
  error: { color: 'red', textAlign: 'center', margin: 10 },
  empty: { color: '#fff', textAlign: 'center', marginTop: 50 },
});

export default MovieListScreen;
