import React, { useEffect, useState } from 'react';
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
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411',
  },
  {
    id: 2,
    title: 'Neon Abyss',
    genre: 'Thriller',
    rating: '7.9',
    year: '2024',
    duration: '1h 54m',
    image: 'https://i.pinimg.com/1200x/64/15/cb/6415cb69f4651186cd0d6e55037da48f.jpg',
  },
  {
    id: 3,
    title: 'Stellar Drift',
    genre: 'Adventure',
    rating: '8.1',
    year: '2023',
    duration: '2h 32m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpv8YymBU1hSC7Ckx40nIjLmP4qqWri1Jhrw&s',
  },
  {
    id: 4,
    title: 'The Last Signal',
    genre: 'Drama',
    rating: '8.6',
    year: '2024',
    duration: '1h 48m',
    image: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fa691e94-f39a-435a-913f-ff287d4cbc23/banquet.jpg',
  },
  {
    id: 5,
    title: 'Crimson Protocol',
    genre: 'Action',
    rating: '7.7',
    year: '2024',
    duration: '2h 05m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskQBYqG6hgIGLyT1RWima8abpde-DMU8--A&s',
  },
  {
    id: 6,
    title: 'Void Runner',
    genre: 'Sci-Fi',
    rating: '8.0',
    year: '2023',
    duration: '2h 10m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR402QupMLPPL_knw200s_COpFdbhtfOvmmEw&s',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMReITqwVUvl_mdkzECJ_eKph2GDQBxa9g5g&s',
  },
  {
    id: 8,
    title: 'Ghost Protocol 2',
    genre: 'Thriller',
    rating: '8.2',
    year: '2025',
    duration: '2h 20m',
    image: 'https://www.coffeeandcigarettes.co.uk/wp-content/uploads/2018/01/The-Chinese-Widow.jpg',
  },
  {
    id: 9,
    title: 'Blue Requiem',
    genre: 'Drama',
    rating: '8.8',
    year: '2025',
    duration: '1h 55m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUGByYb407NrEJtuMtb-tvwLFvReRL60FlQ&s',
  },
  {
    id: 10,
    title: 'Orbital Strike',
    genre: 'Sci-Fi',
    rating: '7.6',
    year: '2025',
    duration: '2h 15m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnNG-PaUDfMEnY487_G09-yIMZm1t38gZVsA&s',
  },
  {
    id: 11,
    title: 'Shadow Cascade',
    genre: 'Horror',
    rating: '7.3',
    year: '2025',
    duration: '1h 40m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHgmh-zuuweSedeS0RV23zTgbTL_RaQdYJA&s',
  },
  {
    id: 12,
    title: 'Deep Current',
    genre: 'Documentary',
    rating: '8.5',
    year: '2025',
    duration: '1h 28m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlmHeAAdkdak5HqKnbCcEeA8C6UUaP7_jIA&s',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8VyfW6IzCZBeKuRFWKxqPYVnAB03ZWnmyw&s',
  },
  {
    id: 14,
    title: 'Blacksite',
    genre: 'Action',
    rating: '7.4',
    year: '2024',
    duration: '1h 58m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6k-MmtpIpwLo7yhta91hL425YHNzo2fQgaQ&s',
  },
  {
    id: 15,
    title: 'Maximum Force',
    genre: 'Action',
    rating: '6.9',
    year: '2023',
    duration: '1h 50m',
    image: 'https://www.tallengestore.com/cdn/shop/products/Padmaavat-DeepikaPadukone-BollywoodHindiMoviePosters_d3b7c5c9-ff30-4a10-8a86-ccb43a160678.jpg?v=1625220950',
  },
  {
    id: 16,
    title: 'Zero Gravity',
    genre: 'Action',
    rating: '8.0',
    year: '2024',
    duration: '2h 12m',
    image: 'https://5.imimg.com/data5/CO/IP/MQ/SELLER-30220222/bollywood-wall-poster-500x500.jpg',
  },
  {
    id: 17,
    title: 'Surge',
    genre: 'Action',
    rating: '7.2',
    year: '2023',
    duration: '1h 46m',
    image: 'https://i.pinimg.com/736x/6e/d8/86/6ed8865d6712fb9f41c14f11e553bdf3.jpg',
  },
  {
    id: 18,
    title: 'Hardline',
    genre: 'Action',
    rating: '7.6',
    year: '2024',
    duration: '2h 08m',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WV1AwOPAFoLPjfbPieAOtMh_Y7vnejZE0Q&s',
  },
];

// ── App Component ───────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState(function () {
    return localStorage.getItem('cineblaze-theme') || 'night';
  });

  const isDayTheme = theme === 'day';

  useEffect(function () {
    localStorage.setItem('cineblaze-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(function (currentTheme) {
      return currentTheme === 'night' ? 'day' : 'night';
    });
  }

  return (
    <div className={`app app--${theme}`} data-theme={theme}>
      <Navbar isDayTheme={isDayTheme} onThemeToggle={toggleTheme} />
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
