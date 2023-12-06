import './MealInProgress.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, InProgressProps } from '../../types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';

function MealInProgress({
  currentMeal,
  handleFavoriteBtn,
  handleIngredientCheck,
  handleFinishBtn,
  isFavorite,
  IngredientsList,
  mesureList,
  instructionsList,
  ingredientCheckedList,
  savedIngredientsMeals,
}: InProgressProps) {
  const { allMeals } = useSelector((state: RootState) => state.mainReducer);
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;

  // const [getProgress] = useLocalStorage('inProgressRecipes');
  // const isChecked = (index: number) => {
  //   return Object
  //     .values(getProgress.meals)[0]
  //     .includes(index.toString());
  // };
  // // const ingredientsLocalStorage = Object
  // //   .values(getProgress.meals)[0] as string[] | undefined;

  // console.log(ingredientsLocalStorage);

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

  return (
    <div>
      {allMeals.length > 0 && currentMeal && IngredientsList.length > 0 && (
        <div>
          <h2 data-testid="recipe-title">
            { currentMeal.strMeal }
          </h2>

          <h4 data-testid="recipe-category">
            { `Category: ${currentMeal.strCategory}` }
          </h4>

          <img src={ currentMeal.strMealThumb } alt="Imagem da receita" />

          <div>
            <button
              onClick={ handleFavoriteBtn }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt={ isFavorite ? 'Black heart icon' : 'White heart icon' }
              />
            </button>

            <button
              data-testid="share-btn"
              onClick={ handleShareBtn }
            >
              <img src="/src/images/shareIcon.svg" alt="Share icon" />
            </button>

            {isCopied && <p>Link copied!</p>}
          </div>

          <div data-testid="instructions">
            <h4>Ingredients List</h4>

            {IngredientsList.map((ingredient, index) => (
              <div key={ index }>
                <input
                  type="checkbox"
                  id={ `${index}` }
                  onChange={ () => handleIngredientCheck(index) }
                  checked={
                    ingredientCheckedList.includes(index.toString())
                  }
                />
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ `${index}` }
                  className={
                ingredientCheckedList.includes(index.toString()) ? 'checked' : undefined
                  }
                >
                  {`${ingredient[1]}: ${mesureList[index][1]}`}
                </label>
              </div>
            ))}

            <h4>Instructions</h4>
            {instructionsList.map((instruction, index) => (
              <p key={ index }>
                { instruction[1] }
                <br />
              </p>
            ))}
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
      )}
    </div>
  );
}

export default MealInProgress;
