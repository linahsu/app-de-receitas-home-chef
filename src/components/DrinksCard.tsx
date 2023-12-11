import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrinkType } from '../types';

type DrinkCardProps = {
  drink: DrinkType;
  index: number;
};

function DrinksCard({ drink, index }: DrinkCardProps) {
  return (
    <div className="recipe-card">
      <NavLink to={ `/drinks/${drink.idDrink}` } data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ drink.strDrinkThumb }
          alt="drink thumbnail"
          width="150"
          height="150"
        />
        <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
      </NavLink>
    </div>
  );
}

export default DrinksCard;
