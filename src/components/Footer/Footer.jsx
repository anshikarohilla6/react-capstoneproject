import React from 'react';
import './Footer.css';

// ── Footer link data ─────────────────────────────────────────────────────────
var FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: ['Movies', 'TV Series', 'Originals', 'Documentaries', 'Kids Zone'],
  },
  {
    heading: 'Account',
    links: ['Sign In', 'Register', 'Manage Profile', 'Subscription', 'Parental Controls'],
  },
  {
    heading: 'Support',
    links: ['Help Centre', 'Contact Us', 'Device Support', 'Accessibility', 'FAQs'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'],
  },
];

// ── Footer Component ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Top: logo + tagline + newsletter */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">▶</span>
              <span className="footer__logo-text">CineBlaze</span>
            </div>
            <p className="footer__tagline">
              Stream thousands of movies and series.<br />
              Anywhere. Anytime.
            </p>
            <div className="footer__social">
              {['𝕏', 'IG', 'YT', 'FB'].map(function (s) {
                return (
                  <button key={s} className="footer__social-btn" aria-label={s}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__links-grid">
            {FOOTER_COLUMNS.map(function (col) {
              return (
                <div key={col.heading} className="footer__col">
                  <h4 className="footer__col-heading">{col.heading}</h4>
                  <ul className="footer__col-links">
                    {col.links.map(function (link) {
                      return (
                        <li key={link}>
                          <a href="#" className="footer__link">{link}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider"></div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} CineBlaze. All rights reserved.
          </p>
          <p className="footer__credit">
            Made with ❤️ for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
