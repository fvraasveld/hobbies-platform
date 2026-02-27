import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BooksContext';
import SearchBar from '../components/common/SearchBar';
import BookCard from '../components/books/BookCard';
import StarRating from '../components/common/StarRating';
import '../styles/BooksPage.css';

type TabType = 'search' | 'read' | 'to-read';

const BooksPage = () => {
  const { books, markAsRead, markAsToRead } = useBooks();
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'date'>('title');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingData, setRatingData] = useState({ id: '', rating: 0, review: '' });

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    books.forEach(book => book.genre.forEach(g => genres.add(g)));
    return ['all', ...Array.from(genres).sort()];
  }, [books]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let result = books;

    // Tab filtering
    if (activeTab === 'read') {
      result = result.filter(b => b.status === 'read');
    } else if (activeTab === 'to-read') {
      result = result.filter(b => b.status === 'to-read' || b.status === 'currently-reading');
    }

    // Search filtering
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Genre filtering
    if (selectedGenre !== 'all') {
      result = result.filter(book => book.genre.includes(selectedGenre));
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating' && a.myRating && b.myRating) {
        return b.myRating - a.myRating;
      } else if (sortBy === 'date' && a.dateFinished && b.dateFinished) {
        return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
      }
      return 0;
    });

    return result;
  }, [books, activeTab, searchTerm, selectedGenre, sortBy]);

  const handleMarkAsRead = (id: string) => {
    setRatingData({ id, rating: 0, review: '' });
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (ratingData.rating > 0) {
      markAsRead(ratingData.id, ratingData.rating, ratingData.review, new Date().toISOString().split('T')[0]);
      setShowRatingModal(false);
      setRatingData({ id: '', rating: 0, review: '' });
    }
  };

  const stats = {
    total: books.length,
    read: books.filter(b => b.status === 'read').length,
    toRead: books.filter(b => b.status === 'to-read' || b.status === 'currently-reading').length,
  };

  return (
    <div className="books-page">
      <header className="page-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className="page-title">📚 My Reading Journey</h1>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.read}</span>
              <span className="stat-label">Read</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.toRead}</span>
              <span className="stat-label">To Read</span>
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
            className={`tab ${activeTab === 'read' ? 'active' : ''}`}
            onClick={() => setActiveTab('read')}
          >
            Books I've Read
          </button>
          <button
            className={`tab ${activeTab === 'to-read' ? 'active' : ''}`}
            onClick={() => setActiveTab('to-read')}
          >
            To Read
          </button>
        </div>
      </div>

      <div className="filters-section">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by title, author, or genre..."
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
            {activeTab === 'read' && <option value="rating">Sort by Rating</option>}
            {activeTab === 'read' && <option value="date">Sort by Date</option>}
          </select>
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <div className="empty-state">
            <p>No books found. Try adjusting your filters!</p>
          </div>
        ) : (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onExpand={() => setSelectedBook(selectedBook === book.id ? null : book.id)}
              isExpanded={selectedBook === book.id}
              onMarkAsRead={() => handleMarkAsRead(book.id)}
              onMarkAsToRead={() => markAsToRead(book.id)}
            />
          ))
        )}
      </div>

      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="modal-content rating-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Rate This Book</h2>
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

export default BooksPage;
