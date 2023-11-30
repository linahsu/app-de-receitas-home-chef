import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import DrinksCard from '../components/DrinksCard';
import { RootState, DrinkType } from '../types';
import { DrinksAction, PlaceAction } from '../redux/actions/actions';
import { fetchDrinks } from '../utils/apiDrinks';

function Drinks() {
  const [chosenCategory, setChosenCategory] = useState('All');
  const dispatch = useDispatch();

  const {
    drinks, drinkCategories } = useSelector((state: RootState) => state.mainReducer);
  useEffect(() => {
    dispatch(PlaceAction('drinks'));
  });

  const setDrinks = async () => {
    const response = await fetchDrinks();
    dispatch(DrinksAction(response));
  };

  const switchCategory = (category: string) => {
    if (chosenCategory === category) return setDrinks();

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => dispatch(
        (data.drinks.slice(0, 12)),
      ))
      .then(() => setChosenCategory(category));
  };
  return (
    <Recipes>
      <Header />
      {drinkCategories.map((category) => (
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
        onClick={ setDrinks }
      >
        All
      </button>

      {drinks.map((drink, index) => (
        <DrinksCard
          key={ drink.idDrink }
          drink={ drink as DrinkType }
          index={ index }
        />
      ))}
      <Footer />
    </Recipes>
  );
}

export default Drinks;
