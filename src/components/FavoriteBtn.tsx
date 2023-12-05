import useLocalStorage from "../hooks/useLocalStorage"
import { FavoriteRecipes } from "../types";

function FavoriteBtn(recipe: any, type: 'meal' | 'drink') {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes');


  const storeNewFavorite = () => {
    if (type === 'meal') {
      const newFavoriteMeal: FavoriteRecipes = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: null,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }
      
      if (favoriteRecipes === undefined) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteMeal));
      } else {
        const newStoredValue = [...favoriteRecipes, newFavoriteMeal];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newStoredValue));
      }
    }
    
    if (type === 'drink') {
      const newFavoriteDrink: FavoriteRecipes = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: null,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }
      setFavoriteRecipes([...favoriteRecipes, newFavoriteDrink]);
  }

    }

  return (
    <button
      data-testid="favorite-btn"
      onClick={ storeNewFavorite }
    >
      Favorite
    </button>
  )
}

export default FavoriteBtn;
