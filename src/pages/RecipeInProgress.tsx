import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { FavoriteRecipeType,
  RootState, MealDetailsType,
  DrinkDetailsType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import { fetchDrinkById } from '../utils/apiDrinks';
import { fetchMealById } from '../utils/apiMeals';
import { ActionDetailsDrink, ActionDetailsMeal } from '../redux/actions/actions';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [, path, id] = pathname.split('/');
  const navigate = useNavigate();
  const { detailsMeal, detailsDrink } = useSelector(
    (globalState: RootState) => globalState.mainReducer,
  );
  const currentMeal = detailsMeal;
  const currentDrink = detailsDrink;

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [
    getProgress, setProgress,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
  const [getDoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);

  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = (recepeId: string) => {
    return getFavorites
      .some((favorite: FavoriteRecipeType) => favorite.id === recepeId);
  };

  const createRecipeLists = (
    currentRecipe: MealDetailsType | DrinkDetailsType | undefined,
  ) => {
    const details = Object.entries(currentRecipe || {});
    const ingredients = details
      .filter((detail) => detail[0]
        .includes('strIngredient') && detail[1] !== '' && detail[1] !== null);

    const mesure = details.filter((detail) => detail[0].includes('strMeasure'));

    const instructions = details
      .filter((detail) => detail[0]
        .includes('strInstructions') && detail[1] !== '' && detail[1] !== null);

    return {
      ingredients,
      mesure,
      instructions,
    };
  };

  const {
    ingredients: ingredientsMeal,
    mesure: mesureMeal,
    instructions: instructionsMeal,
  } = createRecipeLists(currentMeal);

  const {
    ingredients: ingredientsDrink,
    mesure: mesureDrink,
    instructions: instructionsDrink,
  } = createRecipeLists(currentDrink);

  useEffect(() => {
    if (path === 'meals') {
      fetchMealById(id).then((data) => dispatch(ActionDetailsMeal(data)));
      return checkFavorite(id) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
    if (path === 'drinks') {
      fetchDrinkById(id).then((data) => dispatch(ActionDetailsDrink(data)));
      return checkFavorite(id) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
  }, []);

  const ingredientCheck = (place: string, index: number) => {
    const isCheckedList = getProgress[place][id] ? getProgress[place][id] : '';

    if (!isCheckedList?.includes(index.toString())) {
      setProgress({
        ...getProgress,
        [place]: {
          ...getProgress[place],
          [id]: [...isCheckedList, index.toString()],
        },
      });
    } else {
      const list = isCheckedList
        .filter((ingredient: string) => ingredient !== index.toString());
      setProgress({
        ...getProgress,
        [place]: {
          ...getProgress[place],
          [id]: list,
        },
      });
    }
  };

  const handleIngredientCheck = (index: number) => {
    if (path === 'meals') {
      ingredientCheck('meals', index);
    }
    if (path === 'drinks') {
      ingredientCheck('drinks', index);
    }
  };

  const handleFavoriteBtn = () => {
    setIsFavorite(!isFavorite);
    if (currentMeal?.idMeal && path === 'meals') {
      if (!checkFavorite(currentMeal?.idMeal)) {
        setFavorites([
          ...getFavorites,
          {
            id: currentMeal?.idMeal,
            type: 'meal',
            nationality: currentMeal?.strArea || '',
            category: currentMeal?.strCategory || '',
            alcoholicOrNot: '',
            name: currentMeal?.strMeal,
            image: currentMeal?.strMealThumb,
          },
        ]);
      } else {
        const favoriteList = getFavorites
          .filter((favorite: FavoriteRecipeType) => favorite.id !== currentMeal?.idMeal);
        setFavorites(favoriteList);
      }
    }

    if (currentDrink?.idDrink && path === 'drinks') {
      if (!checkFavorite(currentDrink?.idDrink)) {
        setFavorites([
          ...getFavorites,
          {
            id: currentDrink?.idDrink,
            type: 'drink',
            nationality: currentDrink?.strArea || '',
            category: currentDrink?.strCategory || '',
            alcoholicOrNot: currentDrink?.strAlcoholic || '',
            name: currentDrink?.strDrink,
            image: currentDrink?.strDrinkThumb,
          },
        ]);
      } else {
        const favoriteList = getFavorites
          .filter((favorite: FavoriteRecipeType) => (
            favorite.id !== currentDrink?.idDrink));
        setFavorites(favoriteList);
      }
    }
  };

  const handleFinishBtn = () => {
    const dateNow = new Date().toISOString();
    if (path === 'meals') {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentMeal?.idMeal,
          nationality: currentMeal?.strArea || '',
          name: currentMeal?.strMeal,
          category: currentMeal?.strCategory || '',
          image: currentMeal?.strMealThumb,
          tags: currentMeal?.strTags ? currentMeal?.strTags.split(',') : [],
          alcoholicOrNot: '',
          type: 'meal',
          doneDate: dateNow,
        },
      ]);
    }
    if (path === 'drinks') {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentDrink?.idDrink,
          nationality: currentDrink?.strArea || '',
          name: currentDrink?.strDrink,
          category: currentDrink?.strCategory || '',
          image: currentDrink?.strDrinkThumb,
          tags: currentDrink?.strTags ? currentDrink?.strTags.split(',') : [],
          alcoholicOrNot: currentDrink?.strAlcoholic || '',
          type: 'drink',
          doneDate: dateNow,
        },
      ]);
    }
    navigate('/done-recipes');
  };

  return (
    <div>
      {pathname.includes('meals') ? (
        <MealInProgress
          currentMeal={ currentMeal }
          handleFavoriteBtn={ handleFavoriteBtn }
          handleIngredientCheck={ handleIngredientCheck }
          handleFinishBtn={ handleFinishBtn }
          isFavorite={ isFavorite }
          IngredientsList={ ingredientsMeal }
          mesureList={ mesureMeal }
          instructionsList={ instructionsMeal }
        />
      ) : (
        <DrinkInProgress
          currentDrink={ currentDrink }
          handleFavoriteBtn={ handleFavoriteBtn }
          handleIngredientCheck={ handleIngredientCheck }
          handleFinishBtn={ handleFinishBtn }
          isFavorite={ isFavorite }
          IngredientsList={ ingredientsDrink }
          mesureList={ mesureDrink }
          instructionsList={ instructionsDrink }
        />
      )}
    </div>
  );
}
export default RecipeInProgress;
