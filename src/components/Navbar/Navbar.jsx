import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Watchlist', to: '/watchlist' },
  { label: 'Kids', to: '/kids' },
];

function Navbar({
  isDayTheme,
  onThemeToggle,
  searchQuery,
  onSearchChange,
  searchResults,
  watchlistCount,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(function observeScroll() {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return function cleanupScrollListener() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasSearchResults = searchQuery.trim().length > 0 && searchResults.length > 0;

  const renderedLinks = useMemo(function buildLinks() {
    return NAV_LINKS.map(function (link) {
      return (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.to === '/'}
            className={function ({ isActive }) {
              return `navbar__link ${isActive ? 'navbar__link--active' : ''}`;
            }}
            onClick={function handleLinkClick() {
              setMenuOpen(false);
            }}
          >
            {link.label}
            {link.label === 'Watchlist' && watchlistCount > 0 ? (
              <span className="navbar__link-badge">{watchlistCount}</span>
            ) : null}
          </NavLink>
        </li>
      );
    });
  }, [watchlistCount]);

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link className="navbar__logo" to="/" aria-label="CineBlaze home">
          <span className="navbar__logo-mark">CB</span>
          <span className="navbar__logo-text">CineBlaze</span>
        </Link>

        <ul className="navbar__links">{renderedLinks}</ul>

        <div className="navbar__actions">
          <form className="navbar__search" onSubmit={handleSearchSubmit} role="search">
            <label className="navbar__search-label" htmlFor="navbar-search-input">
              Search movies
            </label>
            <input
              id="navbar-search-input"
              className="navbar__search-input"
              type="search"
              value={searchQuery}
              onChange={function handleSearchChange(event) {
                onSearchChange(event.target.value);
              }}
              placeholder="Search movies, genres, or moods"
              aria-label="Search movies"
            />
          </form>

          <button
            className="navbar__theme-toggle"
            onClick={onThemeToggle}
            aria-label={isDayTheme ? 'Switch to night theme' : 'Switch to day theme'}
            aria-pressed={isDayTheme}
            type="button"
          >
            <span className="navbar__theme-icon">{isDayTheme ? '☀' : '☾'}</span>
            <span className="navbar__theme-text">{isDayTheme ? 'Day' : 'Night'}</span>
          </button>

          <button
            className="navbar__hamburger"
            onClick={function toggleMenu() {
              setMenuOpen(function (currentOpen) {
                return !currentOpen;
              });
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {hasSearchResults ? (
        <div className="navbar__search-results" role="listbox" aria-label="Search suggestions">
          {searchResults.map(function (movie) {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="navbar__result"
                onClick={function handleResultClick() {
                  onSearchChange('');
                }}
              >
                <span className="navbar__result-image" style={{ backgroundImage: `url(${movie.thumbnail})` }} />
                <span className="navbar__result-copy">
                  <strong>{movie.title}</strong>
                  <span>{movie.genre}</span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <div className="navbar__mobile-search">
          <label className="navbar__search-label" htmlFor="navbar-mobile-search-input">
            Search movies
          </label>
          <input
            id="navbar-mobile-search-input"
            className="navbar__search-input"
            type="search"
            value={searchQuery}
            onChange={function handleMobileSearch(event) {
              onSearchChange(event.target.value);
            }}
            placeholder="Search titles, moods, or genres"
            aria-label="Search movies on mobile"
          />
        </div>

        <div className="navbar__mobile-links">{renderedLinks}</div>

        <button
          className="navbar__theme-toggle navbar__theme-toggle--mobile"
          onClick={onThemeToggle}
          aria-label={isDayTheme ? 'Switch to night theme' : 'Switch to day theme'}
          aria-pressed={isDayTheme}
          type="button"
        >
          <span className="navbar__theme-icon">{isDayTheme ? '☀' : '☾'}</span>
          <span className="navbar__theme-text">{isDayTheme ? 'Day Theme' : 'Night Theme'}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
