import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ComingSoon.css';

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <div className="construction-icon">🚧</div>
        <h1>{title}</h1>
        <p className="subtitle">This section is currently under construction</p>
        <p className="description">
          Check back soon for awesome features and content!
        </p>
        <button className="btn-home" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
