import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { PlaceAction, MealsAction } from '../redux/actions/actions';
import MealsCard from '../components/MealsCard';
import { RootState, MealType } from '../types';
import { fetchMeals } from '../utils/apiMeals';

function Meals() {
  const [chosenCategory, setChosenCategory] = useState('All');
  const dispatch = useDispatch();
  const { meals, mealsCategories } = useSelector((state: RootState) => state.mainReducer);

  useEffect(() => {
    dispatch(PlaceAction('meals'));
  });

  const setMeals = async () => {
    const response = await fetchMeals();
    dispatch(MealsAction(response));
  };

  const switchCategory = (category: string) => {
    if (chosenCategory === category) return setMeals();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => dispatch(MealsAction(data.meals.slice(0, 12))))
      .then(() => setChosenCategory(category));
  };
  return (
    <>
      <Recipes>
        <Header />
        {mealsCategories.map((category) => (
          <button
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => switchCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          onClick={ setMeals }
        >
          All
        </button>
        {meals.map((meal, index) => (
          <MealsCard
            key={ meal.idMeal }
            meal={ meal as MealType }
            index={ index }
          />
        ))}
      </Recipes>
      <Footer />
    </>
  );
}

export default Meals;
