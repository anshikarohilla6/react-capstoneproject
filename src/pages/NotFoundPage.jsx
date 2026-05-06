import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="details-page details-page--empty">
      <p className="details-page__eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The route you opened does not exist in CineBlaze.</p>
      <Link className="details-page__button details-page__button--primary" to="/">
        Return home
      </Link>
    </section>
  );
}

export default NotFoundPage;