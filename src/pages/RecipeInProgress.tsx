import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { FavoriteRecipes, MealType, DrinkType, RootState } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import { fetchAllCocktails } from '../utils/apiDrinks';
import { fetchAllMeals } from '../utils/apiMeals';
import { AllDrinksAction, AllMealsAction } from '../redux/actions/actions';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [, path, id] = pathname.split('/');
  const navigate = useNavigate();
  const { allMeals, allDrinks } = useSelector(
    (globalState: RootState) => globalState.mainReducer,
  );
  const currentMeal = allMeals.find((meal) => meal.idMeal === id);
  const currentDrink = allDrinks.find((drink) => drink.idDrink === id);

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [
    getProgress, setProgress,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
  const [getDoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);

  const [isFavorite, setIsFavorite] = useState(false);

  const [ingredientCheckedList, setIngredientCheckedList] = useState<string[]>([]);
  const [savedIngredientsMeals, setSavedIngredientsMeals] = useState<string[]>([]);
  const [savedIngredientsDrinks, setSavedIngredientsDrinks] = useState<string[]>([]);

  const checkFavorite = (recepeId: string) => {
    return getFavorites
      .some((favorite: FavoriteRecipes) => favorite.id === recepeId);
  };

  const createRecipeLists = (currentRecipe: MealType | DrinkType | undefined) => {
    const details = Object.entries(currentRecipe || {});
    const ingredients = details
      .filter((detail) => detail[0].includes('strIngredient') && detail[1] !== '');

    const mesure = details.filter((detail) => detail[0].includes('strMeasure'));

    const instructions = details
      .filter((detail) => detail[0].includes('strInstructions') && detail[1] !== '');

    return {
      ingredients,
      mesure,
      instructions,
    };
  };

  const {
    ingredients,
    mesure,
    instructions,
  } = createRecipeLists(currentMeal || currentDrink);

  useEffect(() => {
    if (path === 'meals') {
      fetchAllMeals().then((data) => dispatch(AllMealsAction(data)));
      return checkFavorite(id) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
    if (path === 'drinks') {
      fetchAllCocktails().then((data) => dispatch(AllDrinksAction(data)));
      return checkFavorite(id) ? (
        setIsFavorite(true)
      ) : (
        setIsFavorite(false)
      );
    }
  }, []);

  const ingredientCheck = (
    place: string,
    currentRecipe: any,
    idRecepe: string,
    index: number,
  ) => {
    setIngredientCheckedList(getProgress[place][currentRecipe?.[idRecepe]]);

    if (!ingredientCheckedList?.includes(index.toString())) {
      setIngredientCheckedList([
        ...ingredientCheckedList,
        index.toString(),
      ]);
    } else {
      const list = ingredientCheckedList
        .filter((ingredient: string) => ingredient !== index.toString());
      setIngredientCheckedList(list);
    }
    console.log(ingredientCheckedList);

    setProgress({
      ...getProgress,
      meals: {
        ...getProgress.meals,
        [currentRecipe?.[idRecepe]]: [...ingredientCheckedList, index.toString()],
      },
    });
  };

  const handleIngredientCheck = (index: number) => {
    if (currentMeal) {
      ingredientCheck('meals', currentMeal, 'idMeal', index);
      setSavedIngredientsMeals(getProgress.meals[currentMeal?.idMeal]);
    }
    if (currentDrink) {
      ingredientCheck('drinks', currentDrink, 'idDrink', index);
      setSavedIngredientsDrinks(getProgress.drinks[currentDrink?.idDrink]);
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
          .filter((favorite: FavoriteRecipes) => favorite.id !== currentMeal?.idMeal);
        setFavorites(favoriteList);
      }
    }

    if (currentDrink?.idDrink && path === 'drinks') {
      console.log('teste');
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
          .filter((favorite: FavoriteRecipes) => favorite.id !== currentDrink?.idDrink);
        setFavorites(favoriteList);
      }
    }
  };

  const handleFinishBtn = () => {
    if (path === 'meals') {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentMeal?.idMeal,
          type: 'meal',
          nationality: currentMeal?.strArea || '',
          category: currentMeal?.strCategory || '',
          alcoholicOrNot: '',
          name: currentMeal?.strMeal,
          image: currentMeal?.strMealThumb,
          doneDate: new Date().toLocaleDateString(),
          tags: currentMeal?.strTags ? currentMeal?.strTags.split(',') : [],
        },
      ]);
    }
    if (path === 'drinks') {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentDrink?.idDrink,
          type: 'drink',
          nationality: currentDrink?.strArea || '',
          category: currentDrink?.strCategory || '',
          alcoholicOrNot: currentDrink?.strAlcoholic || '',
          name: currentDrink?.strDrink,
          image: currentDrink?.strDrinkThumb,
          doneDate: new Date().toLocaleDateString(),
          tags: currentDrink?.strTags ? currentDrink?.strTags.split(',') : [],
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
          IngredientsList={ ingredients }
          mesureList={ mesure }
          instructionsList={ instructions }
          ingredientCheckedList={ ingredientCheckedList }
          savedIngredientsMeals={ savedIngredientsMeals }
        />
      ) : (
        <DrinkInProgress
          currentDrink={ currentDrink }
          handleFavoriteBtn={ handleFavoriteBtn }
          handleIngredientCheck={ handleIngredientCheck }
          handleFinishBtn={ handleFinishBtn }
          isFavorite={ isFavorite }
          IngredientsList={ ingredients }
          mesureList={ mesure }
          instructionsList={ instructions }
          ingredientCheckedList={ ingredientCheckedList }
          savedIngredientsDrinks={ savedIngredientsDrinks }
        />
      )}
    </div>
  );
}
export default RecipeInProgress;
