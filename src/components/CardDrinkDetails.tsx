import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

type CardDrinksDetailsProps = {
  handleFavoriteBtn: () => void,
  handleshareBtn: () => void,
  isFavorite: boolean,
  isCopied: boolean,
  hideButton: boolean,
  buttonText: string,
};

export default function CardDrinkDetails({
  handleFavoriteBtn,
  handleshareBtn,
  isFavorite,
  isCopied,
  hideButton,
  buttonText,
}: CardDrinksDetailsProps) {
  const { detailsDrink, allMeals } = useSelector((state: RootState) => state.mainReducer);
  const navigate = useNavigate();

  return (
    <div className="drink-page-body">
      {allMeals.length > 0 && Object.keys(detailsDrink).length > 0 && (
        <div>
          <div className="details-title-and-btns">

            <div className="details-recipe-name">
              <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
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
                onClick={ handleshareBtn }
              >
                <img src="/src/images/shareIcon.svg" alt="Share icon" />
              </button>

              {isCopied && <p className={ isCopied && 'copied' }>Link copied!</p>}
            </div>
          </div>

          <div className="details-img-and-category">
            <div className="details-start-recipe">
              {!hideButton
                ? (
                  <button
                    data-testid="start-recipe-btn"
                    onClick={
                      () => navigate(`/drinks/${detailsDrink.idDrink}/in-progress`)
                    }
                  >
                    {buttonText}
                    <img
                      src="/src/images/startRecipeArrowBS.svg"
                      alt="Arrow >"
                      width="14"
                    />
                  </button>

                )
                : <p />}
            </div>
            <img
              src={ detailsDrink.strDrinkThumb }
              alt="Foto da bebida"
              data-testid="recipe-photo"
              style={ { width: '360px' } }
            />

            <div className="details-category-container">
              <p data-testid="recipe-category">{detailsDrink.strAlcoholic}</p>
            </div>

          </div>

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
              <ol>
                {Object.entries(detailsDrink)
                  .filter(([key, value]) => key.startsWith('strIngredient') && value)
                  .map(([ingredientKey, ingredientValue], index) => (
                    <li
                      key={ ingredientKey }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${ingredientValue} 
                      (${detailsDrink[`strMeasure${ingredientKey.slice(13)}`]}) `}
                    </li>
                  ))}
              </ol>
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
              <p data-testid="instructions">
                {detailsDrink.strInstructions
                  && detailsDrink.strInstructions.split('\r\n').map((text, index) => (
                    <p key={ index }>
                      {text}
                      <br />
                    </p>
                  ))}
              </p>
              <hr />
            </section>
          </div>

          <RecommendedRecipes />
          <Footer />
        </div>
      )}
    </div>
  );
}
