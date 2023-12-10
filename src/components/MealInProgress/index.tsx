import './MealInProgress.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState, InProgressProps } from '../../types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function MealInProgress({
  currentMeal,
  handleFavoriteBtn,
  handleIngredientCheck,
  handleFinishBtn,
  isFavorite,
  IngredientsList,
  mesureList,
  instructionsList,
  getProgress,
}: InProgressProps) {
  const { detailsMeal } = useSelector((state: RootState) => state.mainReducer);
  const { pathname } = useLocation();
  const [, , id] = pathname.split('/');
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;
  const recipeUrl = currentUrl.split('/in-progress')[0];

  const isCheckedList = getProgress?.meals[id] ? getProgress.meals[id] : [];

  const handleShareBtn = () => {
    try {
      navigator.clipboard.writeText(recipeUrl);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy:', error);
      window.alert('Failed to copy the link!');
      setIsCopied(false);
    }
  };

  return (
    <div className="meal-page-body">
      {detailsMeal.idMeal && currentMeal && IngredientsList.length > 0 && (
        <div>
          <div className="details-title-and-btns">

            <div className="details-recipe-name">
              <h2 data-testid="recipe-title">
                {currentMeal.strMeal}
              </h2>
            </div>

            <div className="favorite-and-share-btn">
              <hr />
              <button
                onClick={ handleFavoriteBtn }
              >
                <img
                  data-testid="favorite-btn"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt={ isFavorite ? 'Black heart icon' : 'White heart icon' }
                  className={ isFavorite ? 'favorited' : 'not-favorited' }
                />
              </button>

              <button
                data-testid="share-btn"
                onClick={ handleShareBtn }
              >
                <img src="/src/images/shareIcon.svg" alt="Share icon" />
              </button>

              {isCopied && <p className={ isCopied && 'copied' }>Link copied!</p>}
            </div>
          </div>

          <div className="details-img-and-category">
            <img
              src={ currentMeal.strMealThumb }
              alt="Imagem da receita"
              data-testid="recipe-photo"
              style={ { width: '360px' } }
            />

            <div className="details-category-container">
              <p data-testid="recipe-category">
                {currentMeal.strCategory}
              </p>
            </div>

          </div>

          <div data-testid="instructions">
            <div className="details-ingredients">
              <h3>
                Ingredients
                <img src="/src/images/mealsIngredients.svg" alt="" width="23" />
              </h3>

              <div className="details-ingredient-list">
                {IngredientsList.map((ingredient, index) => (
                  <div
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                    className={
                      isCheckedList.includes(index.toString()) ? 'checked' : undefined
                    }
                  >
                    <input
                      type="checkbox"
                      id={ `${index}` }
                      onChange={ () => handleIngredientCheck(index) }
                      checked={ isCheckedList.includes(index.toString()) }
                    />
                    <label
                      htmlFor={ `${index}` }
                    >
                      {`${ingredient[1]}: ${mesureList[index][1]}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="details-instructions">
              <h3>
                Instructions
                <img
                  src="/src/images/mealsInstructions.svg"
                  alt="Frying pan"
                  className="meal-instructions-icon"
                  width="29"
                />
              </h3>

              <section>
                {instructionsList.map((instruction, index) => (
                  <p key={ index }>
                    {instruction[1]}
                    <br />
                  </p>
                ))}

                <hr />
              </section>
            </div>

          </div>

          <div
            className="in-progress-finish-btn"
          >
            <button
              data-testid="finish-recipe-btn"
              disabled={ isCheckedList.length !== IngredientsList.length }
              className="finish-recipe-btn"
              onClick={ handleFinishBtn }
            >
              {
              isCheckedList.length === IngredientsList.length
                ? <img
                    src="/src/images/checkBS.svg"
                    alt="Check"
                    width="40"
                    className="finish-recipe-img"
                />
                : <img
                    src="/src/images/threeDotsBS.svg"
                    alt="Check"
                    width="40"
                    className="not-finished-recipe-img"
                />
            }
              <p
                className={
                  (isCheckedList.length === IngredientsList.length)
                    ? 'finish-recipe-text' : 'not-finished-recipe-text'
                }
              >
                Finish Recipe
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealInProgress;
