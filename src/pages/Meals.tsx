import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import MealRecipeCard from '../components/MealsCard';
import { PlaceAction, takeDinamicRecipe } from '../redux/actions/actions';
import { RootState, MealType } from '../types';

function Meals() {
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);
  const { meals } = rootState.mainReducer;

  useEffect(() => {
    dispatch(PlaceAction('meals'));
    dispatch(takeDinamicRecipe({ type: 'category', inputValue: 'Beef' }, 'meals') as any);
  }, [dispatch]);

  return (
    <>
      <Recipes place="meals">
        {meals.map((meal: MealType, index: number) => (
          <MealRecipeCard key={ meal.idMeal } meal={ meal } index={ index } />
        ))}
      </Recipes>
      <Footer />
    </>
  );
}

export default Meals;
