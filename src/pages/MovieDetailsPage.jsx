import { Link, useNavigate, useParams } from 'react-router-dom';
import MovieRow from '../components/MovieRow/MovieRow';
import { getMovieById, getRelatedMovies } from '../data/movies';
import { useWatchlist } from '../context/WatchlistContext';

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);
  const relatedMovies = movie ? getRelatedMovies(movie, 6) : [];
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  if (!movie) {
    return (
      <section className="details-page details-page--empty">
        <p className="details-page__eyebrow">CineBlaze library</p>
        <h1>Movie not found</h1>
        <p>The title you requested is not available in this catalog.</p>
        <button type="button" className="details-page__button" onClick={function goBack() {
          navigate(-1);
        }}>
          Go back
        </button>
      </section>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);

  function handleWatchlistToggle() {
    if (inWatchlist) {
      removeMovie(movie.id);
      return;
    }

    addMovie(movie);
  }

  return (
    <div className="details-page">
      <section className="details-page__hero">
        <div
          className="details-page__poster"
          style={{ backgroundImage: `url(${movie.thumbnail})` }}
        />

        <div className="details-page__content">
          <p className="details-page__eyebrow">{movie.collection}</p>
          <h1>{movie.title}</h1>
          <p className="details-page__description">{movie.description}</p>

          <div className="details-page__meta">
            <span>{movie.genre}</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span>⭐ {movie.rating.toFixed(1)}</span>
          </div>

          <div className="details-page__actions">
            <button type="button" className="details-page__button details-page__button--primary" onClick={handleWatchlistToggle}>
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <Link className="details-page__button" to="/watchlist">
              Open Watchlist
            </Link>
            <button type="button" className="details-page__button details-page__button--ghost" onClick={function goBack() {
              navigate(-1);
            }}>
              Back
            </button>
          </div>
        </div>
      </section>

      <MovieRow title="More like this" eyebrow="Related" movies={relatedMovies} />
    </div>
  );
}

export default MovieDetailsPage;