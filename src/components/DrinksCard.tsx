import React from 'react';
import { DrinkType } from '../types';

type DrinkRecipeCardProps = {
  drink: DrinkType;
  index: number;
};

function DrinksCard({ drink, index }: DrinkRecipeCardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
      <img
        data-testid={
        `${index}-card-img`
}
        src={ drink.strDrinkThumb }
        alt="drink thumb"
      />
    </div>
  );
}

export default DrinksCard;
