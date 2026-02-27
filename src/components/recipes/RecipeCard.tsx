import React from 'react';
import { Recipe } from '../../context/RecipesContext';
import StarRating from '../common/StarRating';

interface RecipeCardProps {
  recipe: Recipe;
  onExpand: () => void;
  isExpanded: boolean;
  onMarkAsMade: () => void;
  onMarkAsToMake: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onExpand, isExpanded, onMarkAsMade, onMarkAsToMake }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <div className={`recipe-card ${isExpanded ? 'expanded' : ''}`}>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
      )}
      <div className="recipe-content">
        <div className="recipe-header" onClick={onExpand}>
          <h3 className="recipe-name">{recipe.name}</h3>
          <span className="recipe-cuisine">{recipe.cuisine}</span>
        </div>
        
        <div className="recipe-meta">
          <span>⏱️ {totalTime} min</span>
          <span>🍽️ {recipe.servings} servings</span>
          <span className={`recipe-difficulty ${recipe.difficulty}`}>{recipe.difficulty}</span>
        </div>

        {recipe.status === 'made' && recipe.myRating && (
          <div className="recipe-rating">
            <StarRating rating={recipe.myRating} readonly size="small" />
          </div>
        )}

        {isExpanded && (
          <div className="recipe-details">
            <div className="recipe-section">
              <h4>Ingredients:</h4>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
            
            <div className="recipe-section">
              <h4>Instructions:</h4>
              <ol className="instructions-list">
                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>

            {recipe.myNotes && (
              <div className="recipe-section">
                <h4>My Notes:</h4>
                <p className="recipe-notes">{recipe.myNotes}</p>
              </div>
            )}

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="recipe-tags">
                {recipe.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="recipe-actions">
          {recipe.status === 'none' && (
            <>
              <button onClick={onMarkAsToMake} className="btn-secondary">
                Add to To-Make
              </button>
              <button onClick={onMarkAsMade} className="btn-primary">
                Mark as Made
              </button>
            </>
          )}
          {recipe.status === 'to-make' && (
            <button onClick={onMarkAsMade} className="btn-primary">
              Mark as Made
            </button>
          )}
          {recipe.status === 'made' && (
            <div className="made-badge">
              ✅ Made on {new Date(recipe.dateMade!).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
