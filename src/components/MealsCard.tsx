import React from 'react';
import { MealType } from '../types';

type MealRecipeCardProps = {
  meal: MealType;
  index: number;
};

function MealsCard({ meal, index }: MealRecipeCardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
      <img
        data-testid={
        `${index}-card-img`
}
        src={ meal.strMealThumb }
        alt="meal thumb"
      />
    </div>
  );
}

export default MealsCard;
