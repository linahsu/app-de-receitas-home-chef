import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FavoriteRecipeType } from '../types';
import CardFavorite from '../components/CardFavorite';

function FavoriteRecipes() {
  const [favoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [showFavorites,
    setShowFavorites] = useState<Array<FavoriteRecipeType>>(favoriteRecipes);

  const handleClickFilter = (filter: string) => {
    setShowFavorites(favoriteRecipes);

    if (filter !== 'all') {
      setShowFavorites(
        favoriteRecipes
          .filter((favorite: FavoriteRecipeType) => favorite.type === filter),
      );
    }
  };

  return (
    <>
      <div>
        <h1>Favorite Recipes</h1>
        <button
          id="All"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('all') }
        >
          All
        </button>
        <button
          id="Meals"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
        >
          Meals
        </button>
        <button
          id="Drinks"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        <CardFavorite recipe={ showFavorites } />
      </div>
    </>
  );
}

export default FavoriteRecipes;
