import React, { useState, useMemo } from 'react';
import { useRecipes } from '../context/RecipesContext';
import SearchBar from '../components/common/SearchBar';
import RecipeCard from '../components/recipes/RecipeCard';
import StarRating from '../components/common/StarRating';
import '../styles/CookingPage.css';

type TabType = 'search' | 'made' | 'to-make';

const CookingPage = () => {
  const { recipes, markAsMade, markAsToMake } = useRecipes();
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingData, setRatingData] = useState({ id: '', rating: 0, review: '' });

  const allCuisines = useMemo(() => {
    const cuisines = new Set<string>();
    recipes.forEach(r => cuisines.add(r.cuisine));
    return ['all', ...Array.from(cuisines).sort()];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let result = recipes;
    if (activeTab === 'made') result = result.filter(r => r.status === 'made');
    else if (activeTab === 'to-make') result = result.filter(r => r.status === 'to-make');
    if (searchTerm) result = result.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (selectedCuisine !== 'all') result = result.filter(r => r.cuisine === selectedCuisine);
    return result;
  }, [recipes, activeTab, searchTerm, selectedCuisine]);

  const handleMarkAsMade = (id: string) => {
    setRatingData({ id, rating: 0, review: '' });
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (ratingData.rating > 0) {
      markAsMade(ratingData.id, ratingData.rating, ratingData.review, new Date().toISOString().split('T')[0]);
      setShowRatingModal(false);
      setRatingData({ id: '', rating: 0, review: '' });
    }
  };

  const stats = {
    total: recipes.length,
    made: recipes.filter(r => r.status === 'made').length,
    toMake: recipes.filter(r => r.status === 'to-make').length
  };

  return (
    <div className="cooking-page">
      <header className="page-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
          <h1 className="page-title">👨‍🍳 My Recipe Collection</h1>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.made}</span>
              <span className="stat-label">Made</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.toMake}</span>
              <span className="stat-label">To Make</span>
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
            className={`tab ${activeTab === 'made' ? 'active' : ''}`} 
            onClick={() => setActiveTab('made')}
          >
            Recipes I've Made
          </button>
          <button 
            className={`tab ${activeTab === 'to-make' ? 'active' : ''}`} 
            onClick={() => setActiveTab('to-make')}
          >
            To Make
          </button>
        </div>
      </div>

      <div className="filters-section">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search recipes, cuisines, or ingredients..." 
        />
        <div className="filter-controls">
          <select 
            value={selectedCuisine} 
            onChange={(e) => setSelectedCuisine(e.target.value)} 
            className="filter-select"
          >
            {allCuisines.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Cuisines' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            <p>No recipes found!</p>
          </div>
        ) : (
          filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onExpand={() => setSelectedRecipe(selectedRecipe === recipe.id ? null : recipe.id)}
              isExpanded={selectedRecipe === recipe.id}
              onMarkAsMade={() => handleMarkAsMade(recipe.id)}
              onMarkAsToMake={() => markAsToMake(recipe.id)}
            />
          ))
        )}
      </div>

      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="modal-content rating-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Rate This Recipe</h2>
            <StarRating 
              rating={ratingData.rating} 
              onRatingChange={(rating) => setRatingData({ ...ratingData, rating })} 
              size="large" 
            />
            <textarea
              placeholder="Add your notes (e.g., 'Used half-and-half instead of cream', 'Baked 5 min longer')..."
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

export default CookingPage;
