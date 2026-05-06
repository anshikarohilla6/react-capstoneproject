/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readStoredValue, writeStoredValue } from '../utils/storage';

const WATCHLIST_STORAGE_KEY = 'cineblaze-watchlist';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(function initializeWatchlist() {
    const storedWatchlist = readStoredValue(WATCHLIST_STORAGE_KEY, []);
    return Array.isArray(storedWatchlist) ? storedWatchlist : [];
  });

  useEffect(function persistWatchlist() {
    writeStoredValue(WATCHLIST_STORAGE_KEY, watchlist);
  }, [watchlist]);

  const addMovie = useCallback(function addMovie(movie) {
    if (!movie) {
      return;
    }

    setWatchlist(function updateWatchlist(currentWatchlist) {
      const alreadySaved = currentWatchlist.some(function (savedMovie) {
        return String(savedMovie.id) === String(movie.id);
      });

      if (alreadySaved) {
        return currentWatchlist;
      }

      return [movie, ...currentWatchlist];
    });
  }, []);

  const removeMovie = useCallback(function removeMovie(movieId) {
    setWatchlist(function updateWatchlist(currentWatchlist) {
      return currentWatchlist.filter(function (savedMovie) {
        return String(savedMovie.id) !== String(movieId);
      });
    });
  }, []);

  const clearWatchlist = useCallback(function clearWatchlist() {
    setWatchlist([]);
  }, []);

  const isInWatchlist = useCallback(function isInWatchlist(movieId) {
    return watchlist.some(function (savedMovie) {
      return String(savedMovie.id) === String(movieId);
    });
  }, [watchlist]);

  const contextValue = useMemo(function buildContextValue() {
    return {
      watchlist,
      watchlistCount: watchlist.length,
      addMovie,
      removeMovie,
      clearWatchlist,
      isInWatchlist,
    };
  }, [addMovie, clearWatchlist, isInWatchlist, removeMovie, watchlist]);

  return (
    <WatchlistContext.Provider value={contextValue}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const contextValue = useContext(WatchlistContext);

  if (!contextValue) {
    throw new Error('useWatchlist must be used inside a WatchlistProvider');
  }

  return contextValue;
}