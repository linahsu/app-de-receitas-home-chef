import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DoneRecipes, RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function CardMealsDetails() {
  const { detailsMeal, allDrinks } = useSelector((state: RootState) => state.mainReducer);
  const navigate = useNavigate();

  const [hideButton, setHideButton] = useState(false);
  const [buttonText, setButtonText] = useState('Start Recipe');

  const doneRecipes = useLocalStorage('doneRecipes')[0];
  const inProgressRecipes = useLocalStorage('inProgressRecipes')[0];

  const isMealDone = () => {
    setHideButton(
      doneRecipes.some((recipe: DoneRecipes) => recipe.id === detailsMeal.idMeal),
    );
  };

  const isMealInProgress = () => {
    // if (Object.keys(inProgressRecipes.drinks).includes(detailsDrink.idDrink))
    if (Object.keys(inProgressRecipes.meals).includes(detailsMeal.idMeal)) {
      setButtonText('Continue Recipe');
    } else {
      setButtonText('Start Recipe');
    }
  };

  useEffect(() => {
    if (doneRecipes) {
      isMealDone();
    }
    if (inProgressRecipes) {
      isMealInProgress();
    }
  }, [detailsMeal]);

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
          {
            !hideButton
              ? (
                <button
                  className="start-recipe-btn"
                  data-testid="start-recipe-btn"
                  onClick={() => navigate(`/meals/${detailsMeal.idMeal}/in-progress`)}
                >
                  { buttonText }
                </button>

              )
              : <p />
          }
          <RecommendedRecipes />
          <Footer />
        </>
      )}
    </div>
  );
}
