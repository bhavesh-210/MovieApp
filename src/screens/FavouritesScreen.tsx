import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE_BASE_URL } from '../services/movieApi';
import { Movie } from '../types';

const FavouritesScreen = ({ navigation }: any) => {
  const [favourites, setFavourites] = useState<Movie[]>([]);

  const loadFavourites = async () => {
    try {
      const data = await AsyncStorage.getItem('favourites');
      if (data) setFavourites(JSON.parse(data));
    } catch {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavourites);
    return unsubscribe;
  }, [navigation]);

  const removeFavourite = async (id: number) => {
    const updated = favourites.filter(m => m.id !== id);
    setFavourites(updated);
    await AsyncStorage.setItem('favourites', JSON.stringify(updated));
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Movies', {
          screen: 'MovieDetail',
          params: { movie: item },
        })
      }
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
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeFavourite(item.id)}
        >
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <Text style={styles.empty}>No favourites yet. Tap ❤️ on a movie!</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovie}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
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
  removeBtn: {
    marginTop: 8,
    backgroundColor: '#e50914',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  removeBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  empty: { color: '#aaa', textAlign: 'center', marginTop: 100, fontSize: 16 },
});

export default FavouritesScreen;
