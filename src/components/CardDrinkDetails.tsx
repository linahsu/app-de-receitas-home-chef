import { useSelector } from 'react-redux';
import { RootState } from '../types';
import RecommendedRecipes from './RecommendedRecipes/RecommendedRecipes';
import Footer from './Footer';

export default function CardDrinkDetails() {
  const { detailsDrink, allMeals } = useSelector((state: RootState) => state.mainReducer);
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
