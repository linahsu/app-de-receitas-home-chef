import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { takeDinamicRecipe } from '../redux/actions/actions';

interface RecipesProps {
  place: string;
  children: React.ReactNode;
}

function Recipes({ place, children }: RecipesProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(takeDinamicRecipe({ type: 'category', inputValue: 'Beef' }, 'meals') as any);
    dispatch(takeDinamicRecipe({
      type: 'category', inputValue: 'Cocktail' }, 'drinks') as any);
  }, [dispatch]);

  return <div>{children}</div>;
}

export default Recipes;
