# OTT-1 Codebase Description for ChatGPT

This repository is a React 19 + Vite frontend for a cinematic OTT-style landing page called CineBlaze. It is a static, presentation-focused app with no backend, no routing, and no external state management. The UI is built from reusable React components styled with plain CSS files and a shared global theme system.

## What The App Does

The app presents a streaming-service homepage with:

- a fixed top navigation bar with desktop and mobile navigation
- a full-width hero banner that auto-rotates featured movies
- horizontally scrollable movie rows
- interactive movie cards with hover overlays and action buttons
- a multi-column footer with brand, social, and support links

The content is mostly static mock data defined inside the React components.

## Main Entry Points

- `src/main.jsx` mounts the React app into `#root`
- `src/App.jsx` is the top-level shell and theme controller
- `src/index.css` defines global CSS variables, fonts, reset rules, and base document styling
- `src/App.css` contains app-level layout and day-theme overrides

## Component Responsibilities

- `src/components/Navbar/Navbar.jsx` renders the fixed header, scroll state, mobile drawer, active link state, and theme toggle.
- `src/components/Hero/Hero.jsx` shows a rotating featured banner with timed slide changes, dot navigation, and CTA buttons.
- `src/components/MovieRow/MovieRow.jsx` renders a horizontal carousel-style row with left/right scroll buttons.
- `src/components/MovieCard/MovieCard.jsx` renders a single movie tile with hover effects, play button, and quick actions.
- `src/components/Footer/Footer.jsx` renders the brand area, social buttons, and grouped footer links.

Each component has a matching CSS file in the same folder.

## Data Flow And State

- `App.jsx` stores the current theme in local state and persists it in `localStorage` under `cineblaze-theme`.
- The theme value is passed to `Navbar` so the toggle button can show the current mode.
- `Navbar` tracks scroll position and mobile menu state.
- `Hero` tracks the active slide and fades between slides on a timer.
- `MovieRow` uses a ref to scroll its card container horizontally.
- `MovieCard` uses hover state for the overlay animation.

## Styling And Visual Direction

The UI uses a cinematic, high-contrast look built from CSS variables, gradients, glow effects, and responsive breakpoints. Fonts are imported globally from Google Fonts. The day theme is implemented by overriding shared CSS variables through the `.app--day` class rather than duplicating component logic.

Key styling conventions:

- use CSS variables for colors, spacing, and glow effects
- keep component styles in colocated CSS files
- preserve the dark cinematic theme unless the day theme is explicitly enabled
- favor animated transitions and hover states over JavaScript-heavy interactions

## Tech Stack And Constraints

- React 19
- Vite
- ESLint
- Plain CSS, not CSS modules or a utility framework

Important constraint: the project uses the automatic JSX runtime, so default `React` imports are unnecessary unless the React namespace itself is referenced.

## Helpful Summary For Future Edits

When modifying this codebase, keep changes consistent with the existing visual style, preserve the static component structure, and avoid introducing unnecessary complexity. Most behavior is local to each component, so edits should usually stay within the relevant component and its CSS file.