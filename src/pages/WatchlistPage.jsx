import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';

function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <section className="watchlist-page watchlist-page--empty">
        <p className="watchlist-page__eyebrow">Watchlist</p>
        <h1>Your watchlist is empty</h1>
        <p>Save movies from any row or detail page to build your own collection.</p>
        <Link className="watchlist-page__button watchlist-page__button--primary" to="/">
          Browse the catalog
        </Link>
      </section>
    );
  }

  return (
    <section className="watchlist-page">
      <div className="watchlist-page__header">
        <div>
          <p className="watchlist-page__eyebrow">Watchlist</p>
          <h1>Saved titles</h1>
          <p className="watchlist-page__summary">
            {watchlist.length} movie{watchlist.length === 1 ? '' : 's'} ready to resume.
          </p>
        </div>

        <button type="button" className="watchlist-page__button watchlist-page__button--ghost" onClick={clearWatchlist}>
          Clear all
        </button>
      </div>

      <div className="watchlist-page__grid">
        {watchlist.map(function (movie) {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              layout="grid"
              showRemoveAction
            />
          );
        })}
      </div>
    </section>
  );
}

export default WatchlistPage;