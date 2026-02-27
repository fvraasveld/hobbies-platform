import React, { useState, useMemo } from 'react';
import { useMovies } from '../context/MoviesContext';
import SearchBar from '../components/common/SearchBar';
import MovieCard from '../components/movies/MovieCard';
import StarRating from '../components/common/StarRating';
import '../styles/MoviesPage.css';

type TabType = 'search' | 'watched' | 'to-watch';

const MoviesPage = () => {
  const { movies, markAsWatched, markAsToWatch } = useMovies();
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'date' | 'year'>('title');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingData, setRatingData] = useState({ id: '', rating: 0, review: '' });

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => movie.genre.forEach(g => genres.add(g)));
    return ['all', ...Array.from(genres).sort()];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = movies;

    if (activeTab === 'watched') {
      result = result.filter(m => m.status === 'watched');
    } else if (activeTab === 'to-watch') {
      result = result.filter(m => m.status === 'to-watch' || m.status === 'currently-watching');
    }

    if (searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedGenre !== 'all') {
      result = result.filter(movie => movie.genre.includes(selectedGenre));
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating' && a.myRating && b.myRating) {
        return b.myRating - a.myRating;
      } else if (sortBy === 'date' && a.dateWatched && b.dateWatched) {
        return new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime();
      } else if (sortBy === 'year') {
        return b.year - a.year;
      }
      return 0;
    });

    return result;
  }, [movies, activeTab, searchTerm, selectedGenre, sortBy]);

  const handleMarkAsWatched = (id: string) => {
    setRatingData({ id, rating: 0, review: '' });
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (ratingData.rating > 0) {
      markAsWatched(ratingData.id, ratingData.rating, ratingData.review, new Date().toISOString().split('T')[0]);
      setShowRatingModal(false);
      setRatingData({ id: '', rating: 0, review: '' });
    }
  };

  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.status === 'watched').length,
    toWatch: movies.filter(m => m.status === 'to-watch' || m.status === 'currently-watching').length,
  };

  return (
    <div className="movies-page">
      <header className="page-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className="page-title">🎬 My Movie Collection</h1>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.watched}</span>
              <span className="stat-label">Watched</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.toWatch}</span>
              <span className="stat-label">To Watch</span>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search & Browse
          </button>
          <button
            className={`tab ${activeTab === 'watched' ? 'active' : ''}`}
            onClick={() => setActiveTab('watched')}
          >
            Movies I've Watched
          </button>
          <button
            className={`tab ${activeTab === 'to-watch' ? 'active' : ''}`}
            onClick={() => setActiveTab('to-watch')}
          >
            Watchlist
          </button>
        </div>
      </div>

      <div className="filters-section">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by title, director, or genre..."
        />
        <div className="filter-controls">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="filter-select"
          >
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
            {activeTab === 'watched' && <option value="rating">Sort by Rating</option>}
            {activeTab === 'watched' && <option value="date">Sort by Date Watched</option>}
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <p>No movies found. Try adjusting your filters!</p>
          </div>
        ) : (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onExpand={() => setSelectedMovie(selectedMovie === movie.id ? null : movie.id)}
              isExpanded={selectedMovie === movie.id}
              onMarkAsWatched={() => handleMarkAsWatched(movie.id)}
              onMarkAsToWatch={() => markAsToWatch(movie.id)}
            />
          ))
        )}
      </div>

      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="modal-content rating-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Rate This Movie</h2>
            <StarRating
              rating={ratingData.rating}
              onRatingChange={(rating) => setRatingData({ ...ratingData, rating })}
              size="large"
            />
            <textarea
              placeholder="Write your review..."
              value={ratingData.review}
              onChange={(e) => setRatingData({ ...ratingData, review: e.target.value })}
              className="review-textarea"
            />
            <div className="modal-actions">
              <button onClick={() => setShowRatingModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={ratingData.rating === 0}
                className="btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
