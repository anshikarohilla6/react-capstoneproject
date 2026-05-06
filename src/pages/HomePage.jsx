import { useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero/Hero';
import MovieRow from '../components/MovieRow/MovieRow';
import { filterMovies } from '../data/movies';

function HomePage({ featuredMovies, rows, searchQuery, loading = false }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(function revealContent() {
    const timerId = window.setTimeout(function markReady() {
      setIsReady(true);
    }, 320);

    return function cleanupTimer() {
      window.clearTimeout(timerId);
    };
  }, []);

  const searchResults = useMemo(function buildSearchResults() {
    if (!searchQuery.trim()) {
      return [];
    }

    return filterMovies(searchQuery).slice(0, 12);
  }, [searchQuery]);

  const visibleRows = useMemo(function buildVisibleRows() {
    if (!searchQuery.trim()) {
      return rows;
    }

    return rows
      .map(function (row) {
        return {
          ...row,
          movies: filterMovies(searchQuery, row.movies),
        };
      })
      .filter(function (row) {
        return row.movies.length > 0;
      });
  }, [rows, searchQuery]);

  const showSkeletons = loading || !isReady;

  return (
    <>
      <Hero slides={featuredMovies} loading={showSkeletons} />

      {searchQuery.trim() ? (
        <section className="home-page__search-panel">
          <div className="home-page__search-header">
            <div>
              <p className="home-page__eyebrow">Search</p>
              <h2 className="home-page__title">Results for “{searchQuery}”</h2>
            </div>
            <p className="home-page__summary">
              {searchResults.length} title{searchResults.length === 1 ? '' : 's'} found
            </p>
          </div>

          {searchResults.length > 0 ? (
            <MovieRow title="Search Matches" movies={searchResults} />
          ) : (
            <div className="home-page__empty-state">
              <h3>No results found</h3>
              <p>Try another title, genre, or description keyword.</p>
            </div>
          )}
        </section>
      ) : null}

      {visibleRows.map(function (row) {
        return (
          <MovieRow
            key={row.id}
            title={row.title}
            eyebrow={`${row.emoji} ${row.label}`}
            movies={row.movies}
            loading={showSkeletons}
          />
        );
      })}
    </>
  );
}

export default HomePage;