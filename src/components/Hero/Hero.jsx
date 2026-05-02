import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const FEATURED = [
  {
    id: 1,
    title: 'Dark Horizon',
    tagline: 'Beyond the edge of space, a new war begins.',
    genre: 'Sci-Fi',
    subgenre: 'Action',
    year: '2024',
    duration: '2h 18m',
    rating: '8.4',
    badge: 'CineBlaze Original',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop',
  },
  {
    id: 2,
    title: 'The Last Signal',
    tagline: 'Some stories can only end one way.',
    genre: 'Drama',
    subgenre: 'Thriller',
    year: '2024',
    duration: '1h 48m',
    rating: '8.6',
    badge: 'Award Winner',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&h=700&fit=crop',
  },
  {
    id: 3,
    title: 'Neon Abyss',
    tagline: 'In the city of lights, darkness rules.',
    genre: 'Noir',
    subgenre: 'Crime',
    year: '2024',
    duration: '1h 54m',
    rating: '7.9',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1400&h=700&fit=crop',
  },
];

function StarRating({ rating }) {
  const stars = Math.round(parseFloat(rating) / 2);
  return (
    <div className="hero__stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`hero__star ${i <= stars ? 'hero__star--filled' : ''}`}>★</span>
      ))}
      <span className="hero__rating-num">{rating}/10</span>
    </div>
  );
}

function Hero() {
  const [current, setCurrent]   = useState(0);
  const [visible, setVisible]   = useState(true);
  const [paused, setPaused]     = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000;

  const goTo = useCallback((index) => {
    setVisible(false);
    setProgress(0);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 350);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const tick = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goTo((current + 1) % FEATURED.length);
          return 0;
        }
        return p + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);
    return () => clearInterval(tick);
  }, [paused, current, goTo]);

  const movie = FEATURED[current];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backgrounds for each slide (pre-loaded) */}
      {FEATURED.map((m, i) => (
        <div
          key={m.id}
          className={`hero__bg ${i === current ? 'hero__bg--active' : ''}`}
          style={{ backgroundImage: `url(${m.image})` }}
        />
      ))}

      <div className="hero__overlay" />
      <div className="hero__overlay-bottom" />
      <div className="hero__overlay-side" />

      {/* Content */}
      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          {movie.badge}
        </div>

        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__tagline">{movie.tagline}</p>

        <div className="hero__meta">
          <span className="hero__genre-pill">{movie.genre}</span>
          <span className="hero__genre-pill hero__genre-pill--outline">{movie.subgenre}</span>
          <span className="hero__meta-sep">·</span>
          <span className="hero__year">{movie.year}</span>
          <span className="hero__meta-sep">·</span>
          <span className="hero__duration">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {movie.duration}
          </span>
        </div>

        <StarRating rating={movie.rating} />

        <div className="hero__buttons">
          <button className="hero__btn hero__btn--play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play Now
          </button>
          <button className="hero__btn hero__btn--info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            More Info
          </button>
          <button className="hero__btn hero__btn--watchlist" aria-label="Add to watchlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Watchlist
          </button>
        </div>
      </div>

      {/* Slide indicators with progress bars */}
      <div className="hero__indicators">
        {FEATURED.map((m, i) => (
          <button
            key={m.id}
            className={`hero__indicator ${i === current ? 'hero__indicator--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <span className="hero__indicator-label">{m.title}</span>
            <div className="hero__indicator-bar">
              <div
                className="hero__indicator-fill"
                style={{ width: i === current ? `${progress}%` : i < current ? '100%' : '0%' }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Mute / volume hint */}
      <button className="hero__mute-btn" aria-label="Toggle sound">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      </button>
    </section>
  );
}

export default Hero;
