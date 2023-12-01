import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../types';

function MealInProgress() {
  const { id } = useParams();
  const { meals } = useSelector((globalState: RootState) => globalState.mainReducer);
  const currentMeal = meals.find((meal) => meal.idMeal === id);

  const [isFavorite, setIsFavorite] = useState(false);

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
          onClick={ () => setIsFavorite(!isFavorite) }
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
    </div>
  );
}

export default MealInProgress;
