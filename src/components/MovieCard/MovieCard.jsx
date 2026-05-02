import React, { useState } from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  const [hovered, setHovered]       = useState(false);
  const [liked, setLiked]           = useState(false);
  const [inWatchlist, setWatchlist] = useState(false);

  return (
    <div
      className={`movie-card ${hovered ? 'movie-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="movie-card__thumb">
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          className="movie-card__img"
        />

        {/* Hover overlay */}
        <div className="movie-card__overlay">
          <button className="movie-card__play-btn" aria-label="Play">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>

          <div className="movie-card__actions">
            <button
              className={`movie-card__action-btn ${inWatchlist ? 'movie-card__action-btn--active' : ''}`}
              title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              onClick={e => { e.stopPropagation(); setWatchlist(!inWatchlist); }}
            >
              {inWatchlist ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>

            <button
              className={`movie-card__action-btn ${liked ? 'movie-card__action-btn--liked' : ''}`}
              title="Like"
              onClick={e => { e.stopPropagation(); setLiked(!liked); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button className="movie-card__action-btn" title="More info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Rating badge */}
        <div className="movie-card__rating">★ {movie.rating}</div>

        {/* Duration pill */}
        <div className="movie-card__duration-badge">{movie.duration}</div>
      </div>

      {/* Info */}
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__genre">{movie.genre}</span>
          <span className="movie-card__dot">·</span>
          <span className="movie-card__year">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
