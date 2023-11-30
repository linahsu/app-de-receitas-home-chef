import React from 'react';
import { NavLink } from 'react-router-dom';
import { MealType } from '../types';

type MealsCardProps = {
  meal: MealType;
  index: number;
};

function MealsCard({ meal, index }: MealsCardProps) {
  return (
    <NavLink to={ `/meals/${meal.idMeal}` } data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
      <img
        data-testid={ `${index}-card-img` }
        src={ meal.strMealThumb }
        alt="meal thumb"
      />
    </NavLink>
  );
}

export default MealsCard;
