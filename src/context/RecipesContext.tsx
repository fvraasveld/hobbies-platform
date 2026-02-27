import React, { createContext, useContext, useState, ReactNode } from 'react';
import recipesData from '../data/recipes.json';

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  status: 'none' | 'to-make' | 'made';
  dateAdded: string;
  dateMade?: string;
  myRating?: number;
  myNotes?: string;
  tags?: string[];
}

interface RecipesContextType {
  recipes: Recipe[];
  markAsMade: (id: string, rating: number, notes: string, date: string) => void;
  markAsToMake: (id: string) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem('recipes');
    if (stored) return JSON.parse(stored);
    return recipesData as Recipe[];
  });

  const save = (updated: Recipe[]) => {
    setRecipes(updated);
    localStorage.setItem('recipes', JSON.stringify(updated));
  };

  const markAsMade = (id: string, rating: number, notes: string, date: string) => {
    save(recipes.map(r => r.id === id ? { ...r, status: 'made' as const, myRating: rating, myNotes: notes, dateMade: date } : r));
  };

  const markAsToMake = (id: string) => {
    save(recipes.map(r => r.id === id ? { ...r, status: 'to-make' as const } : r));
  };

  return <RecipesContext.Provider value={{ recipes, markAsMade, markAsToMake }}>{children}</RecipesContext.Provider>;
};

export const useRecipes = () => {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be within RecipesProvider');
  return ctx;
};
