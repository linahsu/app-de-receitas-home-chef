import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchDrinkById, fetchAllCocktails } from '../utils/apiDrinks';
import { fetchMealById, fetchAllMeals } from '../utils/apiMeals';
import { ActionDetailsDrink, ActionDetailsMeal,
  AllDrinksAction, AllMealsAction } from '../redux/actions/actions';

function RecipeDetails({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [, category, id] = pathname.split('/');

  // Faz o fetch de acordo com a categoria do pathname
  useEffect(() => {
    if (category === 'meals') {
      fetchMealById(id).then((data) => dispatch(ActionDetailsMeal(data)));
      fetchAllCocktails().then((data) => dispatch(AllDrinksAction(data)));
    }
    if (category === 'drinks') {
      fetchDrinkById(id).then((data) => dispatch(ActionDetailsDrink(data)));
      fetchAllMeals().then((data) => dispatch(AllMealsAction(data)));
    }
  }, [category, id, dispatch]);

  return (
    <div>
      {
      (category === 'meals' ? <h1>Detalhes da Comida</h1> : <h1>Detalhes da Bebida</h1>)
      }
      {children}
    </div>
  );
}

export default RecipeDetails;
