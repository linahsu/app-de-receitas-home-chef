import './DrinkInProcess.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState, InProgressProps } from '../../types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkInProgress({
  currentDrink,
  handleFavoriteBtn,
  handleIngredientCheck,
  handleFinishBtn,
  isFavorite,
  IngredientsList,
  mesureList,
  instructionsList,
  getProgress,
}: InProgressProps) {
  const { detailsDrink } = useSelector((state: RootState) => state.mainReducer);
  const { pathname } = useLocation();
  const [, , id] = pathname.split('/');
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;
  const recipeUrl = currentUrl.split('/in-progress')[0];

  const isCheckedList = getProgress?.drinks[id] ? getProgress.drinks[id] : [];

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
    <div>
      {detailsDrink.idDrink && currentDrink && IngredientsList.length > 0 && (
        <div>
          <div className="details-title-and-btns">

            <div className="details-recipe-name">
              <h2 data-testid="recipe-title">
                { currentDrink.strDrink }
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
              src={ currentDrink.strDrinkThumb }
              alt="Imagem da receita"
              data-testid="recipe-photo"
              style={ { width: '360px' } }
            />

            <div className="details-category-container">
              <p data-testid="recipe-category">
                {currentDrink.strAlcoholic}
              </p>
            </div>

          </div>

          <div data-testid="instructions">
            <div className="details-ingredients">
              <h3>
                Ingredients
                <img
                  src="/src/images/drinksIngredients.svg"
                  alt="Ingredients icon"
                  width="20"
                />
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
                  src="/src/images/drinksInstructions.svg"
                  alt="Cocktail icon"
                  className="drink-instructions-icon"
                  width="20"
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

export default DrinkInProgress;
