import React, { useState, useEffect } from 'react';
import './Hero.css';

// ── Featured movies for the hero banner ─────────────────────────────────────
const FEATURED = [
  {
    id: 1,
    title: 'Dark Horizon',
    tagline: 'Beyond the edge of space, a new war begins.',
    genre: 'Sci-Fi • Action • 2024',
    rating: '8.4',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop',
  },
  {
    id: 2,
    title: 'The Last Signal',
    tagline: 'Some stories can only end one way.',
    genre: 'Drama • Thriller • 2024',
    rating: '8.6',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&h=700&fit=crop',
  },
  {
    id: 3,
    title: 'Neon Abyss',
    tagline: 'In the city of lights, darkness rules.',
    genre: 'Noir • Crime • 2024',
    rating: '7.9',
    image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1400&h=700&fit=crop',
  },
];

// ── Hero Component ──────────────────────────────────────────────────────────
function Hero() {
  // Index of the currently displayed slide
  const [currentIndex, setCurrentIndex] = useState(0);
  // Whether the slide text is visible (for fade animation)
  const [visible, setVisible]           = useState(true);

  // Auto-rotate slides every 5 seconds
  useEffect(function () {
    var timer = setInterval(function () {
      changeSlide((currentIndex + 1) % FEATURED.length);
    }, 5000);
    return function () { clearInterval(timer); };
  }, [currentIndex]);

  // Fade out → swap → fade in
  function changeSlide(index) {
    setVisible(false);
    setTimeout(function () {
      setCurrentIndex(index);
      setVisible(true);
    }, 300);
  }

  var movie = FEATURED[currentIndex];

  return (
    <section className="hero">
      {/* Background image */}
      <div
        className="hero__bg"
        style={{ backgroundImage: 'url(' + movie.image + ')' }}
      ></div>

      {/* Dark overlay gradients */}
      <div className="hero__overlay"></div>
      <div className="hero__overlay-bottom"></div>
      <div className="hero__overlay-side"></div>

      {/* Content */}
      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>
        <div className="hero__badge">▶ Now Streaming</div>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__tagline">{movie.tagline}</p>
        <div className="hero__meta">
          <span className="hero__genre">{movie.genre}</span>
          <span className="hero__rating">⭐ {movie.rating}</span>
        </div>

        {/* Action buttons */}
        <div className="hero__buttons">
          <button className="hero__btn hero__btn--play">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play Now
          </button>
          <button className="hero__btn hero__btn--info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </button>
          <button className="hero__btn hero__btn--watchlist">+ Watchlist</button>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="hero__dots">
        {FEATURED.map(function (_, i) {
          return (
            <button
              key={i}
              className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
              onClick={function () { changeSlide(i); }}
              aria-label={'Slide ' + (i + 1)}
            ></button>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
