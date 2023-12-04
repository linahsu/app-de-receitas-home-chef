import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDrinkById, fetchAllCocktails } from '../utils/apiDrinks';
import { fetchMealById, fetchAllMeals } from '../utils/apiMeals';
import { ActionDetailsDrink, ActionDetailsMeal,
  AllDrinksAction, AllMealsAction } from '../redux/actions/actions';
import useLocalStorage from '../hooks/useLocalStorage';
import { RootState, FavoriteRecipes } from '../types';
import CardDrinkDetails from '../components/CardDrinkDetails';
import CardMealsDetails from '../components/CardMealsDetails';

function RecipeDetails() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [, category, id] = pathname.split('/');
  const currentUrl = window.location.href;

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes');
  // const [getProgress, setProgress] = useLocalStorage('inProgressRecipes');
  // const [getDoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes');

  const [isFavorite, setIsFavorite] = useState(false);

  const {
    detailsDrink,
    detailsMeal,
  } = useSelector((state: RootState) => state.mainReducer);

  // Faz o fetch de acordo com a categoria do pathname
  useEffect(() => {
    if (category === 'meals') {
      fetchMealById(id).then((data) => dispatch(ActionDetailsMeal(data)));
      fetchAllCocktails().then((data) => dispatch(AllDrinksAction(data)));
    }
    if (category === 'drinks') {
      fetchDrinkById(id).then((data) => dispatch(ActionDetailsDrink(data)));
      fetchAllMeals().then((data) => dispatch(AllMealsAction(data)));
    }
  }, [category, id, dispatch]);

  const checkFavorite = (recepeId: string) => {
    return getFavorites
      .some((favorite: FavoriteRecipes) => favorite.id === recepeId);
  };

  const handleFavoriteBtn = () => {
    setIsFavorite(!isFavorite);
    if (detailsMeal) {
      if (!checkFavorite(detailsMeal?.idMeal) && category === 'meals') {
        setFavorites([
          ...getFavorites,
          {
            id: detailsMeal?.idMeal,
            type: 'meal',
            nationality: detailsMeal?.strArea,
            category: detailsMeal?.strCategory,
            alcoholicOrNot: '',
            name: detailsMeal?.strMeal,
            image: detailsMeal?.strMealThumb,
          },
        ]);
      } else {
        const favoriteList = getFavorites
          .filter((favorite: FavoriteRecipes) => favorite.id !== detailsMeal?.idMeal);
        setFavorites(favoriteList);
      }
    }

    if (detailsDrink) {
      if (!checkFavorite(detailsDrink?.idDrink) && category === 'drinks') {
        setFavorites([
          ...getFavorites,
          {
            id: detailsDrink?.idDrink,
            type: 'drink',
            nationality: detailsDrink?.strArea,
            category: '',
            alcoholicOrNot: detailsDrink?.strAlcoholic,
            name: detailsDrink?.strDrink,
            image: detailsDrink?.strDrinkThumb,
          },
        ]);
      } else {
        const favoriteList = getFavorites
          .filter((favorite: FavoriteRecipes) => favorite.id !== detailsDrink?.idDrink);
        setFavorites(favoriteList);
      }
    }
  };

  const handleShareBtn = () => {
    try {
      navigator.clipboard.writeText(currentUrl);
      window.alert('Link copied!');
    } catch (error) {
      window.alert('Failed to copy!');
    }
  };

  return (
    <div>
      {category === 'meals' ? (
        <div>
          <h1>Detalhes da Comida</h1>
          <CardMealsDetails
            handleFavoriteBtn={ handleFavoriteBtn }
            handleshareBtn={ handleShareBtn }
            isFavorite={ isFavorite }
          />
        </div>
      ) : (
        <div>
          <h1>Detalhes da Bebida</h1>
          <CardDrinkDetails
            handleFavoriteBtn={ handleFavoriteBtn }
            handleshareBtn={ handleShareBtn }
            isFavorite={ isFavorite }
          />
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
