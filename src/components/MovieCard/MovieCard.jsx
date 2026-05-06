import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import { readStoredValue, writeStoredValue } from '../../utils/storage';
import './MovieCard.css';

function MovieCard({ movie, layout = 'row', depthState = 'far', side = 'right', showRemoveAction = false }) {
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const [liked, setLiked] = useState(function initializeLikedState() {
    return Boolean(readStoredValue(`cineblaze-liked-${movie.id}`, false));
  });
  const [likePulse, setLikePulse] = useState(false);
  const pulseTimeoutRef = useRef(null);
  const isSaved = isInWatchlist(movie.id);

  useEffect(function persistLikedState() {
    writeStoredValue(`cineblaze-liked-${movie.id}`, liked);
  }, [liked, movie.id]);

  function handleLikeToggle() {
    setLiked(function toggleLike(previousLiked) {
      return !previousLiked;
    });

    setLikePulse(true);
    if (pulseTimeoutRef.current) {
      window.clearTimeout(pulseTimeoutRef.current);
    }

    pulseTimeoutRef.current = window.setTimeout(function clearPulse() {
      setLikePulse(false);
    }, 180);
  }

  useEffect(function cleanupPulseTimer() {
    return function cleanup() {
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, []);

  function handleWatchlistToggle() {
    if (showRemoveAction || isSaved) {
      removeMovie(movie.id);
      return;
    }

    addMovie(movie);
  }

  function getWatchlistLabel() {
    if (showRemoveAction) {
      return `Remove ${movie.title} from watchlist`;
    }

    if (isSaved) {
      return `${movie.title} is already in your watchlist`;
    }

    return `Add ${movie.title} to watchlist`;
  }

  return (
    <article
      className={[
        'movie-card',
        `movie-card--${layout}`,
        `movie-card--${depthState}`,
        `movie-card--${side}`,
        liked ? 'movie-card--liked' : '',
        isSaved ? 'movie-card--saved' : '',
        likePulse ? 'movie-card--pulse' : '',
      ].join(' ')}
    >
      <Link className="movie-card__media" to={`/movie/${movie.id}`} aria-label={`Open ${movie.title} details`}>
        <img src={movie.thumbnail} alt={movie.title} loading="lazy" className="movie-card__img" />
        <div className="movie-card__glow" />
        <span className="movie-card__rating">⭐ {movie.rating.toFixed(1)}</span>
        <span className="movie-card__genre-badge">{movie.genre}</span>
      </Link>

      <div className="movie-card__info">
        <div className="movie-card__info-top">
          <Link className="movie-card__title" to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
          <p className="movie-card__description">{movie.description}</p>
        </div>

        <div className="movie-card__meta">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>

        <div className="movie-card__actions">
          <button
            className={`movie-card__action movie-card__action--like ${liked ? 'movie-card__action--active' : ''}`}
            onClick={handleLikeToggle}
            aria-label={liked ? `Unlike ${movie.title}` : `Like ${movie.title}`}
            aria-pressed={liked}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.3">
              <path d="M12 21.1l-1.4-1.3C5 15 2 12.3 2 8.9 2 6.2 4.2 4 6.9 4c1.5 0 3 .7 4 1.9C12 4.7 13.5 4 15 4 17.8 4 20 6.2 20 8.9c0 3.4-3 6.1-8.6 10.9L12 21.1z" />
            </svg>
          </button>

          <button
            className={`movie-card__action movie-card__action--watchlist ${isSaved ? 'movie-card__action--active' : ''}`}
            onClick={handleWatchlistToggle}
            aria-label={getWatchlistLabel()}
            aria-pressed={isSaved}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" />
            </svg>
          </button>

          <Link className="movie-card__action movie-card__action--details" to={`/movie/${movie.id}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default memo(MovieCard);
