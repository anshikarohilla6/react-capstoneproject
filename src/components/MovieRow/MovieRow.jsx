import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

// ── MovieRow Component ──────────────────────────────────────────────────────
// A horizontally scrollable row of MovieCards with arrow navigation.
function MovieRow({ title, movies }) {
  // Reference to the scrollable container
  var rowRef = useRef(null);

  // Scroll the row left or right by a set amount
  function scroll(direction) {
    var amount = 700;
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      });
    }
  }

  return (
    <section className="movie-row">
      {/* Row header */}
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
        <button className="movie-row__see-all">See All →</button>
      </div>

      {/* Scrollable wrapper with gradient fade on edges */}
      <div className="movie-row__wrapper">
        {/* Left scroll arrow */}
        <button
          className="movie-row__arrow movie-row__arrow--left"
          onClick={function () { scroll('left'); }}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Cards container */}
        <div className="movie-row__cards" ref={rowRef}>
          {movies.map(function (movie) {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>

        {/* Right scroll arrow */}
        <button
          className="movie-row__arrow movie-row__arrow--right"
          onClick={function () { scroll('right'); }}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
