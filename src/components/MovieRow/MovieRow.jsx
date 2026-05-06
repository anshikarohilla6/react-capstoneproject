import { memo, useEffect, useRef, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { MovieRowSkeleton } from '../Skeletons/Skeletons';
import './MovieRow.css';

function MovieRow({ title, eyebrow, movies = [], loading = false }) {
  const rowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(function observeActiveCard() {
    const container = rowRef.current;

    if (!container || loading || movies.length === 0) {
      return undefined;
    }

    const cards = Array.from(container.querySelectorAll('[data-row-card]'));

    if (cards.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      function handleIntersections(entries) {
        const visibleEntries = entries.filter(function (entry) {
          return entry.isIntersecting;
        });

        if (visibleEntries.length === 0) {
          return;
        }

        const nextVisibleEntry = visibleEntries.sort(function (left, right) {
          return right.intersectionRatio - left.intersectionRatio;
        })[0];

        const nextIndex = Number(nextVisibleEntry.target.getAttribute('data-index'));
        setActiveIndex(nextIndex);
      },
      {
        root: container,
        rootMargin: '0px -42% 0px -42%',
        threshold: [0.3, 0.45, 0.6, 0.75],
      }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });

    return function cleanupObserver() {
      observer.disconnect();
    };
  }, [loading, movies]);

  function scrollRow(direction) {
    if (!rowRef.current) {
      return;
    }

    rowRef.current.scrollBy({
      left: direction === 'next' ? 680 : -680,
      behavior: 'smooth',
    });
  }

  if (loading) {
    return <MovieRowSkeleton />;
  }

  if (movies.length === 0) {
    return (
      <section className="movie-row movie-row--empty">
        <div className="movie-row__header">
          <div>
            {eyebrow ? <p className="movie-row__eyebrow">{eyebrow}</p> : null}
            <h2 className="movie-row__title">{title}</h2>
          </div>
        </div>
        <div className="movie-row__empty-state">
          <h3>No titles available</h3>
          <p>Try a different search or browse another collection.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <div>
          {eyebrow ? <p className="movie-row__eyebrow">{eyebrow}</p> : null}
          <h2 className="movie-row__title">{title}</h2>
        </div>

        <button className="movie-row__see-all" type="button">
          See all
        </button>
      </div>

      <div className="movie-row__wrapper">
        <button
          className="movie-row__arrow movie-row__arrow--left"
          onClick={function handleScrollLeft() {
            scrollRow('previous');
          }}
          type="button"
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>

        <div className="movie-row__cards" ref={rowRef}>
          {movies.map(function (movie, index) {
            const distance = Math.abs(index - activeIndex);
            const isBeforeActive = index < activeIndex;
            let depthState = 'far';
            let side = isBeforeActive ? 'left' : 'right';

            if (distance === 0) {
              depthState = 'center';
            } else if (distance === 1) {
              depthState = 'near';
            }

            return (
              <div key={movie.id} className="movie-row__card-shell" data-row-card="true" data-index={index}>
                <MovieCard movie={movie} depthState={depthState} side={side} layout="row" />
              </div>
            );
          })}
        </div>

        <button
          className="movie-row__arrow movie-row__arrow--right"
          onClick={function handleScrollRight() {
            scrollRow('next');
          }}
          type="button"
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default memo(MovieRow);
