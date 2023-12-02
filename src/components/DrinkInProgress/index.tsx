import { DrinkType } from '../../types';

type DrinkInProgressProps = {
  currentDrink: DrinkType | undefined;
  handleFavoriteBtn: () => void;
  handleShareBtn: () => void;
  handleIngredientCheck: (index: number) => void;
  handleFinishBtn: () => void;
  isFavorite: boolean;
  IngredientsList: string[][];
  mesureList: string[][];
  ingredientCheckedList: number[];
};

function DrinkInProgress({
  currentDrink,
  handleFavoriteBtn,
  handleShareBtn,
  handleIngredientCheck,
  handleFinishBtn,
  isFavorite,
  IngredientsList,
  mesureList,
  ingredientCheckedList,
}: DrinkInProgressProps) {
  return (
    <div>
      <h2 data-testid="recipe-title">
        { currentDrink?.strDrink }
      </h2>

      <h4 data-testid="recipe-category">
        { `Category: ${currentDrink?.strAlcoholic}` }
      </h4>

      <img src={ currentDrink?.strDrinkThumb } alt="Imagem da receita" />

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
        <p>{ currentDrink?.strInstructions }</p>
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

export default DrinkInProgress;
