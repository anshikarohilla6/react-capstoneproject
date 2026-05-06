import Hero from '../components/Hero/Hero';
import MovieRow from '../components/MovieRow/MovieRow';

function KidsPage({ featuredMovies, rows }) {
  return (
    <section className="kids-page">
      <Hero slides={featuredMovies} tone="kids" loading={false} />

      {rows.map(function (row) {
        return (
          <MovieRow
            key={row.id}
            title={row.title}
            eyebrow={`${row.emoji} ${row.label}`}
            movies={row.movies}
          />
        );
      })}
    </section>
  );
}

export default KidsPage;