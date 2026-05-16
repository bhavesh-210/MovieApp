import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { store } from './src/store';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MoviesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#141414' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="MovieList"
      component={MovieListScreen}
      options={{ title: '🎬 Movies' }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={{ title: 'Movie Detail' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#141414', borderTopColor: '#333' },
            tabBarActiveTintColor: '#e50914',
            tabBarInactiveTintColor: '#aaa',
          }}
        >
          <Tab.Screen
            name="Movies"
            component={MoviesStack}
            options={{
              tabBarLabel: 'Movies',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>🎬</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Favourites"
            component={FavouritesScreen}
            options={{
              tabBarLabel: 'Favourites',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>❤️</Text>
              ),
              headerShown: true,
              headerStyle: { backgroundColor: '#141414' },
              headerTintColor: '#fff',
              headerTitle: '❤️ Favourites',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
