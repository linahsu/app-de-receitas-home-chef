import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FavoriteRecipeType } from '../types';
import CardFavorite from '../components/CardFavorite';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [showFavorites,
    setShowFavorites] = useState<Array<FavoriteRecipeType>>(favoriteRecipes);

  const checkFavorite = (recepeId: string) => {
    return favoriteRecipes
      .some((favorite: FavoriteRecipeType) => favorite.id === recepeId);
  };

  const handleClickFilter = (filter: string) => {
    setShowFavorites(favoriteRecipes);

    if (filter !== 'all') {
      setShowFavorites(
        favoriteRecipes
          .filter((favorite: FavoriteRecipeType) => favorite.type === filter),
      );
    }
  };

  const handleFavoriteBtn = () => {
    { showFavorites.map((recipes) => {
      if (recipes.id && recipes.type) {
        if (!checkFavorite(recipes.id)) {
          setFavoriteRecipes([
            ...favoriteRecipes,
            {
              id: recipes.id,
              type: recipes.type,
              nationality: recipes.nationality || '',
              category: recipes.category || '',
              alcoholicOrNot: recipes?.alcoholicOrNot || '',
              name: recipes.name,
              image: recipes.image,
            },
          ]);
        } else {
          const favoriteList = favoriteRecipes
            .filter((favorite: FavoriteRecipeType) => favorite.id !== recipes.id);
          setFavoriteRecipes(favoriteList);
          setShowFavorites(favoriteList);
        }
      }
    }); }
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
        {showFavorites.length > 0
          ? (
            showFavorites.map((recipe, index) => (<CardFavorite
              recipe={ recipe }
              index={ index }
              handleFavoriteBtn={ handleFavoriteBtn }
              key={ recipe.id }
            />))) : (
              <p>Nenhuma receita encontrada.</p>
          )}
      </div>
    </>
  );
}

export default FavoriteRecipes;
