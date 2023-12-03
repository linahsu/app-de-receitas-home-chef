import { useSelector } from 'react-redux';
import { useState } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { RootState } from '../../types';

import './RecommendedRecipes.css';

function RecommendedRecipes() {
  const [firstCardIndex, setFirstCardIndex] = useState(0); // estado que controla o indice do primeiro card
  const [secondCardIndex, setSecondCardIndex] = useState(1); // estado que controla o indice do segundo card

  const { allMeals, allDrinks, place } = useSelector((
    Globalstate: RootState,
  ) => Globalstate.mainReducer); // recupera do estado global

  const recommendedFood = allMeals.slice(0, 6); // pega os 6 primeiros elementos do array de comidas
  const recommendedDrinks = allDrinks.slice(0, 6); // pega os 6 primeiros elementos do array de bebidas

  // função que controla o botão de voltar, caso o indice do primeiro card seja maior que 0, ele diminui 2 do indice dos cards
  const handlePreviousBtn = () => {
    if (firstCardIndex > 0) {
      setFirstCardIndex(firstCardIndex - 2);
      setSecondCardIndex(secondCardIndex - 2);
    } else {
      setFirstCardIndex(0);
      setSecondCardIndex(1);
    }
  };

  // função que controla o botão de avançar, caso o indice do primeiro card seja menor que 4, ele aumenta 2 do indice dos cards
  const handleNextBtn = () => {
    if (firstCardIndex < 4) {
      setFirstCardIndex(firstCardIndex + 2);
      setSecondCardIndex(secondCardIndex + 2);
    } else {
      setFirstCardIndex(4);
      setSecondCardIndex(5);
    }
  };

  if (!recommendedFood.length && !recommendedDrinks.length) {
    return (
      <span>
        Carregando...
      </span>
    );
  }

  return (
    <div className="container">
      <h2>Boost your recipe with this recommendations!</h2>
      <section className="carousel-container">

        <button onClick={ handlePreviousBtn }>
          <VscChevronLeft />
        </button>

        <div className="carousel">
          <div
            className="carousel-card"
          >
            { place === 'meals' ? (
              <div data-testid={ `${firstCardIndex}-recommendation-card` }>
                <h3 data-testid={ `${firstCardIndex}-recommendation-title` }>
                  { recommendedDrinks[firstCardIndex]?.strDrink }
                </h3>
                <img
                  src={ recommendedDrinks[firstCardIndex]?.strDrinkThumb }
                  alt={ recommendedDrinks[firstCardIndex]?.strDrink }
                />
              </div>
            ) : (
              <div data-testid={ `${firstCardIndex}-recommendation-card` }>
                <h3 data-testid={ `${firstCardIndex}-recommendation-title` }>
                  { recommendedFood[firstCardIndex]?.strMeal }
                </h3>
                <img
                  src={ recommendedFood[firstCardIndex]?.strMealThumb }
                  alt={ recommendedFood[firstCardIndex]?.strMeal }
                />
              </div>
            )}
          </div>

          <div
            className="carousel-card"
          >
            { place === 'meals' ? (
              <div data-testid={ `${secondCardIndex}-recommendation-card` }>
                <h3 data-testid={ `${secondCardIndex}-recommendation-title` }>
                  { recommendedDrinks[secondCardIndex]?.strDrink }
                </h3>
                <img
                  src={ recommendedDrinks[secondCardIndex]?.strDrinkThumb }
                  alt={ recommendedDrinks[secondCardIndex]?.strDrink }
                />
              </div>
            ) : (
              <div data-testid={ `${secondCardIndex}-recommendation-card` }>
                <h3 data-testid={ `${secondCardIndex}-recommendation-title` }>
                  { recommendedFood[secondCardIndex]?.strMeal }
                </h3>
                <img
                  src={ recommendedFood[secondCardIndex]?.strMealThumb }
                  alt={ recommendedFood[secondCardIndex]?.strMeal }
                />
              </div>
            )}
          </div>
        </div>

        <button onClick={ handleNextBtn }>
          <VscChevronRight />
        </button>

      </section>
    </div>
  );
}

export default RecommendedRecipes;
