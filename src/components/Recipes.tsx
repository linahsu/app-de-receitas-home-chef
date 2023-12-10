import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MealsAction, DrinksAction } from '../redux/actions/actions';
import { fetchMeals } from '../utils/apiMeals';
import { fetchDrinks } from '../utils/apiDrinks';
import { RootState } from '../types';

function Recipes({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { meals, drinks } = useSelector((state: RootState) => state.mainReducer);

  useEffect(() => {
    if (pathname === '/meals' && meals.length === 0) {
      fetchMeals().then((data) => dispatch(MealsAction(data)));
    }
    if (pathname === '/drinks' && drinks.length === 0) {
      fetchDrinks().then((data) => dispatch(DrinksAction(data)));
    }
  }, [dispatch, pathname, meals, drinks]);

  return (
    <>
      <div>{children}</div>
      <div className="search-page-bottom" />
    </>

  );
}

export default Recipes;
