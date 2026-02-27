import React, { useState } from 'react';
import '../styles/HikingPage.css';

type TabType = 'map' | 'completed' | 'wishlist';

interface Hike {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  elevationGain: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  status: 'completed' | 'planned';
  dateCompleted?: string;
  myRating?: number;
  myNotes?: string;
  photos?: string[];
}

const HikingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('map');

  // Sample data - replace with your actual hikes!
  const hikes: Hike[] = [
    {
      id: 'hike-1',
      name: 'Mount Rainier Summit',
      location: 'Washington, USA',
      coordinates: { lat: 46.8523, lng: -121.7603 },
      distance: 22.5,
      elevationGain: 2743,
      difficulty: 'extreme',
      status: 'completed',
      dateCompleted: '2024-07-15',
      myRating: 5,
      myNotes: 'Incredible views! Challenging but worth every step. Started at 3am to catch sunrise.',
      photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    },
    {
      id: 'hike-2',
      name: 'Angels Landing',
      location: 'Zion National Park, Utah',
      coordinates: { lat: 37.2690, lng: -112.9473 },
      distance: 8.7,
      elevationGain: 453,
      difficulty: 'hard',
      status: 'completed',
      dateCompleted: '2024-05-20',
      myRating: 5,
      myNotes: 'Scary but amazing! The chains section is intense. Go early to avoid crowds.',
    },
    {
      id: 'hike-3',
      name: 'Tour du Mont Blanc',
      location: 'France, Italy, Switzerland',
      coordinates: { lat: 45.8326, lng: 6.8652 },
      distance: 170,
      elevationGain: 10000,
      difficulty: 'extreme',
      status: 'planned',
      myNotes: 'Dream hike! Planning for summer 2025. Need to book refuges early.',
    },
    {
      id: 'hike-4',
      name: 'Half Dome',
      location: 'Yosemite, California',
      coordinates: { lat: 37.7459, lng: -119.5332 },
      distance: 26,
      elevationGain: 1463,
      difficulty: 'hard',
      status: 'planned',
    },
  ];

  const completedHikes = hikes.filter(h => h.status === 'completed');
  const plannedHikes = hikes.filter(h => h.status === 'planned');

  const stats = {
    total: hikes.length,
    completed: completedHikes.length,
    totalDistance: completedHikes.reduce((sum, h) => sum + h.distance, 0),
    totalElevation: completedHikes.reduce((sum, h) => sum + h.elevationGain, 0),
  };

  return (
    <div className="hiking-page">
      <header className="page-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className="page-title">🥾 My Hiking Adventures</h1>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.totalDistance.toFixed(1)} km</span>
              <span className="stat-label">Distance</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.totalElevation} m</span>
              <span className="stat-label">Elevation</span>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Map View
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ✅ Completed ({stats.completed})
          </button>
          <button
            className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            📍 Wishlist ({plannedHikes.length})
          </button>
        </div>
      </div>

      <div className="content-container">
        {activeTab === 'map' && (
          <div className="map-view">
            <div className="map-placeholder">
              <h2>🗺️ Interactive Map Coming Soon!</h2>
              <p>This will show all your hikes on a world map</p>
              <ul className="map-features">
                <li>📍 Pins for each hike location</li>
                <li>🟢 Green pins for completed hikes</li>
                <li>⚪ Gray pins for planned hikes</li>
                <li>🔍 Zoom in to see individual trails</li>
                <li>👆 Click pins to see hike details</li>
              </ul>
              <p className="map-note">
                <strong>Tech Stack:</strong> Will use Leaflet.js or Mapbox GL for interactive maps
              </p>
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="hikes-grid">
            {completedHikes.map(hike => (
              <div key={hike.id} className="hike-card completed">
                {hike.photos && hike.photos[0] && (
                  <img src={hike.photos[0]} alt={hike.name} className="hike-image" />
                )}
                <div className="hike-content">
                  <h3 className="hike-name">{hike.name}</h3>
                  <p className="hike-location">📍 {hike.location}</p>
                  <div className="hike-stats">
                    <span>🥾 {hike.distance} km</span>
                    <span>⛰️ {hike.elevationGain} m</span>
                    <span className={`difficulty ${hike.difficulty}`}>{hike.difficulty}</span>
                  </div>
                  {hike.myRating && (
                    <div className="hike-rating">
                      {'⭐'.repeat(hike.myRating)}
                    </div>
                  )}
                  {hike.dateCompleted && (
                    <p className="hike-date">
                      Completed: {new Date(hike.dateCompleted).toLocaleDateString()}
                    </p>
                  )}
                  {hike.myNotes && (
                    <p className="hike-notes">{hike.myNotes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="hikes-grid">
            {plannedHikes.map(hike => (
              <div key={hike.id} className="hike-card planned">
                <div className="hike-content">
                  <h3 className="hike-name">{hike.name}</h3>
                  <p className="hike-location">📍 {hike.location}</p>
                  <div className="hike-stats">
                    <span>🥾 {hike.distance} km</span>
                    <span>⛰️ {hike.elevationGain} m</span>
                    <span className={`difficulty ${hike.difficulty}`}>{hike.difficulty}</span>
                  </div>
                  {hike.myNotes && (
                    <p className="hike-notes">{hike.myNotes}</p>
                  )}
                  <button className="mark-completed-btn">Mark as Completed</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HikingPage;
