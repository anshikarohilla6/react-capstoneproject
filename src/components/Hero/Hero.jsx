import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSkeleton } from '../Skeletons/Skeletons';
import { useWatchlist } from '../../context/WatchlistContext';
import './Hero.css';

function Hero({ slides = [], loading = false, tone = 'default' }) {
  const { addMovie, isInWatchlist } = useWatchlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  useEffect(function cycleSlides() {
    if (slides.length <= 1) {
      return undefined;
    }

    intervalRef.current = window.setInterval(function advanceSlide() {
      setIsTransitioning(true);
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = window.setTimeout(function commitSlide() {
        setCurrentIndex(function updateIndex(previousIndex) {
          return (previousIndex + 1) % slides.length;
        });
        setIsTransitioning(false);
      }, 180);
    }, 6500);

    return function cleanupTimer() {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [slides.length]);

  const activeSlide = useMemo(function resolveActiveSlide() {
    return slides[currentIndex] || slides[0];
  }, [currentIndex, slides]);

  function changeSlide(nextIndex) {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(function finishTransition() {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 180);
  }

  if (loading) {
    return <HeroSkeleton />;
  }

  if (!activeSlide) {
    return null;
  }

  const saved = isInWatchlist(activeSlide.id);

  function handleWatchlistToggle() {
    if (!saved) {
      addMovie(activeSlide);
    }
  }

  return (
    <section className={`hero hero--${tone}`}>
      <div
        className="hero__backdrop"
        style={{ backgroundImage: `url(${activeSlide.thumbnail})` }}
      />
      <div className="hero__veil" />

      <div className={`hero__panel ${isTransitioning ? 'hero__panel--transitioning' : ''}`}>
        <span className="hero__eyebrow">CineBlaze original spotlight</span>
        <h1 className="hero__title">{activeSlide.title}</h1>
        <p className="hero__description">{activeSlide.description}</p>

        <div className="hero__meta">
          <span className="hero__pill">{activeSlide.genre}</span>
          <span className="hero__pill">{activeSlide.year}</span>
          <span className="hero__pill">{activeSlide.duration}</span>
          <span className="hero__pill hero__pill--accent">⭐ {activeSlide.rating.toFixed(1)}</span>
        </div>

        <div className="hero__actions">
          <Link className="hero__button hero__button--primary" to={`/movie/${activeSlide.id}`}>
            View details
          </Link>
          <button className="hero__button hero__button--secondary" type="button" onClick={handleWatchlistToggle}>
            {saved ? 'Saved' : 'Add to watchlist'}
          </button>
          <Link className="hero__button hero__button--ghost" to="/watchlist">
            Open watchlist
          </Link>
        </div>
      </div>

      <div className="hero__controls" aria-label="Featured slides">
        {slides.map(function (slide, index) {
          return (
            <button
              key={slide.id}
              className={`hero__dot ${index === currentIndex ? 'hero__dot--active' : ''}`}
              onClick={function handleSlideClick() {
                changeSlide(index);
              }}
              type="button"
              aria-label={`Show featured title ${index + 1}: ${slide.title}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default memo(Hero);
