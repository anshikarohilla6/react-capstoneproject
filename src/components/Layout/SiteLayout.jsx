import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useWatchlist } from '../../context/WatchlistContext';

function SiteLayout({
  theme,
  isDayTheme,
  onThemeToggle,
  searchQuery,
  onSearchChange,
  searchResults,
}) {
  const { watchlistCount } = useWatchlist();

  return (
    <div className={`app app--${theme}`} data-theme={theme}>
      <Navbar
        isDayTheme={isDayTheme}
        onThemeToggle={onThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchResults={searchResults}
        watchlistCount={watchlistCount}
      />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;