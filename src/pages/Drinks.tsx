import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import DrinkRecipeCard from '../components/DrinksCard';
import { PlaceAction, takeDinamicRecipe } from '../redux/actions/actions';
import { DrinkType, MainReducerType } from '../types';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state: MainReducerType) => state.drinks);

  useEffect(() => {
    dispatch(PlaceAction('drinks'));
    dispatch(takeDinamicRecipe({ type: 'category', inputValue: '' }, 'drinks') as any);
  }, [dispatch]);

  return (
    <Recipes place="drinks">
      <div>
        <h1>Drinks</h1>
        {drinks.map((drink: DrinkType, index: number) => (
          <DrinkRecipeCard key={ drink.idDrink } drink={ drink } index={ index } />
        ))}
      </div>
      <Footer />
    </Recipes>
  );
}

export default Drinks;
