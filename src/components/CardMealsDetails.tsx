import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

type CardMealsDetailsProps = {
  handleFavoriteBtn: () => void,
  handleshareBtn: () => void,
  isFavorite: boolean,
  isCopied: boolean,
  hideButton: boolean,
  buttonText: string,
};

export default function CardMealsDetails({
  handleFavoriteBtn,
  handleshareBtn,
  isFavorite,
  isCopied,
  hideButton,
  buttonText,
}: CardMealsDetailsProps) {
  const { detailsMeal, allDrinks } = useSelector((state: RootState) => state.mainReducer);
  const navigate = useNavigate();

  return (
    <div className="meal-page-body">
      {allDrinks.length > 0 && Object.keys(detailsMeal).length > 0 && (
        <div>
          <div className="details-title-and-btns">

            <div className="details-recipe-name">
              <h2 data-testid="recipe-title">{detailsMeal.strMeal}</h2>
            </div>

            <div className="favorite-and-share-btn">
              <hr />
              <button
                // data-testid="favorite-btn"
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
                    onClick={ () => navigate(`/meals/${detailsMeal.idMeal}/in-progress`) }
                  >
                    { buttonText }
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
              src={ detailsMeal.strMealThumb }
              alt="Foto da comida"
              data-testid="recipe-photo"
              style={ { width: '360px' } }
            />
            <div className="details-category-container">
              <p data-testid="recipe-category">{detailsMeal.strCategory}</p>
            </div>

          </div>

          <div className="details-ingredients">
            <h3>
              Ingredients
              <img src="/src/images/mealsIngredients.svg" alt="" width="23" />
            </h3>
            <div className="details-ingredient-list">
              <ol>
                {Object.entries(detailsMeal)
                  .filter(([key, value]) => key.startsWith('strIngredient') && value)
                  .map(([ingredientKey, ingredientValue], index) => (
                    <li
                      key={ ingredientKey }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${ingredientValue}
                      (${detailsMeal[`strMeasure${ingredientKey.slice(13)}`]}) `}
                    </li>
                  ))}
              </ol>
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
              <p data-testid="instructions">
                {detailsMeal.strInstructions
                    && detailsMeal.strInstructions.split('\r\n').map((text, index) => (
                      <p key={ index }>
                        {text}
                        <br />
                      </p>
                    ))}
              </p>

              <hr />
            </section>
          </div>

          <section className="details-video">
            <h3>Watch this video:</h3>

            { detailsMeal.strYoutube
              && <iframe
                src={ `https://www.youtube.com/embed/${detailsMeal.strYoutube.split('v=')[1]}` }
                width="360"
                height="200"
                title="YouTube Video"
                allow="accelerometer;
                autoplay;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowFullScreen
                data-testid="video"
              />}

          </section>

          <RecommendedRecipes />
          <Footer />
        </div>
      )}
    </div>
  );
}
