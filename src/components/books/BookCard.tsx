import React from 'react';
import { Book } from '../../data/types';
import StarRating from '../common/StarRating';
import '../../styles/BookCard.css';

interface BookCardProps {
  book: Book;
  onExpand: () => void;
  isExpanded: boolean;
  onMarkAsRead: () => void;
  onMarkAsToRead: () => void;
}

const BookCard = ({ book, onExpand, isExpanded, onMarkAsRead, onMarkAsToRead }: BookCardProps) => {
  return (
    <div className={`book-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={onExpand}>
        <img src={book.coverImageUrl} alt={book.title} className="book-cover" />
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-genres">
            {book.genre.slice(0, 2).map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
          <div className={`status-badge ${book.status}`}>
            {book.status === 'read' ? '✓ Read' : 
             book.status === 'currently-reading' ? '📖 Reading' : 
             '📚 To Read'}
          </div>
          {book.status === 'read' && book.myRating && (
            <StarRating rating={book.myRating} readonly size="small" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="card-expanded-content">
          {book.status === 'read' && book.myReview && (
            <div className="review-section">
              <h4>My Review</h4>
              <p className="my-review">{book.myReview}</p>
              {book.dateFinished && (
                <p className="date-finished">Finished: {new Date(book.dateFinished).toLocaleDateString()}</p>
              )}
            </div>
          )}
          
          <div className="summary-section">
            <h4>Summary</h4>
            <p className="official-summary">{book.officialSummary}</p>
          </div>

          <div className="card-actions">
            <a 
              href={book.officialLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-link"
            >
              View on Goodreads →
            </a>
            {book.status === 'to-read' && (
              <button onClick={onMarkAsRead} className="btn-action">
                Mark as Read
              </button>
            )}
            {book.status === 'read' && (
              <button onClick={onMarkAsToRead} className="btn-action">
                Move to To-Read
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
