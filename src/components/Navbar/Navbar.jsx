import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',      icon: '⌂' },
  { label: 'Movies',    icon: '🎬' },
  { label: 'Series',    icon: '📺' },
  { label: 'Originals', icon: '✦' },
  { label: 'My List',   icon: '♡' },
];

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeLink, setActiveLink]   = useState('Home');
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchVal, setSearchVal]     = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleLinkClick(link) {
    setActiveLink(link);
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">

        {/* Logo */}
        <div className="navbar__logo">
          <div className="navbar__logo-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <span className="navbar__logo-text">CineBlaze</span>
        </div>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ label }) => (
            <li key={label}>
              <a
                href="#"
                className={`navbar__link ${activeLink === label ? 'navbar__link--active' : ''}`}
                onClick={e => { e.preventDefault(); handleLinkClick(label); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Inline search */}
          <div className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}>
            <input
              className="navbar__search-input"
              type="text"
              placeholder="Search titles…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <button
              className="navbar__search-btn"
              aria-label="Search"
              onClick={() => { setSearchOpen(!searchOpen); setSearchVal(''); }}
            >
              {searchOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )}
            </button>
          </div>

          {/* Notification bell */}
          <button className="navbar__icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="navbar__notif-dot"></span>
          </button>

          <button className="navbar__btn navbar__btn--sign-in">Sign In</button>
          <button className="navbar__btn navbar__btn--subscribe">
            <span>Subscribe</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <div className="navbar__mobile-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search…" className="navbar__mobile-search-input" />
        </div>
        {NAV_LINKS.map(({ label, icon }) => (
          <a
            key={label}
            href="#"
            className={`navbar__mobile-link ${activeLink === label ? 'navbar__mobile-link--active' : ''}`}
            onClick={e => { e.preventDefault(); handleLinkClick(label); }}
          >
            <span className="navbar__mobile-link-icon">{icon}</span>
            {label}
          </a>
        ))}
        <div className="navbar__mobile-actions">
          <button className="navbar__btn navbar__btn--sign-in">Sign In</button>
          <button className="navbar__btn navbar__btn--subscribe">Subscribe</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
