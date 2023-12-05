import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { FavoriteRecipes, RootState } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import { fetchAllCocktails } from '../utils/apiDrinks';
import { fetchAllMeals } from '../utils/apiMeals';
import { AllDrinksAction, AllMealsAction } from '../redux/actions/actions';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.includes('meals') ? 'meals' : 'drinks';
  const navigate = useNavigate();
  const { idDaReceita } = useParams();
  const { allMeals, allDrinks } = useSelector(
    (globalState: RootState) => globalState.mainReducer,
  );
  const currentMeal = allMeals.find((meal) => meal.idMeal === idDaReceita);
  const currentDrink = allDrinks.find((drink) => drink.idDrink === idDaReceita);

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes');
  const [getProgress, setProgress] = useLocalStorage('inProgressRecipes');
  const [getDoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes');

  const [isFavorite, setIsFavorite] = useState(false);
  const [IngredientsList, setIngredientsList] = useState<[string, string][]>([]);
  const [mesureList, setMesureList] = useState<[string, string][]>([]);
  const [instructionsList, setInstructionsList] = useState<[string, string][]>([]);
  const [ingredientCheckedList, setIngredientCheckedList] = useState<number[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = window.location.href;

  const checkFavorite = (recepeId: string) => {
    return getFavorites
      .some((favorite: FavoriteRecipes) => favorite.id === recepeId);
  };

  useEffect(() => {
    fetchAllMeals().then((data) => dispatch(AllMealsAction(data)));
    fetchAllCocktails().then((data) => dispatch(AllDrinksAction(data)));
    if (currentMeal) {
      const details = Object.entries(currentMeal);
      const Ingredients = details
        .filter((detail) => detail[0].includes('strIngredient') && detail[1] !== null);
      setIngredientsList(Ingredients);

      const mesure = details.filter((detail) => detail[0].includes('strMeasure'));
      setMesureList(mesure);

      const instructions = details
        .filter((detail) => detail[0].includes('strInstructions') && detail[1] !== null);
      setInstructionsList(instructions);
    }
    if (currentDrink) {
      const details = Object.entries(currentDrink);
      const Ingredients = details
        .filter((detail) => detail[0].includes('strIngredient') && detail[1] !== null);
      setIngredientsList(Ingredients);

      const mesure = details.filter((detail) => detail[0].includes('strMeasure'));
      setMesureList(mesure);

      const instructions = details
        .filter((detail) => detail[0].includes('strInstructions') && detail[1] !== null);
      setInstructionsList(instructions);
    }
  }, []);

  const handleIngredientCheck = (index: number) => {
    if (currentMeal) {
      const savedIngredients = getProgress.meals[currentMeal?.idMeal];

      if (!savedIngredients.includes(index)) {
        setIngredientCheckedList([
          ...savedIngredients,
          index,
        ]);
      } else {
        const list = savedIngredients
          .filter((ingredient: number) => ingredient !== index);
        setIngredientCheckedList(list);
      }

      setProgress({
        meals: {
          ...getProgress,
          [currentMeal?.idMeal]: savedIngredients.includes(index) ? (
            savedIngredients.filter((ingredient: number) => ingredient !== index)
          ) : (
            [...ingredientCheckedList, index]
          ),
        },
      });
    }
    if (currentDrink) {
      const savedIngredients = getProgress.meals[currentDrink?.idDrink];

      if (!savedIngredients.includes(index)) {
        setIngredientCheckedList([
          ...savedIngredients,
          index,
        ]);
      } else {
        const list = savedIngredients
          .filter((ingredient: number) => ingredient !== index);
        setIngredientCheckedList(list);
      }

      setProgress({
        meals: {
          ...getProgress,
          [currentDrink?.idDrink]: savedIngredients.includes(index) ? (
            savedIngredients.filter((ingredient: number) => ingredient !== index)
          ) : (
            [...ingredientCheckedList, index]
          ),
        },
      });
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

  const handleFinishBtn = () => {
    if (!getDoneRecipes.includes(currentMeal?.idMeal)) {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentMeal?.idMeal,
          type: 'meal',
          area: currentMeal?.strArea,
          category: currentMeal?.strCategory,
          alcoholicOrNot: '',
          name: currentMeal?.strMeal,
          image: currentMeal?.strMealThumb,
          doneDate: new Date().toLocaleDateString(),
          tags: currentMeal?.strTags ? currentMeal?.strTags.split(',') : [],
        },
      ]);
    }
    if (!getDoneRecipes.includes(currentDrink?.idDrink)) {
      setDoneRecipes([
        ...getDoneRecipes,
        {
          id: currentDrink?.idDrink,
          type: 'drink',
          area: currentDrink?.strArea,
          category: '',
          alcoholicOrNot: currentDrink?.strAlcoholic,
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
          handleShareBtn={ handleShareBtn }
          handleIngredientCheck={ handleIngredientCheck }
          handleFinishBtn={ handleFinishBtn }
          isFavorite={ isFavorite }
          IngredientsList={ IngredientsList }
          mesureList={ mesureList }
          instructionsList={ instructionsList }
          ingredientCheckedList={ ingredientCheckedList }
          isCopied={ isCopied }
        />
      ) : (
        <DrinkInProgress
          currentDrink={ currentDrink }
          handleFavoriteBtn={ handleFavoriteBtn }
          handleShareBtn={ handleShareBtn }
          handleIngredientCheck={ handleIngredientCheck }
          handleFinishBtn={ handleFinishBtn }
          isFavorite={ isFavorite }
          IngredientsList={ IngredientsList }
          mesureList={ mesureList }
          instructionsList={ instructionsList }
          ingredientCheckedList={ ingredientCheckedList }
          isCopied={ isCopied }
        />
      )}
    </div>
  );
}
export default RecipeInProgress;
