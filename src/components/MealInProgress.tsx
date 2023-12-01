import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../types';

function MealInProgress() {
  const { id } = useParams();
  const { meals } = useSelector((globalState: RootState) => globalState.mainReducer);
  const currentMeal = meals.find((meal) => meal.idMeal === id);

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
        >
          Favoritar
        </button>

        <button
          data-testid="share-btn"
        >
          Compartilhar
        </button>
      </div>
    </div>
  );
}

export default MealInProgress;
