import { useSelector } from 'react-redux';
import { RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';
import './ButtonStartRecipe.css';

type CardMealsDetailsProps = {
  handleFavoriteBtn: () => void,
  handleshareBtn: () => void,
  isFavorite: boolean,
  isCopied: boolean,
};

export default function CardMealsDetails({
  handleFavoriteBtn,
  handleshareBtn,
  isFavorite,
  isCopied,
}: CardMealsDetailsProps) {
  const { detailsMeal, allDrinks } = useSelector((state: RootState) => state.mainReducer);
  return (
    <div>
      {allDrinks.length > 0 && Object.keys(detailsMeal).length > 0 && (
        <>
          <img
            src={ detailsMeal.strMealThumb }
            alt="Foto da comida"
            data-testid="recipe-photo"
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
            data-testid="favorite-btn"
            onClick={ handleFavoriteBtn }
          >
            {isFavorite ? (
              <img src="/src/images/blackHeartIcon.svg" alt="Black heart" />
            ) : (
              <img src="/src/images/whiteHeartIcon.svg" alt="White heart" />
            )}
          </button>

          <button
            data-testid="share-btn"
            onClick={ handleshareBtn }
          >
            <img src="/src/images/shareIcon.svg" alt="Share icon" />
          </button>

          {isCopied && <p>Link copied!</p>}

          <RecommendedRecipes />
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
          <Footer />
        </>
      )}
    </div>
  );
}
