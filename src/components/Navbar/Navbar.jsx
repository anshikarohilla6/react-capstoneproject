import React, { useState, useEffect } from 'react';
import './Navbar.css';

// ── Navigation links data ───────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'Movies', 'Series', 'Originals', 'My List'];

// ── Navbar Component ────────────────────────────────────────────────────────
function Navbar() {
  // Track scroll position to add solid background when scrolled
  const [scrolled, setScrolled]     = useState(false);
  // Toggle mobile menu open/close
  const [menuOpen, setMenuOpen]     = useState(false);
  // Currently active nav link
  const [activeLink, setActiveLink] = useState('Home');

  // Listen for scroll events
  useEffect(function () {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    // Cleanup listener on component unmount
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when a link is clicked
  function handleLinkClick(link) {
    setActiveLink(link);
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">

        {/* ── Logo ── */}
        <div className="navbar__logo">
          <span className="navbar__logo-icon">▶</span>
          <span className="navbar__logo-text">CineBlaze</span>
        </div>

        {/* ── Desktop Navigation Links ── */}
        <ul className="navbar__links">
          {NAV_LINKS.map(function (link) {
            return (
              <li key={link}>
                <a
                  href="#"
                  className={`navbar__link ${activeLink === link ? 'navbar__link--active' : ''}`}
                  onClick={function (e) {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right Actions ── */}
        <div className="navbar__actions">
          <button className="navbar__search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="navbar__btn navbar__btn--sign-in">Sign In</button>
          <button className="navbar__btn navbar__btn--subscribe">Subscribe</button>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={function () { setMenuOpen(!menuOpen); }}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map(function (link) {
          return (
            <a
              key={link}
              href="#"
              className={`navbar__mobile-link ${activeLink === link ? 'navbar__mobile-link--active' : ''}`}
              onClick={function (e) {
                e.preventDefault();
                handleLinkClick(link);
              }}
            >
              {link}
            </a>
          );
        })}
        <div className="navbar__mobile-actions">
          <button className="navbar__btn navbar__btn--sign-in">Sign In</button>
          <button className="navbar__btn navbar__btn--subscribe">Subscribe</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
