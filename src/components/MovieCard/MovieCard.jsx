import React, { useState } from 'react';
import './MovieCard.css';

// ── MovieCard Component ─────────────────────────────────────────────────────
// Shows a single movie thumbnail with hover overlay and action buttons.
function MovieCard({ movie }) {
  // Track whether this card is being hovered
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`movie-card ${hovered ? 'movie-card--hovered' : ''}`}
      onMouseEnter={function () { setHovered(true); }}
      onMouseLeave={function () { setHovered(false); }}
    >
      {/* Thumbnail image */}
      <div className="movie-card__thumb">
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          className="movie-card__img"
        />

        {/* Hover Overlay */}
        <div className="movie-card__overlay">
          {/* Play button in the centre */}
          <button className="movie-card__play-btn" aria-label="Play">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>

          {/* Bottom action row */}
          <div className="movie-card__actions">
            <button className="movie-card__action-btn" title="Add to watchlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button className="movie-card__action-btn" title="Like">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button className="movie-card__action-btn" title="More info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rating badge always visible */}
        <div className="movie-card__rating">⭐ {movie.rating}</div>
      </div>

      {/* Card info below thumbnail */}
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__genre">{movie.genre}</span>
          <span className="movie-card__dot">·</span>
          <span className="movie-card__year">{movie.year}</span>
          <span className="movie-card__dot">·</span>
          <span className="movie-card__duration">{movie.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
