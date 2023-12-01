import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { input } from '@testing-library/user-event/dist/types/event';

function MealInProgress() {
  const { id } = useParams();
  const { meals } = useSelector((globalState: RootState) => globalState.mainReducer);
  const currentMeal = meals.find((meal) => meal.idMeal === id);
  const [storedValue, setValue] = useLocalStorage('favoriteRecipes');

  const [isFavorite, setIsFavorite] = useState(false);
  const [IngredientsList, setIngredientsList] = useState<[string, string][]>([]);
  const [mesureList, setMesureList] = useState<[string, string][]>([]);

  useEffect(() => {
    if (currentMeal) {
      const details = Object.entries(currentMeal);
      const Ingredients = details.filter((detail) => detail[0].includes('strIngredient'));
      setIngredientsList(Ingredients);
      const mesure = details.filter((detail) => detail[0].includes('strMeasure'));
      setMesureList(mesure);
    }
  }, []);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setValue([
      ...storedValue,
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
            <input type="checkbox" id={ `${index}` } />
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}` }
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
