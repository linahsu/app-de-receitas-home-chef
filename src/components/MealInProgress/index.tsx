import './MealInProgress.css';
import { MealType } from '../../types';

type MealInProgressProps = {
  currentMeal: MealType | undefined;
  handleFavoriteBtn: () => void;
  handleShareBtn: () => void;
  handleIngredientCheck: (index: number) => void;
  handleFinishBtn: () => void;
  isFavorite: boolean;
  IngredientsList: string[][];
  mesureList: string[][];
  ingredientCheckedList: number[];
};

function MealInProgress({
  currentMeal,
  handleFavoriteBtn,
  handleShareBtn,
  handleIngredientCheck,
  handleFinishBtn,
  isFavorite,
  IngredientsList,
  mesureList,
  ingredientCheckedList,
}: MealInProgressProps) {
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
          onClick={ handleFavoriteBtn }
        >
          {!isFavorite ? (
            <img src="src/images/whiteHeartIcon.svg" alt="" />
          ) : (
            <img src="src/images/blackHeartIcon.svg" alt="" />
          )}
        </button>

        <button
          data-testid="share-btn"
          onClick={ handleShareBtn }
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
              className={
                ingredientCheckedList.includes(index) ? 'checked' : undefined
              }
            >
              {`${ingredient[1]}: ${mesureList[index][1]}`}
            </label>
          </div>
        ))}

        <h4>Instructions</h4>
        <p>{ currentMeal?.strInstructions }</p>
      </div>

      <button
        data-testid="finish-recipe-btn"
        disabled={ ingredientCheckedList.length !== IngredientsList.length }
        className="finish-recipe-btn"
        onClick={ handleFinishBtn }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealInProgress;
