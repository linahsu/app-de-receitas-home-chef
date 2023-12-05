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
    <div>
      {allMeals.length > 0 && Object.keys(detailsDrink).length > 0 && (
        <>
          <img
            src={ detailsDrink.strDrinkThumb }
            alt="Foto da bebida"
            data-testid="recipe-photo"
            style={ { width: '300px' } }
          />
          <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
          <p data-testid="recipe-category">{detailsDrink.strAlcoholic}</p>

          <h3>Ingredientes</h3>
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
          <h3>Instruções</h3>
          <section>
            <h4 data-testid="instructions">
              {detailsDrink.strInstructions
                  && detailsDrink.strInstructions.split('\r\n').map((text, index) => (
                    <p key={ index }>
                      {text}
                      <br />
                    </p>
                  ))}
            </h4>
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
                onClick={
                  () => navigate(`/drinks/${detailsDrink.idDrink}/in-progress`)
                }
              >
                { buttonText }
              </button>

            )
            : <p />}

          <RecommendedRecipes />
          <Footer />
        </>
      )}
    </div>
  );
}
