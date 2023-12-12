import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FavoriteRecipeType } from '../types';
import CardFavorite from '../components/CardFavorite';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [showFavorites,
    setShowFavorites] = useState<Array<FavoriteRecipeType>>(favoriteRecipes);
  const [currentFilter, setCurrentFilter] = useState('');

  const handleClickFilter = (filter: string) => {
    setCurrentFilter(filter);
    setShowFavorites(favoriteRecipes);

    if (filter !== 'all') {
      setShowFavorites(
        favoriteRecipes
          .filter((favorite: FavoriteRecipeType) => favorite.type === filter),
      );
    }
  };

  // Função refatorada em monitoria
  const handleFavoriteBtn = (recipesId: string) => {
    const favoriteList = favoriteRecipes
      .filter((favorite: FavoriteRecipeType) => favorite.id !== recipesId);
    setFavoriteRecipes(favoriteList);
    setShowFavorites(favoriteList);
  };

  return (
    <div className="done-recipes-body">
      <div className="filters">
        <button
          id="All"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('all') }
          className={ (currentFilter === 'all') ? 'active' : '' }
        >
          All
        </button>
        <button
          id="Meals"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
          className={ (currentFilter === 'meal') ? 'active' : '' }
        >
          Meals
        </button>
        <button
          id="Drinks"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
          className={ (currentFilter === 'drink') ? 'active' : '' }
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-list">
        {showFavorites.length > 0
          ? (
            showFavorites.map((recipe, index) => (<CardFavorite
              recipe={ recipe }
              index={ index }
              handleFavoriteBtn={ handleFavoriteBtn }
              key={ recipe.id }
            />))) : (
              <p className="no-recipes">No favorite recipes yet :(</p>
          )}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
