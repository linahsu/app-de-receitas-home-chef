import React from 'react';
import { NavLink } from 'react-router-dom';
import { MealType } from '../types';

type MealsCardProps = {
  meal: MealType;
  index: number;
};

function MealsCard({ meal, index }: MealsCardProps) {
  return (
    <div className="recipe-card">
      <NavLink to={ `/meals/${meal.idMeal}` } data-testid={ `${index}-recipe-card` }>
        <div className="recipe-card-img-frame"></div>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt="meal thumbnail"
            width="150"
            height="150"
          />
          
        <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
      </NavLink>
    </div>
  );
}

export default MealsCard;
