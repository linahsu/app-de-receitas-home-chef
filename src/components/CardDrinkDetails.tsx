import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoneRecipes, RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';
import useLocalStorage from '../hooks/useLocalStorage';

type CardDrinksDetailsProps = {
  handleFavoriteBtn: () => void,
  handleshareBtn: () => void,
  isFavorite: boolean,
  isCopied: boolean,
};

export default function CardDrinkDetails({
  handleFavoriteBtn,
  handleshareBtn,
  isFavorite,
  isCopied,
}: CardDrinksDetailsProps) {
  const { detailsDrink, allMeals } = useSelector((state: RootState) => state.mainReducer);
  const navigate = useNavigate();

  const [hideButton, setHideButton] = useState(false);
  const [buttonText, setButtonText] = useState('Start Recipe');

  const doneRecipes = useLocalStorage('doneRecipes')[0];
  const inProgressRecipes = useLocalStorage('inProgressRecipes')[0];

  const isDrinkDone = () => {
    setHideButton(
      doneRecipes.some((recipe: DoneRecipes) => recipe.id === detailsDrink.idDrink),
    );
  };

  const isDrinkInProgress = () => {
    if (Object.keys(inProgressRecipes.drinks).includes(detailsDrink.idDrink)) {
      setButtonText('Continue Recipe');
    } else {
      setButtonText('Start Recipe');
    }
  };

  useEffect(() => {
    if (doneRecipes) {
      isDrinkDone();
    }
    if (inProgressRecipes) {
      isDrinkInProgress();
    }
  }, [detailsDrink]);

  return (
    <div>
      {allMeals.length > 0 && Object.keys(detailsDrink).length > 0 && (
        <>
          <img
            src={ detailsDrink.strDrinkThumb }
            alt="Foto da bebida"
            data-testid="recipe-photo"
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
