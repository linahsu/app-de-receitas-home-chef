import { useLocation } from 'react-router';
import MealInProgress from '../components/MealInProgress';

function RecipeInProgress() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname.includes('meals') ? <MealInProgress /> : <h1>Drink in progress</h1>}
    </div>
  );
}
export default RecipeInProgress;
