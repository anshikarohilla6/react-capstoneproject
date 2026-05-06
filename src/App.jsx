import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/Layout/SiteLayout';
import { AppSkeleton } from './components/Skeletons/Skeletons';
import { WatchlistProvider } from './context/WatchlistContext';
import {
  allMovies,
  featuredMovies,
  filterMovies,
  homeRows,
  kidsFeaturedMovies,
  kidsRows,
} from './data/movies';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const WatchlistPage = lazy(() => import('./pages/WatchlistPage'));
const KidsPage = lazy(() => import('./pages/KidsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function readThemePreference() {
  if (typeof window === 'undefined') {
    return 'night';
  }

  return window.localStorage.getItem('cineblaze-theme') || 'night';
}

function App() {
  const [theme, setTheme] = useState(readThemePreference);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const isDayTheme = theme === 'day';

  useEffect(function persistTheme() {
    window.localStorage.setItem('cineblaze-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(function updateTheme(currentTheme) {
      return currentTheme === 'night' ? 'day' : 'night';
    });
  }

  const searchResults = useMemo(function buildSearchResults() {
    return filterMovies(debouncedSearchQuery, allMovies).slice(0, 8);
  }, [debouncedSearchQuery]);

  return (
    <WatchlistProvider>
      <Suspense fallback={<AppSkeleton />}>
        <Routes>
          <Route
            element={(
              <SiteLayout
                theme={theme}
                isDayTheme={isDayTheme}
                onThemeToggle={toggleTheme}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchResults={searchResults}
              />
            )}
          >
            <Route
              path="/"
              element={(
                <HomePage
                  featuredMovies={featuredMovies}
                  rows={homeRows}
                  searchQuery={debouncedSearchQuery}
                  loading={false}
                />
              )}
            />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route
              path="/kids"
              element={(
                <KidsPage
                  featuredMovies={kidsFeaturedMovies}
                  rows={kidsRows}
                />
              )}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/old-home" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </WatchlistProvider>
  );
}

export default App;
