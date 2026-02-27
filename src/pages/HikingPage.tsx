import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/HikingPage.css';
import hikesData from '../data/hikes.json';
import blogsData from '../data/hikingBlogs.json';
import eventsData from '../data/hikingEvents.json';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type TabType = 'map' | 'completed' | 'wishlist' | 'calendar' | 'blog';

const HikingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  const hikes: any[] = hikesData;
  const blogs: any[] = blogsData;
  const events: any[] = eventsData;

  const completedHikes = hikes.filter(h => h.status === 'completed');
  const plannedHikes = hikes.filter(h => h.status === 'planned');

  const stats = {
    total: hikes.length,
    completed: completedHikes.length,
    totalDistance: completedHikes.reduce((sum, h) => sum + h.distance, 0),
    totalElevation: completedHikes.reduce((sum, h) => sum + h.elevationGain, 0),
  };

  // Calendar logic
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
    });
  }, [events, selectedMonth, selectedYear]);

  const getEventsForDay = (day: number) => {
    return monthEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

  const selectedBlogPost = selectedBlog ? blogs.find(b => b.id === selectedBlog) : null;

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
            🗺️ Map
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
          <button
            className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>
          <button
            className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            ✍️ Blog
          </button>
        </div>
      </div>

      <div className="content-container">
        {/* MAP TAB */}
        {activeTab === 'map' && (
          <div className="map-view-container">
            <MapContainer 
              center={[40, -100]} 
              zoom={4} 
              style={{ height: '600px', width: '100%', borderRadius: '16px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hikes.map(hike => (
                <Marker 
                  key={hike.id} 
                  position={[hike.coordinates.lat, hike.coordinates.lng]}
                  icon={hike.status === 'completed' ? greenIcon : redIcon}
                >
                  <Popup>
                    <div className="map-popup">
                      <h3>{hike.name}</h3>
                      <p><strong>📍</strong> {hike.location}</p>
                      <p><strong>🥾</strong> {hike.distance} km</p>
                      <p><strong>⛰️</strong> {hike.elevationGain} m elevation</p>
                      <p><strong>📊</strong> {hike.difficulty}</p>
                      {hike.status === 'completed' && (
                        <>
                          <p><strong>✅</strong> {new Date(hike.dateCompleted).toLocaleDateString()}</p>
                          <p><strong>⭐</strong> {'★'.repeat(hike.myRating)}</p>
                        </>
                      )}
                      {hike.status === 'planned' && <p style={{color: '#f97316'}}>🎯 Planned</p>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="map-legend">
              <h3>Legend:</h3>
              <div><span className="legend-marker green">●</span> Completed Hikes</div>
              <div><span className="legend-marker red">●</span> Planned Hikes</div>
            </div>
          </div>
        )}

        {/* COMPLETED TAB */}
        {activeTab === 'completed' && (
          <div className="hikes-grid">
            {completedHikes.map(hike => (
              <div key={hike.id} className="hike-card completed">
                {hike.imageUrl && (
                  <img src={hike.imageUrl} alt={hike.name} className="hike-image" />
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
                  {hike.highlights && (
                    <div className="hike-highlights">
                      <strong>Highlights:</strong>
                      <ul>
                        {hike.highlights.map((h: string, i: number) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="hikes-grid">
            {plannedHikes.map(hike => (
              <div key={hike.id} className="hike-card planned">
                {hike.imageUrl && (
                  <img src={hike.imageUrl} alt={hike.name} className="hike-image" />
                )}
                <div className="hike-content">
                  <h3 className="hike-name">{hike.name}</h3>
                  <p className="hike-location">📍 {hike.location}</p>
                  <div className="hike-stats">
                    <span>🥾 {hike.distance} km</span>
                    <span>⛰️ {hike.elevationGain} m</span>
                    <span className={`difficulty ${hike.difficulty}`}>{hike.difficulty}</span>
                  </div>
                  <p className="hike-description">{hike.description}</p>
                  {hike.myNotes && (
                    <p className="hike-notes">{hike.myNotes}</p>
                  )}
                  {hike.highlights && (
                    <div className="hike-highlights">
                      <strong>What to Expect:</strong>
                      <ul>
                        {hike.highlights.map((h: string, i: number) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button className="mark-completed-btn">Mark as Completed</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button onClick={() => {
                if (selectedMonth === 0) {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(selectedMonth - 1);
                }
              }}>←</button>
              <h2>{months[selectedMonth]} {selectedYear}</h2>
              <button onClick={() => {
                if (selectedMonth === 11) {
                  setSelectedMonth(0);
                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(selectedMonth + 1);
                }
              }}>→</button>
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-day-header">Sun</div>
              <div className="calendar-day-header">Mon</div>
              <div className="calendar-day-header">Tue</div>
              <div className="calendar-day-header">Wed</div>
              <div className="calendar-day-header">Thu</div>
              <div className="calendar-day-header">Fri</div>
              <div className="calendar-day-header">Sat</div>
              
              {Array(getFirstDayOfMonth(selectedMonth, selectedYear)).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-day empty"></div>
              ))}
              
              {Array(getDaysInMonth(selectedMonth, selectedYear)).fill(null).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const isToday = day === new Date().getDate() && 
                               selectedMonth === new Date().getMonth() && 
                               selectedYear === new Date().getFullYear();
                
                return (
                  <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    <div className="day-number">{day}</div>
                    {dayEvents.map(event => (
                      <div key={event.id} className={`event-dot ${event.type}`} title={event.title}>
                        {event.type === 'planned-hike' && '🥾'}
                        {event.type === 'training' && '💪'}
                        {event.type === 'prep' && '🎒'}
                        {event.type === 'reminder' && '🔔'}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="events-list">
              <h3>Events in {months[selectedMonth]}</h3>
              {monthEvents.length === 0 ? (
                <p className="no-events">No events scheduled this month</p>
              ) : (
                monthEvents.map(event => (
                  <div key={event.id} className={`event-item ${event.type}`}>
                    <div className="event-date">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <p>{event.location}</p>
                      {event.distance && <p>Distance: {event.distance} km</p>}
                      {event.notes && <p className="event-notes">{event.notes}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === 'blog' && (
          <div className="blog-view">
            {!selectedBlog ? (
              <>
                <div className="blog-header">
                  <h2>Trail Tales & Tips</h2>
                  <p>Adventures, lessons learned, and gear guides from the trails</p>
                </div>
                
                <div className="blog-grid">
                  {blogs.map(blog => (
                    <div key={blog.id} className="blog-card" onClick={() => setSelectedBlog(blog.id)}>
                      <img src={blog.coverImage} alt={blog.title} className="blog-cover" />
                      <div className="blog-card-content">
                        <div className="blog-meta">
                          <span className="blog-category">{blog.category}</span>
                          <span className="blog-date">
                            {new Date(blog.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        <div className="blog-footer">
                          <span className="read-time">📖 {blog.readTime} min read</span>
                          <div className="blog-tags">
                            {blog.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="tag">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="blog-post">
                <button className="back-btn" onClick={() => setSelectedBlog(null)}>
                  ← Back to Blog
                </button>
                <img src={selectedBlogPost!.coverImage} alt={selectedBlogPost!.title} className="blog-post-cover" />
                <div className="blog-post-content">
                  <div className="blog-post-meta">
                    <span className="blog-category">{selectedBlogPost!.category}</span>
                    <span className="blog-date">
                      {new Date(selectedBlogPost!.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="read-time">📖 {selectedBlogPost!.readTime} min read</span>
                  </div>
                  <h1>{selectedBlogPost!.title}</h1>
                  <div className="blog-post-text">
                    {selectedBlogPost!.content.split('\n').map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="blog-tags">
                    {selectedBlogPost!.tags.map((tag: string) => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HikingPage;
