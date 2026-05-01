import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MovieRow from './components/MovieRow/MovieRow';
import Footer from './components/Footer/Footer';
import './App.css';

// ── Movie Data ──────────────────────────────────────────────────────────────
// Each movie uses a high-quality Unsplash placeholder image styled for cinema.
const trendingMovies = [
  {
    id: 1,
    title: 'Dark Horizon',
    genre: 'Sci-Fi',
    rating: '8.4',
    year: '2024',
    duration: '2h 18m',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=220&fit=crop',
  },
  {
    id: 2,
    title: 'Neon Abyss',
    genre: 'Thriller',
    rating: '7.9',
    year: '2024',
    duration: '1h 54m',
    image: 'https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=400&h=220&fit=crop',
  },
  {
    id: 3,
    title: 'Stellar Drift',
    genre: 'Adventure',
    rating: '8.1',
    year: '2023',
    duration: '2h 32m',
    image: 'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=400&h=220&fit=crop',
  },
  {
    id: 4,
    title: 'The Last Signal',
    genre: 'Drama',
    rating: '8.6',
    year: '2024',
    duration: '1h 48m',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=220&fit=crop',
  },
  {
    id: 5,
    title: 'Crimson Protocol',
    genre: 'Action',
    rating: '7.7',
    year: '2024',
    duration: '2h 05m',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=220&fit=crop',
  },
  {
    id: 6,
    title: 'Void Runner',
    genre: 'Sci-Fi',
    rating: '8.0',
    year: '2023',
    duration: '2h 10m',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=220&fit=crop',
  },
];

const newReleases = [
  {
    id: 7,
    title: 'Iron Echo',
    genre: 'Action',
    rating: '7.5',
    year: '2025',
    duration: '2h 00m',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=220&fit=crop',
  },
  {
    id: 8,
    title: 'Ghost Protocol 2',
    genre: 'Thriller',
    rating: '8.2',
    year: '2025',
    duration: '2h 20m',
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=220&fit=crop',
  },
  {
    id: 9,
    title: 'Blue Requiem',
    genre: 'Drama',
    rating: '8.8',
    year: '2025',
    duration: '1h 55m',
    image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=220&fit=crop',
  },
  {
    id: 10,
    title: 'Orbital Strike',
    genre: 'Sci-Fi',
    rating: '7.6',
    year: '2025',
    duration: '2h 15m',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=220&fit=crop',
  },
  {
    id: 11,
    title: 'Shadow Cascade',
    genre: 'Horror',
    rating: '7.3',
    year: '2025',
    duration: '1h 40m',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=220&fit=crop',
  },
  {
    id: 12,
    title: 'Deep Current',
    genre: 'Documentary',
    rating: '8.5',
    year: '2025',
    duration: '1h 28m',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=220&fit=crop',
  },
];

const actionMovies = [
  {
    id: 13,
    title: 'Thunder Road',
    genre: 'Action',
    rating: '7.8',
    year: '2024',
    duration: '2h 02m',
    image: 'https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=400&h=220&fit=crop',
  },
  {
    id: 14,
    title: 'Blacksite',
    genre: 'Action',
    rating: '7.4',
    year: '2024',
    duration: '1h 58m',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=220&fit=crop',
  },
  {
    id: 15,
    title: 'Maximum Force',
    genre: 'Action',
    rating: '6.9',
    year: '2023',
    duration: '1h 50m',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=220&fit=crop',
  },
  {
    id: 16,
    title: 'Zero Gravity',
    genre: 'Action',
    rating: '8.0',
    year: '2024',
    duration: '2h 12m',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=220&fit=crop',
  },
  {
    id: 17,
    title: 'Surge',
    genre: 'Action',
    rating: '7.2',
    year: '2023',
    duration: '1h 46m',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop',
  },
  {
    id: 18,
    title: 'Hardline',
    genre: 'Action',
    rating: '7.6',
    year: '2024',
    duration: '2h 08m',
    image: 'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?w=400&h=220&fit=crop',
  },
];

// ── App Component ───────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <MovieRow title="🔥 Trending Now"     movies={trendingMovies} />
        <MovieRow title="🆕 New Releases"     movies={newReleases}   />
        <MovieRow title="💥 Top Action Films" movies={actionMovies}   />
      </main>
      <Footer />
    </div>
  );
}

export default App;
