import React from 'react';
import { Movie } from '../../data/types';
import StarRating from '../common/StarRating';
import '../../styles/MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  onExpand: () => void;
  isExpanded: boolean;
  onMarkAsWatched: () => void;
  onMarkAsToWatch: () => void;
}

const MovieCard = ({ movie, onExpand, isExpanded, onMarkAsWatched, onMarkAsToWatch }: MovieCardProps) => {
  return (
    <div className={`movie-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={onExpand}>
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-meta">
            {movie.director} • {movie.year}
          </p>
          {movie.runtime && (
            <p className="movie-runtime">{movie.runtime} min</p>
          )}
          <div className="movie-genres">
            {movie.genre.slice(0, 2).map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
          <div className={`status-badge ${movie.status}`}>
            {movie.status === 'watched' ? '✓ Watched' : 
             movie.status === 'currently-watching' ? '▶️ Watching' : 
             '🎬 To Watch'}
          </div>
          {movie.status === 'watched' && movie.myRating && (
            <StarRating rating={movie.myRating} readonly size="small" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="card-expanded-content">
          {movie.status === 'watched' && movie.myReview && (
            <div className="review-section">
              <h4>My Review</h4>
              <p className="my-review">{movie.myReview}</p>
              {movie.dateWatched && (
                <p className="date-watched">Watched: {new Date(movie.dateWatched).toLocaleDateString()}</p>
              )}
            </div>
          )}
          
          <div className="summary-section">
            <h4>Summary</h4>
            <p className="official-summary">{movie.officialSummary}</p>
          </div>

          <div className="card-actions">
            <a 
              href={movie.officialLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-link"
            >
              View on IMDB →
            </a>
            {movie.status === 'to-watch' && (
              <button onClick={onMarkAsWatched} className="btn-action">
                Mark as Watched
              </button>
            )}
            {movie.status === 'watched' && (
              <button onClick={onMarkAsToWatch} className="btn-action">
                Move to Watchlist
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
