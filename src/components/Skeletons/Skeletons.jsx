import './Skeletons.css';

export function HeroSkeleton() {
  return (
    <section className="skeleton hero-skeleton" aria-hidden="true">
      <div className="skeleton__backdrop" />
      <div className="skeleton__panel">
        <div className="skeleton__badge" />
        <div className="skeleton__line skeleton__line--xl" />
        <div className="skeleton__line skeleton__line--lg" />
        <div className="skeleton__line skeleton__line--md" />
        <div className="skeleton__chips">
          <span className="skeleton__chip" />
          <span className="skeleton__chip" />
          <span className="skeleton__chip" />
        </div>
        <div className="skeleton__actions">
          <span className="skeleton__action skeleton__action--primary" />
          <span className="skeleton__action" />
          <span className="skeleton__action" />
        </div>
      </div>
    </section>
  );
}

export function MovieRowSkeleton({ cardCount = 5 }) {
  return (
    <section className="skeleton movie-row-skeleton" aria-hidden="true">
      <div className="skeleton__row-header">
        <span className="skeleton__line skeleton__line--md" />
        <span className="skeleton__line skeleton__line--sm" />
      </div>
      <div className="skeleton__cards">
        {Array.from({ length: cardCount }).map(function (_, index) {
          return <span key={index} className="skeleton__card" />;
        })}
      </div>
    </section>
  );
}

export function AppSkeleton() {
  return (
    <div className="app app--night" data-theme="night">
      <div className="skeleton__topbar" />
      <HeroSkeleton />
      <MovieRowSkeleton />
      <MovieRowSkeleton />
    </div>
  );
}