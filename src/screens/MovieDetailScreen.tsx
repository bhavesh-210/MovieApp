import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useCallback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE_BASE_URL } from '../services/movieApi';
import { Movie } from '../types';

const MovieDetailScreen = ({ route, navigation }: any) => {
  const movie: Movie = route.params.movie;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    checkFavourite();
  }, []);

  const checkFavourite = async () => {
    const checkFavourite = useCallback(async () => {
      const data = await AsyncStorage.getItem('favourites');
      if (data) {
        const favs: Movie[] = JSON.parse(data);
        setIsFavourite(favs.some(m => m.id === movie.id));
      }
    } catch (e) {}
  };

  const toggleFavourite = async () => {
    try {
      const data = await AsyncStorage.getItem('favourites');
    }, [checkFavourite]);
      if (isFavourite) {
        favs = favs.filter(m => m.id !== movie.id);
      } else {
        favs.push(movie);
      }
      await AsyncStorage.setItem('favourites', JSON.stringify(favs));
      setIsFavourite(!isFavourite);
    } catch (e) {}
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/400x600',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>
            ⭐ {movie.vote_average.toFixed(1)}/10
          </Text>
          <Text style={styles.date}>{movie.release_date}</Text>
        </View>
        <TouchableOpacity style={styles.favBtn} onPress={toggleFavourite}>
          <Text style={styles.favBtnText}>
            {isFavourite ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>← Back to Movies</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  poster: { width: '100%', height: 400 },
  content: { padding: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rating: { color: '#f5c518', fontSize: 16 },
  date: { color: '#aaa', fontSize: 16 },
  favBtn: {
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e50914',
  },
  favBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  sectionTitle: {
    color: '#e50914',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: { color: '#ccc', fontSize: 15, lineHeight: 24 },
  backBtn: {
    marginTop: 24,
    backgroundColor: '#e50914',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default MovieDetailScreen;
