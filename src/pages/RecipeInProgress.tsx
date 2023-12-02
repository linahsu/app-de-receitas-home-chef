import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { FavoriteRecipes, RootState } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const path = pathname.includes('meals') ? 'meals' : 'drinks';
  const navigate = useNavigate();
  const { id } = useParams(); // alterar o "id" pelo nome que ficou na rota
  const { meals, drinks } = useSelector(
    (globalState: RootState) => globalState.mainReducer,
  ); // Alterar para allMeals e allDrinks
  const currentMeal = meals.find((meal) => meal.idMeal === id);
  const currentDrink = drinks.find((drink) => drink.idDrink === id);

  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes');
  const [getProgress, setProgress] = useLocalStorage('inProgressRecipes');
  const [getDoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes');

  const [isFavorite, setIsFavorite] = useState(false);
  const [IngredientsList, setIngredientsList] = useState<[string, string][]>([]);
  const [mesureList, setMesureList] = useState<[string, string][]>([]);
  const [ingredientCheckedList, setIngredientCheckedList] = useState<number[]>([]);

  const currentUrl = window.location.href;

  useEffect(() => {
    if (currentMeal) {
      const details = Object.entries(currentMeal);
      const Ingredients = details.filter((detail) => detail[0].includes('strIngredient'));
      setIngredientsList(Ingredients);
      const mesure = details.filter((detail) => detail[0].includes('strMeasure'));
      setMesureList(mesure);
    }
    if (currentDrink) {
      const details = Object.entries(currentDrink);
      const Ingredients = details.filter((detail) => detail[0].includes('strIngredient'));
      setIngredientsList(Ingredients);
      const mesure = details.filter((detail) => detail[0].includes('strMeasure'));
      setMesureList(mesure);
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
    if (!getFavorites.includes(currentMeal?.idMeal) && path === 'meals') {
      setFavorites([
        ...getFavorites,
        {
          id: currentMeal?.idMeal,
          type: 'meal',
          nationality: currentMeal?.strArea,
          category: currentMeal?.strCategory,
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

    if (!getFavorites.includes(currentDrink?.idDrink) && path === 'drinks') {
      setFavorites([
        ...getFavorites,
        {
          id: currentDrink?.idDrink,
          type: 'drink',
          nationality: currentDrink?.strArea,
          category: '',
          alcoholicOrNot: currentDrink?.strAlcoholic,
          name: currentDrink?.strDrink,
          image: currentDrink?.strDrinkThumb,
        },
      ]);
    } else {
      const favoriteList = getFavorites
        .filter((favorite: FavoriteRecipes) => favorite.id !== currentDrink?.idDrink);
      setFavorites(favoriteList);
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
          ingredientCheckedList={ ingredientCheckedList }
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
          ingredientCheckedList={ ingredientCheckedList }
        />
      )}
    </div>
  );
}
export default RecipeInProgress;
