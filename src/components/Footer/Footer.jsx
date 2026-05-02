import React, { useState } from 'react';
import './Footer.css';

const FOOTER_COLUMNS = [
  { heading: 'Explore',  links: ['Movies', 'TV Series', 'Originals', 'Documentaries', 'Kids Zone'] },
  { heading: 'Account',  links: ['Sign In', 'Register', 'Manage Profile', 'Subscription', 'Parental Controls'] },
  { heading: 'Support',  links: ['Help Centre', 'Contact Us', 'Device Support', 'Accessibility', 'FAQs'] },
  { heading: 'Company',  links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'] },
];

const SOCIAL = [
  { label: 'X', icon: '𝕏' },
  { label: 'Instagram', icon: 'IG' },
  { label: 'YouTube', icon: 'YT' },
  { label: 'Facebook', icon: 'FB' },
];

function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(''); }
  }

  return (
    <footer className="footer">
      {/* Newsletter strip */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-copy">
            <h3 className="footer__newsletter-heading">Never miss a release</h3>
            <p className="footer__newsletter-sub">Get new arrivals and exclusive deals straight to your inbox.</p>
          </div>
          {submitted ? (
            <div className="footer__newsletter-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              You're in!
            </div>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer__newsletter-btn">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      <div className="footer__container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-mark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="footer__logo-text">CineBlaze</span>
            </div>
            <p className="footer__tagline">Stream thousands of movies and series.<br />Anywhere. Anytime.</p>

            <div className="footer__social">
              {SOCIAL.map(s => (
                <button key={s.label} className="footer__social-btn" aria-label={s.label}>
                  {s.icon}
                </button>
              ))}
            </div>

            <div className="footer__apps">
              <button className="footer__app-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </button>
              <button className="footer__app-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.32.18.69.18 1.01 0l10.09-5.83-2.1-2.1-9 7.93zM.5 1.33C.19 1.64 0 2.12 0 2.73v18.54c0 .61.19 1.09.5 1.4l.07.07 10.38-10.38v-.24L.57 1.26.5 1.33zm19.99 7.9-2.63-1.52-2.35 2.35 2.35 2.35 2.65-1.53c.75-.44.75-1.14-.02-1.65zm-16.65 9.3 10.05-5.82-2.1-2.1L3.84 18.53z"/>
                </svg>
                Play Store
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="footer__links-grid">
            {FOOTER_COLUMNS.map(col => (
              <div key={col.heading} className="footer__col">
                <h4 className="footer__col-heading">{col.heading}</h4>
                <ul className="footer__col-links">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="footer__link">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} CineBlaze. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy</a>
            <a href="#" className="footer__bottom-link">Terms</a>
            <a href="#" className="footer__bottom-link">Cookies</a>
          </div>
          <p className="footer__credit">Made with ❤️ for movie lovers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
