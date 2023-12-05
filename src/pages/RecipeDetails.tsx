import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDrinkById, fetchAllCocktails } from '../utils/apiDrinks';
import { fetchMealById, fetchAllMeals } from '../utils/apiMeals';
import { ActionDetailsDrink, ActionDetailsMeal,
  AllDrinksAction, AllMealsAction } from '../redux/actions/actions';
import useLocalStorage from '../hooks/useLocalStorage';
import { RootState, FavoriteRecipes, DoneRecipes } from '../types';
import CardDrinkDetails from '../components/CardDrinkDetails';
import CardMealsDetails from '../components/CardMealsDetails';

function RecipeDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, category, id] = pathname.split('/');
  const currentUrl = window.location.href;

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const doneRecipes = useLocalStorage('doneRecipes')[0];
  const inProgressRecipes = useLocalStorage('inProgressRecipes')[0];

  const [hideButton, setHideButton] = useState(false);
  const [buttonText, setButtonText] = useState('Start Recipe');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    detailsDrink,
    detailsMeal,
    allDrinks,
    allMeals,
  } = useSelector((state: RootState) => state.mainReducer);

  const isRecipeDone = () => {
    if (category === 'meals') {
      setHideButton(
        doneRecipes.some((recipe: DoneRecipes) => recipe.id === detailsMeal.idMeal),
      );
    } else {
      setHideButton(
        doneRecipes.some((recipe: DoneRecipes) => recipe.id === detailsDrink.idDrink),
      );
    }
  };

  const checkFavorite = (recepeId: string) => {
    return getFavorites
      .some((favorite: FavoriteRecipes) => favorite.id === recepeId);
  };

  // Faz o fetch de acordo com a categoria do pathname
  useEffect(() => {
    setIsCopied(false);
    if (category === 'meals') {
      fetchMealById(id).then((data) => dispatch(ActionDetailsMeal(data)));
      fetchAllCocktails().then((data) => dispatch(AllDrinksAction(data)));
      return checkFavorite(detailsMeal.idMeal) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
    if (category === 'drinks') {
      fetchDrinkById(id).then((data) => dispatch(ActionDetailsDrink(data)));
      fetchAllMeals().then((data) => dispatch(AllMealsAction(data)));
      return checkFavorite(detailsDrink.idDrink) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
  }, [category, id, dispatch, detailsDrink.idDrink, detailsMeal.idMeal]);

  const handleFavoriteBtn = () => {
    setIsFavorite(!isFavorite);
    if (detailsMeal.idMeal && category === 'meals') {
      if (!checkFavorite(detailsMeal?.idMeal)) {
        console.log('meals');
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

    if (detailsDrink.idDrink && category === 'drinks') {
      if (!checkFavorite(detailsDrink?.idDrink)) {
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
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy:', error);
      window.alert('Failed to copy the link!');
      setIsCopied(false);
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
            isCopied={ isCopied }
          />
        </div>
      ) : (
        <div>
          <h1>Detalhes da Bebida</h1>
          <CardDrinkDetails
            handleFavoriteBtn={ handleFavoriteBtn }
            handleshareBtn={ handleShareBtn }
            isFavorite={ isFavorite }
            isCopied={ isCopied }
          />
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
