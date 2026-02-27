import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/common/AnimatedBackground';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const hobbies = [
    {
      id: 1,
      title: 'Reading',
      emoji: '📚',
      description: 'Track books, reviews & ratings',
      link: '/books',
      isActive: true,
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      title: 'Movies',
      emoji: '🎬',
      description: 'Movie watchlist & reviews',
      link: '/movies',
      isActive: true,
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      title: 'Cooking',
      emoji: '👨‍🍳',
      description: 'Recipes & dishes',
      link: '/cooking',
      isActive: true,
      bgGradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    },
    {
      id: 4,
      title: 'Hiking',
      emoji: '🥾',
      description: 'Trail logs & adventures',
      link: '/hiking',
      isActive: true,
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 5,
      title: 'Travel',
      emoji: '✈️',
      description: 'Destinations & journeys',
      link: '/travel',
      isActive: false,
      bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      id: 6,
      title: 'Sports',
      emoji: '🏎️',
      description: 'F1, running & fitness',
      link: '/sports',
      isActive: false,
      bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  const handleTileClick = (hobby: typeof hobbies[0]) => {
    if (hobby.isActive) {
      navigate(hobby.link);
    } else {
      setModalTitle(hobby.title);
      setShowModal(true);
    }
  };

  return (
    <div className="home-page">
      <AnimatedBackground />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to My
            <span className="gradient-text"> Hobbies Hub</span>
          </h1>
          <p className="hero-subtitle">
            A space to track, review, and explore my hobbies
          </p>
        </div>
      </div>

      <div className="hobbies-grid">
        {hobbies.map((hobby) => (
          <div
            key={hobby.id}
            className={`hobby-tile ${!hobby.isActive ? 'inactive' : ''}`}
            onClick={() => handleTileClick(hobby)}
            style={{ background: hobby.bgGradient }}
          >
            <div className="hobby-icon">{hobby.emoji}</div>
            <h3 className="hobby-title">{hobby.title}</h3>
            <p className="hobby-description">{hobby.description}</p>
            {!hobby.isActive && (
              <div className="coming-soon-badge">Coming Soon</div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🚧 Under Construction</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                The <strong>{modalTitle}</strong> section is currently being built!
              </p>
              <p>Check back soon for awesome features!</p>
            </div>
            <button className="cta-button" onClick={() => setShowModal(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
