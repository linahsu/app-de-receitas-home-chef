import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { FavoriteRecipes, RootState } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

import './MealInProgress.css';

function MealInProgress() {
  const { id } = useParams();
  const { meals } = useSelector((globalState: RootState) => globalState.mainReducer);
  const currentMeal = meals.find((meal) => meal.idMeal === id);
  const [getFavorites, setFavorites] = useLocalStorage('favoriteRecipes');
  const [getProgress, setProgress] = useLocalStorage('inProgressRecipes');

  const [isFavorite, setIsFavorite] = useState(false);
  const [IngredientsList, setIngredientsList] = useState<[string, string][]>([]);
  const [mesureList, setMesureList] = useState<[string, string][]>([]);
  const [ingredientCheckedList, setIngredientCheckedList] = useState<number[]>([]);

  useEffect(() => {
    if (currentMeal) {
      const details = Object.entries(currentMeal);
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
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!getFavorites.includes(currentMeal?.idMeal)) {
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
  };

  return (
    <div>
      <h2 data-testid="recipe-title">
        { currentMeal?.strMeal }
      </h2>

      <h4 data-testid="recipe-category">
        { `Category: ${currentMeal?.strCategory}` }
      </h4>

      <img src={ currentMeal?.strMealThumb } alt="Imagem da receita" />

      <div>
        <button
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        >
          {!isFavorite ? (
            <img src="src/images/whiteHeartIcon.svg" alt="" />
          ) : (
            <img src="src/images/blackHeartIcon.svg" alt="" />
          )}
        </button>

        <button
          data-testid="share-btn"
        >
          <img src="src/images/shareIcon.svg" alt="Share Icon" />
        </button>
      </div>

      <div data-testid="instructions">
        <h4>Ingredients List</h4>

        {IngredientsList.map((ingredient, index) => (
          <div key={ index }>
            <input
              type="checkbox"
              id={ `${index}` }
              onClick={ () => handleIngredientCheck(index) }
            />
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}` }
              className={ getProgress.includes(index) ? 'checked' : undefined }
            >
              {`${ingredient[1]}: ${mesureList[index][1]}`}
            </label>
          </div>
        ))}

        <h4>Instructions</h4>
        <p>{ currentMeal?.strInstructions }</p>
      </div>
    </div>
  );
}

export default MealInProgress;
