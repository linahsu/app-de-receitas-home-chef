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
    <div>
      {allDrinks.length > 0 && Object.keys(detailsMeal).length > 0 && (
        <div>
          <img
            src={ detailsMeal.strMealThumb }
            alt="Foto da comida"
            data-testid="recipe-photo"
            style={ { width: '300px' } }
          />
          <h2 data-testid="recipe-title">{detailsMeal.strMeal}</h2>
          <p data-testid="recipe-category">{detailsMeal.strCategory}</p>

          <h3>Ingredients</h3>
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
          <h3>Instructions</h3>
          <section>
            <h4 data-testid="instructions">
              {detailsMeal.strInstructions
                  && detailsMeal.strInstructions.split('\r\n').map((text, index) => (
                    <p key={ index }>
                      {text}
                      <br />
                    </p>
                  ))}
            </h4>
          </section>
          <h3>Watch this Vídeo</h3>
          <section>
            { detailsMeal.strYoutube
              && <iframe
                src={ `https://www.youtube.com/embed/${detailsMeal.strYoutube.split('v=')[1]}` }
                width="auto"
                height="auto"
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

          <button
            // data-testid="favorite-btn"
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
            onClick={ handleshareBtn }
          >
            <img src="/src/images/shareIcon.svg" alt="Share icon" />
          </button>

          {isCopied && <p>Link copied!</p>}

          {!hideButton
            ? (
              <button
                className="start-recipe-btn"
                data-testid="start-recipe-btn"
                onClick={ () => navigate(`/meals/${detailsMeal.idMeal}/in-progress`) }
              >
                { buttonText }
              </button>

            )
            : <p />}

          <RecommendedRecipes />
          <Footer />
        </div>
      )}
    </div>
  );
}
