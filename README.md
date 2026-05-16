# 🎬 MovieApp

A React Native mobile app (Android) to browse, search, and save favourite movies using the TMDB API.

## 📱 App Functionality

- **Movies Screen** - Browse popular movies loaded from TMDB API with infinite scroll
- **Movie Detail Screen** - View full details of a movie with option to add/remove from favourites
- **Favourites Screen** - View and manage saved favourite movies (persisted locally)
- Search movies by title
- Pagination / infinite scroll
- Local data persistence using AsyncStorage
- App lifecycle handling (refreshes on app resume)

## 🚀 How to Run

### Prerequisites
- Node.js
- Android Studio + Android SDK
- Java 17

### Steps

```bash
# Clone the repo
git clone https://github.com/bhavesh-210/MovieApp.git
cd MovieApp

# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android (in a new terminal)
npx react-native run-android
```

## ⚙️ Key Technical Decisions

- **Redux Toolkit** - Used createSlice and createAsyncThunk for clean, predictable state management
- **React Navigation** - Stack navigator for Movies/Detail flow, Bottom Tab navigator for main navigation
- **AsyncStorage** - Used for persisting favourite movies and caching popular movies list
- **No third-party UI libraries** - All UI built with core React Native components only
- **TypeScript** - Strict typing across all components, slices, and services
- **AppState API** - Detects when app comes to foreground and refreshes movie list
- **TMDB API** - Free, well-documented REST API with large movie dataset

## 🔧 Improvements With More Time

- iOS support (CocoaPods setup pending)
- Unit tests with Jest
- Movie genres filter
- Offline mode with better cache strategy
- Skeleton loading screens
- Movie trailers via YouTube API
- Better error handling with retry logic