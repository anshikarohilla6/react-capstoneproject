import React, { useRef, useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ title, movies, badge }) {
  const rowRef   = useRef(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  function checkScroll() {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  function scroll(dir) {
    rowRef.current?.scrollBy({ left: dir === 'right' ? 720 : -720, behavior: 'smooth' });
  }

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <div className="movie-row__title-group">
          {badge && <span className="movie-row__badge">{badge}</span>}
          <h2 className="movie-row__title">{title}</h2>
        </div>
        <button className="movie-row__see-all">
          View all
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div className="movie-row__wrapper">
        {canLeft && (
          <button
            className="movie-row__arrow movie-row__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        <div className="movie-row__cards" ref={rowRef}>
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {canRight && (
          <button
            className="movie-row__arrow movie-row__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieRow;
