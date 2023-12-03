import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { RootState } from '../../types';

import './RecommendedRecipes.css';

function RecommendedRecipes() {
  const { pathname } = useLocation();
  const [, category] = pathname.split('/');
  // const [firstCardIndex, setFirstCardIndex] = useState(0); // estado que controla o indice do primeiro card
  // const [secondCardIndex, setSecondCardIndex] = useState(1); // estado que controla o indice do segundo card

  const { allMeals, allDrinks } = useSelector((
    Globalstate: RootState,
  ) => Globalstate.mainReducer); // recupera do estado global

  const recommendedFood = allMeals.slice(0, 6); // pega os 6 primeiros elementos do array de comidas
  const recommendedDrinks = allDrinks.slice(0, 6); // pega os 6 primeiros elementos do array de bebidas

  // função que controla o botão de voltar, caso o indice do primeiro card seja maior que 0, ele diminui 2 do indice dos cards
  // const handlePreviousBtn = () => {
  //   if (firstCardIndex > 0) {
  //     setFirstCardIndex(firstCardIndex - 2);
  //     setSecondCardIndex(secondCardIndex - 2);
  //   } else {
  //     setFirstCardIndex(0);
  //     setSecondCardIndex(1);
  //   }
  // };

  // // função que controla o botão de avançar, caso o indice do primeiro card seja menor que 4, ele aumenta 2 do indice dos cards
  // const handleNextBtn = () => {
  //   if (firstCardIndex < 4) {
  //     setFirstCardIndex(firstCardIndex + 2);
  //     setSecondCardIndex(secondCardIndex + 2);
  //   } else {
  //     setFirstCardIndex(4);
  //     setSecondCardIndex(5);
  //   }
  // };

  if (!recommendedFood.length && !recommendedDrinks.length) {
    return (
      <span>
        Carregando...
      </span>
    );
  }

  return (
    <div className="carousel-container">

      { category === 'meals' && recommendedDrinks?.map((drink, index) => (
        <div
          className="carousel-card"
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-recommendation-title` }>{ drink.strDrink }</p>
        </div>
      ))}

      { category === 'drinks' && recommendedFood?.map((meal, index) => (
        <div
          className="carousel-card"
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-recommendation-title` }>{ meal.strMeal }</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendedRecipes;
